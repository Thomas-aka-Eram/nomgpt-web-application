import React, { useState, useEffect } from "react";
import { useAuth } from "../context/UserContext"; // Assuming context is imported here
import { jwtDecode } from "jwt-decode"; // If you want to keep Google login as an option
import "../css/loginmodal.css"; // Import the provided CSS for modal styling

interface DecodedToken {
  sub: string;
  name: string; // Use `name` as username here or modify as needed
  email: string;
  picture: string;
}

const SignupModal = () => {
  const { showModal, closeModal, login } = useAuth();
  const [username, setUsername] = useState(""); // Added username field for signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Added confirmation password field
  const [error, setError] = useState<string | null>(null);

  // Google Login Callback
  const handleCallbackResponse = (response: any) => {
    const decodedToken: DecodedToken = jwtDecode(response.credential);
    console.log("Google Decoded Token:", decodedToken);
    // Logic for Google sign-up (same as login)
    login({ username: decodedToken.name, email: decodedToken.email });
    closeModal(); // Close modal after login
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

    // Basic validation
    if (!username || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        login({ username: data.username, email: data.email });
        closeModal(); // Close modal after successful signup
      } else {
        setError(data.message || "Failed to sign up.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="modal-overlay" id="modalOverlay">
      <div className="modal" id="signupModal">
        <button className="close-btn" onClick={closeModal}>
          ✕
        </button>
        <h1 className="h3 mb-3 mg-10 fw-normal text txtcolor">Welcome to</h1>
        <h3 className="h3 mb-5 fw-normal">Create an account</h3>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
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
