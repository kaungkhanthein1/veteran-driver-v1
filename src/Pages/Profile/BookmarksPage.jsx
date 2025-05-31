import React from 'react';
import ExploreCard from '../../components/cards/ExploreCard';
import BottomNavBar from '../../components/common/BottomNavBar';
import { useBookmarks } from '../../hooks/useBookmarks';
import BackButton from '../../components/common/BackButton';
import { useTranslation } from 'react-i18next';

export default function BookmarksPage() {
  const { bookmarkedItems, toggleBookmark, isBookmarked } = useBookmarks();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-theme-primary px-4 py-4 flex items-center relative pt-6">
           <BackButton className="absolute left-4"/>
            <h1 className="text-xl font-semibold text-theme-primary text-center flex-grow">{t('bookmarksPage.title')}</h1>
          </div>

          {/* Bookmarked Places Grid */}
          <div className="px-4 py-5 grid gap-4">
            {bookmarkedItems && bookmarkedItems.length > 0 ? (
              bookmarkedItems.map(place => (
                <ExploreCard 
                  key={place.id} 
                  item={place} 
                  isBookmarked={true}
                  onBookmarkClick={() => toggleBookmark(place)}
                />
              ))
            ) : (
              <div className="text-center text-theme-primary py-8">
                {t('bookmarksPage.noBookmarksText')}
              </div>
            )}
          </div>
        </div>

        <BottomNavBar />
      </div>
    </div>
  );
}