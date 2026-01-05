import React from "react";
import { useAuth } from "../../../store/AuthContext";

const MyProfile = () => {
  const { role, user } = useAuth();

  if (!user) return null;

  const doctorInfo = role === "doctor" ? user.doctorInfo || {} : {};

  return (
    <div className="bg-white p-6 rounded-lg shadow-md border border-blue-100">
      <h2 className="text-3xl font-semibold text-blue-700 mb-10">
        Welcome, {user.name}
      </h2>

      {role === "doctor" && doctorInfo.profilePhoto && (
        <div className="flex justify-center mb-10">
          <img
            src={doctorInfo.profilePhoto}
            alt={user.name}
            className="w-32 h-32 rounded-full border-4 border-blue-300 object-cover"
          />
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Input label="Name" value={user.name} />
        <Input label="Email" value={user.email} />
        <Input label="Gender" value={user.gender} />
        <Input label="Contact Number" value={user.contact} />

        {role === "doctor" && (
          <>
            <Input label="Specialization" value={doctorInfo.specialization} />
            <Input label="Degree" value={doctorInfo.degree} />
            <Input label="Address" value={doctorInfo.address} />
            <Textarea label="Description" value={doctorInfo.description} />
          </>
        )}
      </div>
    </div>
  );
};

const Input = ({ label, value }) => (
  <div>
    <label className="block font-medium mb-1">{label}</label>
    <input
      readOnly
      value={value || ""}
      className="w-full bg-gray-100 border rounded px-4 py-2"
    />
  </div>
);

const Textarea = ({ label, value }) => (
  <div className="md:col-span-2">
    <label className="block font-medium mb-1">{label}</label>
    <textarea
      readOnly
      rows={4}
      value={value || ""}
      className="w-full bg-gray-100 border rounded px-4 py-2"
    />
  </div>
);

export default MyProfile;
