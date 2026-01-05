import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "../../config/api";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api
      .get("/api/v1/fetch-messages")
      .then((res) => setMessages(res.data.data))
      .catch(() => toast.error("Failed to fetch messages"));
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Messages</h1>

      {messages.map((m) => (
        <div key={m._id} className="bg-white p-4 rounded shadow mb-3">
          <p>
            <b>{m.name}</b> ({m.email})
          </p>
          <p>{m.message}</p>
        </div>
      ))}
    </div>
  );
};

export default Messages;
