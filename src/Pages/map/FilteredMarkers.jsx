import { Marker, useMap } from "react-leaflet";
import React, { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./map.css";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../context/ThemeContext";

const thumbnailIcon = (src) =>
  L.divIcon({
    html: `<div class='w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500 shadow-md'>
            <img src='${src}' class='w-full h-full object-cover'/>
          </div>`,
    className: "",
  });

const renderStars = (rating) => {
  const totalStars = 5;
  return (
    <div className="text-yellow-400 text-sm flex gap-0.5">
      {Array.from({ length: totalStars }).map((_, i) => (
        <span key={i}>{i < rating ? "★" : "☆"}</span>
      ))}
    </div>
  );
};

const FilteredMarkers = React.memo(({ markers, onToggleSidebar }) => {
  const { theme } = useTheme();

  const map = useMap();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isSliding, setIsSliding] = useState(false);

  const markerIconsRef = useRef({});

  const markerIcons = useMemo(() => {
    const newIcons = {};

    markers.forEach((marker) => {
      const existing = markerIconsRef.current[marker.id];
      if (!existing || existing.src !== marker.image) {
        markerIconsRef.current[marker.id] = {
          src: marker.image,
          icon: L.divIcon({
            html: `<div class='w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500 shadow-md'>
                    <img src='${marker.image}' class='w-full h-full object-cover'/>
                  </div>`,
            className: "",
          }),
        };
      }
      newIcons[marker.id] = markerIconsRef.current[marker.id].icon;
    });

    return newIcons;
  }, [markers]);

  useEffect(() => {
    onToggleSidebar?.(!selectedPlace);
  }, [selectedPlace]);

  // Fit map to bounds
  const [hasFitBounds, setHasFitBounds] = useState(false);

  useEffect(() => {
    if (markers.length === 0 || hasFitBounds) return;
    const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]));
    map.flyToBounds(bounds, { padding: [50, 50], duration: 1.2 });
    setHasFitBounds(true);
  }, [markers, map, hasFitBounds]);

  // Lock map when popup is shown
  useEffect(() => {
    if (selectedPlace) {
      map.dragging.disable();
      map.scrollWheelZoom.disable();
      map.touchZoom.disable();
      map.doubleClickZoom.disable();
      map.boxZoom.disable();
      map.keyboard.disable();
    } else {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
    }

    return () => {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.touchZoom.enable();
      map.doubleClickZoom.enable();
      map.boxZoom.enable();
      map.keyboard.enable();
    };
  }, [selectedPlace, map]);

  // Handle popup transition when switching marker
  const handleMarkerClick = (place) => {
    if (!selectedPlace || place.id === selectedPlace.id) {
      setSelectedPlace(place);
      setIsSliding(true);
    } else {
      setIsSliding(false); // slide down
      setTimeout(() => {
        setSelectedPlace(place); // switch
        setIsSliding(true); // slide up
      }, 200); // must match transition duration
    }
  };

  const handleClose = () => {
    setIsSliding(false); // slide down
    setTimeout(() => setSelectedPlace(null), 200);
  };

  // console.log(selectedPlace);

  const handleAddPlace = () => {
    if (selectedPlace) {
      navigate("/add-location", {
        state: {
          selectedLocation: {
            lat: selectedPlace.lat,
            lng: selectedPlace.lng,
          },
        },
      });
    }
  };

  return (
    <>
      {/* {selectedPlace && (
        <motion.div
          className="fixed w-screen h-[100vh] inset-0 bg-black/60 z-[1000]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={handleClose} // Optional: click background to close
        />
      )} */}

      {markers.map((place) => (
        <Marker
          key={place._id}
          position={[place.lat, place.lng]}
          // icon={thumbnailIcon(place.image)}
          icon={markerIcons[place.id]}
          eventHandlers={{
            click: () => handleMarkerClick(place),
          }}
        />
      ))}

      <motion.div
        className={`fixed bottom-0 left-0 w-full max-w-[500px] ${
          theme === "white" ? "marker_box" : "marker_box_dark"
        }  rounded-t-2xl shadow-xl p-4 z-[10000]`}
        initial={{ y: "100%" }}
        animate={{ y: selectedPlace && isSliding ? 0 : "100%" }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.25 }}
        drag="y"
        dragConstraints={{ top: 0, bottom: 0 }}
        onDragEnd={(event, info) => {
          if (info.offset.y > 100) {
            handleClose();
          }
        }}
      >
        {selectedPlace && (
          <>
            <div className="flex justify-center items-start mb-[40px]">
              <span
                className={`${
                  theme === "white" ? "drag_btn" : "drag_btn_dark"
                }`}
              ></span>
              {/* <button onClick={handleClose} className="text-gray-500 text-2xl">
                &times;
              </button> */}
            </div>
            <img
              src={selectedPlace.image}
              alt="Place"
              className="w-full h-32 object-cover rounded-lg  my-[16px]"
            />
            <div className=" flex w-full justify-between items-center">
              <h1
                className={`${theme === "white" ? "text-black" : "text-white"}`}
              >
                {selectedPlace.name}
              </h1>
              <div
                className={`${
                  theme === "white" ? "marker_box_icon" : "marker_box_icon_dark"
                } px-2 py-2 flex justify-center items-center`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                >
                  <path
                    d="M10 18.1504L8.83816 17.1106C7.09325 15.5347 5.65026 14.1805 4.50921 13.048C3.36816 11.9154 2.46395 10.9074 1.79658 10.024C1.12921 9.14074 0.662983 8.33497 0.397895 7.60666C0.132632 6.87853 0 6.13965 0 5.39003C0 3.90285 0.503684 2.65773 1.51105 1.65469C2.5186 0.651824 3.7693 0.150391 5.26316 0.150391C6.18211 0.150391 7.05053 0.364343 7.86842 0.792247C8.68632 1.22015 9.39684 1.8338 10 2.63319C10.6032 1.8338 11.3137 1.22015 12.1316 0.792247C12.9495 0.364343 13.8179 0.150391 14.7368 0.150391C16.2307 0.150391 17.4814 0.651824 18.4889 1.65469C19.4963 2.65773 20 3.90285 20 5.39003C20 6.13965 19.8674 6.87853 19.6021 7.60666C19.337 8.33497 18.8708 9.14074 18.2034 10.024C17.5361 10.9074 16.6335 11.9154 15.4958 13.048C14.3582 14.1805 12.9136 15.5347 11.1618 17.1106L10 18.1504Z"
                    fill="#FFC61B"
                  />
                </svg>
              </div>
            </div>
            <div className="">
              <span className=" text-[#aaa] text-[12px] font-[400]">
                {selectedPlace.address} (
                {t("filteredMarkers.distanceAway", {
                  distance: selectedPlace.distanceKm,
                })}
                )
              </span>
            </div>
            <div className=" flex gap-[5px] py-[10px]">
              {" "}
              <span
                className={` text-[12px] font-[400] ${
                  theme === "white" ? " text-[#444444]" : "text-white"
                }`}
              >
                {selectedPlace.rating}
              </span>{" "}
              {renderStars(selectedPlace.rating)}
            </div>
            <div className=" flex gap-[8px] text-[#aaa] text-[14px] font-[400]">
              {selectedPlace.services?.map((ss) => (
                <span key={ss}>{ss},</span>
              ))}
            </div>
            <div
              className={`${
                theme === "white" ? "text-[#444]" : " text-white"
              } font-[700]`}
            >
              <span className=" text-[18px]">
                {selectedPlace.price}{" "}
                <span className=" text-[10px]">
                  {t("filteredMarkers.usdUnit")}
                </span>{" "}
              </span>
            </div>
            {/* btn */}
            <div
              onClick={handleAddPlace}
              className="w-full gap-[10px] my-[20px] flex justify-center items-center py-[12px] add_place_btn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="29"
                viewBox="0 0 24 29"
                fill="none"
              >
                <path
                  d="M12.0026 14.0445C12.7354 14.0445 13.3619 13.7836 13.8821 13.2617C14.4025 12.7397 14.6627 12.1124 14.6627 11.3796C14.6627 10.6468 14.4018 10.0202 13.8799 9.49974C13.3579 8.97955 12.7305 8.71945 11.9974 8.71945C11.2646 8.71945 10.6381 8.98041 10.118 9.50232C9.59751 10.0242 9.33729 10.6517 9.33729 11.3847C9.33729 12.1175 9.59825 12.744 10.1202 13.2642C10.6421 13.7844 11.2696 14.0445 12.0026 14.0445ZM12 25.31C14.8816 22.7304 17.0867 20.2561 18.6154 17.8871C20.1441 15.5181 20.9084 13.4432 20.9084 11.6624C20.9084 8.97721 20.0553 6.76976 18.3491 5.04003C16.643 3.3103 14.5266 2.44543 12 2.44543C9.47341 2.44543 7.35703 3.3103 5.65087 5.04003C3.94471 6.76976 3.09162 8.97721 3.09162 11.6624C3.09162 13.4432 3.85596 15.5181 5.38463 17.8871C6.91331 20.2561 9.11843 22.7304 12 25.31ZM12 28.25C8.29309 25.038 5.51339 22.0488 3.66092 19.2823C1.80844 16.5156 0.882202 13.9757 0.882202 11.6624C0.882202 8.26333 1.98163 5.51149 4.1805 3.40689C6.37961 1.3023 8.98611 0.25 12 0.25C15.0139 0.25 17.6204 1.3023 19.8195 3.40689C22.0184 5.51149 23.1178 8.26333 23.1178 11.6624C23.1178 13.9757 22.1916 16.5156 20.3391 19.2823C18.4866 22.0488 15.7069 25.038 12 28.25Z"
                  fill="black"
                />
              </svg>
              <span>{t("filteredMarkers.addThisPlaceButton")}</span>
            </div>
          </>
        )}
      </motion.div>
    </>
  );
});

export default FilteredMarkers;
