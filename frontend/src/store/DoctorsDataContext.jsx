import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../config/api";

const DoctorsContext = createContext();

export const useDoctorsContext = () => useContext(DoctorsContext);

export const DoctorsDataContext = ({ children }) => {
  const [DoctorsDetails, setDoctorsDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctors = async () => {
    try {
      const { data } = await api.get("/api/v1/fetch-doctors");
      setDoctorsDetails(data.doctors || []);
    } catch (err) {
      console.error("Failed to fetch doctors", err);
      setDoctorsDetails([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <DoctorsContext.Provider
      value={{
        DoctorsDetails,
        loading,
        fetchDoctors,
      }}
    >
      {children}
    </DoctorsContext.Provider>
  );
};
