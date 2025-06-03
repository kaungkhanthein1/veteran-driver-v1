import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterPanel from "./FilterPanel";
import FilteredMarkers from "./FilteredMarkers";
import L from "leaflet";
import "./map.css";
import { location } from "./Place";
import BackButton from "../../components/common/BackButton";
import { useTranslation } from "react-i18next";
import BackButtonDark from "components/common/BackButtonDark";

const RecenterMap = ({ center }) => {
  // TODO: Add PropTypes for prop validation
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center]);
  return null;
};

const position =
  location.length > 0
    ? [location[0].location.lat, location[0].location.lng]
    : [11.5564, 104.9282]; // fallback

const places = location.map((place) => ({
  address: place.address,
  distanceKm: place.distanceKm,
  name: place.name,
  id: place.id,
  lat: place.location.lat,
  lng: place.location.lng,
  image: place.image || "https://via.placeholder.com/50",
  price: place.pricePerNight || 0,
  rating: Math.round(place.rating || 0),
  services: place.services || [],
}));

const MapWithFilterUI = () => {
  const routeLocation = useLocation();
  const { t } = useTranslation();
  const [showFilter, setShowFilter] = useState(false);
  const selectedLocation = routeLocation.state?.selectedLocation;
  // const returnPath = routeLocation.state?.returnPath; // Keeping returnPath commented out as it might be used later

  // Use selected location or default to Phnom Penh
  const mapCenter = selectedLocation || { lat: 11.5564, lng: 104.9282 };

  const [tempFilters, setTempFilters] = useState({
    priceRange: [0, 1000],
    distance: 10,
    rating: 0,
    services: [],
    sort: "Nearby",
  });

  const [activeFilters, setActiveFilters] = useState(tempFilters);

  const filterMarkers = () => {
    let filtered = places.filter((place) => {
      const distance =
        L.latLng(position).distanceTo([place.lat, place.lng]) / 1000;
      return (
        place.price >= activeFilters.priceRange[0] &&
        place.price <= activeFilters.priceRange[1] &&
        distance <= activeFilters.distance &&
        (activeFilters.rating === 0 || place.rating >= activeFilters.rating) &&
        (activeFilters.services.length === 0 ||
          activeFilters.services.some((s) => place.services.includes(s)))
      );
    });

    switch (activeFilters.sort) {
      case "Nearby":
        filtered.sort((a, b) => {
          const distA = L.latLng(position).distanceTo([a.lat, a.lng]);
          const distB = L.latLng(position).distanceTo([b.lng, b.lat]); // Fixed typo b.lng, b.lat
          return distA - distB;
        });
        break;
      case "Price":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return filtered;
  };

  const applyFilters = () => {
    setActiveFilters(tempFilters);
    setShowFilter(false);
  };

  const filtered = filterMarkers(); // This variable is used now

  return (
    <div className="min-h-screen flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col relative">
        <div className="flex-1">
          <MapContainer
            center={[mapCenter.lat, mapCenter.lng]}
            zoom={15}
            className="h-screen w-full z-0"
            zoomControl={false}
          >
            {/* <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> */}
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />

            <Marker position={[mapCenter.lat, mapCenter.lng]} />
            <RecenterMap center={[mapCenter.lat, mapCenter.lng]} />
            <FilteredMarkers markers={filtered} />
          </MapContainer>

          <div className="absolute w-full top-6 left-0 text-white rounded-full shadow-">
            <div className="flex justify-center items-center gap-[4px] px-4">
              {/* <BackButton/> */}
              <BackButtonDark />
              <div
                onClick={() => setShowFilter(true)}
                className="search_box p-[16px] gap-3 flex justify- items-center w-full"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M15.7549 14.2559H14.9649L14.6849 13.9859C15.6649 12.8459 16.2549 11.3659 16.2549 9.75586C16.2549 6.16586 13.3449 3.25586 9.75488 3.25586C6.16488 3.25586 3.25488 6.16586 3.25488 9.75586C3.25488 13.3459 6.16488 16.2559 9.75488 16.2559C11.3649 16.2559 12.8449 15.6659 13.9849 14.6859L14.2549 14.9659V15.7559L19.2549 20.7459L20.7449 19.2559L15.7549 14.2559ZM9.75488 14.2559C7.26488 14.2559 5.25488 12.2459 5.25488 9.75586C5.25488 7.26586 7.26488 5.25586 9.75488 5.25586C12.2449 5.25586 14.2549 7.26586 14.2549 9.75586C14.2549 12.2459 12.2449 14.2559 9.75488 14.2559Z"
                    fill="#999999"
                  />
                </svg>
                <span className="">{t("mapWithFilter.searchPlaceholder")}</span>
              </div>
            </div>
          </div>

          {showFilter && (
            <FilterPanel
              filters={tempFilters}
              setFilters={setTempFilters}
              applyFilters={applyFilters}
              onClose={() => setShowFilter(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MapWithFilterUI;
