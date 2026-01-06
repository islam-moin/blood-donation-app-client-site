/* eslint-disable */
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import logo from "../assets/blood.jpg";


export default function Navbar() {
  const { user, dbUser, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  return (
    <nav className="bg-red-600 text-gray-300 ">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
  <img
    src={logo}
    alt="BloodCare Logo"
    className="h-10 w-auto object-contain"
  />
  <span className="text-xl font-bold text-white-600 hidden sm:block">
    BloodCare
  </span>
</Link>


        {/* Desktop Menu */}
        <div className=" text-black hidden md:flex items-center gap-6">
          <Link to="/donation-requests">Donation Requests</Link>

          {user && (
            <Link to="/dashboard/funding">Funding</Link>
          )}

          {!user ? (
            <Link
              to="/login"
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Login
            </Link>
          ) : (
            <div className="relative">
              <img
                src={user.photoURL || "https://i.ibb.co/2d0ZrQJ/user.png"}
                alt="avatar"
                className="w-9 h-9 rounded-full cursor-pointer"
                onClick={() => setDropOpen(!dropOpen)}
              />

              {dropOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow">
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-3 space-y-3">
          <Link to="/donation-requests" className="block">
            Donation Requests
          </Link>

          {user && (
            <Link to="/dashboard/funding" className="block">
              Funding
            </Link>
          )}

          {!user ? (
            <Link
              to="/login"
              className="block bg-red-600 text-white text-center py-2 rounded"
            >
              Login
            </Link>
          ) : (
            <>
              <Link to="/dashboard" className="block">
                Dashboard
              </Link>
              <button
                onClick={logout}
                className="w-full bg-gray-100 py-2 rounded"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
