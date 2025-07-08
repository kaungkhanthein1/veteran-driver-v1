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
    <div className="absolute right-4 flex flex-col gap-3 z-50 bottom-64">
      <button
        onClick={onRecenterClick}
        className="w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center"
      >
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M9.69325 10.6381C9.69325 10.6381 -2.2834 8.16057 1.87855 5.75802C5.3907 3.73072 17.4946 0.245168 19.1856 1.14577C20.0862 2.83677 16.6006 14.9407 14.5733 18.4528C12.1709 22.6148 9.69325 10.6381 9.69325 10.6381Z" stroke="#444444" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      </button>
    </div>
  );
};

export default MapSideBar;
