import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import BackButtonDark from "components/common/BackButtonDark";
import Pin from "../map/Pin.svg";
import "../map/map.css";

const AddMap = () => {
  const routeLocation = useLocation();
  const { t } = useTranslation();
  const [clickedLocation, setClickedLocation] = useState(null);
  const navigate = useNavigate();

  const mapRef = useRef<google.maps.Map | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({
    lat: 11.5564,
    lng: 104.9282,
  });

  const selectedLocation = routeLocation.state?.selectedLocation || mapCenter;

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const latlng = { lat: latitude, lng: longitude };
        setUserLocation(latlng);
        setClickedLocation(latlng);
        setMapCenter(latlng);
      },
      (err) => {
        console.error("Failed to get location:", err);
      }
    );
  }, []);

  const handleRecenter = () => {
    if (!mapRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const newCenter = { lat: latitude, lng: longitude };

        console.log("Current Location:", newCenter);

        mapRef.current?.panTo(newCenter);
        mapRef.current?.setZoom(15);
        setClickedLocation(newCenter);
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to access your location");
      }
    );
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      setClickedLocation({ lat, lng });
    }
  };

  const comfirmLocation = (click: any) => {
    console.log("confirm location", click);
    navigate(-1);
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
              gestureHandling: "greedy", // Allows panning and zooming
            }}
            onClick={handleMapClick}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {clickedLocation && (
              <Marker
                position={clickedLocation}
                //   icon={{
                //     url: Pin,
                //     scaledSize: new google.maps.Size(50, 50),
                //     anchor: new google.maps.Point(25, 50),
                //   }}
              />
            )}
          </GoogleMap>
          {/* </LoadScript> */}

          {/* Top Header Bar */}
          <div className="fixed w-full top-6 left-0 text-white rounded-full">
            <div className="flex justify-center items-center gap-[4px] px-4">
              <BackButtonDark />
              <div className="search_box p-[16px] gap-3 flex justify- items-center w-full">
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

          {/* Confirm Location Button */}
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

          {/* Recenter Button */}
          <div className="absolute bottom-[100px] right-2 shadow-xl z-[1] p-4">
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
