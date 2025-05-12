import React from "react";

export default function SocialTabs({ activeTab, setActiveTab, onUpload }) {
  const tabs = [
    { key: "newest", label: "Newest" },
    { key: "recommended", label: "Recommended" }
  ];

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#232323]">
      <div className="flex space-x-4">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`px-3 py-1 text-sm font-semibold ${
              activeTab === tab.key 
                ? "text-white border-b-2 border-yellow-400" 
                : "text-gray-400"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <button
        className="flex items-center text-white"
        onClick={onUpload}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="ml-1">Upload</span>
      </button>
    </div>
  );
}