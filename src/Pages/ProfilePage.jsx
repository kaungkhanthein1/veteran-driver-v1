import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
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
import ProfilePic from "../icons/Profile/ProfilePic.svg";
import NotificationIcon from "../icons/Notification.svg";
import SettingIcon from "../icons/Setting.svg";
import { useNavigate } from "react-router-dom";
import LanguageModal from "../components/LanguageModal";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const userProfile = {
    name: "Rachel Zane Noel",
    uid: "5839234",
    location: "Phnom Penh, Cambodia",
    bio: "Passionate traveler 🌏 embracing the journey.",
    avatar: ProfilePic
  };

  const menuItems = [
    {
      id: 1,
      icon: WalletIcon,
      title: "My point wallet",
      translationKey: "profile.pointwallet",
      type: "card"
    },
    {
      id: 2,
      icon: UploadedLocationIcon,
      title: "My uploaded location",
      translationKey: "profile.uploadedlocation",
      type: "card"
    },
    {
      id: 3,
      icon: BookMarkedLocationIcon,
      title: "Bookmark Location",
      translationKey: "profile.bookmarklocation",
      type: "list"
    },
    {
      id: 4,
      icon: AppThemeIcon,
      title: "Change Application Theme",
      translationKey: "profile.changeapplicationtheme",
      type: "list"
    },
    {
      id: 5,
      icon: AppLanguageIcon,
      title: "Change Application Language",
      translationKey: "profile.changeapplicationlanguage",
      type: "list"
    },
    {
      id: 6,
      icon: ShareAppIcon,
      title: "Share Our Application",
      translationKey: "profile.shareourapplication",
      type: "list"
    },
    {
      id: 7,
      icon: HelpCenterIcon,
      title: "Help Center",
      translationKey: "profile.helpcenter",
      type: "list"
    },
    {
      id: 8,
      icon: ContactUsIcon,
      title: "Contact Us",
      translationKey: "profile.contactus",
      type: "list"
    }
  ];

  return (
    <div className="min-h-screen flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16">
          {/* Header */}
          <div className="px-4 pt-4 pb-6">
            <div className="flex justify-between items-center mb-6">
              <button className="flex items-center gap-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
                <span>{t('profile.editprofile')}</span>
              </button>
              <div className="flex gap-4">
                <button>
                  <img 
                    src={NotificationIcon} 
                    alt={t('profile.notification')} 
                    className="w-6 h-6 [filter:var(--icon-filter)]" 
                  />
                </button>
                <button onClick={() => navigate('/settings')}>
                  <img 
                    src={SettingIcon} 
                    alt={t('profile.settings')} 
                    className="w-6 h-6 [filter:var(--icon-filter)]" 
                  />
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
                <p className="text-theme-secondary text-sm">(UID : {userProfile.uid})</p>
                <div className="flex items-center gap-1 text-theme-secondary mt-1">
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
              <button key={item.id} className="bg-theme-secondary rounded-lg p-4 flex flex-col items-center justify-center gap-2">
                <img 
                  src={item.icon} 
                  alt={t(item.translationKey)} 
                  className="w-8 h-8 [filter:var(--icon-filter)]" 
                />
                <span className="text-sm">{t(item.translationKey)}</span>
              </button>
            ))}
          </div>

          {/* Menu List */}
          <div className="px-4 space-y-2">
            {menuItems.filter(item => item.type === "list").map(item => (
              <button 
                key={item.id} 
                className="w-full bg-theme-secondary rounded-lg p-4 flex items-center justify-between"
                onClick={() => {
                  if (item.title === "Change Application Theme") {
                    navigate("/theme");
                  } else if (item.title === "Change Application Language") {
                    setShowLanguageModal(true);
                  }
                }}
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={item.icon} 
                    alt={t(item.translationKey)} 
                    className="w-6 h-6 [filter:var(--icon-filter)]" 
                  />
                  <span>{t(item.translationKey)}</span>
                </div>
                <svg className="w-5 h-5 text-theme-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            ))}
          </div>

          {/* Logout Button */}
          <div className="px-4 py-6">
            <button className="w-full bg-theme-secondary rounded-lg py-4 flex items-center justify-center gap-2">
              <img 
                src={LogoutIcon} 
                alt={t('profile.logout')} 
                className="w-5 h-5 [filter:var(--icon-filter)]" 
              />
              <span>{t('profile.logout')}</span>
            </button>
          </div>
        </div>
        <BottomNavBar active="profile" />
      </div>
    </div>
  );
}