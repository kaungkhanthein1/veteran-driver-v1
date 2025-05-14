import React from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "../icons/Home.svg";
import ExploreIcon from "../icons/Explore.svg";
import SocialIcon from "../icons/Social.svg";
import AvatorIcon from "../icons/Avator.svg";

export default function BottomNavBar({ active }) {
  const navigate = useNavigate();

  const tabs = [
    {
      key: "home",
      label: "Home",
      icon: HomeIcon,
      path: "/home"
    },
    {
      key: "explore",
      label: "Explore",
      icon: ExploreIcon,
      path: "/explore"
    },
    {
      key: "social",
      label: "Social",
      icon: SocialIcon,
      path: "/social"
    },
    {
      key: "profile",
      label: "Profile",
      icon: AvatorIcon,
      path: "/profile"
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#232323] border-t border-[#2C2C2C]">
      <div className="flex justify-around items-center px-4 py-2">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className="flex flex-col items-center"
            onClick={() => navigate(tab.path)}
          >
            <div className={`p-2 rounded-full ${active === tab.key ? "bg-[#FDC51B]/10" : ""}`}>
              <img 
                src={tab.icon} 
                alt={tab.label}
                className={`w-6 h-6 ${active === tab.key ? "[filter:invert(77%)_sepia(46%)_saturate(816%)_hue-rotate(359deg)_brightness(102%)_contrast(104%)]" : "text-gray-400"}`}
              />
            </div>
            <span className="text-xs mt-1 text-gray-400">{tab.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}