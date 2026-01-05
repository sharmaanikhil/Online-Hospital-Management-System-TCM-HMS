import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import api from "../config/api";

const ConsultDoctor = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs().format("YYYY-MM-DD"));
  const [selectedTime, setSelectedTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookedAppointments, setBookedAppointments] = useState({});

  const timeSlots = [
    "09:00 AM","09:30 AM","10:00 AM","10:30 AM",
    "11:00 AM","11:30 AM","12:00 PM","12:30 PM",
    "03:00 PM","03:30 PM","04:00 PM","04:30 PM",
    "05:00 PM","05:30 PM",
  ];

  const weekDates = Array.from({ length: 7 }, (_, i) =>
    dayjs().add(i, "day").format("YYYY-MM-DD")
  );

  const isBooked = (date, time) =>
    bookedAppointments[date]?.includes(time);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await api.get(`/api/v1/doctor-details/${id}`);
        setDoctor(data.user);

        const booked = {};
        data.appointments.forEach((a) => {
          if (!booked[a.date]) booked[a.date] = [];
          booked[a.date].push(a.time);
        });
        setBookedAppointments(booked);
      } catch {
        toast.error("Failed to load doctor details");
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  const confirmBooking = async () => {
    try {
      setBookingLoading(true);
      const { data } = await api.post("/api/v1/book-appointment", {
        doctorId: id,
        date: selectedDate,
        time: selectedTime,
      });
      toast.success(data.message);
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!doctor) return <div className="text-center mt-20 text-red-500">Doctor not found</div>;

  return (
    <div className="px-4 md:px-16 py-10">
      {/* UI remains unchanged */}
    </div>
  );
};

export default ConsultDoctor;
