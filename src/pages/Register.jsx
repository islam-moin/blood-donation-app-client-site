import { useState } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import districtsRaw from "../data/districts.json";
import upazilasRaw from "../data/upazilas.json";
import axios from "axios";
import { Link } from "react-router-dom";

const auth = getAuth(app);

/* ✅ extract real data from phpMyAdmin JSON */
const districts = districtsRaw.find(
  (item) => item.type === "table" && item.name === "districts"
).data;

const upazilas = upazilasRaw.find(
  (item) => item.type === "table" && item.name === "upazilas"
).data;

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedDistrictId, setSelectedDistrictId] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    const bloodGroup = form.bloodGroup.value;
    const districtId = form.district.value;
    const upazila = form.upazila.value;
    const image = form.avatar.files[0];

    if (password !== confirm) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      /* 🔹 upload avatar to imgBB */
      const imgData = new FormData();
      imgData.append("image", image);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
        imgData
      );

      const avatar = imgRes.data.data.display_url;

      /* 🔹 Firebase register */
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(result.user, {
        displayName: name,
        photoURL: avatar,
      });

      /* 🔹 get district name from id */
      const districtName =
        districts.find((d) => d.id === districtId)?.name;

      /* 🔹 save user to DB */
      const userInfo = {
        name,
        email,
        avatar,
        bloodGroup,
        district: districtName,
        upazila,
        role: "donor",
        status: "active",
      };

      await axios.post("http://localhost:5000/users", userInfo);

      alert("Registration successful");
      form.reset();
      setSelectedDistrictId("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            name="avatar"
            type="file"
            accept="image/*"
            required
          />

          {/* Blood Group */}
          <select
            name="bloodGroup"
            className="w-full border rounded-lg px-4 py-2"
            required
          >
            <option value="">Select Blood Group</option>
            {["A+","A-","B+","B-","AB+","AB-","O+","O-"].map((bg) => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>

          {/* District */}
          <select
            name="district"
            value={selectedDistrictId}
            onChange={(e) => setSelectedDistrictId(e.target.value)}
            className="w-full border rounded-lg px-4 py-2"
            required
          >
            <option value="">Select District</option>
            {districts.map((d) => (
              <option key={d.id} value={d.id}>
                {d.name}
              </option>
            ))}
          </select>

          {/* Upazila */}
          <select
            name="upazila"
            className="w-full border rounded-lg px-4 py-2"
            required
          >
            <option value="">Select Upazila</option>
            {upazilas
              .filter((u) => u.district_id === selectedDistrictId)
              .map((u) => (
                <option key={u.id} value={u.name}>
                  {u.name}
                </option>
              ))}
          </select>

          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <input
            name="confirm"
            type="password"
            placeholder="Confirm Password"
            className="w-full border rounded-lg px-4 py-2"
            required
          />

          <button
            disabled={loading}
            className="w-full bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {error && (
          <p className="text-red-500 text-sm text-center mt-4">
            {error}
          </p>
        )}
        <p className="text-center text-sm mt-4">
  Already have an account?{" "}
  <Link to="/login" className="text-red-600 font-semibold">
    Login here
  </Link>
</p>

      </div>
    </div>
  );
}
