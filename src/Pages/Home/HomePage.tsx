import TopBar from "./TopBar";
import MapWithFilterUI from "../map/MapWithFilterUI";
import BottomSheetModal from "./BottomSheetModal";
import { useState, useEffect } from "react";
import MainContent from "./MainContent";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetCountriesQuery,
  useGetLanguagesQuery,
} from "../services/CountryApi";
import CountryLanguageModal from "../../components/CitySelectModal";
import { useMeQuery } from "../../Pages/services/ProfileApi";

export default function HomePage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCountryLangModal, setShowCountryLangModal] = useState(false);

  // Fetch countries and languages using RTK Query
  const {
    data: countries,
    error: countriesError,
    isLoading: countriesLoading,
  } = useGetCountriesQuery();
  const {
    data: languages,
    error: languagesError,
    isLoading: languagesLoading,
  } = useGetLanguagesQuery();
  const { data } = useMeQuery();

  console.log(countries,languages)

  return (
    <div className="flex flex-col h-full relative bg-theme-primary">
      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            className="fixed top-0 left-0 right-0 z-50 max-w-[480px] mx-auto"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <TopBar onFlagClick={() => setShowCountryLangModal(true)} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-1 relative max-w-[480px] mx-auto w-full">
        <MapWithFilterUI isExpanded={isExpanded} />
        <BottomSheetModal isExpanded={isExpanded} setIsExpanded={setIsExpanded}>
          <MainContent />
        </BottomSheetModal>
      </div>
      <CountryLanguageModal
        languages={languages}
        countries={countries}
        open={showCountryLangModal}
        onClose={() => setShowCountryLangModal(false)}
      />
    </div>
  );
}
