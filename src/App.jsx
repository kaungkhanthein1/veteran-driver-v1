import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import OtpVerifyPage from "./Pages/OtpVerifyPage";
import LocationAccessPage from "./Pages/LocationAccessPage";
import ChooseLocationPage from "./Pages/ChooseLocationPage";
import Home from "./components/Home";
import Explore from "./components/Explore";
import SocialPage from "./Pages/SocialPage";
// You may need to create a Profile page if it doesn't exist
import Profile from "./components/Profile"; // <-- create this if missing

function App() {
  return (
    <Router basename="/react-tailwind-starter">
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp-verify" element={<OtpVerifyPage />} />
        <Route path="/location-access" element={<LocationAccessPage />} />
        <Route path="/choose-location" element={<ChooseLocationPage />} />
        {/* Main tab routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;