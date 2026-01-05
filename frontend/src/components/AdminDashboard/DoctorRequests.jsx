import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const DoctorRequests = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/fetch-doctors-requests`,
        { withCredentials: true }
      );
      setRequests(data.data);
    } catch {
      toast.error("Failed to fetch requests");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `${BASE_URL}/api/v1/update-doctor-request/${id}`,
        { status },
        { withCredentials: true }
      );
      toast.success("Status updated");
      fetchRequests();
    } catch {
      toast.error("Update failed");
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Doctor Requests</h1>

      {requests.map((req) => (
        <div key={req._id} className="bg-white p-4 rounded shadow mb-4">
          <p><b>{req.name}</b> — {req.specialization}</p>
          <select
            value={req.status}
            onChange={(e) => updateStatus(req._id, e.target.value)}
          >
            <option>Pending</option>
            <option>Approved</option>
            <option>Rejected</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default DoctorRequests;
