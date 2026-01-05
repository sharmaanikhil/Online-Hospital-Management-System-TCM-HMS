import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

const Section1 = () => {
  const navigate = useNavigate();
  const { role } = useAuth();

  const goToDoctors = () => {
    if (role !== "doctor") {
      navigate("/all-doctors");
    }
  };

  return (
    <div className="mx-4 md:mx-8 lg:mx-20 bg-blue-600 rounded-xl my-8 text-white flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center gap-6">
        <h5 className="bg-white text-black w-fit px-4 py-2 rounded-full font-semibold">
          #1 Best Medical Center
        </h5>

        <h2 className="text-3xl md:text-5xl font-bold">
          Bringing Quality Healthcare Services to you
        </h2>

        <p>
          Delivering comprehensive health support through video call and AI
          assistance.
        </p>

        {role !== "doctor" && (
          <div className="flex gap-4">
            <button
              onClick={goToDoctors}
              className="px-6 py-3 border border-white rounded-full"
            >
              Get Started
            </button>
            <button
              onClick={goToDoctors}
              className="px-6 py-3 bg-white text-blue-600 rounded-full"
            >
              Book Appointment
            </button>
          </div>
        )}
      </div>

      <div className="w-full md:w-1/2">
        <img
          src="/section1.png"
          alt="Doctor"
          className="w-full h-full object-cover rounded-b-xl md:rounded-r-xl"
        />
      </div>
    </div>
  );
};

export default Section1;
