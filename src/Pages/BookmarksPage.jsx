import React from 'react';
import ExploreCard from '../components/ExploreCard';
import BottomNavBar from '../components/BottomNavBar';

export default function BookmarksPage() {
  // Mock data for bookmarked places (you can replace this with real data later)
  const bookmarkedPlaces = [
    {
      id: 1,
      name: "Golden Sovo",
      images: ["/path/to/image1", "/path/to/image2", "/path/to/image3"],
      rating: 5.0,
      reviews: 128,
      price: "50 USD",
      services: ["Service 1", "Service 2", "Service3"],
      distance: "12km away"
    },
    // Add more bookmarked places as needed
  ];

  return (
    <div className="min-h-screen flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-theme-primary px-4 py-4 flex items-center">
            <button className="p-2" onClick={() => window.history.back()}>
              <svg className="w-6 h-6 text-theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h1 className="text-xl font-semibold text-theme-primary ml-2">Bookmarks</h1>
          </div>

          {/* Bookmarked Places Grid */}
          <div className="px-4 py-5 grid gap-4">
            {bookmarkedPlaces.map(place => (
              <ExploreCard 
                key={place.id} 
                item={place} 
                isBookmarked={true}
              />
            ))}
          </div>
        </div>

        <BottomNavBar />
      </div>
    </div>
  );
}