import { useTranslation } from "react-i18next";
import PlaceCard from "../../components/cards/PlaceCard";
import GoldenGateImage from "../../assets/GoldenGate.png";
import HarrierImage from "../../assets/Harrier.png";
import RoomImage from "../../assets/Room.png";
import { useNavigate } from "react-router-dom";

const RECENTLY_VISITED_KEY = "recentlyVisitedPlaces";

function getRecentlyVisited(): any[] {
  try {
    return JSON.parse(localStorage.getItem(RECENTLY_VISITED_KEY) || "[]");
  } catch {
    return [];
  }
}

function addRecentlyVisited(place: any) {
  const current = getRecentlyVisited();
  // Remove if already exists, then add to front
  const filtered = current.filter((p: any) => p.id !== place.id);
  const updated = [place, ...filtered].slice(0, 10); // Keep max 10
  localStorage.setItem(RECENTLY_VISITED_KEY, JSON.stringify(updated));
}

export default function MainContent({
  places,
  query,
  isLoadingRecommand,
}: {
  places: any;
  query: any;
  isLoadingRecommand: any;
}) {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Nearest Recommendation Section */}
      <div className="px-4 py-5 bg-theme-secondary">
        <h2 className="text-lg font-semibold text-theme-text mb-4">
          {query?.length > 0 ? `Nearest ${query}` : "Nearest Recommendation"}
        </h2>
        <div className="flex flex-col gap-2">
          {isLoadingRecommand ? (
            <div className="p-5 flex items-center justify-center h-[60dvh]">
              <div className="spiner"></div>
            </div>
          ) : places.length === 0 ? (
            <div className="p-5 flex items-center justify-center h-[60dvh] text-theme-secondary">
              {t("homePage.noPlacesFound")}
            </div>
          ) : (
            <div>
              {places.map((item: any) => (
                <PlaceCard
                  key={item.id}
                  image={item.photos[0] || GoldenGateImage}
                  name={item.name}
                  address={`${item.address} ( ${item.distance} )`}
                  rating={item.rating}
                  reviews={item.ratingCount}
                  views={item.viewCount}
                  onClick={() => {
                    addRecentlyVisited(item);
                    navigate(`/location/${item.id}`, {
                      state: { locationData: item },
                    });
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
