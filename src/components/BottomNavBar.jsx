import React from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../icons/Home.svg";
import ExploreIcon from "../icons/Explore.svg";
import SocialIcon from "../icons/Social.svg";
import AccountCircleIcon from "../icons/AccountCircle.svg";

const tabs = [
  {
    key: "home",
    label: "Home",
    icon: <img src={HomeIcon} alt="Home" className="w-6 h-6" />,
    route: "/home",
  },
  {
    key: "explore",
    label: "Explore",
    icon: <img src={ExploreIcon} alt="Explore" className="w-6 h-6" />,
    route: "/explore",
  },
  {
    key: "social",
    label: "Social",
    icon: <img src={SocialIcon} alt="Social" className="w-6 h-6" />,
    route: "/social",
  },
  {
    key: "profile",
    label: "Profile",
    icon: <img src={AccountCircleIcon} alt="Profile" className="w-6 h-6" />,
    route: "/profile",
  },
];

export default function BottomNavBar({ active }) {
  const navigate = useNavigate();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#232323] border-t border-gray-800 flex justify-around items-center h-16 z-50">
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={`flex flex-col items-center justify-center flex-1 py-2 transition-colors ${
            active === tab.key ? "text-yellow-400" : "text-gray-400"
          }`}
          onClick={() => navigate(tab.route)}
        >
          {tab.icon}
          <span className="text-xs mt-1">{tab.label}</span>
        </button>
      ))}
    </nav>
  );
}