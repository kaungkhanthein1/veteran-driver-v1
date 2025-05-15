import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import FilterPanel from "./FilterPanel";
import FilteredMarkers from "./FilteredMarkers";
import L from "leaflet";
import "./map.css";
import search from "../../components/home/search.svg";
import { useNavigate } from "react-router-dom";
import { location } from "./Place";

const RecenterMap = ({ center }) => {
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
  id: place.id,
  lat: place.location.lat,
  lng: place.location.lng,
  image: place.image || "https://via.placeholder.com/50",
  price: place.pricePerNight || 0,
  rating: Math.round(place.rating || 0),
  services: place.services || [],
}));

// console.log(places);

const MapWithFilterUI = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    priceRange: [0, 1000],
    distance: 10, // Enough for all visible markers
    rating: 0, // No rating filter
    services: [], // No services filter
    sort: "Nearby", // if applicable
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

    // 🔽 Sort logic after filtering
    switch (activeFilters.sort) {
      case "Nearby":
        filtered.sort((a, b) => {
          const distA = L.latLng(position).distanceTo([a.lat, a.lng]);
          const distB = L.latLng(position).distanceTo([b.lat, b.lng]);
          return distA - distB;
        });
        break;
      case "Price":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      // Add more sort cases as needed
      default:
        break;
    }

    return filtered;
  };

  const applyFilters = () => {
    setActiveFilters(tempFilters);
    setShowFilter(false);
    console.log(tempFilters);
  };

  const filtered = filterMarkers();
  // console.log(" filter", filtered);

  return (
    <div className="relative max-w-[500px] h-screen">
      <MapContainer center={position} zoom={7} className="h-full w-full z-0">
        <TileLayer
          zoomControl={false}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position} />
        <Circle
          center={position}
          radius={activeFilters.distance * 1000}
          pathOptions={{ color: "#facc15", fillOpacity: 0.3 }}
        />
        {filtered.length > 0 && (
          <RecenterMap center={[filtered[0].lat, filtered[0].lng]} />
        )}
        <FilteredMarkers markers={filtered} />
      </MapContainer>

      <div className="absolute w-full top-6 left-2 text-white rounded-full shadow-lg">
        <div className=" flex justify-center items-center gap-[12px]">
          <svg
            onClick={() => navigate(-1)}
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              d="M23.3334 12.8327H9.13508L15.6567 6.31102L14.0001 4.66602L4.66675 13.9993L14.0001 23.3327L15.6451 21.6877L9.13508 15.166H23.3334V12.8327Z"
              fill="#444444"
            />
          </svg>
          <div
            onClick={() => setShowFilter(true)}
            className="search_box p-[16px] flex justify-center items-center w-3/4"
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
            <span className="">Search location...</span>
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
  );
};

export default MapWithFilterUI;
