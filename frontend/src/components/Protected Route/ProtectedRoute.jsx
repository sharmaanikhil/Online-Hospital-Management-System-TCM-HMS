import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

const ProtectedRoute = ({ allowedRole, children }) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return <div>Authenticating...</div>;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/get-started" replace />;
  }

  // Role-based protection ONLY if allowedRole is provided
  if (allowedRole && role !== allowedRole) {
    return <Navigate to="/404" replace />;
  }

  return children;
};

export default ProtectedRoute;
