import React from "react";
import Navigation from "../components/Navigation";
import "../css/theme.css";
import "../css/generate.css";

function Generate() {
  return (
    <>
      <Navigation></Navigation>
      <div className="generate-container">
        <div className="generate"></div>
      </div>
    </>
  );
}

export default Generate;
