import { useState } from "react";
import { useTranslation } from "react-i18next";
import ExploreCard from "../components/cards/ExploreCard";
import RecycleBinIcon from "icons/RecycleBin.svg";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/common/BackButton";

export default function UploadedLocationPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(t('uploadedLocationPage.tabs.approved'));

  // Mock data for uploaded locations (replace with actual data source)
  const uploadedLocations = [
    {
      id: 1,
      name: "Golden Sovo",
      distance: "Phenom Penh ( 12km away )",
      rating: 5.0,
      reviews: 128,
      services: ["Service 1", "Service 2", "Service3"],
      price: "50 USD",
      description: "Providing the ultimate relaxation",
      address: "E88/4 ist eine",
      mobileNumber: "+18554992035",
      photos: [],
      status: "Approved"
    },
    {
      id: 2,
      name: "Soveila",
      distance: "Phenom Penh ( 12km away )",
      rating: 5.0,
      reviews: 128,
      services: ["Service 1", "Service 2", "Service3"],
      price: "50 USD",
      description: "Providing the ultimate relaxation",
      address: "E88/4 ist eine",
      mobileNumber: "+18554992035",
      photos: [],
      status: "Pending"
    },
    {
      id: 3,
      name: "Soveila",
      distance: "Phenom Penh ( 12km away )",
      rating: 5.0,
      reviews: 128,
      services: ["Service 1", "Service 2", "Service3"],
      price: "50 USD",
      description: "Providing the ultimate relaxation",
      address: "E88/4 ist eine",
      mobileNumber: "+18554992035",
      photos: [],
      status: "Rejected"
    }
  ];

  const handleCardClick = (location) => {
    navigate('/edit-location', { 
      state: { locationData: location }
    });
  };

  return (
    <div className="dvh-fallback bg-theme-primary">
      {/* Header */}
      <div className="relative flex items-center px-4 py-3 bg-theme-secondary">
        <BackButton className="absolute left-4"/>
        <h1 className="text-lg font-semibold text-center flex-grow">{t('uploadedLocationPage.title')}</h1>
        <button className="ml-auto" onClick={() => navigate('/recycle-bin')}>
          <img
            src={RecycleBinIcon}
            alt={t('uploadedLocationPage.recycleBinAlt')}
            className="w-6 h-6 [filter:var(--icon-filter)]"
          />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex px-4 py-2 space-x-4 bg-theme-secondary">
        {[t('uploadedLocationPage.tabs.approved'), t('uploadedLocationPage.tabs.pending'), t('uploadedLocationPage.tabs.rejected')].map((tab) => (
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
        {/* Render cards for each status tab */}
        {uploadedLocations.filter(location => location.status.toLowerCase() === activeTab.toLowerCase()).map((location) => (
          <ExploreCard
            key={location.id} // Use location.id for a stable key
            item={location}
            status={location.status} // Pass the status
            onClick={() => handleCardClick(location)} // Assuming handleCardClick is used for edit
            context="uploaded" // Indicate the context is uploaded locations
          />
        ))}
      </div>
    </div>
  );
}