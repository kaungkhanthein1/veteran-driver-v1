import React from "react";
import { useNavigate } from "react-router-dom";
// Import new icons from ProfileUpdate
import NotiIcon from 'icons/ProfileUpdate/Noti.svg';
import EditProfileIcon from 'icons/ProfileUpdate/EditProfile.svg';
import FemaleIcon from 'icons/ProfileUpdate/Female.svg';
import WalletIcon from 'icons/ProfileUpdate/Wallet.png';
import LocationIcon from 'icons/ProfileUpdate/Location.png';
import BookmarkIcon from 'icons/ProfileUpdate/Bookmark.png';
import HistoryIcon from 'icons/ProfileUpdate/History.png';
import SettingIcon from 'icons/ProfileUpdate/Setting.svg';
import LanguageIcon from 'icons/ProfileUpdate/Language.svg';
import ThemeIcon from 'icons/ProfileUpdate/Theme.svg';
import ShareIcon from 'icons/ProfileUpdate/Share.svg';
import QrIcon from 'icons/ProfileUpdate/Qr.svg';
import FeedBackIcon from 'icons/ProfileUpdate/FeedBack.svg';
import CustomerSupportIcon from 'icons/ProfileUpdate/CustomerSupport.svg';
import HelpsIcon from 'icons/ProfileUpdate/Helps.svg';
import { useNavigate } from 'react-router-dom';

// Import the gradient image (place it in src/assets/gradient-bg.png for example)
import GradientBg from "assets/gradient-bg.png";

const ProfileCard: React.FC = () => {
  const navigate = useNavigate();
  // Placeholder user data
  const user = {
    name: "Laura Lin",
    gender: "female",
    badge: "SILVER",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    location: "Phnom Penh, Cambodia",
    bio: "Passionate traveler 🌏 embracing the journey.",
  };

  return (
    <div className="relative w-full max-w-[480px] mx-auto overflow-hidden">
      {/* Notification and Edit Profile */}
      <div className="flex justify-between items-center px-4 pt-6 mb-4">
        <button className="bg-white/70 rounded-full p-2 shadow">
          <img src={NotiIcon} alt="Notifications" className="w-6 h-6" />
        </button>
        <button className="bg-white rounded-xl px-4 py-2 flex items-center gap-2 shadow" onClick={() => navigate('/profile/edit')}>
          <img src={EditProfileIcon} alt="Edit Profile" className="w-5 h-5" />
          <span className="font-medium text-sm">Edit Profile</span>
        </button>
      </div>
      {/* Profile Info */}
      <div className="flex items-center gap-4 px-4">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-16 h-16 rounded-full border-4 border-white object-cover"
        />
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-lg font-semibold text-gray-900">
              {user.name}
            </span>
            <img src={FemaleIcon} alt="Female" className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-[#E5EAF3] text-[#6B7A90] text-xs font-bold px-2 py-0.5 rounded-md">
              {user.badge}
            </span>
          </div>
          <div className="text-sm text-gray-700 flex items-center gap-1">
            <span>📍 {user.location}</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">{user.bio}</div>
        </div>
      </div>
      {/* Card 1: Quick Actions */}
      <div className="relative z-10 px-4 pb-2 mt-4">
        <div className="grid grid-cols-4 bg-theme-secondary rounded-xl shadow-lg p-4 gap-2">
          <button
            onClick={() => navigate("/wallet")}
            className="flex flex-col items-center hover:bg-gray-100 rounded-lg p-2 transition-colors"
          >
            <img src={WalletIcon} alt="Wallet" className="w-12 h-12 mb-2" />
            <span className="text-xs font-medium text-gray-800 text-center leading-tight">
              My Point Wallet
            </span>
          </button>
          <button
            onClick={() => navigate("/uploaded-locations")}
            className="flex flex-col items-center hover:bg-gray-100 rounded-lg p-2 transition-colors"
          >
            <img
              src={LocationIcon}
              alt="Uploaded Locations"
              className="w-12 h-12 mb-2"
            />
            <span className="text-xs font-medium text-gray-800 text-center leading-tight">
              My Uploaded Locations
            </span>
          </button>
          <button
            onClick={() => navigate("/bookmarks")}
            className="flex flex-col items-center hover:bg-gray-100 rounded-lg p-2 transition-colors"
          >
            <img
              src={BookmarkIcon}
              alt="Bookmarked Locations"
              className="w-12 h-12 mb-2"
            />
            <span className="text-xs font-medium text-gray-800 text-center leading-tight">
              Bookmarked Locations
            </span>
          </button>
          <button
            onClick={() => navigate("/recently-viewed")}
            className="flex flex-col items-center hover:bg-gray-100 rounded-lg p-2 transition-colors"
          >
            <img
              src={HistoryIcon}
              alt="Recently Viewed"
              className="w-12 h-12 mb-2"
            />
            <span className="text-xs font-medium text-gray-800 text-center leading-tight">
              Recently Viewed places
            </span>
          </button>
        </div>
      </div>
      {/* Card 2: Settings */}
      <div className="relative z-10 px-4 pb-2 mt-4">
        <div className="grid grid-cols-5 bg-theme-secondary rounded-xl shadow-lg p-4 gap-2 items-center">
          <div className="flex flex-col items-center">
            <img src={SettingIcon} alt="Settings" className="w-7 h-7 mb-1" />
            <span className="text-xs text-gray-700 text-center">Settings</span>
          </div>
          <div className="flex flex-col items-center">
            <img src={LanguageIcon} alt="Language" className="w-7 h-7 mb-1" />
            <span className="text-xs text-gray-700 text-center">Language</span>
          </div>
          <div className="flex flex-col items-center">
            <img src={ThemeIcon} alt="Theme" className="w-8 h-8 mb-1" />
            <span className="text-xs text-gray-700 text-center">Theme</span>
          </div>
          <div className="flex flex-col items-center">
            <img src={ShareIcon} alt="Share" className="w-7 h-7 mb-1" />
            <span className="text-xs text-gray-700 text-center">Share</span>
          </div>
          <div className="flex flex-col items-center">
            <img
              src={QrIcon}
              alt="Referral QR"
              className="w-6 h-6 mb-1 relative"
              style={{ top: "4px" }}
            />
            <span className="text-xs text-gray-700 text-center">
              Referral QR
            </span>
          </div>
        </div>
      </div>
      {/* Card 3: Support List */}
      <div className="relative z-10 px-4 mt-4">
        <div className="bg-theme-secondary rounded-xl shadow-lg divide-y">
          <button className="flex items-center justify-between w-full p-4 bg-transparent">
            <div className="flex items-center gap-3">
              <img src={FeedBackIcon} alt="Feedback" className="w-6 h-6" />
              <span className="text-sm text-gray-700">FeedBack</span>
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <button className="flex items-center justify-between w-full p-4 bg-transparent">
            <div className="flex items-center gap-3">
              <img
                src={CustomerSupportIcon}
                alt="Customer Support"
                className="w-6 h-6"
              />
              <span className="text-sm text-gray-700">Customer Support</span>
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
          <button className="flex items-center justify-between w-full p-4 bg-transparent">
            <div className="flex items-center gap-3">
              <img src={HelpsIcon} alt="Helps" className="w-6 h-6" />
              <span className="text-sm text-gray-700">Helps</span>
            </div>
            <svg
              className="w-5 h-5 text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Quick Access */}
      <div className="relative z-10 px-4 mt-4">
        <button
          onClick={() => navigate("/media-upload-test")}
          className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition-colors text-sm font-medium"
        >
          🧪 Test Media Upload
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
