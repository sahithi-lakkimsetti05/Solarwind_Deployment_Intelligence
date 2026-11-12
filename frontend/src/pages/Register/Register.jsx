import "./Register.css";

import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  ChevronDown,
  UserRound,
  Map,
  BriefcaseBusiness,
  Shield,
  X,
  ArrowRight,
} from "lucide-react";

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
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [roleOpen, setRoleOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const roles = [
    {
      name: "Planner",
      icon: BriefcaseBusiness,
    },
    {
      name: "GIS Analyst",
      icon: Map,
    },
    {
      name: "Project Manager",
      icon: UserRound,
    },
    {
      name: "Admin",
      icon: Shield,
    },
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

      alert("Account created successfully!");

      navigate("/");

    } catch (error) {
      console.error("Registration error:", error);

      alert(
        error.response?.data?.detail ||
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

        {/* =========================
            FULL NAME
        ========================= */}

        <div className="register-input-box">

          <label>Full Name</label>

          <div className="input-wrapper">

            <span className="input-icon">
              <User size={19} />
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

        {/* =========================
            EMAIL
        ========================= */}

        <div className="register-input-box">

          <label>Email</label>

          <div className="input-wrapper">

            <span className="input-icon">
              <Mail size={19} />
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

        {/* =========================
            PASSWORD
        ========================= */}

        <div className="register-input-box">

          <label>Password</label>

          <div className="input-wrapper">

            <span className="input-icon">
              <Lock size={19} />
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
              {showPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>

          </div>

        </div>

        {/* =========================
            CONFIRM PASSWORD
        ========================= */}

        <div className="register-input-box">

          <label>Confirm Password</label>

          <div className="input-wrapper">

            <span className="input-icon">
              <Lock size={19} />
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
              {showConfirmPassword ? (
                <EyeOff size={19} />
              ) : (
                <Eye size={19} />
              )}
            </button>

          </div>

        </div>

        {/* =========================
            ROLE
        ========================= */}

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
                <ShieldCheck size={19} />
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
                <ChevronDown size={19} />
              </span>

            </div>

            {/* Role options */}
            {roleOpen && (
              <div className="role-options">

                {/* Clear selection */}
                <div
                  className="role-option placeholder-option"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRole("");
                    setRoleOpen(false);
                  }}
                >

                  <span className="option-icon">
                    <X size={17} />
                  </span>

                  <span>
                    Select your role
                  </span>

                </div>

                {/* Roles */}
                {roles.map(
                  ({ name, icon: RoleIcon }) => (
                    <div
                      key={name}
                      className={`role-option ${
                        role === name
                          ? "selected-option"
                          : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();

                        setRole(name);
                        setRoleOpen(false);
                      }}
                    >

                      <span className="option-icon">
                        <RoleIcon size={17} />
                      </span>

                      <span>{name}</span>

                    </div>
                  )
                )}

              </div>
            )}

          </div>

        </div>

        {/* =========================
            REGISTER BUTTON
        ========================= */}

        <button
          className="register-btn"
          onClick={handleRegister}
          disabled={loading}
        >

          {loading ? (
            "Creating Account..."
          ) : (
            <>
              Create Account
              <ArrowRight size={19} />
            </>
          )}

        </button>

        {/* =========================
            LOGIN
        ========================= */}

        <p className="login-redirect">

          Already have an account?{" "}

          <Link to="/">
            Login here
          </Link>

        </p>

        {/* =========================
            FOOTER
        ========================= */}

        <div className="register-footer">

          <div className="footer-line"></div>

          <span>
            © 2026 SolarWind Deployment Intelligence
          </span>

        </div>

      </motion.div>

    </div>
  );
}

export default Register;