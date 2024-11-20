import React from "react";
import Navigation from "../components/Navigation";
import "../css/theme.css";
import "../css/favourite.css";

function Favourite() {
  return (
    <>
      <Navigation></Navigation>
      <div className="favourite-container">
        <div className="favourite"></div>
      </div>
    </>
  );
}

export default Favourite;
