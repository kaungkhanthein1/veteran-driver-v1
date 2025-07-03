import { useState } from "react";
import MapWithFilterUI from "../map/MapWithFilterUI";
import BottomSheetModal from "../Home/BottomSheetModal";
import ExploreCard from "../../components/cards/ExploreCard";
import DropIcon from "../../icons/Drop.svg";
import TuneIcon from '../../icons/Tune.svg';
import SearchFilterBar from './SearchFilterBar';
import FilterPanel from '../map/FilterPanel';

interface SearchResultsProps {
  query: string;
  onBack: () => void;
}

// Mock data for search results
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
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  // Centralized filter state
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    distance: 10,
    rating: 0,
    services: [],
    categories: '',
    sort: 'Sort By',
  });

  // Helper to get display label for services
  const getServicesLabel = () => {
    if (!filters.services || filters.services.length === 0) return 'Services';
    if (filters.services.length === 1) return filters.services[0];
    return `${filters.services[0]} +${filters.services.length - 1}`;
  };

  // Helper to get display label for categories
  const getCategoriesLabel = () => {
    if (!filters.categories || filters.categories === '' || filters.categories === 'All') return 'Categories';
    return filters.categories;
  };

  // Filter results by query (case-insensitive)
  const filteredResults = searchResults.filter(item =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full min-h-screen relative">
      <div className="flex flex-col flex-1 relative w-full h-full">
        {/* Filter bar under search bar */}
        <SearchFilterBar
          selectedSortLabel={filters.sort}
          selectedServicesLabel={getServicesLabel()}
          selectedCategoriesLabel={getCategoriesLabel()}
          onSortClick={() => setIsSortModalOpen(true)}
          onTuneClick={() => setShowFilterPanel(true)}
        />
        {/* Custom Sort Modal */}
        {isSortModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40">
            <div className="bg-white w-full max-w-md rounded-t-2xl p-6">
              <div className="text-lg font-semibold mb-4">Sort By</div>
              <div className="flex gap-2 mb-6">
                <button
                  className={`flex-1 py-2 rounded-lg ${filters.sort === "Relevance" ? "" : "bg-gray-100"}`}
                  style={filters.sort === "Relevance" ? { background: 'rgba(255, 195, 0, 0.20)', color: '#FFAE00' } : {}}
                  onClick={() => setFilters(f => ({ ...f, sort: "Relevance" }))}
                >
                  Relevance
                </button>
                <button
                  className={`flex-1 py-2 rounded-lg ${filters.sort === "Distance" ? "" : "bg-gray-100"}`}
                  style={filters.sort === "Distance" ? { background: 'rgba(255, 195, 0, 0.20)', color: '#FFAE00' } : {}}
                  onClick={() => setFilters(f => ({ ...f, sort: "Distance" }))}
                >
                  Distance
                </button>
              </div>
              <div className="flex gap-2">
                <button
                  className="flex-1 py-2 rounded-lg bg-gray-200"
                  onClick={() => setIsSortModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="flex-1 py-2 rounded-lg text-white border-0"
                  style={{ background: 'linear-gradient(180deg, #FFC61B 0%, #FF9500 100%)' }}
                  onClick={() => setIsSortModalOpen(false)}
                >
                  Done
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Filter Panel Modal */}
        {showFilterPanel && (
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            applyFilters={() => setShowFilterPanel(false)}
            onClose={() => setShowFilterPanel(false)}
          />
        )}
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
