import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ExploreCard from "../components/ExploreCard";
import RecycleBinIcon from "../icons/RecycleBin.svg";
import { useNavigate } from "react-router-dom";

export default function UploadedLocationPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("approved");

  // Temporary data structure - will be replaced with actual data later
  const sampleLocation = {
    name: "Golden Gate",
    distance: "Phenom Penh ( 12km away )",
    rating: "5.0",
    reviews: "128",
    services: ["Service 1", "Service 2", "Service3"],
    price: "50 USD",
    description: "Providing the ultimate relaxation you deserve. Our professional massage services are tailored to melt away your escape today",
    address: "E88/4 ist eine Kleinstadt in Mittel-Navarra in Spanien. Estella hat 14 329",
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
      <div className="flex items-center px-4 py-3 bg-theme-secondary">
        <button onClick={() => window.history.back()} className="mr-4">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 className="text-lg font-semibold">Uploaded Location</h1>
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
        />
        <ExploreCard item={sampleLocation} />
        <ExploreCard item={sampleLocation} />
      </div>
    </div>
  );
}