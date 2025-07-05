import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DropdownArrow from "icons/HomeUpdate/Dropdown.svg";
import CountryFlag from "icons/HomeUpdate/thai.png";
import HotelIcon from "icons/HomeUpdate/Hotel.png";
import BarIcon from "icons/HomeUpdate/Bar.png";
import LadyIcon from "icons/HomeUpdate/Lady.png";
import axios from "axios";

export default function TopBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const { name } = useSelector((state: any) => state.country);
  const token = localStorage.getItem("token");

  const [state, setState] = useState("");

  useEffect(() => {
    // Check if location is already stored in localStorage
    const storedLocation = localStorage.getItem("locaion");
    if (storedLocation) {
      setState(storedLocation);
    }
  }, []);

  // Active filter chip state
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const filterChips = [
    { key: "hotels", label: "Hotels", icon: HotelIcon },
    { key: "bar", label: "Bar & Drinks", icon: BarIcon },
    { key: "lady", label: "Lady", icon: LadyIcon },
  ];

  useEffect(() => {
    async function fetchLocation() {
      try {
        // First get current position
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude: lat, longitude: lon } = position?.coords;

        const response = await axios({
          method: "GET",
          url: `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
        });

        setState(response.data?.display_name || "Unknown Location");
        localStorage.setItem("locaion", response.data?.display_name);
      } catch (err) {
        console.error("Error:", err);
        if (err?.code === err?.PERMISSION_DENIED) {
          console.log("User denied geolocation prompt");
        }
      }
    }

    // Check if geolocation is available
    if ("geolocation" in navigator && !localStorage.getItem("locaion")) {
      fetchLocation();
    } else {
      console.log("Geolocation is not supported by this browser");
    }
  }, []);

  return (
    <div className="pb-2 px-4 pt-10 bg-gradient-to-b from-white from-60% via-white via-70% to-transparent">
      <div className="flex justify-between items-center mb-4 mr-6">
        {token ? (
          <div className="truncate display_name">{state}</div>
        ) : (
          <button
            onClick={() =>
              navigate("/login", { state: { background: location } })
            }
            className="text-xl font-bold text-theme-text focus:outline-none"
          >
            {t("loginPage.title")} {t("loginPage.orText")}{" "}
            {t("registerPage.title")}
          </button>
        )}

        {/* Country Selector */}
        <div
          onClick={() =>
            dispatch({ type: "country/changeCountry", payload: "thailand" })
          }
          className="flex items-center text-theme-text text-sm cursor-pointer ml-4"
        >
          <img src={CountryFlag} alt="Thailand Flag" className="w-5 h-5 mr-2" />
          <span>{name || "VNM"}</span>
          <img
            src={DropdownArrow}
            alt="Dropdown"
            className="w-3 h-3 ml-1 [filter:var(--icon-filter)]"
          />
        </div>
      </div>
      {!token && (
        <div className="text-theme-secondary text-base mb-4 ml-1">
          One login to explore it all.
        </div>
      )}

      {/* Search Bar */}
      <div className="flex items-center">
        <div className="bg-[#F2F4FA] rounded-full px-3 py-2 flex items-center flex-grow">
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
              ${
                activeChip === chip.key
                  ? "bg-gradient-to-r from-yellow-200 to-yellow-100 text-black border-yellow-200 shadow-md"
                  : "bg-theme-primary border-theme-primary text-theme-text"
              }
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
