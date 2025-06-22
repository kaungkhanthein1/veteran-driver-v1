import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import BottomNavBar from "../components/common/BottomNavBar";
// Import icons
import WalletIcon from "icons/Profile/Wallet.svg";
import UploadedLocationIcon from "icons/Profile/UploadedLocation.svg";
import BookMarkedLocationIcon from "icons/Profile/BookMarkedLocation.svg";
import AppThemeIcon from "icons/Profile/AppTheme.svg";
import AppLanguageIcon from "icons/Profile/AppLanguage.svg";
import ShareAppIcon from "icons/Profile/ShareApp.svg";
import HelpCenterIcon from "icons/Profile/HelpCenter.svg";
import ContactUsIcon from "icons/Profile/ContactUs.svg";
import LogoutIcon from "icons/Profile/Logout.svg";
import DefaultAvator from "icons/DefaultAvator.svg";
import DefaultAvatorWhite from "icons/DefaultAvatorWhite.svg";
import NotificationIcon from "icons/Notification.svg";
import SettingIcon from "icons/Setting.svg";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageModal from "../components/common/LanguageModal";
import NotificationsPage from "../Pages/Profile/NotificationsPage";
import Modal from "../components/common/Modal";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

export default function ProfilePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [theme, setTheme] = useState<string>(document.documentElement.getAttribute('data-theme') || 'dark');

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  const userProfile = {
    avatar: theme === 'white' ? DefaultAvatorWhite : DefaultAvator
  };
  const location = useLocation();
  const state = location.state as { background?: Location };

  useEffect(() => {
    console.log("ProfilePage - location.state.background:", location.state?.background);
  }, [location.state?.background]);

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
    <div className="dvh-fallback flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16">
          {/* Header */}
          <div className="px-4 pt-4 pb-6">
            <div className="flex justify-end items-center mb-6">
              <div className="flex gap-4">
                <button>
                  <img 
                    src={NotificationIcon} 
                    alt={t('profile.notification')} 
                    className="w-6 h-6 [filter:var(--icon-filter)]" 
                    onClick={() => navigate('/notifications')}
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
            <button className="flex items-center gap-4 w-full" onClick={() => navigate('/login', { state: { background: location } })}> 
              <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center bg-theme-secondary">
                <img src={userProfile.avatar} alt="Default Avatar" className="w-full h-full [filter:var(--icon-filter)]" />
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">{t('profile.loginOrSignUp')}</h1>
                <svg className="w-5 h-5 text-theme-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
          </div>

          {/* Menu Grid */}
          <div className="px-4 grid grid-cols-2 gap-3 mb-4">
            {menuItems.filter(item => item.type === "card").map(item => (
              <button 
                key={item.id} 
                className="bg-theme-secondary rounded-lg p-4 flex flex-col items-center justify-center gap-2"
                onClick={() => {
                  if (item.title === "My point wallet") {
                    navigate('/wallet');
                  } else if (item.title === "My uploaded location") {
                    navigate('/uploaded-location');
                  }
                }}
              >
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
                  } else if (item.title === "Bookmark Location") {
                    navigate("/bookmarks");
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
        </div>
        {!state?.background && <BottomNavBar active="profile" />} 
      </div>
      <LanguageModal 
        isOpen={showLanguageModal} 
        onClose={() => setShowLanguageModal(false)} 
      />
    </div>
  );
}
