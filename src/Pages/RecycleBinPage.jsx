import React from "react";
import { useTranslation } from "react-i18next";
import ExploreCard from "../components/ExploreCard";

export default function RecycleBinPage() {
  const { t } = useTranslation();

  // Temporary data structure - will be replaced with actual data later
  const deletedLocations = [
    {
      name: "Golden Sovo",
      distance: "Phenom Penh ( 12km away )",
      rating: "5.0",
      reviews: "128",
      services: ["Service 1", "Service 2", "Service3"],
      price: "50 USD",
      status: "Approved"
    },
    {
      name: "Soveila",
      distance: "Phenom Penh ( 12km away )",
      rating: "5.0",
      reviews: "128",
      services: ["Service 1", "Service 2", "Service3"],
      price: "50 USD",
      status: "Rejected"
    }
  ];

  return (
    <div className="min-h-screen bg-theme-primary">
      {/* Header */}
      <div className="flex items-center px-4 py-3 bg-theme-secondary">
        <button onClick={() => window.history.back()} className="mr-4">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">Recycle Bin</h1>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {deletedLocations.map((location, index) => (
          <ExploreCard 
            key={index} 
            item={location} 
            status={location.status} 
            showBookmark={false} 
          />
        ))}
      </div>
    </div>
  );
}