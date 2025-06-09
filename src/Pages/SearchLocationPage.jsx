import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TopPickCard from '../components/cards/TopPickCard';
import { useBookmarks } from '../hooks/useBookmarks';
import FilterPanel from './map/FilterPanel';
import BackButton from '../components/common/BackButton';
import { useTranslation } from 'react-i18next';
import GoldenGate from "assets/GoldenGate.png";
import Harrier from "assets/Harrier.png";
import HarrierRoom from "assets/HarrierRoom.png";
import Beach from "assets/Beach.png";
import Room from "assets/Room.png";

// Import explore items from ExplorePage
const exploreItems = [
  {
    id: 1,
    name: "BUGARIA",
    price: "50 USD",
    reviews: 128,
    distance: "12km away",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel",
    image: GoldenGate // Using imported image
  },
  {
    id: 2,
    name: "HARRIER",
    price: "50 USD",
    reviews: 128,
    distance: "12km away",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel",
    image: Harrier // Using imported image
  },
  {
    id: 3,
    name: "RIA",
    price: "10 USD",
    reviews: 128,
    distance: "12km away",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Resort",
    image: HarrierRoom // Using imported image
  },
  {
    id: 4,
    name: "GARIA",
    price: "40 USD",
    reviews: 128,
    distance: "12km away",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Villa",
    image: Beach // Using imported image
  },
  {
    id: 5,
    name: "BUG",
    price: "20 USD",
    reviews: 128,
    distance: "12km away",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel",
    image: Room // Using imported image
  },
  {
    id: 6,
    name: "BUIA",
    price: "80 USD",
    reviews: 128,
    distance: "12km away",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Resort",
    image: GoldenGate // Reusing imported image
  },
  {
    id: 7,
    name: "Angela Condo",
    price: "70 USD",
    reviews: 90,
    distance: "5km away",
    services: ["Service 1", "Service 2"],
    type: "Condo",
    image: Harrier // Reusing imported image
  }
];

// Mock data for hot searches
const hotSearches = ['Novaria Hotel', 'Angela Condo', 'The Hill Villa', 'BUGARIA Bar'];
// const recentSearches = ['Havana', 'Archon', 'Novaria Hotel']; // This will be converted to state

// Mock data for Best Ranking and Recommended
const bestRankingItems = exploreItems.map(item => ({ ...item, views: 1567 }));
const recommendedItems = exploreItems.map(item => ({ ...item, views: 1567 }));

export default function SearchLocationPage() {
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilter, setShowFilter] = useState(false);
  const [primaryActiveTab, setPrimaryActiveTab] = useState('Recents'); 
  const [secondaryActiveTab, setSecondaryActiveTab] = useState('Best Ranking'); 
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    distance: 10,
    rating: 0,
    services: [],
    sort: 'Comprehensive'
  });
  const [recentSearches, setRecentSearches] = useState(['Havana', 'Archon', 'Novaria Hotel']); // Converted to state

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setShowFilter(false);
  };

  return (
    <div className="dvh-fallback bg-theme-primary">
      <div className="max-w-[480px] mx-auto">
        {/* Search Header */}
        <div className="flex items-center gap-2 p-4 bg-theme-primary border-b">
          <BackButton/>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder={t('searchLocationPage.searchPlaceholder')}
              value={searchQuery}
              onChange={(e) => {
                const value = e.target.value;
                setSearchQuery(value);
              }}
              onFocus={() => {
                if (searchQuery) {
                  // Do nothing on focus now
                }
              }}
              className="bg-transparent text-theme-primary w-full outline-none text-[16px] focus:outline-none focus:ring-0 border-none"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <span className="text-theme-primary text-xl">×</span>
              </button>
            )}
          </div>
        </div>

        {/* Primary Tab Navigation */}
        <div className="flex bg-theme-primary text-theme-primary px-4 space-x-4">
          <button
            className={`py-3 text-sm font-medium ${primaryActiveTab === 'Recents' ? 'border-b-2 border-[#FDC51B] text-base' : ''}`}
            onClick={() => setPrimaryActiveTab('Recents')}
          >
            {t('searchLocationPage.recents')}
          </button>
          <button
            className={`py-3 text-sm font-medium ${primaryActiveTab === 'Hot Search' ? 'border-b-2 border-[#FDC51B] text-base' : ''}`}
            onClick={() => setPrimaryActiveTab('Hot Search')}
          >
            {t('searchLocationPage.hotSearch')}
          </button>
        </div>

        {/* Primary Content based on primaryActiveTab */}
        <div className="p-4 space-y-6">
          {primaryActiveTab === 'Hot Search' && (
            <div>
              <h2 className="text-theme-primary text-lg font-medium mb-3">{t('searchLocationPage.hotSearch')}</h2>
              <div className="flex flex-wrap gap-2 w-full"> {/* Added w-full here */}
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
          )}

          {primaryActiveTab === 'Recents' && (
            <div>
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-theme-primary text-lg font-medium">{t('searchLocationPage.recents')}</h2>
                <button 
                  className="text-theme-primary text-sm"
                  onClick={() => setRecentSearches([])} // Clear All functionality
                >
                  {t('searchLocationPage.clearAll')}
                </button>
              </div>
              <div className="flex flex-wrap gap-2 w-full">
                {recentSearches.map((search) => (
                  <div key={search} className="px-4 py-2 rounded-full bg-theme-secondary text-theme-primary text-sm flex items-center gap-2">
                    <button
                      className="text-theme-primary"
                      onClick={() => setSearchQuery(search)}
                    >
                      {search}
                    </button>
                    <button 
                      className="p-1 -mr-2"
                      onClick={() => setRecentSearches(recentSearches.filter(item => item !== search))} // Delete individual item
                    >
                      <span className="text-theme-primary text-xl">×</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Secondary Tab Navigation */}
        <div className="flex bg-theme-primary text-theme-primary mt-4 px-4 space-x-4">
          <button
            className={`py-3 text-sm font-medium ${secondaryActiveTab === 'Best Ranking' ? 'border-b-2 border-[#FDC51B] text-base' : ''}`}
            onClick={() => setSecondaryActiveTab('Best Ranking')}
          >
            {t('searchLocationPage.bestRanking')}
          </button>
          <button
            className={`py-3 text-sm font-medium ${secondaryActiveTab === 'Recommended' ? 'border-b-2 border-[#FDC51B] text-base' : ''}`}
            onClick={() => setSecondaryActiveTab('Recommended')}
          >
            {t('searchLocationPage.recommended')}
          </button>
        </div>

        {/* Secondary Content based on secondaryActiveTab */}
        <div className="p-4 space-y-6">
          {secondaryActiveTab === 'Best Ranking' && (
            <div className="space-y-4">
              {bestRankingItems.map((item) => (
                <TopPickCard
                  key={item.id}
                  item={item}
                  onClick={() => navigate(`/location/${item.id}`)}
                  isBookmarked={isBookmarked(item.id)}
                  onBookmarkClick={() => toggleBookmark(item)}
                  showNumbering={true}
                />
              ))}
            </div>
          )}

          {secondaryActiveTab === 'Recommended' && (
            <div className="space-y-4">
              {recommendedItems.map((item, index) => (
                <TopPickCard
                  key={item.id}
                  item={item}
                  onClick={() => navigate(`/location/${item.id}`)}
                  isBookmarked={isBookmarked(item.id)}
                  onBookmarkClick={() => toggleBookmark(item)}
                  showNumbering={true}
                  showPlayIcon={index === 0}
                />
              ))}
            </div>
          )}
        </div>

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