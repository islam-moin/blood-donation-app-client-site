/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AllBloodDonationRequests() {
  const { dbUser } = useAuth(); // 🔥 role access
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  // ======================
  // LOAD ALL REQUESTS
  // ======================
  const loadRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/donation-requests"
      );
      setRequests(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  // ======================
  // STATUS UPDATE (Admin + Volunteer)
  // ======================
  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(
        `http://localhost:5000/donation-requests/${id}`,
        { donationStatus: status }
      );
      loadRequests();
    } catch (error) {
      console.error(error);
    }
  };

  // ======================
  // DELETE (Admin only)
  // ======================
  const handleDelete = async (id) => {
    if (dbUser?.role !== "admin") return;

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this request?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `http://localhost:5000/donation-requests/${id}`
      );
      loadRequests();
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // ======================
  // FILTER
  // ======================
  const filteredRequests =
    filter === "all"
      ? requests
      : requests.filter(
          (req) => req.donationStatus === filter
        );

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4 text-red-600">
        🩸 All Blood Donation Requests
      </h2>

      {/* FILTER */}
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border px-3 py-2 rounded"
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-100">
            <tr>
              <th>#</th>
              <th>Requester</th>
              <th>Recipient</th>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Blood</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredRequests.map((req, index) => (
              <tr key={req._id}>
                <td>{index + 1}</td>
                <td>{req.requesterName}</td>
                <td>{req.recipientName}</td>
                <td>
                  {req.recipientDistrict}, {req.recipientUpazila}
                </td>
                <td>{req.donationDate}</td>
                <td>{req.donationTime}</td>
                <td>{req.bloodGroup}</td>
                <td className="capitalize font-semibold">
                  {req.donationStatus}
                </td>

                {/* ACTION */}
                <td className="flex gap-2 flex-wrap">
                  {/* START */}
                  {req.donationStatus === "pending" && (
                    <button
                      onClick={() =>
                        handleStatusChange(req._id, "inprogress")
                      }
                      className="px-3 py-1 bg-blue-600 text-white rounded"
                    >
                      Start
                    </button>
                  )}

                  {/* DONE / CANCEL */}
                  {req.donationStatus === "inprogress" && (
                    <>
                      <button
                        onClick={() =>
                          handleStatusChange(req._id, "done")
                        }
                        className="px-3 py-1 bg-green-600 text-white rounded"
                      >
                        Done
                      </button>
                      <button
                        onClick={() =>
                          handleStatusChange(req._id, "canceled")
                        }
                        className="px-3 py-1 bg-yellow-600 text-white rounded"
                      >
                        Cancel
                      </button>
                    </>
                  )}

                  {/* DELETE (ADMIN ONLY) */}
                  {dbUser?.role === "admin" && (
                    <button
                      onClick={() => handleDelete(req._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded"
                    >
                      Delete
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
