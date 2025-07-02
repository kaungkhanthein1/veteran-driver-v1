import { useState } from "react";
import MapWithFilterUI from "../map/MapWithFilterUI";
import BottomSheetModal from "../Home/BottomSheetModal";
import ExploreCard from "../../components/cards/ExploreCard";
import FilterIcon from "../../icons/Filter.svg";

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
    <div className="flex flex-col h-full min-h-screen relative bg-theme-primary">
      <div className="flex flex-col flex-1 relative w-full h-full">
        {/* Filter bar under search bar */}
        <div className="w-full px-4 pt-0 pb-0 z-20">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar">
            <button className="flex items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm px-4 py-2">
              <img src={FilterIcon} alt="Filter" className="w-5 h-5" />
            </button>
            <button className="rounded-full border border-gray-200 bg-white shadow-sm px-4 py-2 text-theme-primary text-sm font-medium whitespace-nowrap flex items-center">
              Sort By <span className="ml-1">▼</span>
            </button>
            <button className="rounded-full border border-gray-200 bg-white shadow-sm px-4 py-2 text-theme-primary text-sm font-medium whitespace-nowrap flex items-center">
              Services <span className="ml-1">▼</span>
            </button>
            <button className="rounded-full border border-gray-200 bg-white shadow-sm px-4 py-2 text-theme-primary text-sm font-medium whitespace-nowrap flex items-center">
              Categories <span className="ml-1">▼</span>
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
