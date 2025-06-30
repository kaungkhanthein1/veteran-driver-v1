import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "./map.css";
import MapSideBar from "./MapSideBar";
import LocationIndicator from "../../icons/HomeUpdate/LocationIndicator.svg";

interface MapWithFilterUIProps {
  isExpanded: boolean;
}

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

const MapWithFilterUI = ({ isExpanded }: MapWithFilterUIProps) => {
  const [isMapReady, setIsMapReady] = useState(false);
  const mapRef = useRef();
  const userMarkerRef = useRef(null);

  // Default center coordinates
  const mapCenter = { lat: 11.5564, lng: 104.9282 };
  const stableCenter = useMemo(
    () => [mapCenter.lat, mapCenter.lng],
    [mapCenter.lat, mapCenter.lng]
  );

  const handleRecenter = () => {
    if (!mapRef.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const map = mapRef.current;

        if (!map) return;

        // Get the current map bounds
        const bounds = map.getBounds();
        const latSpan = bounds.getNorth() - bounds.getSouth();
        
        // Calculate offset from center to position marker at button height
        const offsetRatio = 0.45;
        const targetLat = latitude + (latSpan * offsetRatio);

        // Update map view and marker
        map.setView([targetLat, longitude], 15, {
          animate: true,
          duration: 1
        });

        const customIcon = L.divIcon({
          html: `<img src="${LocationIndicator}" alt="location" style="width: 50px; height: 70px; transform: translate(-50%, -100%); pointer-events: none;" />`,
          iconSize: [50, 70],
          iconAnchor: [25, 70],
          className: "current-location-marker"
        });

        // Remove existing marker
        if (userMarkerRef.current) {
          map.removeLayer(userMarkerRef.current);
        }

        // Add new marker
        const marker = L.marker([targetLat, longitude], {
          icon: customIcon,
          zIndexOffset: 1000,
          interactive: false
        });
        
        marker.addTo(map);
        userMarkerRef.current = marker;
      },
      (error) => {
        console.error("Geolocation error:", error);
        alert("Unable to access your location");
      }
    );
  };

  return (
    <div className="absolute inset-0 bg-theme-primary">
      <div className="w-full h-full relative">
        <MapContainer
          center={stableCenter}
          zoom={15}
          className="w-full h-full"
          zoomControl={false}
          style={{ zIndex: 1 }}
        >
          <AttachMapRef mapRef={mapRef} onReady={() => setIsMapReady(true)} />
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          />
          <RecenterMap center={stableCenter} />
        </MapContainer>

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
