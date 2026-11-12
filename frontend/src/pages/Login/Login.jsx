import "./Login.css";

import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Logo from "../../components/Logo/Logo";
import CustomInput from "../../components/Input/CustomInput";
import PrimaryButton from "../../components/Button/PrimaryButton";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const data = await loginUser(email, password);

      // Update AuthContext + localStorage
      login(data.access_token);

      alert("Login Successful!");

      // Navigate to dashboard
      navigate("/dashboard", { replace: true });

    } catch (error) {
      console.error("Login error:", error);

      alert(
        error.response?.data?.detail ||
          "Login Failed. Please check your email and password."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >

        {/* Logo */}
        <Logo />

        {/* Email */}
        <CustomInput
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <CustomInput
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Login Button */}
        <PrimaryButton
          onClick={handleLogin}
          disabled={loading}
        >
          {loading
            ? "Logging in..."
            : "Secure Login →"}
        </PrimaryButton>

        {/* Register Link */}
        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/register">
            Register here
          </Link>
        </p>

        {/* Footer */}
        <div className="footer">
          © 2026 SolarWind Deployment Intelligence
        </div>

      </motion.div>

    </div>
  );
}

export default Login;