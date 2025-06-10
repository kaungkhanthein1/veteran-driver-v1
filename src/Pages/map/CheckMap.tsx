import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { useLocation } from "react-router-dom";
import BackButtonDark from "components/common/BackButtonDark";
import L from "leaflet";
import Lot from "./Loc.svg";
import "./map.css";

// Custom marker icon
const customIcon = L.icon({
  iconUrl: "https://picsum.photos/seed/0/400/300", // Put your image in the public folder
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
});

// User location icon (optional)
const userIcon = L.icon({
  iconUrl: Lot, // Optional: different icon for user
  iconSize: [35, 35],
  iconAnchor: [17, 35],
});

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

const CheckMap = () => {
  const routeLocation = useLocation();
  const { t } = useTranslation();

  const markerIcons = useMemo(() => {
    const icons = L.divIcon({
      html: `<div class='w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500 shadow-md'>
            <img src='https://picsum.photos/seed/0/400/300' class='w-full h-full object-cover'/>
          </div>`,
      className: "",
    });

    return icons;
  }, []);

  const mapRef = useRef();
  const [isMapReady, setIsMapReady] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  const selectedLocation = routeLocation.state?.selectedLocation || {
    lat: 11.5564,
    lng: 104.9282,
  };

  const stableCenter = useMemo(
    () => [selectedLocation.lat, selectedLocation.lng],
    [selectedLocation.lat, selectedLocation.lng]
  );

  // Get user location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      (err) => console.error(err),
      { enableHighAccuracy: true }
    );
  }, []);

  // Fetch route using OSRM
  useEffect(() => {
    if (userLocation) {
      const url = `https://router.project-osrm.org/route/v1/driving/${userLocation.lng},${userLocation.lat};${selectedLocation.lng},${selectedLocation.lat}?overview=full&geometries=geojson`;

      fetch(url)
        .then((res) => res.json())
        .then((data) => {
          const coords = data.routes[0].geometry.coordinates.map((c) => [
            c[1],
            c[0],
          ]);
          setRouteCoords(coords);
        })
        .catch((err) => console.error("Route fetch error:", err));
    }
  }, [userLocation, selectedLocation]);

  const handleRecenter = () => {
    if (!mapRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        // Log the coordinates
        console.log("Current Location:", {
          latitude,
          longitude,
        });

        // Recenter the map
        mapRef.current.setView([latitude, longitude], 15);

        const customIcon = L.divIcon({
          className: "",
          html: `
          <svg xmlns="http://www.w3.org/2000/svg" width="51" height="50" viewBox="0 0 51 50" fill="none">
          <path opacity="0.32" d="M25.0076 50C38.8189 50 50.0151 38.8071 50.0151 25C50.0151 11.1929 38.8189 0 25.0076 0C11.1963 0 0 11.1929 0 25C0 38.8071 11.1963 50 25.0076 50Z" fill="#FFD75E"/>
          <path d="M37.1953 27.3477C38.8397 20.386 34.5274 13.4099 27.5637 11.766C20.5999 10.1222 13.6217 14.4331 11.9773 21.3948C10.333 28.3565 14.6452 35.3326 21.609 36.9764C28.5728 38.6203 35.551 34.3094 37.1953 27.3477Z" fill="#FFD75E"/>
          <path d="M25.6595 28.1921C26.2206 28.0443 26.8006 27.9813 27.3802 28.0052L30.9595 28.1531C31.1323 28.1607 31.3013 28.1001 31.4299 27.9843C31.5585 27.8686 31.6364 27.7068 31.6468 27.5342C31.6572 27.3615 31.5994 27.1916 31.4858 27.0612L23.4368 17.7486C23.333 17.6291 23.1879 17.553 23.0306 17.5356C22.8733 17.5181 22.7151 17.5605 22.5876 17.6543C22.4601 17.7481 22.3725 17.8865 22.3423 18.0419L20.0223 30.125C19.989 30.2948 20.0239 30.4709 20.1193 30.6152C20.2148 30.7595 20.3631 30.8605 20.5322 30.8966C20.7015 30.9325 20.8781 30.9006 21.024 30.8076L24.0286 28.9033C24.5325 28.5839 25.0826 28.344 25.6595 28.1921Z" fill="black"/>
        </svg>
          `,
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });

        // Add or update custom marker
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

            {/* Destination Marker (Custom Icon) */}
            <Marker
              position={[selectedLocation.lat, selectedLocation.lng]}
              icon={markerIcons}
            >
              <Popup>Destination</Popup>
            </Marker>

            {/* User Location */}
            {userLocation && (
              <Marker
                position={[userLocation.lat, userLocation.lng]}
                icon={userIcon}
              >
                <Popup>Your Location</Popup>
              </Marker>
            )}

            {/* Route Line */}
            {routeCoords.length > 0 && (
              <Polyline
                positions={routeCoords}
                pathOptions={{
                  color: "#FF5733", // custom color
                  weight: 5, // thickness
                  opacity: 0.8, // transparency
                  lineCap: "round", // smoother corners
                }}
              />
            )}

            <RecenterMap center={stableCenter} />
          </MapContainer>

          {/* Top Header Bar */}
          <div className="fixed w-full top-0 bg-white left-0 text-white rounded-full">
            <div className="flex justify-between items-center gap-[4px] p-4">
              <BackButtonDark />
              <h1 className=" text-[#444] text-[18px] font-[500]">
                Angela House
              </h1>
              <div className="share_botton p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <path
                    d="M11.0862 14.1856L7.58701 12.2773C7.13017 12.7656 6.53699 13.1053 5.88457 13.2522C5.23214 13.399 4.55063 13.3462 3.92861 13.1006C3.30658 12.8551 2.77281 12.4281 2.39665 11.8751C2.02049 11.3222 1.81934 10.6689 1.81934 10.0002C1.81934 9.33143 2.02049 8.67815 2.39665 8.12523C2.77281 7.5723 3.30658 7.14531 3.92861 6.89973C4.55063 6.65415 5.23214 6.60135 5.88457 6.74819C6.53699 6.89503 7.13017 7.23471 7.58701 7.7231L11.087 5.81476C10.8883 5.02816 10.9833 4.19609 11.3542 3.47451C11.7251 2.75294 12.3464 2.19141 13.1017 1.89518C13.857 1.59895 14.6944 1.58835 15.457 1.86537C16.2195 2.1424 16.8549 2.68803 17.2439 3.39998C17.633 4.11193 17.749 4.94134 17.5703 5.73272C17.3915 6.5241 16.9303 7.22313 16.273 7.69877C15.6158 8.17442 14.8076 8.39402 14 8.31642C13.1924 8.23883 12.4408 7.86936 11.8862 7.27726L8.38617 9.1856C8.52051 9.72006 8.52051 10.2795 8.38617 10.8139L11.8853 12.7223C12.44 12.1302 13.1916 11.7607 13.9992 11.6831C14.8068 11.6055 15.6149 11.8251 16.2722 12.3008C16.9295 12.7764 17.3907 13.4754 17.5694 14.2668C17.7482 15.0582 17.6321 15.8876 17.2431 16.5995C16.8541 17.3115 16.2187 17.8571 15.4562 18.1342C14.6936 18.4112 13.8562 18.4006 13.1009 18.1043C12.3456 17.8081 11.7243 17.2466 11.3534 16.525C10.9825 15.8034 10.8875 14.9714 11.0862 14.1848V14.1856ZM5.15284 11.6664C5.59487 11.6664 6.01879 11.4908 6.33135 11.1783C6.64391 10.8657 6.81951 10.4418 6.81951 9.99976C6.81951 9.55774 6.64391 9.13381 6.33135 8.82125C6.01879 8.50869 5.59487 8.3331 5.15284 8.3331C4.71081 8.3331 4.28689 8.50869 3.97433 8.82125C3.66177 9.13381 3.48617 9.55774 3.48617 9.99976C3.48617 10.4418 3.66177 10.8657 3.97433 11.1783C4.28689 11.4908 4.71081 11.6664 5.15284 11.6664ZM14.3195 6.66643C14.7615 6.66643 15.1855 6.49084 15.498 6.17827C15.8106 5.86571 15.9862 5.44179 15.9862 4.99976C15.9862 4.55774 15.8106 4.13381 15.498 3.82125C15.1855 3.50869 14.7615 3.3331 14.3195 3.3331C13.8775 3.3331 13.4536 3.50869 13.141 3.82125C12.8284 4.13381 12.6528 4.55774 12.6528 4.99976C12.6528 5.44179 12.8284 5.86571 13.141 6.17827C13.4536 6.49084 13.8775 6.66643 14.3195 6.66643ZM14.3195 16.6664C14.7615 16.6664 15.1855 16.4908 15.498 16.1783C15.8106 15.8657 15.9862 15.4418 15.9862 14.9998C15.9862 14.5577 15.8106 14.1338 15.498 13.8213C15.1855 13.5087 14.7615 13.3331 14.3195 13.3331C13.8775 13.3331 13.4536 13.5087 13.141 13.8213C12.8284 14.1338 12.6528 14.5577 12.6528 14.9998C12.6528 15.4418 12.8284 15.8657 13.141 16.1783C13.4536 16.4908 13.8775 16.6664 14.3195 16.6664Z"
                    fill="#444444"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* re-center */}

          <div className=" absolute bottom-6 right-2 shadow-xl z-[1] p-4">
            <div onClick={handleRecenter} className="map_sidebar_btn p-[11px]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 26 26"
                fill="none"
              >
                <path
                  d="M13.0002 8.66683C10.606 8.66683 8.66683 10.606 8.66683 13.0002C8.66683 15.3943 10.606 17.3335 13.0002 17.3335C15.3943 17.3335 17.3335 15.3943 17.3335 13.0002C17.3335 10.606 15.3943 8.66683 13.0002 8.66683ZM22.6852 11.9168C22.1868 7.39933 18.601 3.8135 14.0835 3.31516V1.0835H11.9168V3.31516C7.39933 3.8135 3.8135 7.39933 3.31516 11.9168H1.0835V14.0835H3.31516C3.8135 18.601 7.39933 22.1868 11.9168 22.6852V24.9168H14.0835V22.6852C18.601 22.1868 22.1868 18.601 22.6852 14.0835H24.9168V11.9168H22.6852ZM13.0002 20.5835C8.80766 20.5835 5.41683 17.1927 5.41683 13.0002C5.41683 8.80766 8.80766 5.41683 13.0002 5.41683C17.1927 5.41683 20.5835 8.80766 20.5835 13.0002C20.5835 17.1927 17.1927 20.5835 13.0002 20.5835Z"
                  fill="#FFC61B"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckMap;
