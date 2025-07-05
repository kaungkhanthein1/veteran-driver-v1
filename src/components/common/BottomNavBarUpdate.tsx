import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import NavHomeIcon from "../../icons/NavBar/NavHome.svg";
import NavHomeActiveIcon from "../../icons/NavBar/NavHomeActive.svg";
import NavBookmarksIcon from "../../icons/NavBar/NavBookmarks.svg";
import NavBookmarksActiveIcon from "../../icons/NavBar/NavBookmarksActive.svg";
import NavProfileIcon from "../../icons/NavBar/NavProfile.svg";
import NavProfileActiveIcon from "../../icons/NavBar/NavProfileActive.svg";

const tabs = [
  {
    key: "home",
    label: "Home",
    icon: NavHomeIcon,
    activeIcon: NavHomeActiveIcon,
    path: "/"
  },
  {
    key: "bookmarks",
    label: "Bookmarks",
    icon: NavBookmarksIcon,
    activeIcon: NavBookmarksActiveIcon,
    path: "/bookmarks"
  },
  {
    key: "profile",
    label: "Profile",
    icon: NavProfileIcon,
    activeIcon: NavProfileActiveIcon,
    path: "/profile"
  }
];

export default function BottomNavBarUpdate() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-full flex justify-center">
      <div className="fixed bottom-0 w-full max-w-[480px] z-[999] flex justify-center bg-white border-t border-[#F4F4F4]">
        <div className="flex w-full justify-between items-center px-6 py-1">
          {tabs.map(tab => {
            // For home, only exact match on '/'. For others, exact match on their path.
            const isActive = location.pathname === tab.path || (tab.path === '/' && location.pathname === '/');
            return (
              <button
                key={tab.key}
                aria-label={tab.label}
                className="flex flex-col items-center flex-1 focus:outline-none"
                onClick={() => navigate(tab.path)}
              >
                <img
                  src={isActive ? tab.activeIcon : tab.icon}
                  alt={tab.label}
                  className="w-7 h-7 object-contain mb-1"
                />
                <span className="text-xs text-black font-normal">
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
} 