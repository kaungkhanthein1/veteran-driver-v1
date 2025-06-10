import React from "react";
import { useTranslation } from "react-i18next";

export default function ExploreTabs({ activeTab, setActiveTab }) {
  // TODO: Add PropTypes for prop validation
  const { t } = useTranslation();
  const tabs = [
    { key: "Hotel", label: t('exploreTabs.hotelTab') },
    { key: "Restaurant", label: t('exploreTabs.restaurantTab') },
    { key: "Stores", label: t('exploreTabs.storesTab') }
  ];

  return (
    <div className="flex items-center px-4 py-2 bg-theme-secondary space-x-4">
      {tabs.map(tab => (
        <button
          key={tab.key}
          className={`px-3 py-1 text-sm font-semibold ${
            activeTab === tab.key 
              ? "text-theme-primary border-b-2 border-[#FFC61B]" 
              : "text-theme-secondary"
          }`}
          onClick={() => setActiveTab(tab.key)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}