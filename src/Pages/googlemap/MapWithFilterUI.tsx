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

  const createCustomMarkerIcon = (imageUrl: string) => {
    // Canvas setup
    const scaleFactor = 2;
    const canvas = document.createElement("canvas");
    canvas.width = 60 * scaleFactor;
    canvas.height = 70 * scaleFactor; // Reduced height for shorter pin
    const context = canvas.getContext("2d");

    if (!context) return null;
    context.scale(scaleFactor, scaleFactor);

    // Create image element
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = imageUrl;

    return new Promise<google.maps.Icon>((resolve) => {
      img.onload = () => {
        // 1. Draw yellow border circle
        context.beginPath();
        context.arc(30, 30, 30, 0, 2 * Math.PI);
        context.fillStyle = "#FFD700";
        context.fill();

        // 2. Draw white circle for border effect
        context.beginPath();
        context.arc(30, 30, 25, 0, 2 * Math.PI);
        context.fillStyle = "white";
        context.fill();

        // 3. Clip and draw image
        context.save();
        context.beginPath();
        context.arc(30, 30, 25, 0, 2 * Math.PI);
        context.closePath();
        context.clip();
        context.drawImage(img, 5, 5, 50, 50);
        context.restore();

        // 4. Draw shorter reverse triangle pin (height reduced to 10px)
        const pinBottomWidth = 16;
        const pinBottomHeight = 10; // Reduced height

        context.beginPath();
        context.moveTo(30 - pinBottomWidth / 2, 60);
        context.lineTo(30 + pinBottomWidth / 2, 60);
        context.lineTo(30, 60 + pinBottomHeight);
        context.closePath();
        context.fillStyle = "#FFD700";
        context.fill();

        resolve({
          url: canvas.toDataURL(),
          scaledSize: new google.maps.Size(60, 70), // Adjusted height
          anchor: new google.maps.Point(30, 70), // Adjusted anchor
        });
      };

      img.onerror = () => {
        // Fallback version
        context.beginPath();
        context.arc(30, 30, 30, 0, 2 * Math.PI);
        context.fillStyle = "#FFD700";
        context.fill();

        context.beginPath();
        context.arc(30, 30, 25, 0, 2 * Math.PI);
        context.fillStyle = "white";
        context.fill();

        // Shorter triangle pin
        const pinBottomWidth = 16;
        const pinBottomHeight = 10;

        context.beginPath();
        context.moveTo(30 - pinBottomWidth / 2, 60);
        context.lineTo(30 + pinBottomWidth / 2, 60);
        context.lineTo(30, 60 + pinBottomHeight);
        context.closePath();
        context.fillStyle = "#FFD700";
        context.fill();

        resolve({
          url: canvas.toDataURL(),
          scaledSize: new google.maps.Size(60, 70),
          anchor: new google.maps.Point(30, 70),
        });
      };
    });
  };
  // const createCustomMarkerIcon = (imageUrl: string) => {
  //   // Canvas setup
  //   const scaleFactor = 2;
  //   const canvas = document.createElement("canvas");
  //   canvas.width = 60 * scaleFactor;
  //   canvas.height = 80 * scaleFactor;
  //   const context = canvas.getContext("2d");

  //   if (!context) return null;
  //   context.scale(scaleFactor, scaleFactor);

  //   // Create image element
  //   const img = new Image();
  //   img.crossOrigin = "Anonymous";
  //   img.src = imageUrl;

  //   return new Promise<google.maps.Icon>((resolve) => {
  //     img.onload = () => {
  //       // 1. First draw the yellow border circle (outermost)
  //       context.beginPath();
  //       context.arc(30, 30, 30, 0, 2 * Math.PI);
  //       context.fillStyle = "#FFD700";
  //       context.fill();

  //       // 2. Draw white circle slightly smaller to create border effect
  //       context.beginPath();
  //       context.arc(30, 30, 25, 0, 2 * Math.PI); // 5px smaller radius = 10px border
  //       context.fillStyle = "white";
  //       context.fill();

  //       // 3. Clip image to circle (slightly smaller than border)
  //       context.save();
  //       context.beginPath();
  //       context.arc(30, 30, 25, 0, 2 * Math.PI); // Same size as white circle
  //       context.closePath();
  //       context.clip();

  //       // 4. Draw image filling the clipped area (touching border)
  //       context.drawImage(img, 5, 5, 50, 50); // Positioned to touch border
  //       context.restore();

  //       // 5. Draw wider reverse triangle pin (no border)
  //       const pinBottomWidth = 16;
  //       const pinBottomHeight = 20;

  //       context.beginPath();
  //       context.moveTo(30 - pinBottomWidth / 2, 60);
  //       context.lineTo(30 + pinBottomWidth / 2, 60);
  //       context.lineTo(30, 60 + pinBottomHeight);
  //       context.closePath();
  //       context.fillStyle = "#FFD700";
  //       context.fill();

  //       resolve({
  //         url: canvas.toDataURL(),
  //         scaledSize: new google.maps.Size(60, 80),
  //         anchor: new google.maps.Point(30, 80),
  //       });
  //     };

  //     img.onerror = () => {
  //       // Fallback - yellow circle with white border and no image
  //       context.beginPath();
  //       context.arc(30, 30, 30, 0, 2 * Math.PI);
  //       context.fillStyle = "#FFD700";
  //       context.fill();

  //       context.beginPath();
  //       context.arc(30, 30, 25, 0, 2 * Math.PI);
  //       context.fillStyle = "white";
  //       context.fill();

  //       // Draw triangle pin
  //       const pinBottomWidth = 16;
  //       const pinBottomHeight = 20;

  //       context.beginPath();
  //       context.moveTo(30 - pinBottomWidth / 2, 60);
  //       context.lineTo(30 + pinBottomWidth / 2, 60);
  //       context.lineTo(30, 60 + pinBottomHeight);
  //       context.closePath();
  //       context.fillStyle = "#FFD700";
  //       context.fill();

  //       resolve({
  //         url: canvas.toDataURL(),
  //         scaledSize: new google.maps.Size(60, 80),
  //         anchor: new google.maps.Point(30, 80),
  //       });
  //     };
  //   });
  // };
  // const createCustomMarkerIcon = (imageUrl: string) => {
  //   // Canvas setup
  //   const scaleFactor = 2;
  //   const canvas = document.createElement("canvas");
  //   canvas.width = 60 * scaleFactor;
  //   canvas.height = 80 * scaleFactor;
  //   const context = canvas.getContext("2d");

  //   if (!context) return null;
  //   context.scale(scaleFactor, scaleFactor);

  //   // Draw circular image with thick border (60x60)
  //   const imageRadius = 30;
  //   const borderWidth = 10;

  //   // Yellow border circle
  //   context.beginPath();
  //   context.arc(30, 30, imageRadius, 0, 2 * Math.PI);
  //   context.fillStyle = "#FFD700";
  //   context.fill();

  //   // White inner circle (creates border effect)
  //   context.beginPath();
  //   context.arc(30, 30, imageRadius - borderWidth / 2, 0, 2 * Math.PI);
  //   context.fillStyle = "white";
  //   context.fill();

  //   // Create image element
  //   const img = new Image();
  //   img.crossOrigin = "Anonymous";
  //   img.src = imageUrl;

  //   return new Promise<google.maps.Icon>((resolve) => {
  //     img.onload = () => {
  //       // Clip and draw image
  //       context.save();
  //       context.beginPath();
  //       context.arc(30, 30, imageRadius - borderWidth, 0, 2 * Math.PI);
  //       context.closePath();
  //       context.clip();

  //       context.drawImage(
  //         img,
  //         30 - (imageRadius - borderWidth),
  //         30 - (imageRadius - borderWidth),
  //         (imageRadius - borderWidth) * 2,
  //         (imageRadius - borderWidth) * 2
  //       );
  //       context.restore();

  //       // Draw wider reverse triangle pin (no border)
  //       const pinBottomWidth = 16; // Wider triangle
  //       const pinBottomHeight = 20;

  //       context.beginPath();
  //       context.moveTo(30 - pinBottomWidth / 2, 60); // Bottom left
  //       context.lineTo(30 + pinBottomWidth / 2, 60); // Bottom right
  //       context.lineTo(30, 60 + pinBottomHeight); // Tip point
  //       context.closePath();
  //       context.fillStyle = "#FFD700";
  //       context.fill();

  //       resolve({
  //         url: canvas.toDataURL(),
  //         scaledSize: new google.maps.Size(60, 80),
  //         anchor: new google.maps.Point(30, 80),
  //       });
  //     };

  //     img.onerror = () => {
  //       // Fallback - just show the marker without image
  //       // Draw wider reverse triangle pin (no border)
  //       const pinBottomWidth = 16;
  //       const pinBottomHeight = 20;

  //       context.beginPath();
  //       context.moveTo(30 - pinBottomWidth / 2, 60);
  //       context.lineTo(30 + pinBottomWidth / 2, 60);
  //       context.lineTo(30, 60 + pinBottomHeight);
  //       context.closePath();
  //       context.fillStyle = "#FFD700";
  //       context.fill();

  //       resolve({
  //         url: canvas.toDataURL(),
  //         scaledSize: new google.maps.Size(60, 80),
  //         anchor: new google.maps.Point(30, 80),
  //       });
  //     };
  //   });
  // };
  // Create markers for nearby places
  const createPlaceMarkers = async () => {
    if (!mapRef.current || !nearbyPlaces.length) return;

    clearPlaceMarkers();

    for (const place of nearbyPlaces) {
      const [lng, lat] = place.location.coordinates;
      const icon = await createCustomMarkerIcon(
        place.photos?.[0] || getIconForPlaceType(place.tags?.[0]?.key)
      );

      const marker = new google.maps.Marker({
        position: { lat, lng },
        map: mapRef.current,
        title: place.name,
        icon: icon,
      });

      marker.addListener("click", () => {
        onPlaceSelect(place);
      });

      placeMarkersRef.current.push(marker);
    }
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
        <GoogleMap
          mapContainerStyle={{ width: "100%", height: "100%" }}
          center={mapCenter}
          zoom={15}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
            gestureHandling: "greedy",
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
      </div>
    </div>
  );
};

export default MapWithFilterUI;
