import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ExploreCard from "../components/cards/ExploreCard";
import RecycleBinIcon from "icons/RecycleBin.svg";
import { useNavigate } from "react-router-dom";
import { useBookmarks } from '../hooks/useBookmarks';
import BackButton from "../components/common/BackButton";

export default function UploadedLocationPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("approved");
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Temporary data structure - will be replaced with actual data later
  const sampleLocation = {
    id: 1, // Add this line to ensure bookmark functionality works
    name: "Golden Gate",
    distance: "Phenom Penh ( 12km away )",
    rating: "5.0",
    reviews: "128",
    services: ["Service 1", "Service 2", "Service3"],
    price: "50 USD",
    description: "Providing the ultimate relaxation",
    address: "E88/4 ist eine",
    mobileNumber: "+18554992035",
    photos: [],
    status: activeTab
  };

  const handleCardClick = (location) => {
    navigate('/edit-location', { 
      state: { locationData: location }
    });
  };

  return (
    <div className="min-h-screen bg-theme-primary">
      {/* Header */}
      <div className="relative flex items-center px-4 py-3 bg-theme-secondary">
        <BackButton className="absolute left-4"/>
        <h1 className="text-lg font-semibold text-center flex-grow">Uploaded Location</h1>
        <button className="ml-auto" onClick={() => navigate('/recycle-bin')}>
          <img
            src={RecycleBinIcon}
            alt="Recycle Bin"
            className="w-6 h-6 [filter:var(--icon-filter)]"
          />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex px-4 py-2 space-x-4 bg-theme-secondary">
        {["Approved", "Pending", "Rejected"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 px-1 ${activeTab === tab.toLowerCase() ? "border-b-2 border-[#FDC51B] text-[#FDC51B]" : "text-theme-secondary"}`}
            onClick={() => setActiveTab(tab.toLowerCase())}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <ExploreCard 
          item={sampleLocation} 
          status={activeTab}
          onClick={() => handleCardClick(sampleLocation)}
          isBookmarked={isBookmarked(sampleLocation.id)}
          onBookmarkClick={() => toggleBookmark(sampleLocation)}
        />
        <ExploreCard 
          item={sampleLocation} 
          isBookmarked={isBookmarked(sampleLocation.id)}
          onBookmarkClick={() => toggleBookmark(sampleLocation)}
        />
        <ExploreCard 
          item={sampleLocation} 
          isBookmarked={isBookmarked(sampleLocation.id)}
          onBookmarkClick={() => toggleBookmark(sampleLocation)}
        />
      </div>
    </div>
  );
}