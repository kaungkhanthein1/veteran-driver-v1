import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import RegisterPage from "./Pages/RegisterPage";
import OtpVerifyPage from "./Pages/OtpVerifyPage";
import LocationAccessPage from "./Pages/LocationAccessPage";
import ChooseLocationPage from "./Pages/ChooseLocationPage";
import ExplorePage from "./Pages/ExplorePage";
import SocialPage from "./Pages/SocialPage";
import PhoneSignUpPage from "./Pages/PhoneSignUpPage";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage";
import ProfilePage from "./Pages/ProfilePage";
import LoginPage from "./Pages/LoginPage";
import MapWithFilterUI from "./Pages/map/MapWithFilterUI";
import "leaflet/dist/leaflet.css";
import SocialUpload from "./Pages/SocialUpload";
import AddLocationPage from "./Pages/AddLocation/AddLocationPage";
import ChangeThemePage from "./Pages/ChangeThemePage";
import SettingsPage from "./Pages/Profile/SettingsPage";
import ProfileEditWrapper from "./Pages/Profile/ProfileEditWrapper";
import WalletPage from "./Pages/Profile/WalletPage";
import PointHistoryPage from "./Pages/PointHistoryPage";
import WithdrawPage from "./Pages/Profile/WithdrawPage";
import UploadedLocationPage from "./Pages/UploadedLocationPage";
import RecycleBinPage from "./Pages/RecycleBinPage";
import EditLocationPage from "./Pages/EditLocationPage";
import BookmarksPage from "./Pages/Profile/BookmarksPage";
import RankingPage from "./Pages/RankingPage";
import LocationDetailsPage from "./Pages/LocationDetailsPage";
import NotificationsPage from "./Pages/Profile/NotificationsPage";
import ChangePasswordPage from "./Pages/Profile/ChangePasswordPage";
import ReviewPage from "./Pages/ReviewPage";
import CheckMap from "./Pages/map/CheckMap";
import AddMap from "./Pages/map/AddMap";
import ModalRoute from "components/common/ModalRoute";
import AccountInformationPage from "./Pages/AccountInformationPage";
import HomePage from "./Pages/Home/HomePage";
import SearchMain from "./Pages/Search/SearchMain";
import VideoDetailPage from "./Pages/VideoDetailPage";

function AppRoutes() {
  const location = useLocation();
  const state = location.state as { background?: Location };

  return (
    <>
      {/* Main routes, use background location if present */}
      <Routes location={state?.background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/otp-verify" element={<OtpVerifyPage />} />
        <Route path="/location-access" element={<LocationAccessPage />} />
        <Route path="/choose-location" element={<ChooseLocationPage />} />
        <Route path="/explore" element={<ExplorePage />} />
        <Route path="/add-location" element={<AddLocationPage />} />
        <Route path="/social" element={<SocialPage />} />
        <Route path="/social/upload" element={<SocialUpload />} />
        <Route path="/profile/edit/*" element={<ProfileEditWrapper />} />
        <Route path="/edit-profile/*" element={<ProfileEditWrapper />} />
        <Route path="/phone-signup" element={<PhoneSignUpPage />} />
        <Route path="/forgot-password" element={<ForgetPasswordPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/map" element={<MapWithFilterUI isExpanded={false} />} />
        <Route path="/theme" element={<ChangeThemePage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/point-history" element={<PointHistoryPage />} />
        <Route path="/withdraw" element={<WithdrawPage />} />
        <Route path="/uploaded-location" element={<UploadedLocationPage />} />
        <Route path="/recycle-bin" element={<RecycleBinPage />} />
        <Route path="/edit-location" element={<EditLocationPage />} />
        <Route path="/bookmarks" element={<BookmarksPage />} />
        <Route path="/ranking" element={<RankingPage />} />
        <Route path="/search" element={<SearchMain />} />
        <Route path="/location/:id" element={<LocationDetailsPage />} />
        <Route path="/notifications" element={<NotificationsPage />} />
        <Route path="/settings/password" element={<ChangePasswordPage />} />
        <Route path="/review" element={<ReviewPage />} />
        <Route path="/CheckMap/:id" element={<CheckMap />} />
        <Route path="/addMap" element={<AddMap />} />
        <Route path="/account-information" element={<AccountInformationPage />} />
        <Route path="/video/:id" element={<VideoDetailPage />} />
      </Routes>
      {/* Modal routes, only render if background exists */}
      {state?.background && (
        <Routes>
          <Route path="/login" element={<ModalRoute><LoginPage /></ModalRoute>} />
          <Route path="/register" element={<ModalRoute><RegisterPage /></ModalRoute>} />
          <Route path="/forgot-password" element={<ModalRoute><ForgetPasswordPage /></ModalRoute>} />
          <Route path="/otp-verify" element={<ModalRoute><OtpVerifyPage /></ModalRoute>} />
        </Routes>
      )}
    </>
  );
}

function App(): JSX.Element {
  return (
    <div className="max-w-[480px] mx-auto dvh-fallback bg-theme-primary">
      <ThemeProvider>
        <Router>
          <AppRoutes />
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;