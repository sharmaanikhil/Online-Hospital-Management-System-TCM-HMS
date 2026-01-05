import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/login`,
        { email, password },
        { withCredentials: true }
      );

      const userData = res.data.user;
      setUser(userData);
      setRole(userData.role);
      setIsLoggedIn(true);
    } catch (err) {
      console.error(
        "Login failed",
        err.response?.data?.message || err.message
      );
      throw err;
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      await axios.get(`${API_BASE_URL}/api/v1/logout`, {
        withCredentials: true,
      });
    } catch (err) {
      console.error("Logout failed", err.message);
    } finally {
      setUser(null);
      setRole("user");
      setIsLoggedIn(false);
    }
  };

  // FETCH CURRENT USER (SESSION PERSISTENCE)
  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/api/v1/user-details`, {
        withCredentials: true,
      });

      const userData = res.data.user;
      setUser(userData);
      setRole(userData.role);
      setIsLoggedIn(true);
    } catch (err) {
      // not logged in or session expired
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // HELPERS
  const changeRole = (value) => {
    setRole(value);
  };

  const changeUser = (value) => {
    setUser(value);
  };

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
