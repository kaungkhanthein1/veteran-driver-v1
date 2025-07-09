import TopBar from "./TopBar";
import MapWithFilterUI from "../googlemap/MapWithFilterUI";
import BottomSheetModal from "./BottomSheetModal";
import BottomSheetModal1 from "./BottomSheetModal1";
import { useState, useEffect } from "react";
import MainContent from "./MainContent";
import { motion, AnimatePresence } from "framer-motion";
import {
  useGetSupportedCountriesQuery,
  useGetSupportedLanguagesQuery,
} from "../services/GeoApi";
import CountryLanguageModal from "../../components/CountryLangSelectModal";
import { useMeQuery } from "../../Pages/services/ProfileApi";
import { useGetNearbyPlacesForMapQuery } from "../../Pages/services/PlaceApi";
import NearContent from "./NearContent";
import { NearbyForMapResponseDto } from "../../dto";
import { PlaceResponseDto } from "../../dto/place/place.dto";

export default function HomePage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCountryLangModal, setShowCountryLangModal] = useState(false);
  const [selectedPlace, setSelectedPlace] = useState<PlaceResponseDto | null>(null);

  // Fetch countries and languages using RTK Query (keeping queries for future use)
  const { data: _countries } = useGetSupportedCountriesQuery();
  const { data: _languages } = useGetSupportedLanguagesQuery();
  const { data } = useMeQuery();

  const { data: newData } = useGetNearbyPlacesForMapQuery({
    lat: 11.5458547,
    lng: 104.9305413,
    limit: 10,
  });
  const nearByData = newData as NearbyForMapResponseDto;
  
  // Convert PlaceResponseDto[] to the format expected by MapWithFilterUI
  const convertPlacesForMap = (places: PlaceResponseDto[]) => {
    return places.map(place => ({
      id: place.id,
      name: place.name.en || place.name.zh || "", // Use English name first, fallback to Chinese
      location: {
        coordinates: place.location.coordinates
      },
      photos: place.photos,
      rating: place.rating,
      tags: place.tags?.map(tag => ({
        key: tag,
        name: tag
      }))
    }));
  };

  const handlePlaceSelect = (place: PlaceResponseDto) => {
    setSelectedPlace(place);
    setIsExpanded(true);
  };
  console.log("selectedPlace", selectedPlace);

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
        <MapWithFilterUI
          isExpanded={isExpanded}
          nearbyPlaces={convertPlacesForMap(nearByData?.places || [])}
          onPlaceSelect={handlePlaceSelect}
        />

        {!selectedPlace ? (
          <BottomSheetModal
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          >
            <MainContent />
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
        open={showCountryLangModal}
        onClose={() => setShowCountryLangModal(false)}
      />
    </div>
  );
}
