import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // LOGIN
  const login = async (email, password) => {
    const { data } = await api.post("/api/v1/login", {
      email,
      password,
    });

    setUser(data.user);
    setRole(data.user.role);
    setIsLoggedIn(true);
  };

  // LOGOUT
  const logout = async () => {
    try {
      await api.get("/api/v1/logout");
    } finally {
      setUser(null);
      setRole("user");
      setIsLoggedIn(false);
    }
  };

  // SESSION RESTORE
  const fetchCurrentUser = async () => {
    try {
      const { data } = await api.get("/api/v1/user-details");
      setUser(data.user);
      setRole(data.user.role);
      setIsLoggedIn(true);
    } catch {
      setUser(null);
      setRole("user");
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // HELPERS
  const changeRole = (value) => setRole(value);
  const changeUser = (value) => setUser(value);

  const uploadReportContext = (reportUrl) => {
    setUser((prev) => ({
      ...prev,
      patientReport: reportUrl,
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isLoggedIn,
        loading,
        login,
        logout,
        fetchCurrentUser,
        changeRole,
        changeUser,
        uploadReportContext,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
