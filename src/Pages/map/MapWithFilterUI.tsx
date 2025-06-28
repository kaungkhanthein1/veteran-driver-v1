import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import FilterPanel from "./FilterPanel";
import FilteredMarkers from "./FilteredMarkers";
import L from "leaflet";
import "./map.css";
import BackButtonDark from "components/common/BackButtonDark";
import MapSideBar from "./MapSideBar";
import { useGetLocationNearbyQuery } from "../../features/HomeApi";
import { useTranslation } from "react-i18next";

const AttachMapRef = ({ mapRef, onReady }) => {
  const map = useMap();

  useEffect(() => {
    if (map && mapRef) {
      mapRef.current = map;
      onReady?.();
    }
  }, [map]);

  return null;
};

const RecenterMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center]);
  return null;
};

const MapWithFilterUI = () => {
  const [isMapReady, setIsMapReady] = useState(false);

  const { data } = useGetLocationNearbyQuery({
    lat: 11.5696,
    lng: 104.9196,
    distance: 1000,
    country_id: "6842c62fca8b84fcd4d996ac",
  });

  const places = data?.length
    ? data
        .filter((place) => place?.location?.lat && place.location?.lng)
        .map((place) => ({
          address: place.address,
          distanceKm: place.distanceKm ?? 1000,
          name: place.name,
          id: place._id,
          lat: place.location.lat,
          lng: place.location.lng,
          image: place.image || "https://picsum.photos/seed/9/400/300",
          price: place.basic_price_usd || 0,
          rating: Math.round(place.rating || 0),
          services: place.services || [],
        }))
    : [];
  const routeLocation = useLocation();
  const mapRef = useRef();
  const userMarkerRef = useRef(null);
  const { t } = useTranslation();

  const [showSidebar, setShowSidebar] = useState(true);
  const [showFilter, setShowFilter] = useState(false);

  const selectedLocation = routeLocation.state?.selectedLocation;
  const mapCenter = selectedLocation || { lat: 11.5564, lng: 104.9282 };

  const [tempFilters, setTempFilters] = useState({
    priceRange: [0, 1000],
    distance: 10,
    rating: 0,
    services: [],
    sort: "Nearby",
  });

  const [activeFilters, setActiveFilters] = useState(tempFilters);

  const stableCenter = useMemo(
    () => [mapCenter.lat, mapCenter.lng],
    [mapCenter.lat, mapCenter.lng]
  );

  console.log(stableCenter);

  const filtered = useMemo(() => {
    if (!activeFilters) return places;

    const center = [mapCenter.lat, mapCenter.lng];

    let filtered = places.filter((place) => {
      const distance =
        L.latLng(center).distanceTo([place.lat, place.lng]) / 1000;
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
          const distA = L.latLng(center).distanceTo([a.lat, a.lng]);
          const distB = L.latLng(center).distanceTo([b.lat, b.lng]);
          return distA - distB;
        });
        break;
      case "Price":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "Rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }

    return filtered;
  }, [activeFilters, mapCenter]);

  const applyFilters = () => {
    setActiveFilters(tempFilters);
    setShowFilter(false);
  };

  const handleRecenter = () => {
    if (!mapRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        mapRef.current.setView([latitude, longitude], 15);

        const customIcon = L.divIcon({
          className: "",
          html: `
            <svg xmlns="http://www.w3.org/2000/svg" width="51" height="50" viewBox="0 0 51 50" fill="none">
              <path opacity="0.32" d="M25.0076 50C38.8189 50 50.0151 38.8071 50.0151 25C50.0151 11.1929 38.8189 0 25.0076 0C11.1963 0 0 11.1929 0 25C0 38.8071 11.1963 50 25.0076 50Z" fill="#FFD75E"/>
              <path d="M37.1953 27.3477C38.8397 20.386 34.5274 13.4099 27.5637 11.766C20.5999 10.1222 13.6217 14.4331 11.9773 21.3948C10.333 28.3565 14.6452 35.3326 21.609 36.9764C28.5728 38.6203 35.551 34.3094 37.1953 27.3477Z" fill="#FFD75E"/>
              <path d="M25.6595 28.1921C26.2206 28.0443 26.8006 27.9813 27.3802 28.0052L30.9595 28.1531C31.1323 28.1607 31.3013 28.1001 31.4299 27.9843C31.5585 27.8686 31.6364 27.7068 31.6468 27.5342C31.6572 27.3615 31.5994 27.1916 31.4858 27.0612L23.4368 17.7486C23.333 17.6291 23.1879 17.553 23.0306 17.5356C22.8733 17.5181 22.7151 17.5605 22.5876 17.6543C22.4601 17.7481 22.3725 17.8865 22.3423 18.0419L20.0223 30.125C19.989 30.2948 20.0239 30.4709 20.1193 30.6152C20.2148 30.7595 20.3631 30.8605 20.5322 30.8966C20.7015 30.9325 20.8781 30.9006 21.024 30.8076L24.0286 28.9033C24.5325 28.5839 25.0826 28.344 25.6595 28.1921Z" fill="black"/>
            </svg>`,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });

        if (userMarkerRef.current) {
          userMarkerRef.current.setLatLng([latitude, longitude]);
        } else {
          userMarkerRef.current = L.marker([latitude, longitude], {
            icon: customIcon,
          }).addTo(mapRef.current);
        }
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to access your location");
      }
    );
  };

  return (
    <div className="dvh-fallback flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col relative">
        <div className="flex-1">
          <MapContainer
            center={stableCenter}
            zoom={15}
            className="h-screen w-full z-0"
            zoomControl={false}
          >
            <AttachMapRef mapRef={mapRef} onReady={() => setIsMapReady(true)} />

            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />
            {/* <Marker position={[mapCenter.lat, mapCenter.lng]} /> */}

            <RecenterMap center={stableCenter} />

            <FilteredMarkers
              onToggleSidebar={setShowSidebar}
              markers={filtered}
            />
          </MapContainer>

          {showSidebar && mapRef.current && (
            <MapSideBar
              setShowFilter={setShowFilter}
              onRecenterClick={handleRecenter}
            />
          )}

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
