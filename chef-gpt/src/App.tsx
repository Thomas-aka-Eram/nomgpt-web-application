import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/loginpage";
import ChefPage from "./pages/chefpage";
import Discover from "./pages/discover";
import Generate from "./pages/generate";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/nomgpt/discover" element={<Discover />} />
      <Route path="/nomgpt/generate" element={<Generate />} />
      <Route path="/nomgpt" element={<ChefPage />} />
      <Route path="/" element={<ChefPage />} />
    </Routes>
  );
}

export default App;
