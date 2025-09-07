import React, { useState } from "react";
import "./LoginSignUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart } from "../../../Features/Cart/cartSlice";
import { useAuth } from "../AuthContext";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000";

const LoginSignUp = () => {
  const [activeTab, setActiveTab] = useState("tabButton1");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [otp, setOtp] = useState("");
  const [registerStep, setRegisterStep] = useState("enter"); // enter -> verify

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = useAuth();

  const handleTab = (tab) => {
    setActiveTab(tab);
  };

  const hydrateCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok && Array.isArray(data.items)) {
        dispatch(
          setCart(
            data.items.map((i) => ({
              productID: i.productId,
              productName: i.name,
              productPrice: i.price,
              frontImg: i.image,
              quantity: i.quantity,
            }))
          )
        );
      }
    } catch {}
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: loginEmail, password: loginPassword })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message || "Login failed");
    localStorage.setItem("token", data.token);
    login(data.token, data.user); // Use auth context
    await hydrateCart();
    alert("Logged in successfully");
    navigate("/");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: registerEmail, password: registerPassword })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message || "Registration failed");
    setRegisterStep("verify");
    alert("OTP sent to email. Please verify.");
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE}/api/auth/verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: registerEmail, otp })
    });
    const data = await res.json();
    if (!res.ok) return alert(data.message || "OTP verification failed");
    localStorage.setItem("token", data.token);
    login(data.token, data.user); // Use auth context
    await hydrateCart();
    alert("Account verified and logged in");
    navigate("/");
  };

  return (
    <>
      <div className="loginSignUpSection">
        <div className="loginSignUpContainer">
          <div className="loginSignUpTabs">
            <p onClick={() => handleTab("tabButton1")} className={activeTab === "tabButton1" ? "active" : ""}>
              Login
            </p>
            <p onClick={() => handleTab("tabButton2")} className={activeTab === "tabButton2" ? "active" : ""}>
              Register
            </p>
          </div>
          <div className="loginSignUpTabsContent">
            {/* tab1 */}

            {activeTab === "tabButton1" && (
              <div className="loginSignUpTabsContentLogin">
                <form onSubmit={handleLogin}>
                  <input type="email" placeholder="Email address *" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                  <input type="password" placeholder="Password *" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                  <div className="loginSignUpForgetPass">
                    <label>
                      <input type="checkbox" className="brandRadio" />
                      <p>Remember me</p>
                    </label>
                    <p>
                      <Link to="/resetPassword">Lost password?</Link>
                    </p>
                  </div>
                  <button>Log In</button>
                </form>
                <div className="loginSignUpTabsContentLoginText">
                  <p>
                    No account yet? <span onClick={() => handleTab("tabButton2")}>Create Account</span>
                  </p>
                </div>
              </div>
            )}

            {/* Tab2 */}

            {activeTab === "tabButton2" && (
              <div className="loginSignUpTabsContentRegister">
                {registerStep === "enter" && (
                  <form onSubmit={handleRegister}>
                    <input type="text" placeholder="Username *" value={registerUsername} onChange={(e) => setRegisterUsername(e.target.value)} required />
                    <input type="email" placeholder="Email address *" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                    <input type="password" placeholder="Password *" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} required />
                    <p>
                      Your personal data will be used to support your experience throughout this website, to manage access to your account, and for other purposes described in our
                      <Link to="/terms" style={{ textDecoration: "none", color: "#c32929" }}> privacy policy</Link>.
                    </p>
                    <button>Register</button>
                  </form>
                )}
                {registerStep === "verify" && (
                  <form onSubmit={handleVerifyOtp}>
                    <input type="text" placeholder="Enter OTP *" value={otp} onChange={(e) => setOtp(e.target.value)} required />
                    <button>Verify OTP</button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginSignUp;
