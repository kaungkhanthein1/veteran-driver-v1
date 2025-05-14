import React from "react";
import "./home.css";

const Filternav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { key: "Hotels", label: "Hotels" },
    { key: "Motels", label: "Motels" },
    { key: "Attractions", label: "Attractions" },
    { key: "Shopping", label: "Shopping" },
    { key: "Massage", label: "Massage" },
  ];
  return (
    <div className="flex items-center justify-between px-4 py-4 overflow-x-auto">
      <div className="flex space-x-4">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`px-3 py-1 font-semibold justify-center items-center flex flex-col ${
              activeTab === tab.key
                ? "text-white text-[18px]"
                : "text-gray-400 text-[14px]"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
            {activeTab === tab.key && (
              <span className=" w-[30px] h-[4px] filter_nav"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Filternav;
