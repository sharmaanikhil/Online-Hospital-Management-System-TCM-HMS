import React, { useState, useEffect } from "react";
import { FaRobot } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { API_BASE_URL } from "../../../config/api";

const AiChatboat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I’m your health assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const fetchKey = async () => {
      try {
        const res = await axios.get(
          `${API_BASE_URL}/api/v1/get-openRouter-key`,
          { withCredentials: true }
        );
        setApiKey(res.data.key);
      } catch (err) {
        console.error("Failed to load AI key");
      }
    };
    fetchKey();
  }, []);

  const handleSend = async () => {
    if (!input.trim() || !apiKey) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          model: "openai/gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a safe health assistant." },
            ...messages.map((m) => ({
              role: m.sender === "user" ? "user" : "assistant",
              content: m.text,
            })),
            { role: "user", content: input },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: res.data.choices[0].message.content },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "AI error. Try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-semibold text-blue-700 flex gap-2">
        <FaRobot /> AI Health Chatbot
      </h2>

      <div className="h-96 overflow-y-auto border p-4 mt-4 bg-gray-50 rounded">
        {messages.map((m, i) => (
          <div key={i} className={`mb-3 ${m.sender === "user" ? "text-right" : ""}`}>
            <span className={`inline-block px-4 py-2 rounded ${
              m.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}>
              {m.text}
            </span>
          </div>
        ))}
        {loading && <p className="text-sm text-gray-500">Typing...</p>}
      </div>

      <div className="flex mt-3 gap-2">
        <input
          className="flex-1 border rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Ask a health question..."
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 rounded">
          <IoSend />
        </button>
      </div>
    </div>
  );
};

export default AiChatboat;
