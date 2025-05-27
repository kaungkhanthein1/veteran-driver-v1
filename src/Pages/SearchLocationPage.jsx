import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExploreCard from '../components/ExploreCard';
import { useBookmarks } from '../hooks/useBookmarks';

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

  // Filter locations based on search query
  const suggestions = searchQuery
    ? exploreItems.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  // Handle location selection
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
          <button
            onClick={() => navigate(-1)}
            className="p-2"
          >
            <img src="/src/icons/ArrowBack.svg" alt="back" className="w-6 h-6" />
          </button>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search Places ..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
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

        {/* Search Suggestions */}
        {showSuggestions && searchQuery && suggestions.length > 0 && (
          <div className="bg-theme-secondary border-t border-theme-primary/10">
            {suggestions.map((item) => (
              <button
                key={item.id}
                onClick={() => handleLocationSelect(item)}
                className="w-full flex items-center px-4 py-3 hover:bg-theme-primary/5"
              >
                <img src="/src/icons/Place.svg" alt="search" className="w-5 h-5 mr-3" />
                <div className="flex-1 text-left">
                  <div className="text-theme-primary">{item.name}</div>
                  <div className="text-theme-primary/60 text-sm">{item.type} • {item.distance}</div>
                </div>
                <img src="/src/icons/Right.svg" alt="navigate" className="w-5 h-5" />
              </button>
            ))}
          </div>
        )}

        {/* Original content (show when no suggestions are displayed) */}
        {(!showSuggestions || !searchQuery) && (
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
      </div>
    </div>
  );
}