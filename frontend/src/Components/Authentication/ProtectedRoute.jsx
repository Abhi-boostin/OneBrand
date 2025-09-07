import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

const ProtectedRoute = ({ children }) => {
  const [status, setStatus] = useState("checking"); // checking | authed | denied

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setStatus("denied");
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!cancelled) setStatus(res.ok ? "authed" : "denied");
      } catch {
        if (!cancelled) setStatus("denied");
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  if (status === "checking") return null;
  if (status === "denied") return <Navigate to="/loginSignUp" replace />;
  return children;
};

export default ProtectedRoute; 