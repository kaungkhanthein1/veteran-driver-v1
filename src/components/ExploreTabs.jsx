import React from "react";

export default function ExploreTabs({ activeTab, setActiveTab }) {
  const tabs = [
    { key: "Hotel", label: "Hotel" },
    { key: "Restaurant", label: "Restaurant" },
    { key: "Stores", label: "Stores" }
  ];

  return (
    <div className="flex items-center px-4 py-2 bg-[#232323] space-x-4">
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
  );
}