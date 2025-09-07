import React, { useState } from "react";

import "./ResetPass.css";
import { Link } from "react-router-dom";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

const ResetPass = () => {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState("request"); // request -> verify
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const requestOtp = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message || "Failed to send OTP");
    setStep("verify");
    alert("OTP sent to your email");
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, otp, newPassword })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message || "Failed to reset password");
    alert("Password reset successful. You can login now.");
  };

  return (
    <>
      <div className="resetPasswordSection">
        <h2>Reset Your Password</h2>
        <div className="resetPasswordContainer">
          {step === "request" && (
            <>
              <p>We will send you an email to reset your password</p>
              <form onSubmit={requestOtp}>
                <input type="email" placeholder="Email address *" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <button type="submit">Submit</button>
              </form>
            </>
          )}
          {step === "verify" && (
            <form onSubmit={resetPassword}>
              <input type="text" placeholder="Enter OTP *" value={otp} onChange={(e) => setOtp(e.target.value)} required />
              <input type="password" placeholder="New Password *" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
              <button type="submit">Reset Password</button>
            </form>
          )}
        </div>
        <p>
          Back to {" "}
          <Link to="/loginSignUp">
            <span>Login</span>
          </Link>
        </p>
      </div>
    </>
  );
};

export default ResetPass;
