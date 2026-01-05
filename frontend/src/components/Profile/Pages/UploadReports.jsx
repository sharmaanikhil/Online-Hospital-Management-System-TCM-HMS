import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaImage } from "react-icons/fa";
import api from "../../../config/api";
import { useAuth } from "../../../store/AuthContext";

const UploadReports = () => {
  const [file, setFile] = useState(null);
  const { user, uploadReportContext } = useAuth();

  const handleUpload = async () => {
    if (!file) return toast.error("Select a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await api.post("/api/v1/upload-report", formData);
      uploadReportContext(res.data.patientReport);
      toast.success("Uploaded successfully");
    } catch {
      toast.error("Upload failed");
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="font-bold mb-4">Upload Report</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button
        onClick={handleUpload}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded"
      >
        Upload
      </button>

      {user?.patientReport && (
        <div className="mt-4">
          <FaImage className="text-2xl" />
          <img src={user.patientReport} className="max-w-xs mt-2" />
        </div>
      )}
    </div>
  );
};

export default UploadReports;
