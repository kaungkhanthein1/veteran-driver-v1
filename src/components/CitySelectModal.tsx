import React, { useState, useEffect } from "react";
import {
  useGetCountriesQuery,
  useGetLanguagesQuery,
} from "../Pages/services/CountryApi";
import { useDispatch, useSelector } from "react-redux";
import { setCountry, setLanguage } from "../app/countrySlice";
import { motion, AnimatePresence } from "framer-motion";

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
  const dispatch = useDispatch();
  const { data: countries = [] } = useGetCountriesQuery();
  const { data: languages = [] } = useGetLanguagesQuery();
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
      setSelectedCountry(globalSelectedCountry);
      setSelectedLanguage(globalSelectedLanguage);
    }
  }, [open, globalSelectedCountry, globalSelectedLanguage]);

  const handleApply = () => {
    if (selectedCountry) dispatch(setCountry(selectedCountry));
    if (selectedLanguage) dispatch(setLanguage(selectedLanguage));
    onClose();
  };

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
          <div className="absolute inset-0 bg-black bg-opacity-40" />
          {/* Modal Content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative z-10 w-full sm:max-w-md mx-0 p-4 max-h-[80vh] overflow-y-auto bg-white rounded-t-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className=" bg-[#BBB] rounded-[12px] w-[48px] h-[4px] mx-auto mb-[30px]"></div>
            <div className="" style={{ display: "flex", marginBottom: 16 }}>
              <button
                style={{
                  flex: 1,
                  fontWeight: tab === "country" ? "bold" : "normal",
                  background: tab === "country" ? "#FFD600" : "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: 8,
                  cursor: "pointer",
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setTab("country");
                }}
              >
                Country
              </button>
              <button
                style={{
                  flex: 1,
                  fontWeight: tab === "language" ? "bold" : "normal",
                  background: tab === "language" ? "#FFD600" : "#fff",
                  border: "none",
                  borderRadius: 8,
                  padding: 8,
                  cursor: "pointer",
                }}
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
                {countries.map((c: Country) => (
                  <div
                    key={c.id}
                    onClick={() => setSelectedCountry(c)}
                    className={`${
                      selectedCountry?.id === c.id
                        ? "country_card_flag_active"
                        : "country_card_flag"
                    } flex flex-col items-center justify-center p-[10px] gap-[8px]`}
                  >
                    <img
                      src={c.flag}
                      alt={c.code}
                      style={{ width: 40, height: 30 }}
                    />
                    <div
                      className="text-[14px] text-black font-[400] truncate w-full text-center"
                      title={c.translations?.[0]?.name || c.code}
                    >
                      {c.translations?.[0]?.name || c.code}
                    </div>
                  </div>
                ))}
              </div>
            )}
            {tab === "language" && (
              <div style={{ marginBottom: 24 }}>
                {languages.map((l: Language) => (
                  <div
                    key={l.code}
                    onClick={() => setSelectedLanguage(l)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "8px 0",
                      cursor: "pointer",
                      borderBottom: "1px solid #eee",
                      background:
                        selectedLanguage?.code === l.code ? "#fffbe6" : "#fff",
                    }}
                  >
                    <input
                      type="radio"
                      checked={selectedLanguage?.code === l.code}
                      readOnly
                      style={{ marginRight: 12 }}
                    />
                    <div>
                      <div style={{ fontSize: 16 }}>{l.name}</div>
                      {l.description && (
                        <div style={{ fontSize: 12, color: "#888" }}>
                          {l.description}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              style={{
                width: "100%",
                padding: "12px 0",
                background: "linear-gradient(90deg, #FFD600 0%, #FFB800 100%)",
                border: "none",
                borderRadius: 24,
                fontWeight: "bold",
                fontSize: 16,
                color: "#fff",
                marginTop: 8,
                cursor: "pointer",
              }}
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
