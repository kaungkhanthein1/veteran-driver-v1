import React from "react";

export default function SocialTabs({ activeTab, setActiveTab, onUpload }) {
  // Placeholder tab names
  const tabs = [
    { key: "newest", label: "Newest" },
    { key: "popular", label: "Popular" },
    { key: "following", label: "Following" },
  ];

  return (
    <div className="flex items-center justify-between px-4 py-2 bg-[#232323]">
      <div className="flex space-x-4">
        {tabs.map(tab => (
          <button
            key={tab.key}
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              activeTab === tab.key ? "bg-yellow-400 text-black" : "bg-[#181818] text-gray-400"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <button
        className="bg-yellow-400 text-black px-3 py-1 rounded-full font-semibold"
        onClick={onUpload}
      >
        Upload
      </button>
    </div>
  );
}