import { Marker, useMap } from "react-leaflet";
import { useEffect } from "react";
import L from "leaflet";

const thumbnailIcon = (src) =>
  L.divIcon({
    html: `<div class='w-12 h-12 rounded-full overflow-hidden border-2 border-yellow-500 shadow-md'>
            <img src='${src}' class='w-full h-full object-cover'/>
          </div>`,
  });

const FilteredMarkers = ({ markers }) => {
  const map = useMap();

  useEffect(() => {
    if (markers.length === 0) return;
    const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]));
    map.flyToBounds(bounds, { padding: [50, 50], duration: 1.2 });
  }, [markers, map]);

  return (
    <>
      {markers.map((place) => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={thumbnailIcon(place.image)}
        />
      ))}
    </>
  );
};

export default FilteredMarkers;
