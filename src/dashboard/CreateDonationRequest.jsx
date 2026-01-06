/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

import districtsRaw from "../data/districts.json";
import upazilasRaw from "../data/upazilas.json";

// ✅ SAME extraction as Register
const districts = districtsRaw.find(
  (item) => item.type === "table" && item.name === "districts"
)?.data || [];

const upazilas = upazilasRaw.find(
  (item) => item.type === "table" && item.name === "upazilas"
)?.data || [];

export default function CreateDonationRequest() {
  const { dbUser } = useAuth();

  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);

  // 🔥 EXACT same filtering logic as Register
  useEffect(() => {
    if (selectedDistrictId) {
      const result = upazilas.filter(
        (u) => String(u.district_id) === String(selectedDistrictId)
      );
      setFilteredUpazilas(result);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrictId]);

  // ❌ blocked user restriction (assignment requirement)
  if (dbUser?.status === "blocked") {
    return (
      <div className="p-6 text-center text-red-600 font-semibold">
        ❌ You are blocked. You cannot create a donation request.
      </div>
    );
  }

  // 🔹 submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    // district নাম বের করা (Register-এর মতো)
    const districtName =
      districts.find((d) => d.id === selectedDistrictId)?.name;

    const donationRequest = {
      requesterName: dbUser.name,
      requesterEmail: dbUser.email,
      recipientName: form.recipientName.value,
      recipientDistrict: districtName,
      recipientUpazila: form.upazila.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      bloodGroup: form.bloodGroup.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      requestMessage: form.requestMessage.value,
      donationStatus: "pending",
      createdAt: new Date(),
    };

    try {
      await axios.post(
        "http://localhost:5000/donation-requests",
        donationRequest
      );
      alert("✅ Donation request created successfully");
      form.reset();
      setSelectedDistrictId("");
    } catch (error) {
      alert("❌ Failed to create request");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-6">🩸 Create Donation Request</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* requester info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            readOnly
            value={dbUser?.name}
            className="border p-2 bg-gray-100"
          />
          <input
            readOnly
            value={dbUser?.email}
            className="border p-2 bg-gray-100"
          />
        </div>

        <input
          name="recipientName"
          placeholder="Recipient Name"
          required
          className="border p-2 w-full"
        />

        {/* District — SAME AS REGISTER */}
        <select
          name="district"
          value={selectedDistrictId}
          onChange={(e) => setSelectedDistrictId(e.target.value)}
          required
          className="border p-2 w-full"
        >
          <option value="">Select District</option>
          {districts.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>

        {/* Upazila — SAME AS REGISTER */}
        <select
          name="upazila"
          required
          disabled={!selectedDistrictId}
          className="border p-2 w-full"
        >
          <option value="">Select Upazila</option>
          {filteredUpazilas.map((u) => (
            <option key={u.id} value={u.name}>
              {u.name}
            </option>
          ))}
        </select>

        <input
          name="hospitalName"
          placeholder="Hospital Name"
          required
          className="border p-2 w-full"
        />

        <input
          name="fullAddress"
          placeholder="Full Address"
          required
          className="border p-2 w-full"
        />

        <select name="bloodGroup" required className="border p-2 w-full">
          <option value="">Select Blood Group</option>
          {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input type="date" name="donationDate" required className="border p-2" />
          <input type="time" name="donationTime" required className="border p-2" />
        </div>

        <textarea
          name="requestMessage"
          placeholder="Why do you need blood?"
          required
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Request
        </button>
      </form>
    </div>
  );
}
