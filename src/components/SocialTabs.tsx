import React from "react";
import { useTranslation } from "react-i18next";

export default function SocialTabs({ activeTab, setActiveTab, onUpload }) {
  const { t } = useTranslation();
  const tabs = [
    { key: "newest", label: t('socialTabs.newestTab') },
    { key: "recommended", label: t('socialTabs.recommendedTab') }
  ];

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-theme-secondary">
      <div className="flex space-x-4">
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
      <button
        className="flex items-center text-theme-primary"
        onClick={onUpload}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="ml-1">{t('socialTabs.uploadButton')}</span>
      </button>
    </div>
  );
}