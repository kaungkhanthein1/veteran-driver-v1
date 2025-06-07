import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../components/common/BottomNavBar";
import ExploreTabs from "../components/ExploreTabs";
import ExploreCard from "../components/cards/ExploreCard";
import AddLocationIcon from "icons/AddLocation.svg";
import GoldenGateImage from 'assets/GoldenGate.png';
import HarrierImage from 'assets/Harrier.png';
import { useBookmarks } from '../hooks/useBookmarks';
import { useTranslation } from 'react-i18next';
import { useSelector } from "react-redux";

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
    type: "Hotel",
    image: GoldenGateImage
  },
  {
    id: 2,
    name: "HARRIER",
    price: "50 USD",
    rating: 5.0,
    reviews: 128,
    distance: "12km away",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel",
    image: HarrierImage
  },
  {
    id: 3,
    name: "BUGARIA",
    price: "50 USD",
    rating: 5.0,
    reviews: 128,
    distance: "12km away",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel",
    image: GoldenGateImage
  },
];

export default function ExplorePage() {
  const country = useSelector((state) => state.country)
  console.log(country,"exp")

  const [activeTab, setActiveTab] = useState("Hotel");
  const navigate = useNavigate();
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="dvh-fallback flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col">
        <div className="flex-1 overflow-y-auto pb-24">
          {/* Scrollable Content - Search Bar, Ads, Top Picks, Recommended */}
          <div className="bg-theme-primary">
            {/* Search Bar */}
            <div className="px-4 py-3 flex items-center gap-3">
              <div className="flex-1 flex items-center gap-2 bg-theme-secondary rounded-[14px] px-3 py-[8px]">
                <svg className="w-[18px] h-[18px] text-theme-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder={t('explorePage.searchPlaceholder')}
                  className="bg-transparent text-theme-primary w-full outline-none text-[14px] placeholder-theme-secondary focus:outline-none focus:ring-0 border-none"
                  onClick={() => navigate('/search')}
                />
              </div>
              <button 
                className="flex items-center justify-center"
                onClick={() => navigate('/add-location')}
              >
                <img 
                  src={AddLocationIcon} 
                  alt="Add Location" 
                  className="w-[35px] h-[35px] [filter:var(--icon-filter)]"
                />
              </button>
            </div>

            {/* Ads Section */}
            <div className="px-4 mb-4">
              <div className="relative w-full h-32 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-50"></div>
                <div className="absolute inset-0 flex flex-col justify-center px-6">
                  <h3 className="text-theme-primary text-xl font-semibold mb-2">{t('explorePage.dreamVacationTitle')}</h3>
                  <p className="text-theme-primary text-sm opacity-80">{t('explorePage.dreamVacationDescription')}</p>
                </div>
                <div className="absolute top-2 right-2 text-xs text-theme-primary bg-theme-primary bg-opacity-50 px-2 py-1 rounded">{t('explorePage.adsLabel')}</div>
              </div>
            </div>

            {/* Top Picks Section */}
            <div className="px-4 mb-4">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-theme-primary text-lg font-semibold">{t('explorePage.topPicksTitle')}</h2>
                <button 
                  className="text-[#FFC61B] text-sm"
                  onClick={() => navigate('/ranking')}
                >
                  {t('explorePage.viewAllButton')}
                </button>
              </div>
              <div className="flex space-x-3 overflow-x-auto pb-2">
                {[1, 2].map((num) => (
                  <div 
                    key={num} 
                    className="relative min-w-[200px] h-32 bg-theme-secondary rounded-lg overflow-hidden cursor-pointer"
                    onClick={() => navigate(`/location/${exploreItems[num-1].id}`)}
                    style={{
                      backgroundImage: `url(${num === 1 ? GoldenGateImage : HarrierImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
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
              <h2 className="text-theme-primary text-lg font-semibold mb-3">{t('explorePage.recommendedTitle')}</h2>
            </div>
          </div>

          {/* Sticky Tabs */}
          <div className="sticky top-0 z-10 bg-theme-primary">
            <ExploreTabs activeTab={activeTab} setActiveTab={setActiveTab} />
            <div className="h-[1px] bg-theme-secondary"></div>
          </div>

          {/* Cards Grid */}
          <div className="p-4 grid gap-4">
            {exploreItems.map((item) => (
              <ExploreCard
                key={item.id}
                item={item}
                onClick={() => {}}
                setIsModalOpen={setIsModalOpen}
                isBookmarked={isBookmarked(item.id)}
                onBookmarkClick={() => toggleBookmark(item)}
              />
            ))}
          </div>
        </div>
        {!isModalOpen && <BottomNavBar active="explore" />}
      </div>
    </div>
  );
}