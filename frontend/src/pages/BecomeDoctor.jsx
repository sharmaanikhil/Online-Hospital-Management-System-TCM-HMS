import React, { useState } from "react";
import axios from "axios";
import {
  FaUserMd,
  FaEnvelope,
  FaFileUpload,
  FaUserGraduate,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-toastify";

const BecomeDoctor = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
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
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    Object.entries(formData).forEach(([k, v]) => fd.append(k, v));

    try {
      await axios.post(`${BASE_URL}/api/v1/doctor-request`, fd, {
        withCredentials: true,
      });
      toast.success("Request submitted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed");
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
        <input name="degree" onChange={handleChange} placeholder="Degree" />
        <input name="address" onChange={handleChange} placeholder="Address" />
        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Description"
        />

        <button className="btn" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default BecomeDoctor;
