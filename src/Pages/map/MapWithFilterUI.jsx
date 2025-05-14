import { MapContainer, TileLayer, Marker, Circle } from "react-leaflet";
import { useState } from "react";
import FilterPanel from "./FilterPanel";
import FilteredMarkers from "./FilteredMarkers";
import L from "leaflet";
import "./map.css";
import search from "../../components/home/search.svg";
import { useNavigate } from "react-router-dom";

const position = [11.5564, 104.9282]; // Phnom Penh

const places = [
  {
    id: 1,
    lat: 11.5564,
    lng: 104.9282,
    image: "https://via.placeholder.com/50",
    price: 600,
    rating: 4,
    services: ["Service 1"],
  },
  {
    id: 2,
    lat: 13.3633,
    lng: 103.8564,
    image: "https://via.placeholder.com/50",
    price: 750,
    rating: 5,
    services: ["Service 2"],
  },
  {
    id: 3,
    lat: 10.64,
    lng: 103.5108,
    image: "https://via.placeholder.com/50",
    price: 700,
    rating: 3,
    services: ["Service 1", "Service 2"],
  },
  {
    id: 4,
    lat: 10.6101,
    lng: 104.18,
    image: "https://via.placeholder.com/50",
    price: 670,
    rating: 4,
    services: ["Service 2"],
  },
  {
    id: 5,
    lat: 12.25,
    lng: 104.6667,
    image: "https://via.placeholder.com/50",
    price: 630,
    rating: 2,
    services: ["Service 1"],
  },
];

const MapWithFilterUI = () => {
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [tempFilters, setTempFilters] = useState({
    priceRange: [600, 800],
    distance: 50, // large to cover wide area
    rating: 0,
    services: [],
  });
  const [activeFilters, setActiveFilters] = useState(tempFilters);

  const filterMarkers = () => {
    return places.filter((place) => {
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
  };

  const applyFilters = () => {
    setActiveFilters(tempFilters);
    console.log(tempFilters);
    setShowFilter(false);
  };

  const filtered = filterMarkers();

  return (
    <div className="relative max-w-[500px] h-screen">
      <MapContainer center={position} zoom={7} className="h-full w-full z-0">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={position} />
        <Circle
          center={position}
          radius={activeFilters.distance * 1000}
          pathOptions={{ color: "#facc15", fillOpacity: 0.3 }}
        />

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
