import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../../config/api";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, message } = formData;

    if (!name || !email || !message) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/send-message`,
        { name, email, message }
      );

      toast.success(res.data.message);
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error(error.response?.data?.error || "Internal Server Error");
    }
  };

  return (
    <div className="flex flex-col md:flex-row my-12 mx-4 md:mx-8 lg:mx-20 gap-12">
      <div className="w-full md:w-1/2">
        <img src="/contact.jpg" alt="Contact" className="rounded-xl" />
      </div>

      <div className="w-full md:w-1/2 bg-white shadow-xl rounded-xl p-8 border">
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Get in Touch with Us
        </h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />

          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />

          <textarea
            name="message"
            rows="4"
            placeholder="Your message..."
            value={formData.message}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
