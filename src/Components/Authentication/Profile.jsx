import React, { useEffect, useState } from "react";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/api/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) setUser(data.user);
      } catch (e) {}
      setLoading(false);
    }
    load();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/loginSignUp";
  };

  if (loading) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h2>My Profile</h2>
      {user ? (
        <>
          <p>Email: {user.email}</p>
          <p>Verified: {user.verified ? "Yes" : "No"}</p>
          <button onClick={logout}>Log out</button>
        </>
      ) : (
        <p>Could not load profile.</p>
      )}
    </div>
  );
};

export default Profile; 