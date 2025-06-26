import React from "react";
import { useNavigate } from "react-router-dom";
import NavHomeIcon from "../../icons/NavBar/NavHome.svg";
import NavExploreIcon from "../../icons/NavBar/NavExplore.svg";
import NavSocialIcon from "../../icons/NavBar/NavSocial.svg";
import NavProfileIcon from "../../icons/NavBar/NavProfile.svg";
import NavHomeActiveIcon from "../../icons/NavBar/NavHomeActive.svg";
import NavExploreActiveIcon from "../../icons/NavBar/NavExploreActive.svg";
import NavSocialActiveIcon from "../../icons/NavBar/NavSocialActive.svg";
import NavProfileActiveIcon from "../../icons/NavBar/NavProfileActive.svg";
import AddBgIcon from "../../icons/NavBar/AddBg.svg";
import AddIcon from "../../icons/NavBar/Add.svg";
import ActiveBgIcon from "../../icons/NavBar/ActiveBg.svg";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

interface BottomNavBarProps {
  active: string;
}

export default function BottomNavBar({ active }: BottomNavBarProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const tabs = [
    {
      key: "home",
      label: t('bottomNavBar.home'),
      icon: NavHomeIcon,
      activeIcon: NavHomeActiveIcon,
      path: "/"
    },
    {
      key: "explore",
      label: t('bottomNavBar.explore'),
      icon: NavExploreIcon,
      activeIcon: NavExploreActiveIcon,
      path: "/explore"
    },
    {
      key: "social",
      label: t('bottomNavBar.social'),
      icon: NavSocialIcon,
      activeIcon: NavSocialActiveIcon,
      path: "/social"
    },
    {
      key: "profile",
      label: t('bottomNavBar.profile'),
      icon: NavProfileIcon,
      activeIcon: NavProfileActiveIcon,
      path: "/profile"
    }
  ];

  // Split tabs for left and right of FAB
  const leftTabs = tabs.slice(0, 2);
  const rightTabs = tabs.slice(2);

  return (
    <div className="w-full flex justify-center">
      <div className="fixed bottom-0 w-full max-w-[480px] z-[999] flex justify-center pointer-events-none">
        {/* FAB */}
        <button
          aria-label="Add"
          className="absolute left-1/2 -translate-x-1/2 -top-6 z-20 flex items-center justify-center w-[60px] h-[60px] rounded-full focus:outline-none pointer-events-auto"
          style={{ boxShadow: '0 4px 24px 0 rgba(253,197,27,0.25)' }}
          onClick={() => { /* TODO: handle FAB click */ }}
        >
          <img src={AddBgIcon} alt="Add Background" className="w-[60px] h-[60px] absolute" style={{ left: 0, top: 0 }} />
          <img src={AddIcon} alt="Add" className="w-8 h-8 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
        </button>
        <div className="relative w-full rounded-t-2xl overflow-hidden" style={{ maxWidth: 480 }}>
          {/* Nav Bar Background with Curved SVG */}
          <svg
            className="absolute bottom-[-2px] left-1/2 -translate-x-1/2 min-w-[100%] h-[100px] pointer-events-auto"
            preserveAspectRatio="none"
            viewBox="0 0 409 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ zIndex: 1, boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18), 0 2px 12px 0 rgba(254,116,14,0.12)' }}
          >
            <g>
              <path d="M401 86V34C401 22.9543 392.046 14 381 14H272.5C254.827 14 242.261 31.2653 228.839 42.7618C223.598 47.2507 216.113 50.3585 205.5 50.5C194.023 50.653 186.035 47.1523 180.526 42.0804C167.773 30.3375 155.19 14.0003 137.853 14.0002L28 14C16.9543 14 8 22.9543 8 34V86H401Z" fill="var(--bg-secondary)" stroke="var(--border-color)" strokeWidth="1"/>
            </g>
          </svg>

          {/* Tabs */}
          <div className="relative flex justify-between items-end h-[80px] px-4 pointer-events-auto" style={{ zIndex: 2 }}>
            {/* Left Tabs */}
            <div className="flex flex-1 justify-evenly">
              {leftTabs.map(tab => (
                <button
                  key={tab.key}
                  aria-label={tab.label}
                  className="flex flex-col items-center min-w-[64px] focus:outline-none"
                  onClick={() => navigate(tab.path)}
                >
                  <div className={`p-2 rounded-full flex items-center justify-center relative`}>
                    <img
                      src={active === tab.key ? tab.activeIcon : tab.icon}
                      alt={tab.label}
                      className={`w-8 h-8 object-contain z-10 ${active === tab.key ? '' : '[filter:var(--icon-filter)]'}`}
                      style={{ display: 'block' }}
                    />
                  </div>
                  <span className={`text-sm mt-0 ${active === tab.key ? "text-[#FE740E]" : "text-theme-secondary"}`}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
            {/* Spacer for FAB */}
            <div className="w-16" />
            {/* Right Tabs */}
            <div className="flex flex-1 justify-evenly">
              {rightTabs.map(tab => (
                <button
                  key={tab.key}
                  aria-label={tab.label}
                  className="flex flex-col items-center min-w-[64px] focus:outline-none"
                  onClick={() => navigate(tab.path)}
                >
                  <div className={`p-2 rounded-full flex items-center justify-center relative`}>
                    <img
                      src={active === tab.key ? tab.activeIcon : tab.icon}
                      alt={tab.label}
                      className={`w-8 h-8 object-contain z-10 ${active === tab.key ? '' : '[filter:var(--icon-filter)]'}`}
                      style={{ display: 'block' }}
                    />
                  </div>
                  <span className={`text-sm mt-0 ${active === tab.key ? "text-[#FE740E]" : "text-theme-secondary"}`}>
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

BottomNavBar.propTypes = {
  active: PropTypes.string.isRequired,
};