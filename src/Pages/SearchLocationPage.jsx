import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExploreCard from '../components/ExploreCard';
import { useBookmarks } from '../hooks/useBookmarks';

// Mock data for demonstration
const hotSearches = ['Novaria Hotel', 'Angela Condo', 'The Hill', 'Novotel', 'Cedona'];
const recentSearches = ['Novotel Hotel', 'Nova Resort', 'Novel Star Hotel'];
const recentViews = [
  {
    id: 1,
    name: 'Golden Gate',
    location: 'Phenom Penh',
    distance: '12km away',
    rating: 5.0,
    reviews: 128,
    services: ['Service 1', 'Service 2', 'Service3'],
    price: '50 USD',
    images: ['/src/assets/GoldenGate.png', '/src/assets/GoldenGateRoom.png']
  }
];

export default function SearchLocationPage() {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [searchQuery, setSearchQuery] = useState('');

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
          <input
            type="text"
            placeholder="Search Places ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-theme-primary w-full outline-none text-[16px] focus:outline-none focus:ring-0 border-none"
          />
        </div>

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
      </div>
    </div>
  );
}