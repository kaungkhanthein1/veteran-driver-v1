import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import OtpVerifyPage from "./Pages/OtpVerifyPage";
import LocationAccessPage from "./Pages/LocationAccessPage";
import ChooseLocationPage from "./Pages/ChooseLocationPage";
import Home from "./components/Home";
import ExplorePage from "./Pages/ExplorePage";
import SocialPage from "./Pages/SocialPage";
import PhoneSignUpPage from "./Pages/PhoneSignUpPage";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
import ProfilePage from "./Pages/ProfilePage"; // Update this import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp-verify" element={<OtpVerifyPage />} />
        <Route path="/location-access" element={<LocationAccessPage />} />
        <Route path="/choose-location" element={<ChooseLocationPage />} />
        {/* Main tab routes */}
        <Route path="/home" element={<Home />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/phone-signup" element={<PhoneSignUpPage />} />
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;