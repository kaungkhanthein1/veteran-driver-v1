import ExploreCard from '../../components/cards/ExploreCard';
import { useBookmarks } from '../../hooks/useBookmarks';
import BackButton from '../../components/common/BackButton';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TuneIcon from '../../icons/Tune.svg';
import FilterPanel from '../map/FilterPanel';
import { useState } from 'react';

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

  const applyFilters = () => {
    // TODO: Implement actual filter application logic
    console.log('Applying filters:', filters);
    setShowFilterPanel(false);
  };

  return (
    <div className="dvh-fallback flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-theme-primary px-4 py-4 flex items-center relative pt-6">
            <BackButton className="absolute left-4"/>
            <h1 className="text-xl font-semibold text-theme-primary text-center flex-grow">{t('bookmarksPage.title')}</h1>
            <button
              className="absolute right-4 p-2"
              onClick={() => setShowFilterPanel(true)}
            >
              <img src={TuneIcon} alt="Filter" className="w-6 h-6 [filter:var(--icon-filter)]" />
            </button>
          </div>

          {/* Bookmarked Places Grid */}
          <div className="px-4 py-5 grid gap-4">
            {bookmarkedItems && bookmarkedItems.length > 0 ? (
              bookmarkedItems.map(place => (
                <ExploreCard 
                  key={place.id} 
                  item={place} 
                  isBookmarked={isBookmarked(place.id)}
                  onBookmarkClick={() => toggleBookmark(place)}
                  onClick={() => navigate(`/location/${place.id}`)}
                />
              ))
            ) : (
              <div className="text-center text-theme-primary py-8">
                {t('bookmarksPage.noBookmarksText')}
              </div>
            )}
          </div>
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