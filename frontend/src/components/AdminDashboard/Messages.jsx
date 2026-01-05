import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Messages = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/api/v1/fetch-messages`, { withCredentials: true })
      .then((res) => setMessages(res.data.data))
      .catch(() => toast.error("Failed to fetch messages"));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      {messages.map((m) => (
        <div key={m._id} className="bg-white p-4 rounded shadow mb-3">
          <p><b>{m.name}</b> ({m.email})</p>
          <p>{m.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
