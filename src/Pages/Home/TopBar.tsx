import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import DropdownArrow from "icons/HomeUpdate/Dropdown.svg";
import CountryFlag from "icons/HomeUpdate/thai.png";
import HotelIcon from "icons/HomeUpdate/Hotel.png";
import BarIcon from "icons/HomeUpdate/Bar.png";
import LadyIcon from "icons/HomeUpdate/Lady.png";

export default function TopBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { name } = useSelector((state: any) => state.country);

  // Active filter chip state
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const filterChips = [
    { key: "hotels", label: "Hotels", icon: HotelIcon },
    { key: "bar", label: "Bar & Drinks", icon: BarIcon },
    { key: "lady", label: "Lady", icon: LadyIcon },
  ];

  return (
    <div className="px-4 pt-5 pb-2 bg-gradient-to-b from-gray-100">
      <div className="flex justify-between items-center mb-1">
        <button
          onClick={() => navigate('/login', { state: { background: location } })}
          className="text-xl font-bold text-theme-text focus:outline-none"
        >
          {t("loginPage.title")} {t("loginPage.orText")} {t("registerPage.title")}
        </button>
        {/* Country Selector */}
        <div
          onClick={() => dispatch({ type: 'country/changeCountry', payload: 'thailand' })}
          className="flex items-center text-theme-text text-sm cursor-pointer ml-4"
        >
          <img
            src={CountryFlag}
            alt="Thailand Flag"
            className="w-5 h-5 mr-2"
          />
          <span>{name || 'VNM'}</span>
          <img
            src={DropdownArrow}
            alt="Dropdown"
            className="w-3 h-3 ml-1 [filter:var(--icon-filter)]"
          />
        </div>
      </div>
      <div className="text-theme-secondary text-base mb-4 ml-1">
        One login to explore it all.
      </div>
      {/* Search Bar */}
      <div className="flex items-center">
        <div className="bg-theme-primary rounded-full px-3 py-2 flex items-center flex-grow">
          <svg
            className="w-5 h-5 text-theme-secondary mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          <input
            onClick={() => navigate("/search")}
            type="text"
            placeholder={t("explorePage.searchPlaceholder")}
            className="bg-transparent text-theme-text w-full outline-none focus:outline-none border-none"
          />
        </div>
      </div>
      {/* Filter Chips Row */}
      <div className="flex gap-2 px-1 pt-3 pb-1 overflow-x-auto no-scrollbar h-12 items-center whitespace-nowrap">
        {filterChips.map((chip) => (
          <button
            key={chip.key}
            onClick={() => setActiveChip(chip.key)}
            className={`flex items-center gap-1 px-4 py-1 h-9 rounded-full border text-base transition-colors duration-150
              ${activeChip === chip.key
                ? 'bg-gradient-to-r from-yellow-200 to-yellow-100 text-black border-yellow-200 shadow-md'
                : 'bg-theme-primary border-theme-primary text-theme-text'}
            `}
          >
            <img src={chip.icon} alt={chip.label} className="w-5 h-5" />
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
}