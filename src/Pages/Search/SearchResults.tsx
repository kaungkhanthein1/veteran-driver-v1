import { useState } from "react";
import MapWithFilterUI from "../map/MapWithFilterUI";
import BottomSheetModal from "../Home/BottomSheetModal";
import ExploreCard from "../../components/cards/ExploreCard";
import DropIcon from "../../icons/Drop.svg";
import TuneIcon from '../../icons/Tune.svg';

interface SearchResultsProps {
  query: string;
  onBack: () => void;
}

// Mock data for search results (replace with real filtered data as needed)
const searchResults = [
  {
    id: 1,
    name: "Dan Cafe",
    address: "Phenom Penh",
    distance: "12km away",
    rating: 5.0,
    reviews: 128,
    price: "15 USD",
    services: ["Service 1", "Service 2", "Service3"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Thanh Cafe",
    address: "Phenom Penh",
    distance: "12km away",
    rating: 5.0,
    reviews: 128,
    price: "15 USD",
    services: ["Service 1", "Service 2", "Service3"],
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Coffee House",
    address: "Phnom Penh",
    distance: "10km away",
    rating: 4.8,
    reviews: 99,
    price: "12 USD",
    services: ["Service 1", "Service 2"],
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
  },
  // ...add more mock results as needed
];

export default function SearchResults({ query, onBack }: SearchResultsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Filter results by query (case-insensitive)
  const filteredResults = searchResults.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full min-h-screen relative">
      <div className="flex flex-col flex-1 relative w-full h-full">
        {/* Filter bar under search bar */}
        <div className="search-filter-bar w-full pr-4 pl-0 pt-0 pb-2 z-20">
          <div className="flex items-center gap-3 overflow-x-auto bg-transparent">
            <button className="flex items-center justify-center rounded-full border border-gray-200 bg-white/70 w-10 h-10 p-1">
              <img
                src={TuneIcon}
                alt="Filter"
                className="w-6 h-6"
              />
            </button>
            <button className="rounded-full border border-gray-200 bg-theme-secondary py-2 text-theme-primary text-sm font-medium whitespace-nowrap flex items-center gap-1 px-6">
              Sort By <img src={DropIcon} alt="▼" className="w-3 h-3 ml-1" />
            </button>
            <button className="rounded-full border border-gray-200 bg-theme-secondary py-2 text-theme-primary text-sm font-medium whitespace-nowrap flex items-center gap-1 px-6">
              Services <img src={DropIcon} alt="▼" className="w-3 h-3 ml-1" />
            </button>
            <button className="rounded-full border border-gray-200 bg-theme-secondary py-2 text-theme-primary text-sm font-medium whitespace-nowrap flex items-center gap-1 px-6">
              Categories <img src={DropIcon} alt="▼" className="w-3 h-3 ml-1" />
            </button>
          </div>
        </div>
        <div className="flex-1 relative w-full h-full">
          <MapWithFilterUI isExpanded={isExpanded} />
          <BottomSheetModal
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            minHeight={320}
          >
            <div className="p-4 space-y-4">
              {filteredResults.length > 0 ? (
                filteredResults.map(item => (
                  <ExploreCard
                    key={item.id}
                    item={item}
                    onClick={() => {}}
                    context="explore"
                  />
                ))
              ) : (
                <div className="text-center text-gray-400 py-8">No results found</div>
              )}
            </div>
          </BottomSheetModal>
        </div>
      </div>
    </div>
  );
}
