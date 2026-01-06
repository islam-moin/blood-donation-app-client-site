/* eslint-disable */
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { dbUser, refetchUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!dbUser) return null;

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const updatedUser = {
      name: form.name.value,
      bloodGroup: form.bloodGroup.value,
      district: form.district.value,
      upazila: form.upazila.value,
      avatar: form.avatar.value,
    };

    try {
      await axios.patch(
        `http://localhost:5000/users/email/${dbUser.email}`,
        updatedUser
      );
      await refetchUser();
      setEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-xl shadow">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-red-600">
          My Profile
        </h2>

        {!editing && (
          <button
            onClick={() => setEditing(true)}
            className="bg-red-600 text-white px-4 py-1 rounded"
          >
            Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-4">
        {/* AVATAR */}
        <div className="flex flex-col items-center gap-2">
          <img
            src={
              dbUser.avatar ||
              "https://i.ibb.co/2d0ZrQJ/user.png"
            }
            alt="avatar"
            className="w-28 h-28 rounded-full object-cover border"
          />

          {editing && (
            <input
              name="avatar"
              defaultValue={dbUser.avatar}
              placeholder="Avatar Image URL"
              className="w-full border p-2 rounded"
            />
          )}
        </div>

        {/* BASIC INFO */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            defaultValue={dbUser.name}
            disabled={!editing}
            className="border p-2 rounded"
            placeholder="Full Name"
          />

          <input
            value={dbUser.email}
            disabled
            className="border p-2 rounded bg-gray-100"
            placeholder="Email"
          />
        </div>

        {/* BLOOD GROUP */}
        <select
          name="bloodGroup"
          defaultValue={dbUser.bloodGroup}
          disabled={!editing}
          className="w-full border p-2 rounded"
        >
          <option value="">Select Blood Group</option>
          {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>

        {/* ADDRESS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="district"
            defaultValue={dbUser.district}
            disabled={!editing}
            className="border p-2 rounded"
            placeholder="District"
          />

          <input
            name="upazila"
            defaultValue={dbUser.upazila}
            disabled={!editing}
            className="border p-2 rounded"
            placeholder="Upazila"
          />
        </div>

        {/* ROLE & STATUS (READ ONLY – GOOD FOR ASSIGNMENT) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            value={`Role: ${dbUser.role}`}
            disabled
            className="border p-2 rounded bg-gray-100"
          />
          <input
            value={`Status: ${dbUser.status}`}
            disabled
            className="border p-2 rounded bg-gray-100"
          />
        </div>

        
        {editing && (
          <button
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        )}
      </form>
    </div>
  );
}
