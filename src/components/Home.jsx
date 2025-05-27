import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import TopNav from './home/TopNav';
import Carousel from './home/Carousel';
import SocialPostCard from './SocialPostCard';
import ExploreCard from './ExploreCard';
import BottomNavBar from './BottomNavBar';
import TopPicks from './TopPicks';
import { useBookmarks } from '../hooks/useBookmarks';

const HomePage = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('Hotels');
  const [activeService, setActiveService] = useState('Service 1');
  const { isBookmarked, toggleBookmark } = useBookmarks();

  // Mock data for feedbacks
  const feedbacks = [
    {
      id: 1,
      user: {
        name: "BLUVARI",
        verified: true
      },
      content: "这次旅行选择了【XXX酒店】，整体体验非常满意，强烈推荐给正在寻找性价比高、服务贴心的朋友们！",
      tags: [
        { icon: "🏨", text: "酒店亮点" },
        { text: "视频无限观看" },
        { text: "浏览不限次数" },
        { text: "上传无广告" }
      ],
      time: "33min ago",
      likes: "5324",
      comments: "20",
      shares: "6"
    },
    {
      id: 2,
      user: {
        name: "SUNNY",
        verified: true
      },
      content: "私人泳池太赞了！服务周到，环境优美，完美的度假体验。推荐大家来尝试，绝对值得！",
      tags: [
        { icon: "🏊‍♂️", text: "泳池" },
        { text: "五星好评" },
        { text: "度假首选" }
      ],
      time: "45min ago",
      likes: "3242",
      comments: "15",
      shares: "4"
    },
    {
      id: 3,
      user: {
        name: "TRAVELER",
        verified: true
      },
      content: "酒店的设计很有特色，每个角落都很适合拍照。房间宽敞舒适，服务人员态度很好。",
      tags: [
        { icon: "📸", text: "网红打卡" },
        { text: "超值体验" },
        { text: "推荐入住" }
      ],
      time: "1h ago",
      likes: "4521",
      comments: "25",
      shares: "8"
    }
  ];

  // Mock data for nearest places
  const nearestPlaces = [
    {
      id: 1,
      name: "Kuma",
      price: "50 USD",
      image: "/src/assets/GoldenGate.png"
    },
    {
      id: 2,
      name: "Sunny",
      price: "45 USD",
      image: "/src/assets/Harrier.png"
    }
  ];

  // Mock data for places (can be moved to a separate file)
  const places = [
    {
      id: 1,
      name: "Golden Gate",
      images: ["/path/to/image1", "/path/to/image2", "/path/to/image3"],
      rating: 5.0,
      reviews: 128,
      price: "50 USD",
      services: ["Service 1", "Service 2", "Service 3"],
      distance: "1.2km away"
    },
    // ... more place items
  ];

  // Services array
  const services = ['Service 1', 'Service 2', 'Service 3', 'Service 4'];

  return (
    <div className="min-h-screen flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16">
          {/* Top Navigation */}
          <TopNav />

          {/* Carousel/Slider */}
          <Carousel />

          {/* Nearest Places Section using TopPicks */}
          <TopPicks 
            items={nearestPlaces.map(item => ({
              ...item,
              onClick: () => navigate(`/location/${item.id}`)
            }))} 
          />

          {/* Feedbacks Section with horizontal scroll */}
          <div className="px-4 py-5">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-theme-primary">Feedbacks</h2>
              <button className="text-[#FFC61B] text-sm">View All</button>
            </div>
            <div className="relative">
              <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
                {feedbacks.map((feedback, index) => (
                  <div 
                    key={feedback.id} 
                    className="w-[280px] flex-none flex"
                  >
                    <SocialPostCard post={feedback} compact className="flex-1" />
                  </div>
                ))}
              </div>
              {/* Pagination dots */}
              <div className="flex justify-center gap-1 mt-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FFC61B]"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-theme-secondary opacity-50"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-theme-secondary opacity-50"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-theme-secondary opacity-50"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-theme-secondary opacity-50"></div>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="sticky top-0 z-10 bg-theme-primary">
            <div className="flex overflow-x-auto px-4 py-3 gap-4">
              {['Hotels', 'Motels', 'Restaurants', 'Attractions', 'Shopping'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap text-base font-medium transition-all
                    ${activeTab === tab 
                      ? 'text-theme-primary border-b-2 border-[#FFC61B]' 
                      : 'text-[#666666]'}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Service Tabs */}
            <div className="flex overflow-x-auto px-4 pb-3 gap-3">
              {services.map(service => (
                <button
                  key={service}
                  onClick={() => setActiveService(service)}
                  className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium bg-theme-secondary text-theme-primary`}
                >
                  {service}
                </button>
              ))}
            </div>
          </div>

          {/* Places Grid */}
          <div className="px-4 py-5 grid gap-4">
            {places.map(place => (
              <ExploreCard 
                key={place.id} 
                item={place} 
                isBookmarked={isBookmarked(place.id)}
                onBookmarkClick={() => toggleBookmark(place)}
              />
            ))}
          </div>
        </div>

        <BottomNavBar active="home" />
      </div>
    </div>
  );
};

export default HomePage;
