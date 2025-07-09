import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Import new icons from ProfileUpdate

import NotiIcon from "icons/ProfileUpdate/Noti.svg";
import EditProfileIcon from "icons/ProfileUpdate/EditProfile.svg";
import FemaleIcon from "icons/ProfileUpdate/Female.svg";
import SettingIcon from "icons/ProfileUpdate/Setting.svg";
import LanguageIcon from "icons/ProfileUpdate/Language.svg";
import ThemeIcon from "icons/ProfileUpdate/Theme.svg";
import ShareIcon from "icons/ProfileUpdate/Share.svg";
import QrIcon from "icons/ProfileUpdate/Qr.svg";
import FeedBackIcon from "icons/ProfileUpdate/FeedBack.svg";
import VersionIcon from "icons/Version.svg";
import ShareModal from '../common/ShareModal';
import { useState } from 'react';
import LocationIcon from "icons/ProfileUpdate/Location.svg";
import GradientBg from "icons/ProfileUpdate/GradientBg.jpg";
import FavouriteIcon from "icons/ProfileUpdate/Favourite.svg";
import LanguageModal from '../common/LanguageModal';

// Import the gradient image (place it in src/assets/gradient-bg.png for example)
import { useMeQuery } from "../../Pages/services/ProfileApi";

const ProfileCard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { data } = useMeQuery();
  console.log("User Data:", data);

  const user = data?.data || {};
  const [isShareModalOpen, setShareModalOpen] = useState(false);
  const [isLanguageModalOpen, setLanguageModalOpen] = useState(false);
  const [showThemeToast, setShowThemeToast] = useState(false);

  return (
    <div
      className="relative w-full max-w-[480px] h-dvh mx-auto overflow-hidden"
      style={{
        backgroundImage: `url(${GradientBg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'top',
      }}
    >
      {/* Toast for Application Themes */}
      {showThemeToast && (
        <div className="fixed bottom-20 min-w-[370px] left-1/2 z-50 -translate-x-1/2 bg-[#444444D1] text-white px-6 py-2 rounded-full shadow-lg text-base transition-opacity duration-300" style={{opacity: 0.95}}>
          This feature is not available at the moment
        </div>
      )}
      {/* Top bar: Only settings icon at top right */}
      <div className="flex justify-end items-center px-4 pt-6 mb-4">
        <button
          className="bg-white rounded-full p-2 shadow"
          onClick={() => navigate("/settings")}
        >
          <img src={SettingIcon} alt="Settings" className="w-6 h-6" />
        </button>
      </div>

      {/* Profile Info (keep as is) */}
      {token ? (
        <div className="flex flex-col items-center px-4">
          <div className="flex items-center gap-4 w-full">
            <div className="relative">
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt="Avatar"
                  className="w-20 h-20 rounded-full border-4 border-white object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="50"
                    fill="#444444"
                    fillOpacity="0.16"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M50.5 55C42.5 55 36 59.5 36 65.5C36 72.5 49 72.5 50.5 72.5C52 72.5 65 72.5 65 65.5C65 59.5 58.5 55 50.5 55Z"
                    fill="white"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M50 50C55.5228 50 60 45.5228 60 40C60 34.4772 55.5228 30 50 30C44.4772 30 40 34.4772 40 40C40 45.5228 44.4772 50 50 50Z"
                    fill="white"
                  />
                </svg>
              )}
              {/* Edit Profile Button Overlay */}
              <button
                className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white rounded-full border border-gray-200 shadow p-1 flex items-center justify-center w-9 h-9"
                style={{ zIndex: 2 }}
                onClick={() => navigate('/profile/edit')}
                aria-label="Edit Profile"
              >
                <img src={EditProfileIcon} alt="Edit Profile" className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col justify-center flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl font-semibold text-gray-900">
                  {user.nickname}
                </span>
                {user?.gender && (
                  <img src={FemaleIcon} alt="Female" className="w-5 h-5" />
                )}
              </div>
              {/* Location row under nickname */}
              <div className="flex items-center text-base text-gray-800 mb-1">
                <img src={LocationIcon} alt="Location" className="w-5 h-5 mr-2" />
                <span>
                  {user.city && user.country
                    ? `${user.city}, ${user.country}`
                    : (user.city || user.country || 'Unknown Location')}
                </span>
              </div>
            </div>
          </div>
          {/* Location and bio below avatar/name/level, aligned left */}
          <div className="flex flex-col items-start w-full mt-8 mb-6">
            {user.bio && (
              <div className="montserrat-regular flex items-center gap-1">
                {user.bio}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-4 px-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="81"
            height="81"
            viewBox="0 0 81 81"
            fill="none"
          >
            <circle
              cx="40.5"
              cy="40.5"
              r="40.5"
              fill="#444444"
              fillOpacity="0.16"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M40.208 43.8809C33.7043 43.8809 28 47.707 28 52.0667C28 57.6762 37.1897 57.6762 40.208 57.6762C43.2264 57.6762 52.4144 57.6762 52.4144 52.0301C52.4144 47.6887 46.7101 43.8809 40.208 43.8809Z"
              fill="white"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M40.1433 40.2437H40.1949C44.6742 40.2437 48.3175 36.6003 48.3175 32.121C48.3175 27.6433 44.6742 24 40.1949 24C35.7156 24 32.0723 27.6433 32.0723 32.1177C32.0574 36.582 35.6757 40.2271 40.1433 40.2437Z"
              fill="white"
            />
          </svg>

          <div
            onClick={() =>
              navigate("/login", { state: { background: location } })
            }
          >
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[24px] font-[500] leading-[36px] text-[#444]">
                Login Or Sign Up
              </span>
              <span className="mt-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M6.75 13.5L11.25 9L6.75 4.5"
                    stroke="black"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Card 1: Favourites, Notifications, Language, Application Themes */}
      <div className="w-full max-w-[480px] mx-auto p-4">
        <div className="bg-white rounded-xl shadow p-0 overflow-hidden">
          <button className="flex items-center justify-between w-full px-4 py-4" onClick={() => navigate('/bookmarks')}>
            <div className="flex items-center gap-3">
              <img src={FavouriteIcon} alt="Favourites" className="w-6 h-6" />
              <span className="montserrat-regular">Favourites</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
          <button className="flex items-center justify-between w-full px-4 py-4" onClick={() => navigate('/notifications')}>
            <div className="flex items-center gap-3">
              <img src={NotiIcon} alt="Notifications" className="w-6 h-6" />
              <span className="montserrat-regular">Notifications</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
          <button className="flex items-center justify-between w-full px-4 py-4" onClick={() => setLanguageModalOpen(true)}>
            <div className="flex items-center gap-3">
              <img src={LanguageIcon} alt="Language" className="w-6 h-6" />
              <span className="montserrat-regular">Language</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
          <button className="flex items-center justify-between w-full px-4 py-4" onClick={() => { setShowThemeToast(true); setTimeout(() => setShowThemeToast(false), 2000); }}>
            <div className="flex items-center gap-3">
              <img src={ThemeIcon} alt="Application Themes" className="w-6 h-6" />
              <span className="montserrat-regular">Application Themes</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      {/* Card 2: Share Our App, Version */}
      <div className="w-full max-w-[480px] mx-auto p-4">
        <div className="bg-white rounded-xl shadow p-0 overflow-hidden">
          <button className="flex items-center justify-between w-full px-4 py-4" onClick={() => setShareModalOpen(true)}>
            <div className="flex items-center gap-3">
              <img src={ShareIcon} alt="Share Our App" className="w-6 h-6" />
              <span className="montserrat-regular">Share Our App</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
          <div className="flex items-center justify-between w-full px-4 py-4">
            <div className="flex items-center gap-3">
              <img src={VersionIcon} alt="Version" className="w-6 h-6" />
              <span className="montserrat-regular">Version</span>
            </div>
            <span className="montserrat-regular">V 1.0.0.1</span>
          </div>
        </div>
      </div>
      <ShareModal isOpen={isShareModalOpen} onClose={() => setShareModalOpen(false)} />
      <LanguageModal isOpen={isLanguageModalOpen} onClose={() => setLanguageModalOpen(false)} />

      {/* Card 3: Version */}
      {/* <div className="w-full max-w-[480px] mx-auto p-4">
        <div className="bg-white rounded-xl shadow p-0 overflow-hidden">
          <div className="flex items-center justify-between w-full px-4 py-4">
            <div className="flex items-center gap-3">
              <img src={VersionIcon} alt="Version" className="w-6 h-6" />
              <span className="montserrat-regular">Version</span>
            </div>
            <span className="text-base text-gray-400">V1.0.01</span>
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default ProfileCard;
