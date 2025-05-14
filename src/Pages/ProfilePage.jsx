import React from "react";
import BottomNavBar from "../components/BottomNavBar";
// Import icons
import WalletIcon from "../icons/Profile/Wallet.svg";
import UploadedLocationIcon from "../icons/Profile/UploadedLocation.svg";
import BookMarkedLocationIcon from "../icons/Profile/BookMarkedLocation.svg";
import AppThemeIcon from "../icons/Profile/AppTheme.svg";
import AppLanguageIcon from "../icons/Profile/AppLanguage.svg";
import ShareAppIcon from "../icons/Profile/ShareApp.svg";
import HelpCenterIcon from "../icons/Profile/HelpCenter.svg";
import ContactUsIcon from "../icons/Profile/ContactUs.svg";
import LogoutIcon from "../icons/Profile/Logout.svg";

export default function ProfilePage() {
  const userProfile = {
    name: "Rachel Zane Noel",
    uid: "5839234",
    location: "Phnom Penh, Cambodia",
    bio: "Passionate traveler 🌏 embracing the journey.",
    avatar: "/path/to/avatar.jpg"
  };

  const menuItems = [
    {
      id: 1,
      icon: WalletIcon,
      title: "My point wallet",
      type: "card"
    },
    {
      id: 2,
      icon: UploadedLocationIcon,
      title: "My uploaded location",
      type: "card"
    },
    {
      id: 3,
      icon: BookMarkedLocationIcon,
      title: "Bookmark Location",
      type: "list"
    },
    {
      id: 4,
      icon: AppThemeIcon,
      title: "Change Application Theme",
      type: "list"
    },
    {
      id: 5,
      icon: AppLanguageIcon,
      title: "Change Application Language",
      type: "list"
    },
    {
      id: 6,
      icon: ShareAppIcon,
      title: "Share Our Application",
      type: "list"
    },
    {
      id: 7,
      icon: HelpCenterIcon,
      title: "Help Center",
      type: "list"
    },
    {
      id: 8,
      icon: ContactUsIcon,
      title: "Contact Us",
      type: "list"
    }
  ];

  return (
    <div className="min-h-screen bg-[#181818] text-white">
      {/* Header */}
      <div className="px-4 pt-4 pb-6">
        <div className="flex justify-between items-center mb-6">
          <button className="flex items-center gap-2">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
            <span>Edit Profile</span>
          </button>
          <div className="flex gap-4">
            <button>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <button>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Profile Info */}
        <div className="flex items-start gap-4">
          <div className="w-20 h-20 rounded-full overflow-hidden">
            <img src={userProfile.avatar} alt={userProfile.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-semibold">{userProfile.name}</h1>
              <span className="text-pink-500">♀</span>
            </div>
            <p className="text-gray-400 text-sm">(UID : {userProfile.uid})</p>
            <div className="flex items-center gap-1 text-gray-400 mt-1">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              </svg>
              <span className="text-sm">{userProfile.location}</span>
            </div>
            <p className="text-sm mt-1">{userProfile.bio}</p>
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="px-4 grid grid-cols-2 gap-3 mb-4">
        {menuItems.filter(item => item.type === "card").map(item => (
          <button key={item.id} className="bg-[#232323] rounded-lg p-4 flex flex-col items-center justify-center gap-2">
            <img src={item.icon} alt={item.title} className="w-8 h-8" />
            <span className="text-sm">{item.title}</span>
          </button>
        ))}
      </div>

      {/* Menu List */}
      <div className="px-4 space-y-2">
        {menuItems.filter(item => item.type === "list").map(item => (
          <button key={item.id} className="w-full bg-[#232323] rounded-lg p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={item.icon} alt={item.title} className="w-6 h-6" />
              <span>{item.title}</span>
            </div>
            <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>

      {/* Logout Button */}
      <div className="px-4 py-6">
        <button className="w-full bg-[#232323] rounded-lg py-4 flex items-center justify-center gap-2">
          <img src={LogoutIcon} alt="Logout" className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>

      <BottomNavBar active="profile" />
    </div>
  );
}