import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/navigation.css";

interface User {
  name: string;
}

function Navigation() {
  const [user, setUser] = useState<User>({ name: "Thomas Eram" });

  React.useEffect(() => {
    // Simulate fetching user data
    // setUser({ name: "Test User" });
  }, []);

  //toggle light or dark
  const [theme, setTheme] = useState("light");

  // Apply the theme to the document root
  useEffect(() => {
    document.documentElement.setAttribute("color-theme", theme);
  }, [theme]);

  // Toggle between light and dark modes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <>
      <div className="topNavi">
        <div className="chef-menu">
          <div className="ChefGPT">
            <div className="chef-logo">
              <Link to={"../nomgpt"}>
                <img src="../../public/logohat.png" />
              </Link>
            </div>
            <h1>
              <Link className="no-link-logo" to={"../nomgpt"}>
                Nom<span>GPT</span>
              </Link>
            </h1>
          </div>
          <div className="home">
            <Link className="no-link-style" to={"../nomgpt/discover"}>
              <h2>Discover</h2>
            </Link>
          </div>
          <div className="generate-recipes">
            <Link className="no-link-style" to={"../nomgpt/generate"}>
              <h2>Generate</h2>
            </Link>
          </div>
          <div className="favourite">
            <Link className="no-link-style" to={"../nomgpt/favourite"}>
              <h2>Favourite</h2>
            </Link>
          </div>
          <div className="category">
            <h2>Categories</h2>
          </div>
          <div className="famous">
            <h2>Famous</h2>
          </div>
        </div>

        <div className="chef-account">
          <div className="theme">
            <span
              className={`material-symbols-outlined ${theme}`}
              onClick={toggleTheme}
            >
              wb_sunny
            </span>
          </div>
          <div className="profile">
            <h2>{user.name}</h2>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
