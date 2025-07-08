import React from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface MapSideBarProps {
  onRecenterClick: () => void;
  isExpanded: boolean;
}

const MapSideBar = ({ onRecenterClick, isExpanded }: MapSideBarProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate()

  if (isExpanded) return null;

  return (
    <div className="absolute right-4 flex flex-col gap-3 z-50 bottom-52">
      <button
        onClick={onRecenterClick}
        className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center"
      >
        <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_i_4123_5470)">
          <circle cx="23" cy="23" r="23" fill="white"/>
          </g>
          <path fillRule="evenodd" clipRule="evenodd" d="M20.6933 24.6381C20.6933 24.6381 8.7166 22.1606 12.8786 19.758C16.3907 17.7307 28.4946 14.2452 30.1856 15.1458C31.0863 16.8368 27.6006 28.9407 25.5733 32.4528C23.1708 36.6148 20.6933 24.6381 20.6933 24.6381Z" fill="url(#paint0_linear_4123_5470)"/>
          <defs>
          <filter id="filter0_i_4123_5470" x="0" y="0" width="46" height="46" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix"/>
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset/>
          <feGaussianBlur stdDeviation="4"/>
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
          <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.8 0"/>
          <feBlend mode="normal" in2="shape" result="effect1_innerShadow_4123_5470"/>
          </filter>
          <linearGradient id="paint0_linear_4123_5470" x1="21.1657" y1="15" x2="21.1657" y2="33.3314" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFC61B"/>
          <stop offset="1" stopColor="#FF9500"/>
          </linearGradient>
          </defs>
        </svg>
      </button>
    </div>
  );
};

export default MapSideBar;
