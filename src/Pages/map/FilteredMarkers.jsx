import { Marker, useMap } from "react-leaflet";
import { useEffect, useState } from "react";
import L from "leaflet";

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

const FilteredMarkers = ({ markers }) => {
  const map = useMap();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [isSliding, setIsSliding] = useState(false);

  // Fit map to bounds
  useEffect(() => {
    if (markers.length === 0) return;
    const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]));
    map.flyToBounds(bounds, { padding: [50, 50], duration: 1.2 });
  }, [markers, map]);

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

  console.log(selectedPlace);

  return (
    <>
      {markers.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={thumbnailIcon(place.image)}
          eventHandlers={{
            click: () => handleMarkerClick(place),
          }}
        />
      ))}

      {/* Slide Up Popup */}
      <div
        className={`fixed bottom-0 left-0 w-full max-w-[500px] marker_box rounded-t-2xl shadow-xl p-4 z-[1000]
          transform transition-transform duration-200 ease-in-out
          ${selectedPlace && isSliding ? "translate-y-0" : "translate-y-full"}`}
      >
        {selectedPlace && (
          <>
            <div className="flex justify-between items-start mb-2">
              <span></span>
              <button onClick={handleClose} className="text-gray-500 text-2xl">
                &times;
              </button>
            </div>
            <img
              src={selectedPlace.image}
              alt="Place"
              className="w-full h-32 object-cover rounded-lg  my-[16px]"
            />
            <div className=" flex w-full justify-between items-center">
              <h1 className=" text-white">{selectedPlace.name}</h1>
              <div className="marker_box_icon px-2 py-2 flex justify-center items-center">
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
                {selectedPlace.address} ( {selectedPlace.distanceKm}km away){" "}
              </span>
            </div>
            <div className=" flex gap-[5px] py-[10px]">
              {" "}
              <span className=" text-white text-[12px] font-[400]">
                {selectedPlace.rating}
              </span>{" "}
              {renderStars(selectedPlace.rating)}
            </div>
            <div className=" flex gap-[8px] text-[#aaa] text-[14px] font-[400]">
              {selectedPlace.services?.map((ss) => (
                <span>{ss},</span>
              ))}
            </div>
            <div className=" text-white font-[700]">
              <span className=" text-[18px]">
                {selectedPlace.price} <span className=" text-[10px]">usd</span>{" "}
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FilteredMarkers;
