import React, { useState, useEffect } from "react";
import { useAuth } from "../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../css/loginmodal.css";
import { postRequest, getRequest } from "../utils/services";

const SignupModal = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleCallbackResponse = async (response: any) => {
    try {
      // Send the raw ID token to the backend
      const backendResponse = await postRequest("/google", {
        idToken: response.credential,
      });

      // Log in the user in context
      login(backendResponse.token);
      navigate("/");
    } catch (err) {
      console.error("Google Login Error:", err);
      setError("Failed to authenticate with Google.");
    }
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "987969491643-hjg3qumc7lhl39bkufiads8mhvtohm9b.apps.googleusercontent.com",
        callback: handleCallbackResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("googleSignInDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // Send registration data to backend
      const response = await postRequest("/register", {
        username,
        email,
        password,
      });

      // Log in the user in context
      login(response.user);
    } catch (err) {
      console.error("Registration Error:", err);
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="modal-overlay" id="modalOverlay">
      <div className="modal" id="signupModal">
        <div className="back">
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            ✕
          </button>
        </div>
        <h1 className="h3 mb-3 mg-10 fw-normal text txtcolor">Welcome to</h1>
        <h3 className="h3 mb-5 fw-normal">Create an account</h3>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              autoComplete="off"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Sign Up
          </button>
        </form>

        <div className="divider">or</div>

        <div id="googleSignInDiv" className="google-login"></div>

        <p className="register-link">
          Already have an account? <a href="/login">Login</a>.
        </p>
      </div>
    </div>
  );
};

export default SignupModal;
