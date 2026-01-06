/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function Funding() {
  const { dbUser } = useAuth();
  const [fundings, setFundings] = useState([]);
  const [amount, setAmount] = useState("");

  const loadFundings = async () => {
    const res = await axios.get("http://localhost:5000/fundings");
    setFundings(res.data);
  };

  useEffect(() => {
    loadFundings();
  }, []);

  const handleGiveFund = async () => {
    if (!amount) return alert("Enter amount");

    // 🔴 Stripe normally here
    // 🟢 For assignment: simulate success
    await axios.post("http://localhost:5000/fundings", {
      name: dbUser?.name,
      amount,
    });

    setAmount("");
    loadFundings();
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold text-red-600 mb-4">
        Funding
      </h2>

      {/* GIVE FUND */}
      <div className="flex gap-3 mb-6">
        <input
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-40"
        />
        <button
          onClick={handleGiveFund}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Give Fund
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Amount</th>
              <th className="border p-2">Date</th>
            </tr>
          </thead>

          <tbody>
            {fundings.map((fund, index) => (
              <tr key={fund._id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{fund.name}</td>
                <td className="border p-2">{fund.amount}</td>
                <td className="border p-2">
                  {new Date(fund.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
