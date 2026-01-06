import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, dbUser, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  // ❌ not logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ❌ blocked user
  if (dbUser?.status === "blocked") {
    return (
      <div className="text-center mt-20 text-red-600 font-semibold">
        Your account is blocked. Contact admin.
      </div>
    );
  }

  // ✅ allowed
  return children;
}
