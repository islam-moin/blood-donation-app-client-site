/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function DonationRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/public-donation-requests")
      .then((res) => {
        setRequests(res.data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
        🩸 Pending Blood Donation Requests
      </h2>

      {requests.length === 0 ? (
        <p className="text-center text-gray-500">
          No pending donation requests
        </p>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req) => (
            <div
              key={req._id}
              className="bg-white shadow rounded-xl p-5"
            >
              <h3 className="text-xl font-semibold">
                {req.recipientName}
              </h3>

              <p className="text-gray-600">
                {req.recipientDistrict}, {req.recipientUpazila}
              </p>

              <p className="mt-2">
                <strong>Blood:</strong> {req.bloodGroup}
              </p>

              <p>
                <strong>Date:</strong> {req.donationDate}
              </p>

              <p>
                <strong>Time:</strong> {req.donationTime}
              </p>

              <button
                onClick={() => {
                  if (!user) {
                    navigate("/login", {
                      state: {
                        from: `/donation-requests/${req._id}`,
                      },
                    });
                  } else {
                    navigate(
                      `/donation-requests/${req._id}`
                    );
                  }
                }}
                className="mt-4 w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
