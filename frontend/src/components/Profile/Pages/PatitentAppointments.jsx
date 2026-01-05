import React, { useEffect, useState } from "react";
import { FaUserMd, FaClock, FaCalendarAlt } from "react-icons/fa";
import api from "../../../config/api";

const PatitentAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/api/v1/my-appointments")
      .then((res) => setAppointments(res.data.appointments || []))
      .catch(() => setAppointments([]))
      .finally(() => setLoading(false));
  }, []);

  const joinCall = (roomId) => {
    window.open(`https://meet.jit.si/${roomId}`, "_blank");
  };

  if (loading) {
    return <p className="text-center mt-10">Loading appointments...</p>;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">
        My Appointments
      </h2>

      {appointments.length === 0 ? (
        <p className="text-center text-gray-500">No appointments yet</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {appointments.map((a) => (
            <div key={a._id} className="bg-blue-50 p-5 rounded-xl">
              <h3 className="text-xl font-semibold flex gap-2">
                <FaUserMd /> {a.doctor?.name}
              </h3>

              <p className="text-sm">
                {a.doctor?.doctorInfo?.specialization}
              </p>

              <div className="flex gap-4 mt-3">
                <span><FaCalendarAlt /> {a.date}</span>
                <span><FaClock /> {a.time}</span>
                <span>{a.status}</span>
              </div>

              <button
                disabled={a.status !== "Confirmed"}
                onClick={() => joinCall(a.roomId)}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Join Call
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatitentAppointments;
