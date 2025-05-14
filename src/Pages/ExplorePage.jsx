import React, { useState } from "react";
import BottomNavBar from "../components/BottomNavBar";
import ExploreTabs from "../components/ExploreTabs";
import ExploreCard from "../components/ExploreCard";

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

  return (
    <div className="min-h-screen flex flex-col bg-[#181818]">
      <div className="flex-1 overflow-y-auto pb-16">
        {/* Search Bar */}
        <div className="sticky top-0 z-10 bg-[#181818]">
          <div className="px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search location..."
                className="w-full bg-[#232323] text-white rounded-lg pl-10 pr-12 py-2.5 text-sm"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <button className="absolute right-3 top-1/2 -translate-y-1/2">
                <svg className="w-5 h-5 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Ads Section */}
          <div className="px-4 mb-4">
            <div className="relative w-full h-32 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50"></div>
              <div className="absolute inset-0 flex flex-col justify-center px-6">
                <h3 className="text-white text-xl font-semibold mb-2">Enjoy your Dream Vacation</h3>
                <p className="text-white text-sm opacity-80">Plan your perfect getaway with our exclusive deals</p>
              </div>
              <div className="absolute top-2 right-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">ADS</div>
            </div>
          </div>

          {/* Top Picks Section */}
          <div className="px-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-white text-lg font-semibold">Top Picks</h2>
              <button className="text-[#FFC61B] text-sm">View All</button>
            </div>
            <div className="flex space-x-3 overflow-x-auto pb-2">
              {[1, 2].map((num) => (
                <div key={num} className="relative min-w-[200px] h-32 bg-[#232323] rounded-lg overflow-hidden">
                  <div className="absolute top-0 left-0 w-12 h-12 bg-black bg-opacity-50 flex items-center justify-center rounded-br-lg">
                    <span 
                      className="text-transparent text-[32px] font-bold tracking-[1.28px]"
                      style={{
                        fontFamily: 'Heebo',
                        fontVariantNumeric: 'lining-nums proportional-nums',
                        fontFeatureSettings: "'dlig' on",
                        WebkitTextStrokeWidth: '1px',
                        WebkitTextStrokeColor: '#FFF',
                        textEdge: 'cap',
                        leadingTrim: 'both',
                        lineHeight: '20px'
                      }}
                    >
                      {num}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="text-white font-semibold text-lg">{exploreItems[num-1].name}</div>
                    <div className="text-[#FFC61B] font-medium">{exploreItems[num-1].price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Section */}
          <div className="px-4 mb-4">
            <h2 className="text-white text-lg font-semibold mb-3">Recommended</h2>
          </div>

          <ExploreTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <div className="h-[1px] bg-[#232323]"></div>
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