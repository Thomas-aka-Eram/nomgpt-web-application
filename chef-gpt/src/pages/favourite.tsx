import React from "react";
import "../css/theme.css";
import "../css/favourite.css";
import Layout from "../components/Layout";

function Favourite() {
  return (
    <Layout>
      <div className="favourite-container">
        <div className="favourite"></div>
      </div>
    </Layout>
  );
}

export default Favourite;
