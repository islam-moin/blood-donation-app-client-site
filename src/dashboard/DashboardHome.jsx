/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

export default function DashboardHome() {
  const { user, dbUser } = useAuth();

  const [stats, setStats] = useState(null);
  const [recentRequests, setRecentRequests] = useState([]);
  const [totalFunding, setTotalFunding] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // ======================
        // ADMIN + VOLUNTEER
        // ======================
        if (dbUser?.role === "admin" || dbUser?.role === "volunteer") {
          // stats
          const statsRes = await axios.get(
            "http://localhost:5000/admin-stats"
          );
          setStats(statsRes.data);

          // funding
          const fundRes = await axios.get(
            "http://localhost:5000/fundings"
          );
          const total = fundRes.data.reduce(
            (sum, item) => sum + Number(item.amount),
            0
          );
          setTotalFunding(total);
        }

        // ======================
        // DONOR
        // ======================
        if (dbUser?.role === "donor" && user?.email) {
          const res = await axios.get(
            `http://localhost:5000/donation-requests/recent/${user.email}`
          );
          setRecentRequests(res.data.slice(0, 3));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (dbUser) {
      loadData();
    }
  }, [dbUser, user]);

  if (loading) {
    return (
      <p className="text-center mt-10">
        Loading dashboard...
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {/* WELCOME */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold text-red-600">
          Welcome, {dbUser?.name}
        </h2>
        <p className="text-gray-600 mt-1">
          Role: {dbUser?.role} | Status: {dbUser?.status}
        </p>
      </div>

      {/* ADMIN + VOLUNTEER */}
      {(dbUser?.role === "admin" ||
        dbUser?.role === "volunteer") && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-5 rounded-xl shadow">
            <h4 className="text-gray-500">Total Users</h4>
            <p className="text-3xl font-bold mt-2">
              {stats?.totalUsers || 0}
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h4 className="text-gray-500">Total Funding</h4>
            <p className="text-3xl font-bold mt-2">
              {totalFunding} ৳
            </p>
          </div>

          <div className="bg-white p-5 rounded-xl shadow">
            <h4 className="text-gray-500">Total Requests</h4>
            <p className="text-3xl font-bold mt-2">
              {stats?.totalRequests || 0}
            </p>
          </div>
        </div>
      )}

      {dbUser?.role === "donor" && (
  <div className="bg-white p-6 rounded-xl shadow">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-semibold">
        Recent Donation Requests
      </h3>

      <Link
        to="/dashboard/my-donation-requests"
        className="text-red-600 text-sm hover:underline"
      >
        View All →
      </Link>
    </div>

    {recentRequests.length === 0 ? (
      <p className="text-gray-500">
        You have not created any donation request yet.
      </p>
    ) : (
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Recipient</th>
              <th className="border p-2">Location</th>
              <th className="border p-2">Blood</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Time</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>

          <tbody>
            {recentRequests.map((req, index) => (
              <tr key={req._id} className="text-center">
                <td className="border p-2">
                  {index + 1}
                </td>

                <td className="border p-2">
                  {req.recipientName}
                </td>

                <td className="border p-2">
                  {req.recipientDistrict}, {req.recipientUpazila}
                </td>

                <td className="border p-2 font-semibold">
                  {req.bloodGroup}
                </td>

                <td className="border p-2">
                  {req.donationDate}
                </td>

                <td className="border p-2">
                  {req.donationTime}
                </td>

                <td className="border p-2 capitalize">
                  {req.donationStatus}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
)}


    </div>
  );
}
