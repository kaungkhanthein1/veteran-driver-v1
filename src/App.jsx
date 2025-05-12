import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import OtpVerifyPage from "./Pages/OtpVerifyPage";
import LocationAccessPage from "./Pages/LocationAccessPage";
import ChooseLocationPage from "./Pages/ChooseLocationPage";


function App() {
  return (
    <Router basename="/react-tailwind-starter">
      <Routes>
        <Route path="/" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/otp-verify" element={<OtpVerifyPage />} />
        <Route path="/location-access" element={<LocationAccessPage />} />
        <Route path="/choose-location" element={<ChooseLocationPage />} />
      </Routes>
    </Router>
  );
}

export default App;