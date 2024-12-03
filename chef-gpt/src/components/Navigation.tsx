import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navigation.css";
import { useAuth } from "../context/UserContext";
import { useTheme } from "../context/themecontext"; // Import the custom hook
import ProfileNavi from "./profilenavi"; // Import the ProfileNavi component

function Navigation() {
  const { theme, toggleTheme } = useTheme(); // Access theme context
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  // State to control profile navigation visibility
  const [showProfile, setShowProfile] = useState(false);

  // Toggle profile navigation visibility
  const toggleProfile = () => {
    setShowProfile(!showProfile);
  };

  React.useEffect(() => {
    // Simulate fetching user data if needed
    fetchUserData();
  }, [isAuthenticated]);

  const fetchUserData = async () => {
    const token = localStorage.getItem("authToken");
    const response = await fetch("/userdata", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    return data;
  };

  // Use effect to add/remove no-scroll class when show changes
  useEffect(() => {
    if (showProfile) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Clean up by removing the class when the component unmounts
    return () => document.body.classList.remove("no-scroll");
  }, [showProfile]);

  return (
    <>
      <div className="topNavi">
        <div className="chef-menu">
          <div className="ChefGPT">
            <div className="chef-logo navi-btn">
              <Link to={"../nomgpt"}>
                <img src="../../public/logohat.png" alt="ChefGPT Logo" />
              </Link>
            </div>
            <h1>
              <Link className="no-link-logo" to={"../nomgpt"}>
                Nom<span>GPT</span>
              </Link>
            </h1>
          </div>
          <div className="home">
            <Link className="no-link-style navi-btn" to={"../nomgpt/discover"}>
              <h2>Explore</h2>
            </Link>
          </div>
          <div className="generate-recipes">
            <Link className="no-link-style navi-btn" to={"../nomgpt/generate"}>
              <h2>Generate</h2>
            </Link>
          </div>

          <div className="category navi-btn">
            <h2>Categories</h2>
          </div>
          <div className="famous navi-btn">
            <h2>Famous</h2>
          </div>
        </div>

        <div className="chef-account">
          <div className="theme">
            <span
              className={`material-symbols-outlined ${theme}`}
              onClick={toggleTheme} // Use toggleTheme from context
            >
              {theme === "light" ? "wb_sunny" : "routine"}
            </span>
          </div>
          <div className="profile">
            {isAuthenticated ? (
              <button className="profile-button" onClick={toggleProfile}>
                <img
                  src={
                    user?.image?.startsWith("/upload")
                      ? `http://localhost:5000${user.image}`
                      : user?.image.split("=")[0]
                  }
                  alt="User Profile"
                  className="pfimg"
                />
              </button>
            ) : (
              <div className="noAuth">
                <button className="login" onClick={() => navigate("/login")}>
                  Log In
                </button>
                <button
                  className="Signup"
                  onClick={() => navigate("/register")}
                >
                  Sign Up🧑‍🍳
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Navigation - This component will slide in */}
      <ProfileNavi show={showProfile} onClose={toggleProfile} />
    </>
  );
}

export default Navigation;
