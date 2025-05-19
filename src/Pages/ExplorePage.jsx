import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import ExploreTabs from "../components/ExploreTabs";
import ExploreCard from "../components/ExploreCard";
import AddLocationIcon from "../icons/AddLocation.svg";

// Mock data for explore items
const exploreItems = [
  {
    id: 1,
    name: "BUGARIA",
    price: "50 USD",
    rating: 5.0,
    reviews: 128,
    distance: "12km away",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel"
  },
  {
    id: 2,
    name: "HARRIER",
    price: "50 USD",
    rating: 5.0,
    reviews: 128,
    distance: "12km away",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel"
  }
];

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState("Hotel");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-theme-primary">
      <div className="flex-1 overflow-y-auto pb-16">
        {/* Search Bar */}
        <div className="sticky top-0 z-10 bg-theme-primary">
          <div className="px-4 py-3 flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 bg-theme-secondary rounded-[14px] px-3 py-[8px]">
              <svg className="w-[18px] h-[18px] text-theme-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search location..."
                className="bg-transparent text-theme-primary w-full outline-none text-[14px] placeholder-theme-secondary focus:outline-none focus:ring-0 border-none"
              />
            </div>
            <button 
              className="flex items-center justify-center"
              onClick={() => navigate('/add-location')}
            >
              <img 
                src={AddLocationIcon} 
                alt="Add Location" 
                className="w-[35px] h-[35px]"
              />
            </button>
          </div>

          {/* Ads Section */}
          <div className="px-4 mb-4">
            <div className="relative w-full h-32 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50"></div>
              <div className="absolute inset-0 flex flex-col justify-center px-6">
                <h3 className="text-theme-primary text-xl font-semibold mb-2">Enjoy your Dream Vacation</h3>
                <p className="text-theme-primary text-sm opacity-80">Plan your perfect getaway with our exclusive deals</p>
              </div>
              <div className="absolute top-2 right-2 text-xs text-theme-primary bg-theme-primary bg-opacity-50 px-2 py-1 rounded">ADS</div>
            </div>
          </div>

          {/* Top Picks Section */}
          <div className="px-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-theme-primary text-lg font-semibold">Top Picks</h2>
              <button className="text-[#FFC61B] text-sm">View All</button>
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {[1, 2].map((num) => (
                <div key={num} className="relative min-w-[200px] h-32 bg-theme-secondary rounded-lg overflow-hidden">
                  <div className="absolute top-0 left-0 w-12 h-12 bg-theme-primary bg-opacity-50 flex items-center justify-center rounded-br-lg">
                    <span 
                      className="text-transparent text-[32px] font-bold tracking-[1.28px]"
                      style={{
                        fontFamily: 'Heebo',
                        fontVariantNumeric: 'lining-nums proportional-nums',
                        fontFeatureSettings: "'dlig' on",
                        WebkitTextStrokeWidth: '1px',
                        WebkitTextStrokeColor: 'var(--text-primary)',
                        textEdge: 'cap',
                        leadingTrim: 'both',
                        lineHeight: '20px'
                      }}
                    >
                      {num}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="text-theme-primary font-semibold text-lg">{exploreItems[num-1].name}</div>
                    <div className="text-[#FFC61B] font-medium">{exploreItems[num-1].price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Section */}
          <div className="px-4 mb-4">
            <h2 className="text-theme-primary text-lg font-semibold mb-3">Recommended</h2>
          </div>

          <ExploreTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="h-[1px] bg-theme-secondary"></div>
        </div>

        {/* Cards Grid */}
        <div className="p-4 grid gap-4">
          {exploreItems.map(item => (
            <ExploreCard key={item.id} item={item} />
          ))}
        </div>
      </div>
      <BottomNavBar active="explore" />
    </div>
  );
}