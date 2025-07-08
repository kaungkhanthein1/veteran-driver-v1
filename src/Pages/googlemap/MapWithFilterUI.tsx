import { useEffect, useRef, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import MapSideBar from "../map/MapSideBar";
import LocationIndicator from "../../icons/HomeUpdate/LocationIndicator.svg";
import "../map/map.css";
import sampleData from './data_sample.json';
import { MarkerClusterer } from "@googlemaps/markerclusterer";

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
    if (!mapRef.current) return;
  
    clearPlaceMarkers();
    // const markersData = !nearbyPlaces.length ? sampleData : nearbyPlaces;
    const markersData = sampleData;
    console.log('markersData is=>', markersData);
    const markerObjs = markersData.map((place) => {
      const [lng, lat] = place.location.coordinates;
      return new google.maps.Marker({
        position: { lat, lng },
        title: place.name,
        icon: {
          url: place.photos?.[0] || getIconForPlaceType(place.tags?.[0]?.key),
          scaledSize: new google.maps.Size(30, 30),
          anchor: new google.maps.Point(15, 15),
        },
      });
    });
  
    // 💥 Apply MarkerClusterer
    new MarkerClusterer({
      map: mapRef.current,
      markers: markerObjs,
    });
  
    placeMarkersRef.current = markerObjs;
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
    if (isMapReady) {
      createPlaceMarkers();
    }
  }, [isMapReady, nearbyPlaces]);

  const createUserMarkerIcon = (photoUrl: string) => {
    const svg = `
      <svg width="62" height="67" viewBox="0 0 62 67" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <clipPath id="circleView">
            <circle cx="31" cy="25" r="20" />
          </clipPath>
          <filter id="filter0_d" x="0.536288" y="0" width="61.4665" height="66.9864" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="5.46371"/>
            <feGaussianBlur stdDeviation="2.73186"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape"/>
          </filter>
        </defs>
  
        <!-- Your original yellow pin background -->
        <g filter="url(#filter0_d)">
          <path d="M33.3789 54.9236C35.4763 51.745 38.8257 49.691 42.2543 48.0334C50.7081 43.9465 56.5393 35.289 56.5393 25.2697C56.5393 11.3137 45.2257 0 31.2697 0C17.3136 0 6 11.3137 6 25.2697C6 35.289 11.8312 43.9465 20.285 48.0334C23.7136 49.691 27.0631 51.745 29.1605 54.9236C30.1592 56.4374 32.3801 56.4374 33.3789 54.9236Z" fill="#FFC300"/>
        </g>
  
        <!-- Dynamic circular user image -->
        <image
          xlink:href="${photoUrl}"
          x="11"
          y="5"
          width="40"
          height="40"
          clip-path="url(#circleView)"
          preserveAspectRatio="xMidYMid slice"
        />
      </svg>
    `;
  
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`,
      scaledSize: new google.maps.Size(62, 67),
      anchor: new google.maps.Point(31, 67),
    };
  };  

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
          icon: createUserMarkerIcon(LocationIndicator),
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
