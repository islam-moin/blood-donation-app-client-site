/* eslint-disable */
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function DashboardLayout() {
  const { user, dbUser, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }

    if (!loading && dbUser?.status === "blocked") {
      alert("Your account is blocked");
      logout().then(() => navigate("/login"));
    }
  }, [user, dbUser, loading, navigate, logout]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-semibold">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* SIDEBAR */}
      <aside className="w-full md:w-64 bg-red-600 text-white p-4">
        <h2 className="text-xl font-bold mb-4">
          {dbUser?.role === "admin" && "Admin Dashboard"}
          {dbUser?.role === "donor" && "Donor Dashboard"}
          {dbUser?.role === "volunteer" && "Volunteer Dashboard"}
        </h2>

        <nav className="space-y-2">
          {/* DASHBOARD HOME */}
          <NavLink
            to="/dashboard"
            className="block hover:bg-red-700 p-2 rounded"
          >
            Dashboard Home
          </NavLink>

          {/* ✅ PROFILE — ALL ROLES */}
          <NavLink
            to="/dashboard/profile"
            className="block hover:bg-red-700 p-2 rounded"
          >
            My Profile
          </NavLink>

          {/* DONOR MENU */}
          {dbUser?.role === "donor" && (
            <>
              <NavLink
                to="/dashboard/my-donation-requests"
                className="block hover:bg-red-700 p-2 rounded"
              >
                My Donation Requests
              </NavLink>

              <NavLink
                to="/dashboard/create-donation-request"
                className="block hover:bg-red-700 p-2 rounded"
              >
                Create Donation Request
              </NavLink>
            </>
          )}

          {/* ADMIN ONLY */}
          {dbUser?.role === "admin" && (
            <NavLink
              to="/dashboard/all-users"
              className="block hover:bg-red-700 p-2 rounded"
            >
              All Users
            </NavLink>
          )}

          {/* ADMIN + VOLUNTEER */}
          {(dbUser?.role === "admin" ||
            dbUser?.role === "volunteer") && (
            <>
              <NavLink
                to="/dashboard/funding"
                className="block hover:bg-red-700 p-2 rounded"
              >
                Funding
              </NavLink>

              <NavLink
                to="/dashboard/all-blood-donation-requests"
                className="block hover:bg-red-700 p-2 rounded"
              >
                All Blood Donation Requests
              </NavLink>
            </>
          )}

          {/* LOGOUT */}
          <button
            onClick={() => {
              logout().then(() => navigate("/login"));
            }}
            className="w-full bg-white text-red-600 mt-6 py-2 rounded font-semibold hover:bg-gray-100"
          >
            Logout
          </button>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}
