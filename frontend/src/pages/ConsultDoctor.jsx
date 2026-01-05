import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import axios from "axios";

const ConsultDoctor = () => {
  const BASE_URL = import.meta.env.VITE_BACKEND_URL;

  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );
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

  const handleBookingClick = () => {
    if (!selectedTime) {
      toast.error("Please select a time slot.");
      return;
    }
    if (isBooked(selectedDate, selectedTime)) {
      toast.error("This slot is already booked.");
      return;
    }
    setShowModal(true);
  };

  const confirmBooking = async () => {
    try {
      setBookingLoading(true);
      const { data } = await axios.post(
        `${BASE_URL}/api/v1/book-appointment`,
        {
          doctorId: id,
          date: selectedDate,
          time: selectedTime,
        },
        { withCredentials: true }
      );
      toast.success(data.message || "Appointment booked successfully!");
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const { data } = await axios.get(
          `${BASE_URL}/api/v1/doctor-details/${id}`,
          { withCredentials: true }
        );

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

  if (loading) {
    return <div className="text-center mt-20">Loading...</div>;
  }

  if (!doctor) {
    return <div className="text-center mt-20 text-red-500">Doctor not found</div>;
  }

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg text-center">
            <p className="mb-4">
              Confirm appointment on{" "}
              <strong>{dayjs(selectedDate).format("DD MMM YYYY")}</strong> at{" "}
              <strong>{selectedTime}</strong>
            </p>
            <div className="flex justify-between gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmBooking}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                {bookingLoading ? "Booking..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="px-4 md:px-16 py-10">
        <div className="flex flex-col md:flex-row gap-10">
          <div className="md:w-1/3 bg-white p-6 rounded shadow text-center">
            <img
              src={doctor.doctorInfo.profilePhoto}
              className="w-32 h-32 mx-auto rounded-full"
            />
            <h3 className="mt-4 text-xl font-semibold">{doctor.name}</h3>
            <p>{doctor.doctorInfo.specialization}</p>
            <p className="text-sm text-gray-500">
              {doctor.doctorInfo.address}
            </p>
          </div>

          <div className="md:w-2/3 bg-white p-6 rounded shadow">
            <h4 className="text-lg font-semibold mb-2">About</h4>
            <p>{doctor.doctorInfo.description}</p>
          </div>
        </div>

        <div className="mt-10">
          <h4 className="font-semibold mb-3">Select Date</h4>
          <div className="flex gap-3 flex-wrap">
            {weekDates.map((d) => (
              <button
                key={d}
                onClick={() => {
                  setSelectedDate(d);
                  setSelectedTime(null);
                }}
                className={`px-4 py-2 rounded-full border ${
                  selectedDate === d
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                {dayjs(d).format("DD MMM")}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6">
          <h4 className="font-semibold mb-3">Select Time</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {timeSlots.map((t) => (
              <button
                key={t}
                disabled={isBooked(selectedDate, t)}
                onClick={() => setSelectedTime(t)}
                className={`px-3 py-2 border rounded ${
                  isBooked(selectedDate, t)
                    ? "bg-red-100 text-red-500"
                    : selectedTime === t
                    ? "bg-blue-600 text-white"
                    : "bg-white"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <button
            onClick={handleBookingClick}
            className="px-6 py-3 bg-blue-700 text-white rounded-full"
          >
            Book Appointment
          </button>
        </div>
      </div>
    </>
  );
};

export default ConsultDoctor;
