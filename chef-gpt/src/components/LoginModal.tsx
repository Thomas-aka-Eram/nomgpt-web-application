import React, { useState, useEffect } from "react";
import { useAuth } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { postRequest } from "../utils/services";
import { jwtDecode } from "jwt-decode";
import "../css/loginmodal.css"; // Import the provided CSS for modal styling

const LoginModal = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

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
        client_id: googleClientId,
        callback: handleCallbackResponse,
      });
      window.google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }
      );
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }

    try {
      const loginResponse = await postRequest("/login", { email, password });
      login(loginResponse.token);
      navigate("/");
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="modal-overlay" id="modalOverlay">
      <div className="modal" id="loginModal">
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
        <h3 className="h3 mb-5 fw-normal">Login to your account</h3>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
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
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <div className="divider">or</div>

        <div id="signInDiv" className="google-login"></div>

        <p className="register-link">
          Don't have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginModal;
