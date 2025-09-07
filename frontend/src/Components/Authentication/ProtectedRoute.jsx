import React from "react";
import { Navigate } from "react-router-dom";

const isAuthenticated = () => {
  try {
    const token = localStorage.getItem("token");
    return Boolean(token);
  } catch (e) {
    return false;
  }
};

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/loginSignUp" replace />;
  }
  return children;
};

export default ProtectedRoute; 