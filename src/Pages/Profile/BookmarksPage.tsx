import ExploreCard from '../../components/cards/ExploreCard';
import { useBookmarks } from '../../hooks/useBookmarks';
import BackButton from '../../components/common/BackButton';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import FilterPanel from '../map/FilterPanel';
import { useState } from 'react';
import PlaceCard from '../../components/cards/PlaceCard';
import Bookmark from '../../icons/Bookmark.svg';
import { useEffect } from 'react';
import NoRecent from '../../assets/NoRecent.png';
import HighlightBar from '../../icons/Highlight.png';
import NoNoti from '../../icons/NoNoti.svg';

const RECENTLY_VISITED_KEY = 'recentlyVisitedPlaces';

function getRecentlyVisited() {
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

export default function BookmarksPage() {
  const { bookmarkedItems, toggleBookmark, isBookmarked } = useBookmarks();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    distance: 50,
    rating: 0,
    services: [],
    sort: t('filterPanel.sortOptions.comprehensive'),
  });
  const [activeTab, setActiveTab] = useState('bookmarks');
  const [recentlyVisited, setRecentlyVisited] = useState(() => getRecentlyVisited());

  useEffect(() => {
    const handleStorage = () => setRecentlyVisited(getRecentlyVisited());
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  // Update recentlyVisited when coming back from location detail
  useEffect(() => {
    setRecentlyVisited(getRecentlyVisited());
  }, []);

  const handlePlaceClick = (place: any) => {
    addRecentlyVisited(place);
    setRecentlyVisited(getRecentlyVisited());
    navigate(`/location/${place.id}`, { state: { locationData: place } });
  };

  // Show in both if visited and bookmarked
  const favoritePlaces = bookmarkedItems;
  const recentlyVisitedPlaces = recentlyVisited;

  const showEmpty = favoritePlaces.length === 0 && recentlyVisitedPlaces.length === 0;

  const applyFilters = () => {};

  return (
    <div className="dvh-fallback flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto pb-16 flex flex-col">
          {/* Tabs */}
          <div className="flex items-center justify-center pt-6 pb-2 bg-theme-primary sticky top-0 z-20">
            <div className="flex gap-8">
              <button
                className={`flex flex-col items-center text-lg font-medium px-4 pb-0 transition-colors ${activeTab === 'bookmarks' ? 'text-theme-primary font-bold' : 'text-theme-secondary font-normal'}`}
                onClick={() => setActiveTab('bookmarks')}
              >
                <span>Bookmarks</span>
                {activeTab === 'bookmarks' && (
                  <div className="mt-1">
                    <img src={HighlightBar} alt="highlight" className="w-10 h-1" />
                  </div>
                )}
              </button>
              <button
                className={`flex flex-col items-center text-lg font-medium px-4 pb-0 transition-colors ${activeTab === 'notifications' ? 'text-theme-primary font-bold' : 'text-theme-secondary font-normal'}`}
                onClick={() => setActiveTab('notifications')}
              >
                <span>Notification</span>
                {activeTab === 'notifications' && (
                  <div className="mt-1">
                    <img src={HighlightBar} alt="highlight" className="w-10 h-1" />
                  </div>
                )}
              </button>
            </div>
          </div>
          {activeTab === 'bookmarks' && (
            showEmpty ? (
              <div className="flex flex-1 flex-col items-center justify-center">
                <img src={NoRecent} alt="No Bookmarks" className="w-20 h-20 mb-2" />
                <p className="text-theme-secondary text-base">No Bookmarks Yet</p>
              </div>
            ) : (
              <div className="flex-1 flex flex-col gap-0">
                {/* Recently Visit Section */}
                <div className="flex-1 flex flex-col border-b border-theme-secondary min-h-0">
                  <div className="flex items-center justify-between px-4 mt-4 mb-2">
                    <h2 className="text-xl font-semibold text-theme-primary">Recently Visit</h2>
                    <button className="text-theme-secondary text-sm font-medium">View All</button>
                  </div>
                  <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-2">
                    {recentlyVisitedPlaces.length > 0 && recentlyVisitedPlaces.slice(0, 3).map((place: any) => (
                      <PlaceCard
                        key={place.id}
                        image={place.image}
                        name={place.name}
                        address={place.address}
                        distance={place.distance}
                        rating={place.rating}
                        reviews={place.reviews}
                        views={place.views}
                        onClick={() => handlePlaceClick(place)}
                      />
                    ))}
                  </div>
                </div>
                {/* Favorite Places Section */}
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex items-center justify-between px-4 mt-4 mb-2">
                    <h2 className="text-xl font-semibold text-theme-primary">Favorite Places</h2>
                    <button className="text-theme-secondary text-sm font-medium">View All</button>
                  </div>
                  <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-2">
                    {favoritePlaces.length > 0 ? (
                      favoritePlaces.map((place: any) => (
                        <PlaceCard
                          key={place.id}
                          image={place.image}
                          name={place.name}
                          address={place.address}
                          distance={place.distance}
                          rating={place.rating}
                          reviews={place.reviews}
                          views={place.views}
                          onClick={() => handlePlaceClick(place)}
                        />
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full py-8">
                        <img src={NoRecent} alt="No Bookmarks" className="w-28 h-28 mb-2 opacity-80" />
                        <p className="text-theme-secondary text-base opacity-80">No Bookmarks Yet</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          )}
          {activeTab === 'notifications' && (
            <div className="flex flex-col items-center justify-center flex-1 pt-4">
              <img src={NoNoti} alt="No Notifications" className="w-[120px] h-[102px] mb-4 mt-4" />
              <div className="flex flex-col items-center mb-2">
                <span className="text-theme-primary text-lg font-semibold text-center">You’ve caught up with everything</span>
                <span className="text-theme-secondary text-base font-normal text-center mt-1">No notification at this time</span>
              </div>
            </div>
          )}
        </div>
        {/* Filter Panel Modal */}
        {showFilterPanel && (
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            applyFilters={applyFilters}
            onClose={() => setShowFilterPanel(false)}
          />
        )}
      </div>
    </div>
  );
}