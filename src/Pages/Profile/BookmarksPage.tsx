import ExploreCard from '../../components/cards/ExploreCard';
import { useBookmarks } from '../../hooks/useBookmarks';
import BackButton from '../../components/common/BackButton';
import LoginPrompt from '../../components/common/LoginPrompt';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FilterPanel from '../map/FilterPanel';
import { useState, useEffect } from 'react';
import PlaceCard from '../../components/cards/PlaceCard';
import BookmarkButton from '../../components/common/BookmarkButton';
import Bookmark from '../../icons/Bookmark.svg';
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
  const { isAuthenticated } = useAuth();
  const { bookmarkedItems, toggleBookmark, isBookmarked, loading, error, refetch } = useBookmarks();
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

  // Show login prompt for bookmarks tab if not authenticated
  const showLoginPrompt = !isAuthenticated && activeTab === 'bookmarks';

  return (
    <div className="dvh-fallback flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto pb-16 flex flex-col">
          {/* Header with Back Button */}
          <div className="flex items-center justify-between px-4 pt-6 pb-2 bg-theme-primary sticky top-0 z-30">
            <div onClick={() => navigate(-1)} className="cursor-pointer">
              <BackButton />
            </div>
            <h1 className="text-xl font-semibold text-theme-primary">Bookmarks</h1>
            <div className="w-6" /> {/* Spacer for centering */}
          </div>

          {/* Error State */}
          {error && (
            <div className="px-4 py-2">
              <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg text-sm flex items-center justify-between">
                <span>{error}</span>
                <button 
                  onClick={refetch}
                  className="text-red-600 hover:text-red-800 font-medium ml-2"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div className="flex items-center justify-center pt-4 pb-2 bg-theme-primary sticky top-16 z-20">
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
            <>
              {/* Show login prompt if not authenticated */}
              {showLoginPrompt ? (
                <LoginPrompt 
                  title="Save Your Favorite Places"
                  subtitle="Log in to access your saved spots and trips anytime"
                  onLoginClick={() => navigate('/login')}
                />
              ) : (
                <>
                  {/* Loading State */}
                  {loading && bookmarkedItems.length === 0 ? (
                    <div className="flex flex-1 flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-theme-primary mb-4"></div>
                      <p className="text-theme-secondary text-base">Loading favorites...</p>
                    </div>
                  ) : showEmpty ? (
                    /* Empty State */
                    <div className="flex flex-1 flex-col items-center justify-center">
                      <img src={NoRecent} alt="No Bookmarks" className="w-20 h-20 mb-2" />
                      <p className="text-theme-secondary text-base">No Bookmarks Yet</p>
                      <p className="text-theme-secondary text-sm mt-2 text-center px-8">
                        Start exploring and save places you love to see them here
                      </p>
                    </div>
                  ) : (
                    /* Content */
                    <div className="flex-1 flex flex-col gap-0">
                      {/* Recently Visit Section */}
                      <div className="flex-1 flex flex-col border-b border-theme-secondary min-h-0">
                        <div className="flex items-center justify-between px-4 mt-4 mb-2">
                          <h2 className="text-xl font-semibold text-theme-primary">Recently Visit</h2>
                          <button className="text-theme-secondary text-sm font-medium">View All</button>
                        </div>
                        <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-2">
                          {recentlyVisitedPlaces.length > 0 ? (
                            recentlyVisitedPlaces.slice(0, 3).map((place: any) => (
                              <div key={place.id} className="relative">
                                <PlaceCard
                                  image={place.image}
                                  name={place.name}
                                  address={place.address}
                                  distance={place.distance}
                                  rating={place.rating}
                                  reviews={place.reviews}
                                  views={place.views}
                                  onClick={() => handlePlaceClick(place)}
                                />
                                <div className="absolute top-3 right-3">
                                  <BookmarkButton 
                                    place={place}
                                    size="sm"
                                    onToggle={() => refetch()}
                                  />
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="flex flex-col items-center justify-center py-8">
                              <p className="text-theme-secondary text-sm opacity-80">No recent visits</p>
                            </div>
                          )}
                        </div>
                      </div>
                      {/* Favorite Places Section */}
                      <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex items-center justify-between px-4 mt-4 mb-2">
                          <h2 className="text-xl font-semibold text-theme-primary">
                            Favorite Places
                            {favoritePlaces.length > 0 && (
                              <span className="text-sm text-theme-secondary font-normal ml-2">
                                ({favoritePlaces.length})
                              </span>
                            )}
                          </h2>
                          {favoritePlaces.length > 3 && (
                            <button className="text-theme-secondary text-sm font-medium">View All</button>
                          )}
                        </div>
                        <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-2">
                          {favoritePlaces.length > 0 ? (
                            favoritePlaces.map((place: any) => (
                              <div key={place.id} className="relative">
                                <PlaceCard
                                  image={place.photos?.[0] || place.image}
                                  name={typeof place.name === 'object' ? place.name.en || place.name.zh : place.name}
                                  address={typeof place.address === 'object' ? place.address.en || place.address.zh : place.address || place.city}
                                  distance={place.distance}
                                  rating={place.rating}
                                  reviews={place.reviews || place.ratingCount}
                                  views={place.views}
                                  onClick={() => handlePlaceClick(place)}
                                />
                                <div className="absolute top-3 right-3">
                                  <BookmarkButton 
                                    place={place}
                                    size="sm"
                                    onToggle={() => refetch()}
                                  />
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="flex flex-col items-center justify-center h-full py-8">
                              <img src={NoRecent} alt="No Bookmarks" className="w-28 h-28 mb-2 opacity-80" />
                              <p className="text-theme-secondary text-base opacity-80">No Bookmarks Yet</p>
                              <p className="text-theme-secondary text-xs mt-1 opacity-60 text-center px-8">
                                Explore places and tap the bookmark icon to save them here
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </>
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