import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../../config/api";

const AllAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    api.get("/api/v1/doctor-appointments")
      .then((res) => setAppointments(res.data.appointments || []))
      .catch(() => toast.error("Failed to load appointments"));
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
