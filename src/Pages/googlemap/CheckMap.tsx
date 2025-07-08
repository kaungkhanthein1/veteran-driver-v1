import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import BackButtonDark from "../../components/common/BackButtonDark";
import Lot from "../map/Loc.svg";
import "../map/map.css";

const CheckMap = () => {
  const routeLocation = useLocation();
  const { t } = useTranslation();

  const mapRef = useRef<google.maps.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [routePath, setRoutePath] = useState<google.maps.LatLngLiteral[]>([]);

  const selectedLocation = routeLocation.state?.selectedLocation || {
    lat: 11.5564,
    lng: 104.9282,
  };

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
          const coords = data.routes[0].geometry.coordinates.map((c) => ({
            lat: c[1],
            lng: c[0],
          }));
          setRoutePath(coords);
        })
        .catch((err) => console.error("Route fetch error:", err));
    }
  }, [userLocation, selectedLocation]);

  const handleRecenter = () => {
    if (!mapRef.current || !userLocation) return;

    // Recenter the map
    mapRef.current.panTo(userLocation);
    mapRef.current.setZoom(15);
  };

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    setIsMapReady(true);
  };

  const onUnmount = () => {
    mapRef.current = null;
  };

  return (
    <div className="dvh-fallback flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col relative">
        <div className="flex-1">
          {/* <LoadScript googleMapsApiKey="AIzaSyA4mTDHRw_8u_fRaYe2ZPCHSxpDxhZpIuc"> */}
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100vh" }}
            center={selectedLocation}
            zoom={15}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              clickableIcons: false,
            }}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/* Destination Marker */}
            <Marker
              position={selectedLocation}
              icon={{
                url: "https://picsum.photos/seed/0/400/300",
                scaledSize: new google.maps.Size(50, 50),
                anchor: new google.maps.Point(25, 50),
              }}
            />

            {/* User Location Marker */}
            {userLocation && (
              <Marker
                position={userLocation}
                icon={{
                  url: Lot,
                  scaledSize: new google.maps.Size(35, 35),
                  anchor: new google.maps.Point(17, 35),
                }}
              />
            )}

            {/* Route Line */}
            {routePath.length > 0 && (
              <Polyline
                path={routePath}
                options={{
                  strokeColor: "#FF5733",
                  strokeOpacity: 0.8,
                  strokeWeight: 5,
                  fillColor: "#FF5733",
                  fillOpacity: 0.35,
                  clickable: false,
                  draggable: false,
                  editable: false,
                  visible: true,
                  zIndex: 1,
                }}
              />
            )}
          </GoogleMap>
          {/* </LoadScript> */}

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

          {/* Recenter Button */}
          <div className="absolute bottom-6 right-2 shadow-xl z-[1] p-4">
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
