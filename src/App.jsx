import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
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
import ProfilePage from "./Pages/ProfilePage";
import MapWithFilterUI from "./Pages/map/MapWithFilterUI";
import "leaflet/dist/leaflet.css";
import SocialUpload from "./Pages/SocialUpload";
import AddLocationPage from "./Pages/AddLocation/AddLocationPage";
import ChangeThemePage from "./Pages/ChangeThemePage";
import SettingsPage from './Pages/SettingsPage';
import EditProfilePage from "./Pages/EditProfilePage";
import WalletPage from './Pages/WalletPage';
import PointHistoryPage from './Pages/PointHistoryPage';
import WithdrawPage from './Pages/WithdrawPage';
import UploadedLocationPage from './Pages/UploadedLocationPage';
import RecycleBinPage from "./Pages/RecycleBinPage";

function App() {
  return (
    <ThemeProvider>
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
          <Route path="/add-location" element={<AddLocationPage />} />
          <Route path="/social" element={<SocialPage />} />
          <Route path="/social/upload" element={<SocialUpload />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<EditProfilePage />} />
          <Route path="/phone-signup" element={<PhoneSignUpPage />} />
          <Route path="/forgot-password" element={<ForgetPasswordPage />} />
          <Route path="/map" element={<MapWithFilterUI />} />
          <Route path="/social/upload" element={<SocialUpload />} />
          <Route path="/theme" element={<ChangeThemePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/wallet" element={<WalletPage />} />
          <Route path="/point-history" element={<PointHistoryPage />} />
          <Route path="/withdraw" element={<WithdrawPage />} />
          <Route path="/uploaded-location" element={<UploadedLocationPage />} />
          <Route path="/recycle-bin" element={<RecycleBinPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
