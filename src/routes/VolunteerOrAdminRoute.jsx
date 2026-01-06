import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function VolunteerOrAdminRoute({ children }) {
  const { dbUser, loading } = useAuth();

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  // ❌ donor blocked
  if (
    dbUser?.role !== "admin" &&
    dbUser?.role !== "volunteer"
  ) {
    return <Navigate to="/dashboard" replace />;
  }

  // ✅ admin + volunteer allowed
  return children;
}
