import ExploreCard from "../../components/cards/ExploreCard";
import NoRecent from "assets/NoRecent.png";
import GoldenGate from "assets/GoldenGate.png";
import Harrier from "assets/Harrier.png";
import HarrierRoom from "assets/HarrierRoom.png";
import Beach from "assets/Beach.png";
import Room from "assets/Room.png";

// Mock data for recent views (replace with real data if available)
const recentItems = [
  {
    id: 1,
    name: "Thanh Club",
    address: "Hochiminh",
    distance: "12km away",
    rating: 5.0,
    reviews: 128,
    price: "15 USD",
    services: ["Service 1", "Service 2", "Service3"],
    image: HarrierRoom,
  },
  {
    id: 2,
    name: "Kaleo Bar",
    address: "Phenom Penh",
    distance: "12km away",
    rating: 5.0,
    reviews: 128,
    price: "15 USD",
    services: ["Service 1", "Service 2", "Service3"],
    image: GoldenGate,
  },
  {
    id: 3,
    name: "Kola Bar",
    address: "Phenom Penh",
    distance: "12km away",
    rating: 5.0,
    reviews: 128,
    price: "15 USD",
    services: ["Service 1", "Service 2", "Service3"],
    image: Beach,
  },
];

export default function SearchRecent() {
  return (
    <>
      {/* Recent View Title */}
      <div className="text-lg font-medium mb-3">Recent View</div>

      {/* Recent Cards */}
      {recentItems.length > 0 ? (
        <div className="space-y-4">
          {recentItems.map(item => (
            <ExploreCard
              key={item.id}
              item={item}
              onClick={() => {}}
              context="explore"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-8">
          <img src={NoRecent} alt="No Recent" className="w-24 h-24" />
          <p className="text-theme-primary text-lg">No Recent</p>
        </div>
      )}
    </>
  );
}
