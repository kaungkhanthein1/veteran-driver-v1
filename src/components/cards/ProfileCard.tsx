import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// Import new icons from ProfileUpdate

import NotiIcon from "icons/ProfileUpdate/Noti.svg";
import EditProfileIcon from "icons/ProfileUpdate/EditProfile.svg";
import FemaleIcon from "icons/ProfileUpdate/Female.svg";
import WalletIcon from "icons/ProfileUpdate/Wallet.png";
import LocationIcon from "icons/ProfileUpdate/Location.png";
import BookmarkIcon from "icons/ProfileUpdate/Bookmark.png";
import HistoryIcon from "icons/ProfileUpdate/History.png";
import SettingIcon from "icons/ProfileUpdate/Setting.svg";
import LanguageIcon from "icons/ProfileUpdate/Language.svg";
import ThemeIcon from "icons/ProfileUpdate/Theme.svg";
import ShareIcon from "icons/ProfileUpdate/Share.svg";
import QrIcon from "icons/ProfileUpdate/Qr.svg";
import FeedBackIcon from "icons/ProfileUpdate/FeedBack.svg";
import CustomerSupportIcon from "icons/ProfileUpdate/CustomerSupport.svg";
import HelpsIcon from "icons/ProfileUpdate/Helps.svg";

// Import the gradient image (place it in src/assets/gradient-bg.png for example)
import { useMeQuery } from "../../Pages/services/ProfileApi";

const ProfileCard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { data } = useMeQuery();
  console.log("User Data:", data);

  const user = data?.data || {};

  return (
    <div className="relative w-full max-w-[480px] mx-auto overflow-hidden">
      {/* Notification and Edit Profile */}
      <div className="flex justify-between items-center px-4 pt-6 mb-4">
        <button className="bg-white/70 rounded-full p-2 shadow">
          <img src={NotiIcon} alt="Notifications" className="w-6 h-6" />
        </button>
        {token && (
          <button
            className="bg-white rounded-xl px-4 py-2 flex items-center gap-2 shadow"
            onClick={() => navigate("/profile/edit")}
          >
            <img src={EditProfileIcon} alt="Edit Profile" className="w-5 h-5" />
            <span className="font-medium text-sm">Edit Profile</span>
          </button>
        )}
      </div>

      {token ? (
        <div className="flex items-center gap-4 px-4">
          {user?.avatar ? (
            <img
              src={user.avatar}
              alt="Avatar"
              className="w-16 h-16 rounded-full border-4 border-white object-cover"
            />
          ) : (
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
                fill-opacity="0.16"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M40.208 43.8809C33.7043 43.8809 28 47.707 28 52.0667C28 57.6762 37.1897 57.6762 40.208 57.6762C43.2264 57.6762 52.4144 57.6762 52.4144 52.0301C52.4144 47.6887 46.7101 43.8809 40.208 43.8809Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M40.1433 40.2437H40.1949C44.6742 40.2437 48.3175 36.6003 48.3175 32.121C48.3175 27.6433 44.6742 24 40.1949 24C35.7156 24 32.0723 27.6433 32.0723 32.1177C32.0574 36.582 35.6757 40.2271 40.1433 40.2437Z"
                fill="white"
              />
            </svg>
          )}

          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-lg font-semibold text-gray-900">
                {user.nickname}
              </span>
              {user?.gender && (
                <img src={FemaleIcon} alt="Female" className="w-4 h-4" />
              )}
            </div>
            <div className="flex items-center gap-2 mb-0">
              <span className="text-[#777] text-xs  py-0.5 rounded-md">
                (Uid {user.uid})
              </span>
            </div>
            <div className="text-sm text-gray-700 flex items-center gap-1">
              {user?.city ||
                (user?.country && (
                  <span>
                    📍 {user.city} {user.country}
                  </span>
                ))}
            </div>

            <div className="text-xs text-gray-500 mt-1">{user.bio}</div>
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
              fill-opacity="0.16"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M40.208 43.8809C33.7043 43.8809 28 47.707 28 52.0667C28 57.6762 37.1897 57.6762 40.208 57.6762C43.2264 57.6762 52.4144 57.6762 52.4144 52.0301C52.4144 47.6887 46.7101 43.8809 40.208 43.8809Z"
              fill="white"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      )}
      {/* Profile Info */}

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
    </div>
  );
};

export default ProfileCard;
