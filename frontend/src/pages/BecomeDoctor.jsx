import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../store/AuthContext";
import api from "../config/api";

const BecomeDoctor = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    specialization: "",
    degree: "",
    address: "",
    description: "",
    profilePhoto: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));

    try {
      await api.post("/api/v1/doctor-request", fd);
      toast.success("Doctor request submitted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-xl"
      >
        <h2 className="text-2xl font-bold mb-6">Become a Doctor</h2>

        <input value={user.name} disabled className="input" />
        <input value={user.email} disabled className="input" />

        <input type="file" name="profilePhoto" onChange={handleChange} />
        <input name="specialization" onChange={handleChange} placeholder="Specialization" />
        <input name="degree" onChange={handleChange} placeholder="Degree" />
        <input name="address" onChange={handleChange} placeholder="Address" />
        <textarea name="description" onChange={handleChange} placeholder="Description" />

        <button className="btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default BecomeDoctor;
