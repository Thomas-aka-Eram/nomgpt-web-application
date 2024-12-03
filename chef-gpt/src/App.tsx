import React from "react";
import { Routes, Route } from "react-router-dom";
import ChefPage from "./pages/chefpage";
import Discover from "./pages/discover";
import Generate from "./pages/generate";
import Favourite from "./pages/favourite";
import Account from "./pages/account";
import { ThemeProvider } from "./context/themecontext";
import { UserProvider } from "./context/UserContext";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignUpModal";
function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <Routes>
          <Route path="/register" element={<SignupModal />} />
          <Route path="/login" element={<LoginModal />} />
          <Route path="/nomgpt/discover" element={<Discover />} />
          <Route path="/nomgpt/generate" element={<Generate />} />
          <Route path="/nomgpt/favourite" element={<Favourite />} />
          <Route path="/nomgpt/account" element={<Account />} />
          <Route path="/nomgpt" element={<ChefPage />} />
          <Route path="/" element={<ChefPage />} />
        </Routes>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
