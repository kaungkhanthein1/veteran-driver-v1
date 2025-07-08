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
import VersionIcon from "icons/Version.svg";

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

      {/* Card 1: Notifications, Language, Application Themes */}
      <div className="w-full max-w-[480px] mx-auto p-4">
        <div className="bg-white rounded-xl shadow p-0 overflow-hidden">
          <button className="flex items-center justify-between w-full px-4 py-4" onClick={() => navigate('/notifications')}>
            <div className="flex items-center gap-3">
              <img src={NotiIcon} alt="Notifications" className="w-6 h-6" />
              <span className="text-base text-gray-700">Notifications</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
          <button className="flex items-center justify-between w-full px-4 py-4" onClick={() => navigate('/settings/language')}>
            <div className="flex items-center gap-3">
              <img src={LanguageIcon} alt="Language" className="w-6 h-6" />
              <span className="text-base text-gray-700">Language</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
          <button className="flex items-center justify-between w-full px-4 py-4" onClick={() => navigate('/settings/theme')}>
            <div className="flex items-center gap-3">
              <img src={ThemeIcon} alt="Application Themes" className="w-6 h-6" />
              <span className="text-base text-gray-700">Application Themes</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      {/* Card 2: Referral Code, Share Our App, Feedback */}
      <div className="w-full max-w-[480px] mx-auto p-4">
        <div className="bg-white rounded-xl shadow p-0 overflow-hidden">
          <button className="flex items-center justify-between w-full px-4 py-4" onClick={() => navigate('/referral-code')}>
            <div className="flex items-center gap-3">
              <img src={QrIcon} alt="Referral Code" className="w-6 h-6" />
              <span className="text-base text-gray-700">Referral Code</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
          <button className="flex items-center justify-between w-full px-4 py-4" onClick={() => navigate('/share-app')}>
            <div className="flex items-center gap-3">
              <img src={ShareIcon} alt="Share Our App" className="w-6 h-6" />
              <span className="text-base text-gray-700">Share Our App</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
          <button className="flex items-center justify-between w-full px-4 py-4" onClick={() => navigate('/feedback')}>
            <div className="flex items-center gap-3">
              <img src={FeedBackIcon} alt="Feedback" className="w-6 h-6" />
              <span className="text-base text-gray-700">Feedback</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>

      {/* Card 3: Version */}
      <div className="w-full max-w-[480px] mx-auto p-4">
        <div className="bg-white rounded-xl shadow p-0 overflow-hidden">
          <div className="flex items-center justify-between w-full px-4 py-4">
            <div className="flex items-center gap-3">
              <img src={VersionIcon} alt="Version" className="w-6 h-6" />
              <span className="text-base text-gray-700">Version</span>
            </div>
            <span className="text-base text-gray-400">V1.0.01</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
