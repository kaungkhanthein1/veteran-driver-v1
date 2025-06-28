import React from "react";
import { useNavigate } from "react-router-dom";
import NavHomeIcon from "../../icons/NavBar/NavHome.svg";
import NavExploreIcon from "../../icons/NavBar/NavExplore.svg";
import NavRankingIcon from "../../icons/NavBar/NavRanking.svg";
import NavProfileIcon from "../../icons/NavBar/NavProfile.svg";
import NavHomeActiveIcon from "../../icons/NavBar/NavHomeActive.svg";
import NavExploreActiveIcon from "../../icons/NavBar/NavExploreActive.svg";
import NavRankingActiveIcon from "../../icons/NavBar/NavRankingActive.svg";
import NavProfileActiveIcon from "../../icons/NavBar/NavProfileActive.svg";
import UploadIcon from "../../icons/NavBar/upload.png";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";
import { useSelector } from "react-redux";

interface BottomNavBarProps {
  active: string;
}

export default function BottomNavBar({ active }: BottomNavBarProps) {
  const { hideBar } = useSelector((state: any) => state.hideBarSlice);

  const navigate = useNavigate();
  const { t } = useTranslation();
  const { theme } = useTheme();
  const navBarBorderColor =
    theme === "white" ? "#F4F4F4" : "var(--border-color)";

  const tabs = [
    {
      key: "home",
      label: t("bottomNavBar.home"),
      icon: NavHomeIcon,
      activeIcon: NavHomeActiveIcon,
      path: "/",
    },
    {
      key: "explore",
      label: t("bottomNavBar.explore"),
      icon: NavExploreIcon,
      activeIcon: NavExploreActiveIcon,
      path: "/explore",
    },
    {
      key: "ranking",
      label: t("bottomNavBar.ranking"),
      icon: NavRankingIcon,
      activeIcon: NavRankingActiveIcon,
      path: "/ranking",
    },
    {
      key: "profile",
      label: t("bottomNavBar.profile"),
      icon: NavProfileIcon,
      activeIcon: NavProfileActiveIcon,
      path: "/profile",
    },
  ];

  // Split tabs for left and right of FAB
  const leftTabs = tabs.slice(0, 2);
  const rightTabs = tabs.slice(2);

  console.log(hideBar);

  return (
    <div
      className={`w-full flex justify-center transform transition-all duration-300 ease-in-out
      will-change-transform 
        ${
          hideBar
            ? "translate-y-10 opacity-0 pointer-events-none"
            : "translate-y-0 opacity-100"
        }`}
    >
      <div className="fixed bottom-0 w-full max-w-[480px] z-[999] flex justify-center pointer-events-none">
        {/* FAB */}
        <button
          aria-label="Add"
          className="absolute left-1/2 -translate-x-1/2 -top-6 z-20 flex items-center justify-center w-[60px] h-[60px] rounded-full focus:outline-none pointer-events-auto"
          onClick={() => {
            /* TODO: handle FAB click */
          }}
        >
          <img
            src={UploadIcon}
            alt="Upload"
            className="w-[60px] h-[60px] object-contain"
          />
        </button>
        <div
          className="relative w-full rounded-t-2xl overflow-hidden"
          style={{ maxWidth: 480 }}
        >
          {/* Nav Bar Background with Curved SVG */}
          <svg
            className="absolute bottom-0 left-1/2 -translate-x-1/2 min-w-[100%] h-[100px] pointer-events-auto"
            preserveAspectRatio="none"
            viewBox="0 0 409 88"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ zIndex: 1 }}
          >
            <defs>
              <filter
                id="navBarCurveShadow"
                x="-40"
                y="0"
                width="489"
                height="140"
                filterUnits="userSpaceOnUse"
              >
                <feOffset dy="8" result="offOut" />
                <feGaussianBlur
                  in="offOut"
                  stdDeviation="10"
                  result="blurOut"
                />
                <feColorMatrix
                  in="blurOut"
                  type="matrix"
                  values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.18 0"
                  result="shadow"
                />
                <feBlend in="SourceGraphic" in2="shadow" mode="normal" />
              </filter>
            </defs>
            <g>
              {/* Nav bar background with shadow */}
              <path
                d="M401 86V34C401 22.9543 392.046 14 381 14H272.5C254.827 14 242.261 31.2653 228.839 42.7618C223.598 47.2507 216.113 50.3585 205.5 50.5C194.023 50.653 186.035 47.1523 180.526 42.0804C167.773 30.3375 155.19 14.0003 137.853 14.0002L28 14C16.9543 14 8 22.9543 8 34V86H401Z"
                fill="var(--bg-secondary)"
                filter="url(#navBarCurveShadow)"
              />
              {/* Light stroke for separation */}
              <path
                d="M401 86V34C401 22.9543 392.046 14 381 14H272.5C254.827 14 242.261 31.2653 228.839 42.7618C223.598 47.2507 216.113 50.3585 205.5 50.5C194.023 50.653 186.035 47.1523 180.526 42.0804C167.773 30.3375 155.19 14.0003 137.853 14.0002L28 14C16.9543 14 8 22.9543 8 34V86H401Z"
                fill="none"
                stroke="var(--nav-bar-stroke, rgba(255,255,255,0.10))"
                strokeWidth="1.2"
              />
              {/* Rectangle to fill the very bottom gap */}
              <rect
                x="0"
                y="86"
                width="409"
                height="10"
                fill="var(--bg-secondary)"
              />
            </g>
          </svg>

          {/* Tabs */}
          <div
            className="relative flex justify-between items-end h-[80px] px-4 pointer-events-auto"
            style={{ zIndex: 2 }}
          >
            {/* Left Tabs */}
            <div className="flex flex-1 justify-evenly">
              {leftTabs.map((tab) => (
                <button
                  key={tab.key}
                  aria-label={tab.label}
                  className="flex flex-col items-center min-w-[64px] focus:outline-none"
                  onClick={() => navigate(tab.path)}
                >
                  <div
                    className={`p-2 rounded-full flex items-center justify-center relative`}
                  >
                    <img
                      src={active === tab.key ? tab.activeIcon : tab.icon}
                      alt={tab.label}
                      className={`w-8 h-8 object-contain z-10 ${
                        active === tab.key ? "" : "[filter:var(--icon-filter)]"
                      }`}
                      style={{ display: "block" }}
                    />
                  </div>
                  <span
                    className={`text-sm mt-0 ${
                      active === tab.key
                        ? "text-[#FE740E]"
                        : "text-theme-secondary"
                    }`}
                  >
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
            {/* Spacer for FAB */}
            <div className="w-16" />
            {/* Right Tabs */}
            <div className="flex flex-1 justify-evenly">
              {rightTabs.map((tab) => (
                <button
                  key={tab.key}
                  aria-label={tab.label}
                  className="flex flex-col items-center min-w-[64px] focus:outline-none"
                  onClick={() => navigate(tab.path)}
                >
                  <div
                    className={`p-2 rounded-full flex items-center justify-center relative`}
                  >
                    <img
                      src={active === tab.key ? tab.activeIcon : tab.icon}
                      alt={tab.label}
                      className={`w-8 h-8 object-contain z-10 ${
                        active === tab.key ? "" : "[filter:var(--icon-filter)]"
                      }`}
                      style={{ display: "block" }}
                    />
                  </div>
                  <span
                    className={`text-sm mt-0 ${
                      active === tab.key
                        ? "text-[#FE740E]"
                        : "text-theme-secondary"
                    }`}
                  >
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
