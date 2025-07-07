// import { useEffect, useRef, useState } from "react";
// import { GoogleMap, LoadScript } from "@react-google-maps/api";
// import MapSideBar from "../map/MapSideBar";
// import LocationIndicator from "../../icons/HomeUpdate/LocationIndicator.svg";
// import "../map/map.css";

// interface MapWithFilterUIProps {
//   isExpanded: boolean;
// }

// const MapWithFilterUI = ({ isExpanded }: MapWithFilterUIProps) => {
//   const [isMapReady, setIsMapReady] = useState(false);
//   const mapRef = useRef<google.maps.Map | null>(null);
//   const userMarkerRef = useRef<google.maps.Marker | null>(null);

//   // Default center coordinates
//   const mapCenter = { lat: 11.5458547, lng: 104.9305413 };

//   const handleRecenter = () => {
//     if (!mapRef.current) return;

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         const map = mapRef.current;

//         if (!map) return;

//         // Calculate offset to position marker at button height
//         const bounds = map.getBounds();
//         if (!bounds) return;

//         const latSpan =
//           bounds.getNorthEast().lat() - bounds.getSouthWest().lat();
//         const offsetRatio = 0.45;
//         const targetLat = latitude + latSpan * offsetRatio;

//         // Update map view
//         map.setCenter({ lat: targetLat, lng: longitude });
//         map.setZoom(15);

//         // Remove existing marker
//         if (userMarkerRef.current) {
//           userMarkerRef.current.setMap(null);
//         }

//         // Create new marker
//         userMarkerRef.current = new google.maps.Marker({
//           position: { lat: targetLat, lng: longitude },
//           map: map,
//           icon: {
//             url: LocationIndicator,
//             scaledSize: new google.maps.Size(50, 70),
//             anchor: new google.maps.Point(25, 70),
//           },
//           zIndex: 1000,
//         });
//       },
//       (error) => {
//         console.error("Geolocation error:", error);
//         alert("Unable to access your location");
//       }
//     );
//   };

//   const onLoad = (map: google.maps.Map) => {
//     mapRef.current = map;
//     setIsMapReady(true);
//   };

//   const onUnmount = () => {
//     mapRef.current = null;
//   };

//   return (
//     <div className="absolute inset-0">
//       <div className="w-full h-full relative">
//         <LoadScript
//           googleMapsApiKey="AIzaSyA4mTDHRw_8u_fRaYe2ZPCHSxpDxhZpIuc"
//           libraries={["geometry"]}
//         >
//           <GoogleMap
//             mapContainerStyle={{ width: "100%", height: "100%" }}
//             center={mapCenter}
//             zoom={15}
//             options={{
//               zoomControl: false,
//               streetViewControl: false,
//               mapTypeControl: false,
//               fullscreenControl: false,
//             }}
//             onLoad={onLoad}
//             onUnmount={onUnmount}
//           >
//             {/* You can add additional Google Maps components here */}
//           </GoogleMap>

//           {isMapReady && mapRef.current && (
//             <MapSideBar
//               onRecenterClick={handleRecenter}
//               isExpanded={isExpanded}
//             />
//           )}
//         </LoadScript>
//       </div>
//     </div>
//   );
// };

// export default MapWithFilterUI;

import { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MapSideBar from "../map/MapSideBar";
import LocationIndicator from "../../icons/HomeUpdate/LocationIndicator.svg";
import "../map/map.css";

interface MapWithFilterUIProps {
  isExpanded: boolean;
  nearbyPlaces?: Array<{
    id: string;
    name: string;
    location: {
      coordinates: [number, number];
    };
    photos?: string[];
    rating?: number;
    tags?: Array<{
      key: string;
      name: string;
    }>;
  }>;
  onPlaceSelect: any;
}

const MapWithFilterUI = ({
  isExpanded,
  nearbyPlaces = [],
  onPlaceSelect,
}: MapWithFilterUIProps) => {
  const [isMapReady, setIsMapReady] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const placeMarkersRef = useRef<google.maps.Marker[]>([]);

  // Default center coordinates
  const mapCenter = { lat: 11.5458547, lng: 104.9305413 };

  // Clear existing place markers
  const clearPlaceMarkers = () => {
    placeMarkersRef.current.forEach((marker) => {
      marker.setMap(null);
    });
    placeMarkersRef.current = [];
  };

  // Create markers for nearby places
  const createPlaceMarkers = () => {
    if (!mapRef.current || !nearbyPlaces.length) return;

    clearPlaceMarkers();

    const newMarkers = nearbyPlaces.map((place) => {
      const [lng, lat] = place.location.coordinates;
      return new google.maps.Marker({
        position: { lat, lng },
        map: mapRef.current,
        title: place.name,
        icon: {
          url: place.photos?.[0] || getIconForPlaceType(place.tags?.[0]?.key),
          scaledSize: new google.maps.Size(30, 30),
          anchor: new google.maps.Point(15, 15),
        },
      });
    });

    placeMarkersRef.current = newMarkers;
  };

  // Get appropriate icon based on place type
  const getIconForPlaceType = (type?: string) => {
    // You should replace these with your actual icon URLs
    switch (type) {
      case "bar":
        return "https://maps.google.com/mapfiles/kml/pal2/icon47.png"; // Blue dot
      case "spa":
        return "https://maps.google.com/mapfiles/kml/pal2/icon48.png"; // Light blue dot
      case "coffee":
        return "https://maps.google.com/mapfiles/kml/pal2/icon49.png"; // Brown dot
      case "mall":
        return "https://maps.google.com/mapfiles/kml/pal2/icon50.png"; // Green dot
      case "massage":
        return "https://maps.google.com/mapfiles/kml/pal2/icon51.png"; // Purple dot
      default:
        return "https://maps.google.com/mapfiles/kml/pal2/icon7.png"; // Yellow dot
    }
  };

  useEffect(() => {
    if (isMapReady && nearbyPlaces.length) {
      createPlaceMarkers();
    }
  }, [isMapReady, nearbyPlaces]);

  const handleRecenter = () => {
    if (!mapRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const map = mapRef.current;

        if (!map) return;

        // Calculate offset to position marker at button height
        const bounds = map.getBounds();
        if (!bounds) return;

        const latSpan =
          bounds.getNorthEast().lat() - bounds.getSouthWest().lat();
        const offsetRatio = 0.45;
        const targetLat = latitude + latSpan * offsetRatio;

        // Update map view
        map.setCenter({ lat: targetLat, lng: longitude });
        map.setZoom(15);

        // Remove existing marker
        if (userMarkerRef.current) {
          userMarkerRef.current.setMap(null);
        }

        // Create new marker
        userMarkerRef.current = new google.maps.Marker({
          position: { lat: targetLat, lng: longitude },
          map: map,
          icon: {
            url: LocationIndicator,
            scaledSize: new google.maps.Size(50, 70),
            anchor: new google.maps.Point(25, 70),
          },
          zIndex: 1000,
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to access your location");
      }
    );
  };

  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map;
    setIsMapReady(true);
  };

  const onUnmount = () => {
    mapRef.current = null;
    clearPlaceMarkers();
  };

  return (
    <div className="absolute inset-0">
      <div className="w-full h-full relative">
        <LoadScript
          googleMapsApiKey="AIzaSyA4mTDHRw_8u_fRaYe2ZPCHSxpDxhZpIuc"
          libraries={["geometry"]}
        >
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={mapCenter}
            zoom={15}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/* Markers are created programmatically for better performance */}
          </GoogleMap>

          {isMapReady && mapRef.current && (
            <MapSideBar
              onRecenterClick={handleRecenter}
              isExpanded={isExpanded}
            />
          )}
        </LoadScript>
      </div>
    </div>
  );
};

export default MapWithFilterUI;
