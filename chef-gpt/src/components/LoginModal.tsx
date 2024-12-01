import React, { useState, useEffect } from "react";
import { useAuth } from "../context/UserContext";
import { jwtDecode } from "jwt-decode";
import "../css/loginmodal.css"; // Import the provided CSS for modal styling

interface DecodedToken {
  sub: string;
  name: string; // Use `name` as username here or modify as needed
  email: string;
  picture: string;
}

const LoginModal = () => {
  const { showModal, closeModal, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleCallbackResponse = (response: any) => {
    const decodedToken: any = jwtDecode(response.credential);
    console.log("Decoded Token:", decodedToken);
  };

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id:
          "987969491643-hjg3qumc7lhl39bkufiads8mhvtohm9b.apps.googleusercontent.com",
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
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        login({ username: data.username, email: data.email }); // Login via email and username
        closeModal(); // Close modal after successful login
      } else {
        setError(data.message || "Invalid email or password.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="modal-overlay" id="modalOverlay">
      <div className="modal" id="loginModal">
        <button className="close-btn" onClick={closeModal}>
          ✕
        </button>
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
