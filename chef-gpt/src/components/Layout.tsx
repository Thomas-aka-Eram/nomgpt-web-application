import React from "react";
import Navigation from "./Navigation"; // Import Navigation component
import Footer from "./Footer"; // Import Footer component

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="layout">
      <Navigation />
      <main>{children}</main>{" "}
      {/* This will be the dynamic content of each page */}
      <Footer />
    </div>
  );
};

export default Layout;
