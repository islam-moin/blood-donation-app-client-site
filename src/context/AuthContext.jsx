/* eslint-disable */
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from "axios";

// =========================
// Context Create
// =========================
export const AuthContext = createContext(null);

const auth = getAuth(app);

// =========================
// Provider
// =========================
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      // firebase user
  const [dbUser, setDbUser] = useState(null);  // mongodb user
  const [loading, setLoading] = useState(true);

  // =========================
  // LOAD USER FROM DB
  // =========================
  const fetchDbUser = async (email) => {
    try {
      const res = await axios.get(
        `http://localhost:5000/users/${email}`
      );

      // 🛑 BLOCKED USER SAFETY
      if (res.data?.status === "blocked") {
        await signOut(auth);
        setUser(null);
        setDbUser(null);
      } else {
        setDbUser(res.data);
      }
    } catch (error) {
      setDbUser(null);
    }
  };

  // =========================
  // AUTH STATE LISTENER
  // =========================
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        await fetchDbUser(currentUser.email);
      } else {
        setDbUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // =========================
  // LOGOUT
  // =========================
  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setDbUser(null);
  };

  // =========================
  // 🔄 REFETCH USER (Profile update use)
  // =========================
  const refetchUser = async () => {
    if (user?.email) {
      await fetchDbUser(user.email);
    }
  };

  // =========================
  // CONTEXT VALUE
  // =========================
  const authInfo = {
    user,        // firebase auth user
    dbUser,      // mongodb user (role, status)
    loading,
    logout,
    refetchUser, // ✅ NEW (profile page needs this)
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}

// =========================
// Custom Hook
// =========================
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
