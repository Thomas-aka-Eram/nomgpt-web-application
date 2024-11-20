import React from "react";
import Navigation from "../components/Navigation";
import Foodpost from "../components/foodpost";
import "../css/theme.css";
import "../css/discover.css";

function Discover() {
  return (
    <>
      <Navigation></Navigation>
      <div className="discover-container">
        <div className="discover">
          <Foodpost></Foodpost>
        </div>
      </div>
    </>
  );
}

export default Discover;
