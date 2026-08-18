import "./Register.css";

import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../components/Logo/Logo";
import { registerUser } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const roles = [
    "Planner",
    "GIS Analyst",
    "Project Manager",
    "Admin",
  ];

  const handleRegister = async () => {
    if (
      !fullName ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await registerUser(
        fullName,
        email,
        password,
        role
      );

      alert("Γ£à Account created successfully!");

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);

      alert(
        error.message ||
          "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">

      {/* Background effects */}
      <div className="register-glow register-glow-one"></div>
      <div className="register-glow register-glow-two"></div>
      <div className="register-glow register-glow-three"></div>

      <div className="register-orb orb-one"></div>
      <div className="register-orb orb-two"></div>

      <motion.div
        className="register-card"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        {/* Logo */}
        <div className="register-logo">
          <Logo />
        </div>

        {/* Heading */}
        <div className="register-heading">

          <h2>Create Your Account</h2>

          <p>
            Join the Solar & Wind Deployment Intelligence
            Platform
          </p>

        </div>

        {/* Full Name */}
        <div className="register-input-box">

          <label>Full Name</label>

          <div className="input-wrapper">

            <span className="input-icon">
              ≡ƒæñ
            </span>

            <input
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={(e) =>
                setFullName(e.target.value)
              }
            />

          </div>

        </div>

        {/* Email */}
        <div className="register-input-box">

          <label>Email</label>

          <div className="input-wrapper">

            <span className="input-icon">
              Γ£ë
            </span>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

        </div>

        {/* Password */}
        <div className="register-input-box">

          <label>Password</label>

          <div className="input-wrapper">

            <span className="input-icon">
              ≡ƒöÆ
            </span>

            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Create a password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? "Γùë" : "Γùî"}
            </button>

          </div>

        </div>

        {/* Confirm Password */}
        <div className="register-input-box">

          <label>Confirm Password</label>

          <div className="input-wrapper">

            <span className="input-icon">
              ≡ƒöÆ
            </span>

            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(e.target.value)
              }
            />

            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowConfirmPassword(
                  !showConfirmPassword
                )
              }
            >
              {showConfirmPassword ? "Γùë" : "Γùî"}
            </button>

          </div>

        </div>

        {/* Role */}
        <div className="register-input-box role-box">

          <label>Role</label>

          <div
            className={`custom-select ${
              roleOpen ? "active" : ""
            }`}
            onClick={() =>
              setRoleOpen(!roleOpen)
            }
          >

            <div className="select-display">

              <span className="role-icon">
                ≡ƒæÑ
              </span>

              <span
                className={
                  role
                    ? "selected-role"
                    : "placeholder-role"
                }
              >
                {role || "Select your role"}
              </span>

              <span
                className={`dropdown-arrow ${
                  roleOpen ? "rotate" : ""
                }`}
              >
                Γû╛
              </span>

            </div>

            {roleOpen && (
              <div className="role-options">

                <div
                  className="role-option placeholder-option"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRole("");
                    setRoleOpen(false);
                  }}
                >
                  <span>Γùî</span>
                  Select your role
                </div>

                {roles.map((item) => (
                  <div
                    key={item}
                    className={`role-option ${
                      role === item
                        ? "selected-option"
                        : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setRole(item);
                      setRoleOpen(false);
                    }}
                  >

                    <span className="option-icon">
                      {item === "Planner" && "≡ƒôà"}
                      {item === "GIS Analyst" && "≡ƒîÉ"}
                      {item === "Project Manager" && "≡ƒÆ╝"}
                      {item === "Admin" && "≡ƒ¢í"}
                    </span>

                    <span>{item}</span>

                  </div>
                ))}

              </div>
            )}

          </div>

        </div>

        {/* Register button */}
        <button
          className="register-btn"
          onClick={handleRegister}
          disabled={loading}
        >

          {loading
            ? "Creating Account..."
            : "Create Account ΓåÆ"}

        </button>

        {/* Login */}
        <p className="login-redirect">

          Already have an account?{" "}

          <Link to="/">
            Login here
          </Link>

        </p>

        {/* Footer */}
        <div className="register-footer">

          <div className="footer-line"></div>

          <span>
            ┬⌐ 2026 SolarWind Deployment Intelligence
          </span>

        </div>

      </motion.div>

    </div>
  );
}

export default Register;
