import React from "react";
import Navigation from "../components/Navigation";
import "../css/theme.css";
import "../css/discover.css";

function Discover() {
  return (
    <>
      <Navigation></Navigation>
      <div className="discover-container">
        <div className="discover"></div>
      </div>
    </>
  );
}

export default Discover;
