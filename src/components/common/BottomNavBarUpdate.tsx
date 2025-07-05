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

  // Determine active tab by path
  const activeTab = tabs.find(tab => location.pathname.startsWith(tab.path))?.key || "home";

  return (
    <div className="w-full flex justify-center">
      <div className="fixed bottom-0 w-full max-w-[480px] z-[999] flex justify-center bg-white border-t border-[#F4F4F4]">
        <div className="flex w-full justify-between items-center px-6 py-1">
          {tabs.map(tab => (
            <button
              key={tab.key}
              aria-label={tab.label}
              className="flex flex-col items-center flex-1 focus:outline-none"
              onClick={() => navigate(tab.path)}
            >
              <img
                src={activeTab === tab.key ? tab.activeIcon : tab.icon}
                alt={tab.label}
                className="w-7 h-7 object-contain mb-1"
              />
              <span className={`text-xs ${activeTab === tab.key ? "text-[#FE740E] font-semibold" : "text-theme-secondary"}`}>
                {tab.label}
              </span>
              {/* Active underline */}
              {activeTab === tab.key && (
                <div className="w-6 h-1 rounded-full bg-[#FE740E] mt-1" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
} 