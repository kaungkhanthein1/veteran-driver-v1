import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import { useBookmarks } from '../hooks/useBookmarks';
import BackButton from "../components/BackButton";

// Mock data for ranking items
const rankingItems = [
  {
    id: 1,
    name: "BUGARIA",
    price: "50 USD",
    rating: 5.0,
    reviews: 128,
    distance: "12km away",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel",
    image: "/src/assets/GoldenGate.png"
  },
  {
    id: 2,
    name: "HILLSEDQE",
    price: "50 USD",
    rating: 5.0,
    reviews: 128,
    distance: "12km away",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel",
    image: "/src/assets/GoldenGateRoom.png"
  },
  {
    id: 3,
    name: "SIZZA",
    price: "50 USD",
    rating: 5.0,
    reviews: 128,
    distance: "12km away",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel",
    image: "/src/assets/Harrier.png"
  },
  {
    id: 4,
    name: "PHONIEX",
    price: "50 USD",
    rating: 5.0,
    reviews: 128,
    distance: "12km away",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel",
    image: "/src/assets/HarrierRoom.png"
  },
  {
    id: 5,
    name: "BANBILL",
    price: "50 USD",
    rating: 5.0,
    reviews: 128,
    distance: "12km away",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel",
    image: "/src/assets/GoldenGate.png"
  }
];

export default function RankingPage() {
  const [activeTab, setActiveTab] = useState("Popular");
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();

  return (
    <div className="min-h-screen flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-theme-primary px-4 py-3 flex items-center">
            <BackButton/>
            <h1 className="flex-1 text-center text-lg font-semibold text-theme-primary">Ranking</h1>
            <button className="p-2 -mr-2">
              <svg className="w-6 h-6 text-theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          </div>

          {/* Tabs */}
          <div className="px-4 flex space-x-3 mb-4">
            {["Popular", "Most View", "Trending"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-full text-sm ${activeTab === tab ? 'bg-[#FFC61B] text-theme-primary' : 'bg-theme-secondary text-theme-primary'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Ranking List */}
          <div className="px-4 space-y-4">
            {rankingItems.map((item, index) => (
              <div key={item.id} className="bg-theme-secondary rounded-2xl overflow-hidden">
                <div className="flex items-center p-4">
                  <div className="relative min-w-[120px] h-[120px] bg-theme-primary rounded-lg overflow-hidden mr-4">
                    {/* Rank Number */}
                    <div className="absolute top-0 left-0 w-10 h-10 bg-theme-primary bg-opacity-50 flex items-center justify-center rounded-br-lg">
                      <span 
                        className="text-transparent text-[28px] font-bold"
                        style={{
                          WebkitTextStrokeWidth: '1px',
                          WebkitTextStrokeColor: 'var(--text-primary)'
                        }}
                      >
                        {index + 1}
                      </span>
                    </div>
                    {/* Location Image */}
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                    {/* Rating Badge
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 rounded px-2 py-1 text-xs text-white">
                      {item.rating}/10
                    </div> */}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-theme-primary text-lg font-semibold">{item.name}</h3>
                      <button 
                        onClick={() => toggleBookmark(item)}
                        className="text-[#FFC61B]"
                      >
                        <svg
                          className={`w-6 h-6 ${isBookmarked(item.id) ? 'fill-current' : 'stroke-current fill-none'}`}
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                        </svg>
                      </button>
                    </div>
                    <p className="text-theme-primary text-sm mb-2">{item.distance}</p>
                    <div className="flex items-center gap-1 mb-2">
                      <span className="text-[#FFC61B] text-sm">{item.rating}</span>
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-[#FFC61B]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-theme-primary text-sm">({item.reviews})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-[#FFC61B] font-semibold">{item.price}</div>
                      <button className="bg-[#FFC61B] text-theme-primary px-4 py-1 rounded-full text-sm font-medium">
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <BottomNavBar active="ranking" />
      </div>
    </div>
  );
}