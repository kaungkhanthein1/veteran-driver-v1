import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import OtpVerifyPage from "./Pages/OtpVerifyPage";
import LocationAccessPage from "./Pages/LocationAccessPage";
import ChooseLocationPage from "./Pages/ChooseLocationPage";
import Home from "./Components/Home";
import Explore from "./Components/Explore";
import SocialPage from "./Pages/SocialPage";
import PhoneSignUpPage from "./Pages/PhoneSignUpPage";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
import Profile from "./Components/Profile"; // Add this import

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
        <Route path="/phone-signup" element={<PhoneSignUpPage />} />
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;