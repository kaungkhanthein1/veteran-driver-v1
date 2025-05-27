import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExploreCard from '../components/ExploreCard';
import { useBookmarks } from '../hooks/useBookmarks';
import FilterPanel from './map/FilterPanel';
import BackButton from '../components/BackButton';

// Import explore items from ExplorePage
const exploreItems = [
  {
    id: 1,
    name: "BUGARIA",
    price: "50 USD",
    rating: 5.0,
    reviews: 128,
    distance: "12km away",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel"
  },
  {
    id: 2,
    name: "HARRIER",
    price: "50 USD",
    rating: 5.0,
    reviews: 128,
    distance: "12km away",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel"
  }
];

// Mock data for hot searches
const hotSearches = ['Novaria Hotel', 'Angela Condo', 'The Hill', 'Novotel', 'Cedona'];
const recentSearches = ['Novotel Hotel', 'Nova Resort', 'Novel Star Hotel'];
const recentViews = exploreItems; // Using exploreItems as mock data for recent views

export default function SearchLocationPage() {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    distance: 10,
    rating: 0,
    services: [],
    sort: 'Comprehensive'
  });

  // Add the missing handleApplyFilters function
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowFilter(false);
  };

  // Filter locations based on search query
  const suggestions = searchQuery
    ? exploreItems.filter(item => {
        const query = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query) ||
          item.services.some(service => service.toLowerCase().includes(query)) ||
          item.distance.toLowerCase().includes(query)
        );
      })
    : [];

  const handleLocationSelect = (item) => {
    setSearchQuery(item.name);
    setShowSuggestions(false);
    navigate(`/location/${item.id}`);
  };

  return (
    <div className="min-h-screen bg-theme-primary">
      <div className="max-w-[480px] mx-auto">
        {/* Search Header */}
        <div className="flex items-center gap-2 p-4 bg-theme-secondary">
          <BackButton/>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Places ..."
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
                // Show suggestions whenever there is input
                setShowSuggestions(true);
              }}
              onFocus={() => {
                // Show suggestions on focus if there is any input
                if (searchQuery) {
                  setShowSuggestions(true);
                }
              }}
              className="bg-transparent text-theme-primary w-full outline-none text-[16px] focus:outline-none focus:ring-0 border-none"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSuggestions(false);
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <span className="text-theme-primary text-xl">×</span>
              </button>
            )}
          </div>
        </div>

        {/* Search Results Count */}
        {showSuggestions && searchQuery && suggestions.length > 0 && (
          <div className="flex justify-between items-center px-4 py-2 bg-theme-secondary border-t border-theme-primary/10">
            <span className="text-theme-primary text-sm">{suggestions.length} Results found</span>
            <button className="p-2" onClick={() => setShowFilter(true)}>
              <img src="/src/icons/Tune.svg" alt="filter" className="w-5 h-5 [filter:var(--icon-filter)]" />
            </button>
          </div>
        )}

        {/* Search Results */}
        {showSuggestions && searchQuery && suggestions.length > 0 ? (
          <div className="p-4 space-y-4">
            {suggestions.map((item) => (
              <ExploreCard
                key={item.id}
                item={item}
                onClick={() => handleLocationSelect(item)}
                isBookmarked={isBookmarked(item.id)}
                onBookmarkClick={() => toggleBookmark(item)}
              />
            ))}          
          </div>
        ) : (
          // Original content (Hot Search, Recent Searches, Recent View)
          <div className="p-4 space-y-6">
            {/* Hot Search */}
            <div>
              <h2 className="text-theme-primary text-lg font-medium mb-3">Hot Search</h2>
              <div className="flex flex-wrap gap-2">
                {hotSearches.map((tag) => (
                  <button
                    key={tag}
                    className="px-4 py-2 rounded-full bg-theme-secondary text-theme-primary text-sm"
                    onClick={() => setSearchQuery(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-theme-primary text-lg font-medium">Recents</h2>
                <button className="text-theme-primary text-sm">Clear</button>
              </div>
              <div className="space-y-2">
                {recentSearches.map((search) => (
                  <div key={search} className="flex justify-between items-center">
                    <button
                      className="text-theme-primary"
                      onClick={() => setSearchQuery(search)}
                    >
                      {search}
                    </button>
                    <button className="p-1">
                      <span className="text-theme-primary text-xl">×</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent View */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-theme-primary text-lg font-medium">Recent View</h2>
                <button className="text-theme-primary text-sm">Clear</button>
              </div>
              <div className="space-y-4">
                {recentViews.map((item) => (
                  <ExploreCard
                    key={item.id}
                    item={item}
                    onClick={() => navigate(`/location/${item.id}`)}
                    isBookmarked={isBookmarked(item.id)}
                    onBookmarkClick={() => toggleBookmark(item)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filter Panel */}
        {showFilter && (
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            applyFilters={handleApplyFilters}
            onClose={() => setShowFilter(false)}
          />
        )}
      </div>
    </div>
  );
}