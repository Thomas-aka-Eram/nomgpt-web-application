import React from "react";
import { Link } from "react-router-dom";
import "../css/navigation.css";
import { useTheme } from "../context/themecontext"; // Import the custom hook

interface User {
  name: string;
}

function Navigation() {
  const [user, setUser] = React.useState<User>({ name: "Thomas Eram" });
  const { theme, toggleTheme } = useTheme(); // Access theme context

  React.useEffect(() => {
    // Simulate fetching user data if needed
    // setUser({ name: "Test User" });
  }, []);

  return (
    <>
      <div className="topNavi">
        <div className="chef-menu">
          <div className="ChefGPT">
            <div className="chef-logo">
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
              onClick={toggleTheme} // Use toggleTheme from context
            >
              {theme === "light" ? "wb_sunny" : "wb_sunny"}
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
