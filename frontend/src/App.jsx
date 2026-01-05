import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Home from "./pages/Home.jsx";
import AllDoctors from "./pages/AllDoctors.jsx";
import GetStarted from "./pages/GetStarted.jsx";
import Profile from "./pages/Profile.jsx";
import Footer from "./components/Footer/Footer.jsx";
import ConsultDoctor from "./pages/ConsultDoctor.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import MyProfile from "./components/Profile/Pages/MyProfile.jsx";
import PatitentAppointments from "./components/Profile/Pages/PatitentAppointments.jsx";
import UploadReports from "./components/Profile/Pages/UploadReports.jsx";
import ResetPassword from "./components/Profile/Pages/ResetPassword.jsx";
import AiChatboat from "./components/Profile/Pages/AiChatboat.jsx";
import AllAppointments from "./components/Profile/Pages/AllAppointments.jsx";

import BecomeDoctor from "./pages/BecomeDoctor.jsx";
import ProtectedRoute from "./components/Protected Route/ProtectedRoute.jsx";
import PageNotFound from "./pages/PageNotFound.jsx";
import { useAuth } from "./store/AuthContext.jsx";

import AdminLogin from "./pages/AdminLogin.jsx";
import AdminDashboard from "./pages/AdminDashboard.jsx";
import Dashboard from "./components/AdminDashboard/Dashboard.jsx";
import Messages from "./components/AdminDashboard/Messages.jsx";
import DoctorRequests from "./components/AdminDashboard/DoctorRequests.jsx";

const App = () => {
  const { role } = useAuth();

  return (
    <div>
      {role !== "admin" && <Navbar />}

      <ToastContainer position="top-center" autoClose={3000} />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/all-doctors" element={<AllDoctors />} />
        <Route path="/get-started" element={<GetStarted />} />

        {/* PROFILE (ANY LOGGED-IN USER) */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route index element={<MyProfile />} />
          <Route path="my-appointments" element={<PatitentAppointments />} />
          <Route path="all-appointments" element={<AllAppointments />} />
          <Route path="upload-report" element={<UploadReports />} />
          <Route path="ai-chat" element={<AiChatboat />} />
          <Route path="reset-password" element={<ResetPassword />} />
        </Route>

        {/* PATIENT ONLY */}
        <Route
          path="/consult-doctor/:id"
          element={
            <ProtectedRoute allowedRole="patient">
              <ConsultDoctor />
            </ProtectedRoute>
          }
        />

        <Route
          path="/become-doctor"
          element={
            <ProtectedRoute allowedRole="patient">
              <BecomeDoctor />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTES */}
        <Route path="/admin-login" element={<AdminLogin />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="messages" element={<Messages />} />
          <Route path="doctor-requests" element={<DoctorRequests />} />
          <Route path="change-password" element={<ResetPassword />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {role !== "admin" && <Footer />}
    </div>
  );
};

export default App;
