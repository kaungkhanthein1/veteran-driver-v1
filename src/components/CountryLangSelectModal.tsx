import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { setCountry, setLanguage } from "../app/countrySlice";
import { motion, AnimatePresence } from "framer-motion";
import "../Pages/map/map.css";
import {
  useGetSupportedCountriesQuery,
  useGetSupportedLanguagesQuery,
} from "../Pages/services/GeoApi";
import { SupportedCountriesResponseDto } from "../dto";

interface CountryLanguageModalProps {
  open: boolean;
  onClose: () => void;
}

interface Country {
  id: string;
  flag: string;
  code: string;
  translations?: { name: string }[];
}

interface Language {
  code: string;
  name: string;
  description?: string;
}

interface RootState {
  country: {
    selectedCountry: Country | null;
    selectedLanguage: Language | null;
  };
}

const CountryLanguageModal = ({ open, onClose }: CountryLanguageModalProps) => {
  const { data: countries = [] } = useGetSupportedCountriesQuery();
  const { data: languages = [] } = useGetSupportedLanguagesQuery();
  const dispatch = useDispatch();

  const globalSelectedCountry = useSelector(
    (state: RootState) => state.country.selectedCountry
  );
  const globalSelectedLanguage = useSelector(
    (state: RootState) => state.country.selectedLanguage
  );
  const [tab, setTab] = useState<"country" | "language">("country");

  // Local state for selection
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(
    globalSelectedCountry
  );
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(
    globalSelectedLanguage
  );

  // Sync local state with global when modal opens
  useEffect(() => {
    if (open) {
      // If no global selectedCountry, default to first country from API
      if (!globalSelectedCountry && countries.length > 0) {
        const country = countries[0] as unknown as Country;
        setSelectedCountry(country);
        dispatch(setCountry(country));
      } else {
        setSelectedCountry(globalSelectedCountry);
      }
      // If no global selectedLanguage, default to first language from API
      if (!globalSelectedLanguage && languages.length > 0) {
        const language = languages[0] as unknown as Language;
        setSelectedLanguage(language);
        dispatch(setLanguage(language));
      } else {
        setSelectedLanguage(globalSelectedLanguage);
      }
    }
  }, [
    open,
    globalSelectedCountry,
    globalSelectedLanguage,
    countries,
    languages,
    dispatch,
  ]);

  const handleApply = () => {
    if (selectedCountry) dispatch(setCountry(selectedCountry));
    if (selectedLanguage) dispatch(setLanguage(selectedLanguage));
    onClose();
  };

  const selectedLan = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 17C13.3833 17 14.5625 16.5125 15.5375 15.5375C16.5125 14.5625 17 13.3833 17 12C17 10.6167 16.5125 9.4375 15.5375 8.4625C14.5625 7.4875 13.3833 7 12 7C10.6167 7 9.4375 7.4875 8.4625 8.4625C7.4875 9.4375 7 10.6167 7 12C7 13.3833 7.4875 14.5625 8.4625 15.5375C9.4375 16.5125 10.6167 17 12 17ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z"
        fill="url(#paint0_linear_3691_7693)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_3691_7693"
          x1="12"
          y1="2"
          x2="12"
          y2="22"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFC61B" />
          <stop offset="1" stopColor="#FF9500" />
        </linearGradient>
      </defs>
    </svg>
  );

  const unselectedLan = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
    >
      <path
        d="M22 11C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0C17.0751 0 22 4.92487 22 11ZM2.21792 11C2.21792 15.8502 6.14979 19.7821 11 19.7821C15.8502 19.7821 19.7821 15.8502 19.7821 11C19.7821 6.14979 15.8502 2.21792 11 2.21792C6.14979 2.21792 2.21792 6.14979 2.21792 11Z"
        fill="black"
        fillOpacity="0.12"
      />
    </svg>
  );

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-end justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60" />
          {/* Modal Content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-10 w-full sm:max-w-md mx-0 p-4 h-[80vh] overflow-y-auto bg-white rounded-t-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className=" bg-[#BBB] rounded-[12px] w-[48px] h-[4px] mx-auto mb-[30px]"></div>
            <div className=" flex justify-center items-center">
              <button
                className={`${
                  tab === "country" ? "selected_tabs" : "unselected_tabs"
                } py-[10px] px-[28px]`}
                onClick={(e) => {
                  e.stopPropagation();
                  setTab("country");
                }}
              >
                Country
              </button>
              <button
                className={`${
                  tab === "language" ? "selected_tabs" : "unselected_tabs"
                } py-[10px] px-[28px]`}
                onClick={(e) => {
                  e.stopPropagation();
                  setTab("language");
                }}
              >
                Language
              </button>
            </div>
            {tab === "country" && (
              <div className="grid grid-cols-3 gap-[20px] my-[40px]">
                {countries?.map((c: SupportedCountriesResponseDto) => (
                  <div
                    key={c.code}
                    onClick={() => setSelectedCountry(c as unknown as Country)}
                    className={`${
                      selectedCountry?.code === c.code
                        ? "country_card_flag_active"
                        : "country_card_flag"
                    } flex flex-col items-center justify-center p-[10px] gap-[8px]`}
                  >
                    <img
                      src={c.flag || ''}
                      alt={c.code}
                      style={{ width: 40, height: 30 }}
                    />
                    <div
                      className="text-[14px] text-black font-[400] truncate w-full text-center"
                      title={c.name || c.code}
                    >
                      {c.name || c.code}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === "language" && (
              <div style={{ marginBottom: 24 }}>
                {languages?.map((l: Language) => (
                  <div
                    key={l.code}
                    onClick={() => setSelectedLanguage(l)}
                    className={`flex w-full justify-between items-center py-[16px] ${
                      selectedLanguage?.code === l.code ? "" : ""
                    }`}
                  >
                    <div>
                      <div style={{ fontSize: 16 }}>{l.name}</div>
                      {l.name && (
                        <div style={{ fontSize: 12, color: "#888" }}>
                          {l.name}
                        </div>
                      )}
                    </div>
                    {/* <input
                      type="radio"
                      checked={selectedLanguage?.code === l.code}
                      readOnly
                      style={{ marginRight: 12 }}
                    /> */}
                    <div className="">
                      {selectedLanguage?.code === l.code
                        ? selectedLan
                        : unselectedLan}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              className="country_apply_btn w-[90%] flex justify-center items-center py-[16px] fixed bottom-10 left-0 right-0 mx-auto"
              onClick={handleApply}
            >
              Apply
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CountryLanguageModal;
