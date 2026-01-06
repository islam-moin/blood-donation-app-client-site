/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";

export default function AllUsers() {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  const fetchUsers = async () => {
    const res = await axios.get(
      `http://localhost:5000/users${filter ? `?status=${filter}` : ""}`
    );
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, [filter]);

  const updateUser = async (id, data) => {
    await axios.patch(`http://localhost:5000/users/${id}`, data);
    fetchUsers();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">All Users</h2>

      {/* Filter */}
      <div className="mb-4">
        <select
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Avatar</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Role</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="border-t">
                <td className="p-3">
                  <img
                    src={u.avatar}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="p-3">{u.name}</td>
                <td className="p-3">{u.email}</td>
                <td className="p-3 capitalize">{u.role}</td>
                <td className="p-3 capitalize">{u.status}</td>

                <td className="p-3 space-x-2">
                  {/* Block / Unblock */}
                  {u.status === "active" ? (
                    <button
                      onClick={() =>
                        updateUser(u._id, { status: "blocked" })
                      }
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Block
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        updateUser(u._id, { status: "active" })
                      }
                      className="bg-green-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Unblock
                    </button>
                  )}

                  {/* Make Volunteer */}
                  {u.role === "donor" && (
                    <button
                      onClick={() =>
                        updateUser(u._id, { role: "volunteer" })
                      }
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Make Volunteer
                    </button>
                  )}

                  {/* Make Admin */}
                  {u.role !== "admin" && (
                    <button
                      onClick={() =>
                        updateUser(u._id, { role: "admin" })
                      }
                      className="bg-black text-white px-2 py-1 rounded text-sm"
                    >
                      Make Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
