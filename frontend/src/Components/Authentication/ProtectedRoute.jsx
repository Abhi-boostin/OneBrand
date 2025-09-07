import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <div style={{ padding: 20 }}>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/loginSignUp" replace />;
  }

  return children;
};

export default ProtectedRoute; 