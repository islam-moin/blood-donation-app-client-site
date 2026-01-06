/* eslint-disable */
import { useState } from "react";
import axios from "axios";

export default function Search() {
  const [bloodGroup, setBloodGroup] = useState("");
  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [donors, setDonors] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSearched(true);

    try {
      const res = await axios.get(
        `http://localhost:5000/donors`,
        {
          params: {
            bloodGroup,
            district,
            upazila,
          },
        }
      );

      setDonors(res.data);
    } catch (error) {
      console.error(error);
      setDonors([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
        🔍 Search Donors
      </h2>

      {/* SEARCH FORM */}
      <form
        onSubmit={handleSearch}
        className="bg-white p-6 rounded-xl shadow grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        {/* Blood Group */}
        <select
          value={bloodGroup}
          onChange={(e) => setBloodGroup(e.target.value)}
          required
          className="border p-2 rounded"
        >
          <option value="">Blood Group</option>
          {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map(bg => (
            <option key={bg} value={bg}>{bg}</option>
          ))}
        </select>

        {/* District */}
        <input
          type="text"
          placeholder="District"
          value={district}
          onChange={(e) => setDistrict(e.target.value)}
          required
          className="border p-2 rounded"
        />

        {/* Upazila */}
        <input
          type="text"
          placeholder="Upazila"
          value={upazila}
          onChange={(e) => setUpazila(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-red-600 text-white rounded font-semibold hover:bg-red-700"
        >
          Search
        </button>
      </form>

      {/* RESULT SECTION */}
      <div className="mt-8">
        {loading && <p className="text-center">Searching...</p>}

        {!loading && searched && donors.length === 0 && (
          <p className="text-center text-gray-500">
            No donors found
          </p>
        )}

        {donors.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {donors.map((donor) => (
              <div
                key={donor._id}
                className="bg-white p-5 rounded-xl shadow"
              >
                <h3 className="text-xl font-bold">
                  {donor.name}
                </h3>
                <p>Blood Group: {donor.bloodGroup}</p>
                <p>
                  Location: {donor.district}, {donor.upazila}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
