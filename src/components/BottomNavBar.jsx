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
    <div className="w-full flex justify-center">
      <div className="fixed bottom-0 w-full max-w-[480px] bg-theme-secondary border-t z-[999] border-theme">
        <div className="flex justify-around items-center px-4 py-2">
          {tabs.map(tab => (
            <button
              key={tab.key}
              className="flex flex-col items-center min-w-[64px]"
              onClick={() => navigate(tab.path)}
            >
              <div className={`p-2 rounded-full flex items-center justify-center ${active === tab.key ? "bg-[#FDC51B]/10" : ""}`}>
                <img 
                  src={tab.icon} 
                  alt={tab.label}
                  className={`${(tab.key === 'home' || tab.key === 'explore') ? 'w-[27px] h-[27px]' : 'w-[22px] h-[22px]'} object-contain ${active === tab.key ? "[filter:brightness(0)_saturate(100%)_invert(89%)_sepia(61%)_saturate(1415%)_hue-rotate(319deg)_brightness(103%)_contrast(101%)]" : "[filter:var(--icon-filter)]"}`}
                  style={{ display: 'block' }}
                />
              </div>
              <span className="text-xs mt-1 text-theme-secondary">
                {tab.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}