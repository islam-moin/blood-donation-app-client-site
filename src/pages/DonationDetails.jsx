/* eslint-disable */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function DonationDetails() {
  const { id } = useParams();
  const { user, dbUser } = useAuth();
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/donation-requests/${id}`)
      .then((res) => {
        setRequest(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <p className="text-lg font-semibold">Loading details...</p>
      </div>
    );
  }

  if (!request) {
    return (
      <p className="text-center mt-10 text-red-600">
        Request not found
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* HEADER */}
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
        🩸 Donation Request Details
      </h2>

      {/* CARD */}
      <div className="bg-white shadow-xl rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Detail label="Recipient Name" value={request.recipientName} />
        <Detail label="Blood Group" value={request.bloodGroup} />
        <Detail
          label="Location"
          value={`${request.recipientDistrict}, ${request.recipientUpazila}`}
        />
        <Detail label="Hospital" value={request.hospitalName} />
        <Detail label="Donation Date" value={request.donationDate} />
        <Detail label="Donation Time" value={request.donationTime} />
        <Detail label="Requester" value={request.requesterName} />
        <Detail label="Contact Email" value={request.requesterEmail} />

        <div className="md:col-span-2">
          <p className="font-semibold text-gray-600 mb-1">
            Message
          </p>
          <p className="bg-gray-50 p-4 rounded-lg">
            {request.requestMessage}
          </p>
        </div>

        <div className="md:col-span-2 flex justify-between items-center mt-4">
          <span
            className={`px-4 py-1 rounded-full text-sm font-semibold ${
              request.donationStatus === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : request.donationStatus === "inprogress"
                ? "bg-blue-100 text-blue-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            Status: {request.donationStatus}
          </span>

          {/* DONATE BUTTON */}
          {request.donationStatus === "pending" &&
            user &&
            dbUser?.role === "donor" && (
              <button
                onClick={() => setShowModal(true)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Donate Now
              </button>
            )}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-xl p-6">
            <h3 className="text-xl font-bold mb-4">
              Confirm Donation
            </h3>

            <div className="space-y-3">
              <input
                readOnly
                value={dbUser?.name}
                className="w-full border p-2 bg-gray-100 rounded"
              />
              <input
                readOnly
                value={dbUser?.email}
                className="w-full border p-2 bg-gray-100 rounded"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded border"
              >
                Cancel
              </button>
              <button
                onClick={async () => {
                  await axios.patch(
                    `http://localhost:5000/donation-requests/${id}`,
                    {
                      donationStatus: "inprogress",
                      donorName: dbUser.name,
                      donorEmail: dbUser.email,
                    }
                  );
                  setRequest({
                    ...request,
                    donationStatus: "inprogress",
                  });
                  setShowModal(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* 🔹 Small reusable component */
function Detail({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-800">{value}</p>
    </div>
  );
}
