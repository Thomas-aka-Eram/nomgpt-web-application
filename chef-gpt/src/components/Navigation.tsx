import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/navigation.css";
import { useAuth } from "../context/UserContext";
import { useTheme } from "../context/themecontext"; // Import the custom hook

interface User {
  name: string;
}

function Navigation() {
  const [user, setUser] = React.useState<User>({ name: "Thomas Eram" });
  const { theme, toggleTheme } = useTheme(); // Access theme context
  const { isAuthenticated, openModal, logout } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    // Simulate fetching user data if needed
    // setUser({ name: "Test User" });
  }, []);

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
          {isAuthenticated && (
            <div className="favourite">
              <Link
                className="no-link-style navi-btn"
                to={"../nomgpt/favourite"}
              >
                <h2>Favourite</h2>
              </Link>
            </div>
          )}

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
              <button onClick={logout}>Logout</button>
            ) : (
              <div className="noAuth">
                <button className="signin" onClick={openModal}>
                  Sign In
                </button>
                <button className="signup" onClick={openModal}>
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
