import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-toastify";
import { useDoctorsContext } from "../store/DoctorsDataContext";

const specialties = [
  "All",
  "Cardiologist",
  "Dermatologist",
  "Gynecologist",
  "Neurologist",
  "Pediatrician",
];

const AllDoctors = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("All");
  const { DoctorsDetails, fetchDoctors } = useDoctorsContext();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchDoctors();
  }, [fetchDoctors]);

  const filteredDoctors =
    selectedSpecialty === "All"
      ? DoctorsDetails
      : DoctorsDetails.filter(
          (d) => d.doctorInfo.specialization === selectedSpecialty
        );

  const handleBookNow = (id) => {
    if (!user) {
      toast.error("Please login first");
      return;
    }
    navigate(`/consult-doctor/${id}`);
  };

  return (
    <div className="flex px-4 md:px-16 my-12 gap-8">
      <div className="md:w-1/4">
        <h3 className="font-semibold mb-4">Specialties</h3>
        {specialties.map((s) => (
          <button
            key={s}
            onClick={() => setSelectedSpecialty(s)}
            className={`block mb-2 px-4 py-2 rounded ${
              s === selectedSpecialty
                ? "bg-blue-600 text-white"
                : "bg-white border"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="md:w-3/4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((d) => (
          <div key={d._id} className="bg-white p-6 rounded shadow text-center">
            <img
              src={d.doctorInfo.profilePhoto}
              alt={d.name}
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h4 className="font-semibold">{d.name}</h4>
            <p>{d.doctorInfo.specialization}</p>
            <button
              onClick={() => handleBookNow(d._id)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllDoctors;
