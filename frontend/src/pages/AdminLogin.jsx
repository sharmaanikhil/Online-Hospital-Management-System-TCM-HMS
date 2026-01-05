import React, { useState } from "react";
import { FaUserShield, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useAuth } from "../store/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { changeRole, changeUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await api.post("/api/v1/admin-login", formData);
      changeUser(data.user);
      changeRole("admin");
      toast.success("Admin logged in");
      navigate("/admin-dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-96 space-y-6">
        <h2 className="text-2xl font-bold text-center">Admin Login</h2>

        <div className="flex gap-2 border p-2 rounded">
          <FaUserShield />
          <input
            name="email"
            placeholder="Admin Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full outline-none"
          />
        </div>

        <div className="flex gap-2 border p-2 rounded">
          <FaLock />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="w-full outline-none"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
