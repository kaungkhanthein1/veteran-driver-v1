import TopBar from "./TopBar";
import MapWithFilterUI from "../googlemap/MapWithFilterUI";
import BottomSheetModal from "./BottomSheetModal";
import BottomSheetModal1 from "./BottomSheetModal1";
import { useState, useEffect } from "react";
import MainContent from "./MainContent";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetCountriesQuery,
  useGetLanguagesQuery,
} from "../services/CountryApi";
import CountryLanguageModal from "../../components/CitySelectModal";
import { useMeQuery } from "../../Pages/services/ProfileApi";
import {
  useGetLocationNearbyQuery,
  useGetRecommandQuery,
} from "../../features/HomeApi";
import NearContent from "./NearContent";

export default function HomePage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCountryLangModal, setShowCountryLangModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [query, setQuery] = useState("");
  const [activeChip, setActiveChip] = useState<string | null>(null);

  const {
    data: recommand,
    isLoading,
    isFetching,
  } = useGetRecommandQuery({ query });
  const places = recommand?.data?.places || [];
  console.log("recommand", recommand);

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

  const { data: newData } = useGetLocationNearbyQuery({});
  const nearByData = newData?.data;
  const handlePlaceSelect = (place: any) => {
    setSelectedPlace(place);
    setIsExpanded(true);
  };

  const isLoadingRecommand = isLoading || isFetching;

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
            <TopBar
              onFlagClick={() => setShowCountryLangModal(true)}
              setQuery={setQuery}
              setActiveChip={setActiveChip}
              activeChip={activeChip}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="flex-1 relative max-w-[480px] mx-auto w-full">
        <MapWithFilterUI
          isExpanded={isExpanded}
          nearbyPlaces={query?.length > 0 ? places : nearByData?.places || []}
          onPlaceSelect={handlePlaceSelect}
        />

        {!selectedPlace ? (
          <BottomSheetModal
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          >
            <MainContent
              places={places}
              query={query}
              isLoadingRecommand={isLoadingRecommand}
            />
          </BottomSheetModal>
        ) : (
          <BottomSheetModal1
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            setSelectedPlace={setSelectedPlace}
          >
            <NearContent
              selectedPlace={selectedPlace}
              setSelectedPlace={setSelectedPlace}
              setIsExpanded={setIsExpanded}
            />
          </BottomSheetModal1>
        )}
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
