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
import { useLocation, useNavigate } from "react-router-dom";
import BackButtonDark from "components/common/BackButtonDark";
import L from "leaflet";
import Pin from "./Pin.svg";
import "./map.css";

// Custom marker icon
const customIcon = L.icon({
  iconUrl: Pin, // Put your image in the public folder
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
});

const MapClickHandler = ({ onClick }) => {
  useMap().on("click", (e) => {
    onClick(e.latlng);
  });
  return null;
};

// User location icon (optional)

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

const AddMap = () => {
  const routeLocation = useLocation();
  const { t } = useTranslation();
  const [clickedLocation, setClickedLocation] = useState(null);
  const navigate = useNavigate()

  const mapRef = useRef();
  const [isMapReady, setIsMapReady] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [routeCoords, setRouteCoords] = useState([]);

  const selectedLocation = routeLocation.state?.selectedLocation || {
    lat: 11.5564,
    lng: 104.9282,
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const latlng = { lat: latitude, lng: longitude };
        setUserLocation(latlng);
        setClickedLocation(latlng); // 👈 Fake click (auto-drop pin)

        // Recenter the map
        if (mapRef.current) {
          mapRef.current.setView(latlng, 15);
        }
      },
      (err) => {
        console.error("Failed to get location:", err);
      }
    );
  }, []);

  const stableCenter = useMemo(
    () => [selectedLocation.lat, selectedLocation.lng],
    [selectedLocation.lat, selectedLocation.lng]
  );
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

  const comfirmLocation = (click) => {
    console.log(" confirm location", click);
    navigate(-1)
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
            <MapClickHandler onClick={(latlng) => setClickedLocation(latlng)} />

            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            />

            <RecenterMap center={stableCenter} />
            {clickedLocation && (
              <Marker position={clickedLocation} icon={customIcon} />
            )}
          </MapContainer>

          {/* Top Header Bar */}
          <div className="fixed w-full top-6 left-0 text-white rounded-full">
            <div className="flex justify-center items-center gap-[4px] px-4">
              {/* <BackButton/> */}
              <BackButtonDark />
              <div
                // onClick={() => setShowFilter(true)}
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

          {/* re-center */}

          {clickedLocation && (
            <div className="fixed bottom-0 bg-white p-[20px] left-0 w-full flex justify-center z-[1000]">
              <button
                onClick={() => comfirmLocation(clickedLocation)}
                className="confirm_loc_btn w-full py-[14px]"
              >
                Confirm Location
              </button>
            </div>
          )}

          <div className=" absolute bottom-[100px] right-2 shadow-xl z-[1] p-4">
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

export default AddMap;
