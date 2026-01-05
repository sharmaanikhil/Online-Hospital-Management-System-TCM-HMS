import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";
import { toast } from "react-toastify";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/api/v1/doctor-appointments`, { withCredentials: true })
      .then((res) => setAppointments(res.data.appointments || []))
      .catch(() => toast.error("Failed to load"));
  }, []);

  return (
    <div className="p-6 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Appointments</h2>

      {appointments.map((a) => (
        <div key={a._id} className="border p-3 mb-3 rounded">
          <p><b>Patient:</b> {a.patient?.name}</p>
          <p><b>Date:</b> {a.date} {a.time}</p>
          <p><b>Status:</b> {a.status}</p>
        </div>
      ))}
    </div>
  );
};

export default AllAppointments;
