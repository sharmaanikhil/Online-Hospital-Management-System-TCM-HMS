import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import api from "../../../config/api";

const ResetPassword = () => {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await api.put("/api/v1/reset-password", form);
      toast.success("Password updated");
      setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      toast.error(err.response?.data?.error || "Error");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded shadow">
      <h2 className="text-xl font-bold mb-6 flex gap-2">
        <FaLock /> Reset Password
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {["currentPassword", "newPassword", "confirmPassword"].map((f) => (
          <input
            key={f}
            type="password"
            name={f}
            placeholder={f.replace(/([A-Z])/g, " $1")}
            value={form[f]}
            onChange={(e) => setForm({ ...form, [f]: e.target.value })}
            className="w-full border px-4 py-2 rounded"
          />
        ))}

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
