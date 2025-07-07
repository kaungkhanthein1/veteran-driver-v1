import { useTranslation } from "react-i18next";
import PlaceCard from "../../components/cards/PlaceCard";
import GoldenGateImage from "../../assets/GoldenGate.png";
import HarrierImage from "../../assets/Harrier.png";
import RoomImage from "../../assets/Room.png";
import { useNavigate } from "react-router-dom";

const RECENTLY_VISITED_KEY = 'recentlyVisitedPlaces';

function getRecentlyVisited(): any[] {
  try {
    return JSON.parse(localStorage.getItem(RECENTLY_VISITED_KEY) || '[]');
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

export default function MainContent() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Mock data for nearest places
  const nearestPlaces = [
    {
      id: "np1",
      name: "HANA",
      address: "Phenom Penh",
      distance: "12km away",
      rating: 5.0,
      reviews: 128,
      views: 125689,
      image: GoldenGateImage,
    },
    {
      id: "np2",
      name: "BUGARIA",
      address: "Phenom Penh",
      distance: "12km away",
      rating: 5.0,
      reviews: 128,
      views: 125689,
      image: HarrierImage,
    },
    {
      id: "np3",
      name: "Auxi Club",
      address: "Phenom Penh",
      distance: "12km away",
      rating: 5.0,
      reviews: 128,
      views: 125689,
      image: RoomImage,
    },
    {
      id: "np4",
      name: "Lina Club",
      address: "Phenom Penh",
      distance: "12km away",
      rating: 5.0,
      reviews: 128,
      views: 125689,
      image: GoldenGateImage,
    },
    {
      id: "np5",
      name: "Holy Spa",
      address: "Phenom Penh",
      distance: "12km away",
      rating: 5.0,
      reviews: 128,
      views: 125689,
      image: HarrierImage,
    },
    {
      id: "np6",
      name: "Ling Massage",
      address: "Phenom Penh",
      distance: "12km away",
      rating: 5.0,
      reviews: 128,
      views: 125689,
      image: RoomImage,
    },
    {
      id: "np7",
      name: "IT Bar",
      address: "Phenom Penh",
      distance: "12km away",
      rating: 5.0,
      reviews: 128,
      views: 125689,
      image: GoldenGateImage,
    },
  ];

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Nearest Recommendation Section */}
      <div className="px-4 py-5 bg-theme-secondary">
        <h2 className="text-lg font-semibold text-theme-text mb-4">
          {t("homePage.nearestRecommendationTitle") || "Nearest Recommendation"}
        </h2>
        <div className="flex flex-col gap-2">
          {nearestPlaces.map((item) => (
            <PlaceCard
              key={item.id}
              image={item.image}
              name={item.name}
              address={`${item.address} ( ${item.distance} )`}
              rating={item.rating}
              reviews={item.reviews}
              views={item.views}
              onClick={() => {
                addRecentlyVisited(item);
                navigate(`/location/${item.id}`, { state: { locationData: item } });
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
