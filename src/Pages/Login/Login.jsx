// Login.jsx
import React, { useState, useEffect } from "react";
import "./login.css";
import {
  FaShippingFast,
  FaBox,
  FaMapMarkerAlt,
  FaFileInvoice,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaFacebookF,
  FaCheckCircle,
} from "react-icons/fa";

const Login = () => {
  // State for login form
  const [email, setEmail] = useState("demo@quickship.com");
  const [password, setPassword] = useState("password123");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // State for password toggle
  const [showPassword, setShowPassword] = useState(false);

  // State for forgot password modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetError, setResetError] = useState("");

  // Email + password validation
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 6;

  // Handle login form submit
  const handleLogin = (e) => {
    e.preventDefault();
    let newErrors = {};

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      simulateLogin();
    }
  };

  // Simulate login process
  const simulateLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => {
        alert("Login successful! Redirecting to dashboard...");
        // window.location.href = "dashboard.html";
      }, 2000);
    }, 1500);
  };

  // Forgot password submission
  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!validateEmail(resetEmail)) {
      setResetError("Please enter a valid email address");
      return;
    }
    setResetError("");
    alert(`Instructions to reset your password have been sent to ${resetEmail}`);
    setIsModalOpen(false);
    setResetEmail("");
  };

  // Keyboard shortcut (Ctrl + Enter)
  useEffect(() => {
    const handleShortcut = (e) => {
      if (e.ctrlKey && e.key === "Enter") {
        handleLogin(e);
      }
    };
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, [email, password]);

  return (
    <div className="first">
        <div className="login-container">
        {/* Left Panel - Branding */}
        <div className="branding-panel">
            <div className="branding-content">
            <div className="logo">
                <FaShippingFast style={{ color: "#ff6600", marginRight: "10px", fontSize: "2.5rem" }} />
                <h1>QuickShip</h1>
            </div>
            <h2>Welcome Back</h2>
            <p>
                Sign in to manage your shipments, track packages, and access your
                account dashboard.
            </p>
            <div className="features">
                <div className="feature">
                <FaBox style={{ marginRight: "10px" }} />
                <span>Manage Shipments</span>
                </div>
                <div className="feature">
                <FaMapMarkerAlt style={{ marginRight: "10px" }} />
                <span>Track Packages</span>
                </div>
                <div className="feature">
                <FaFileInvoice style={{ marginRight: "10px" }} />
                <span>View Invoices</span>
                </div>
            </div>
            </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="login-panel">
            <div className="login-content">
            <div className="login-header">
                <h2>Sign In to Your Account</h2>
                <p>Enter your credentials to access your account</p>
            </div>

            <form className="login-form" onSubmit={handleLogin}>
                {/* Email */}
                <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                    <FaEnvelope />
                    <input
                    type="email"
                    id="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{
                        borderColor: errors.email ? "#dc3545" : "#ddd",
                    }}
                    />
                </div>
                {errors.email && (
                    <span className="error-message">{errors.email}</span>
                )}
                </div>

                {/* Password */}
                <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                    <FaLock />
                    <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{
                        borderColor: errors.password ? "#dc3545" : "#ddd",
                    }}
                    />
                    <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                </div>
                {errors.password && (
                    <span className="error-message">{errors.password}</span>
                )}
                </div>

                {/* Options */}
                <div className="form-options">
                <label className="checkbox-container">
                    <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                    />
                    <span className="checkmark"></span>
                    Remember me
                </label>
                <button
                    type="button"
                    className="forgot-password"
                    onClick={() => setIsModalOpen(true)}
                >
                    Forgot password?
                </button>
                </div>

                {/* Submit */}
                <button type="submit" className="login-btn" disabled={loading}>
                {loading ? (
                    <div className="btn-loader">
                    <div className="loader"></div>
                    </div>
                ) : (
                    <span className="btn-text">Sign In</span>
                )}
                </button>
            </form>

            {/* Divider */}
            <div className="divider">
                <span>Or continue with</span>
            </div>

            {/* Social Buttons */}
            <div className="social-login">
                <button
                className="social-btn google-btn"
                onClick={() => alert("Google login demo")}
                >
                <FaGoogle /> Google
                </button>
                <button
                className="social-btn facebook-btn"
                onClick={() => alert("Facebook login demo")}
                >
                <FaFacebookF /> Facebook
                </button>
            </div>

            <div className="signup-link">
                <p>
                Don&apos;t have an account? <a href="#">Sign up</a>
                </p>
            </div>
            </div>

            <div className="login-footer">
            <p>&copy; 2023 QuickShip Logistics. All rights reserved.</p>
            <div className="footer-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
                <a href="#">Help Center</a>
            </div>
            </div>
        </div>

        {/* Forgot Password Modal */}
        {isModalOpen && (
            <div className="modal" onClick={() => setIsModalOpen(false)}>
            <div
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-header">
                <h3>Reset Your Password</h3>
                <span
                    className="close-modal"
                    onClick={() => setIsModalOpen(false)}
                >
                    &times;
                </span>
                </div>
                <div className="modal-body">
                <p>
                    Enter your email address and we&apos;ll send you instructions to
                    reset your password.
                </p>
                <form onSubmit={handleForgotPassword}>
                    <div className="form-group">
                    <label htmlFor="reset-email">Email Address</label>
                    <input
                        type="email"
                        id="reset-email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        style={{
                        borderColor: resetError ? "#dc3545" : "#ddd",
                        }}
                    />
                    {resetError && (
                        <span className="error-message">{resetError}</span>
                    )}
                    </div>
                    <button type="submit" className="submit-btn">
                    Send Reset Instructions
                    </button>
                </form>
                </div>
            </div>
            </div>
        )}

        {/* Success Message */}
        {showSuccess && (
            <div className="success-message">
            <FaCheckCircle />
            <p>Login successful! Redirecting to your dashboard...</p>
            </div>
        )}
        </div>
    </div>
  );
};

export default Login;
