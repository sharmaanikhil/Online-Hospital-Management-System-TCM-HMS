import React, { useEffect, useState } from "react";
import { FaUserInjured, FaUserMd, FaUserShield } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [counts, setCounts] = useState({
    patients: 0,
    doctors: 0,
    admins: 0,
  });

  const fetchCounts = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/dashboard-details`,
        { withCredentials: true }
      );
      setCounts(data.data);
    } catch {
      toast.error("Failed to fetch dashboard data");
    }
  };

  useEffect(() => {
    fetchCounts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-blue-700">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Total Patients", value: counts.patients, icon: <FaUserInjured /> },
          { label: "Total Doctors", value: counts.doctors, icon: <FaUserMd /> },
          { label: "Total Admins", value: counts.admins, icon: <FaUserShield /> },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow">
            <div className="text-3xl mb-2">{item.icon}</div>
            <p className="text-gray-600">{item.label}</p>
            <p className="text-3xl font-bold">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
