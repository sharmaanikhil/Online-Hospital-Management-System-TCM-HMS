import React, { useState } from "react";
import { FaUpload, FaImage } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../../store/AuthContext";
import { API_BASE_URL } from "../../../config/api";

const UploadReports = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const { user, uploadReportContext } = useAuth();

  const handleUpload = async () => {
    if (!file) return toast.error("Select image first");

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      const res = await axios.post(
        `${API_BASE_URL}/api/v1/upload-report`,
        formData,
        { withCredentials: true }
      );
      uploadReportContext(res.data.patientReport);
      toast.success("Uploaded!");
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold text-blue-700">Upload Report</h2>

      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={uploading}
        className="mt-3 bg-blue-600 text-white px-4 py-2 rounded">
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {user?.patientReport && (
        <div className="mt-6">
          <FaImage className="text-3xl mb-2" />
          <img src={user.patientReport} className="max-w-xs" />
        </div>
      )}
    </div>
  );
};

export default UploadReports;
