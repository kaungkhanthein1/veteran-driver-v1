import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SocialPostCard from '../components/cards/SocialPostCard';
import ExploreCard from '../components/cards/ExploreCard';
import BottomNavBar from '../components/common/BottomNavBar';
import { useBookmarks } from '../hooks/useBookmarks';
import GoldenGateImage from 'assets/GoldenGate.png';
import HarrierImage from 'assets/Harrier.png';
import MapIcon from 'icons/HomeUpdate/map.svg';
import DropdownArrow from 'icons/HomeUpdate/Dropdown.svg';
import CountryFlag from 'icons/HomeUpdate/thai.png';
import HotelIcon from 'icons/HomeUpdate/Hotel.svg';
import MassageIcon from 'icons/HomeUpdate/Massage.svg';
import BarIcon from 'icons/HomeUpdate/Bar.svg';
import EVisaIcon from 'icons/HomeUpdate/Evisa.svg';
import MoreIcon from 'icons/HomeUpdate/More.svg';
import TuneIcon from '../icons/Tune.svg';

const HomePage = () => {
  const { t } = useTranslation();
  const [activeCategoryTab, setActiveCategoryTab] = useState(t('homePage.categoryTabs.hotels'));
  const [activeThemeTab, setActiveThemeTab] = useState(t('homePage.serviceTabs.service1'));
  const { isBookmarked, toggleBookmark } = useBookmarks();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data for feedbacks
  const feedbacks = [
    {
      id: "1",
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
      id: "2",
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
      id: "3",
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

  // Mock data for nearest places - Updated structure for banner design
  const nearestPlaces = [
    {
      id: 1,
      name: "Kuma",
      price: "50 USD",
      rating: 4.5,
      reviews: 80,
      distance: "1.2km away",
      image: GoldenGateImage,
      overlayText1: "Escape to Bali this Summer",
      overlayText2: "Over 100 travelers booked this week!"
    },
    {
      id: 2,
      name: "Sunny",
      price: "45 USD",
      rating: 4.0,
      reviews: 60,
      distance: "2.5km away",
      image: HarrierImage,
      overlayText1: "Enjoy your Dream Vacation",
      overlayText2: "Plan your perfect getaway with our exclusive deals"
    }
  ];

  // Mock data for places (can be moved to a separate file)
  const places = [
    {
      id: "1",
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

  // Category tabs
  const categoryTabs = [t('homePage.categoryTabs.hotels'), t('homePage.categoryTabs.motels'), t('homePage.categoryTabs.restaurants'), t('homePage.categoryTabs.attractions'), t('homePage.categoryTabs.shopping')];

  // Theme tabs
  const themeTabs = ["All", "Nature", "Mountain", "Island", "Beach"];

  return (
    <div className="dvh-fallback flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16">
          {/* New Header */}
          <div className="px-4 py-5 bg-theme-primary">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-bold text-theme-text">{t('loginPage.title')} Or {t('registerPage.title')}</div>
              {/* Icons */}
              <div className="flex gap-3">
                <button className="p-2">
                  <img src={MapIcon} alt="Map" className="w-6 h-6 [filter:var(--icon-filter)]" />
                </button>
              </div>
            </div>
            {/* Country Selector */}
            <div className="flex items-center text-theme-text text-sm mb-6">
              <img src={CountryFlag} alt="Thailand Flag" className="w-5 h-5 mr-2" />
              <span>Thailand</span>
              <img src={DropdownArrow} alt="Dropdown" className="w-3 h-3 ml-1 [filter:var(--icon-filter)]" />
            </div>
            {/* Search Bar and Filter Button */}
            <div className="flex items-center">
              {/* Search Bar */}
              <div className="bg-theme-secondary rounded-full px-3 py-2 flex items-center flex-grow mr-3">
                <svg className="w-5 h-5 text-theme-secondary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                <input
                  type="text"
                  placeholder={t('explorePage.searchPlaceholder')}
                  className="bg-transparent text-theme-text w-full outline-none focus:outline-none border-none"
                />
              </div>
              {/* Filter Button */}
              <button className="w-13 h-13 bg-theme-secondary rounded-full flex items-center justify-center p-2">
                <img src={TuneIcon} alt="Filter" className="w-9 h-9 [filter:var(--icon-filter)]" />
              </button>
            </div>
          </div>

          {/* Icons Row */}
          <div className="flex justify-around px-4 py-5 bg-theme-primary">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-theme-secondary rounded-full flex items-center justify-center">
                <img src={HotelIcon} alt={t('explorePage.categories.hotels')} className="w-6 h-6 [filter:var(--icon-filter)]" />
              </div>
              <span className="text-theme-text text-xs mt-1">{t('homePage.categoryTabs.hotels')}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-theme-secondary rounded-full flex items-center justify-center">
                <img src={MassageIcon} alt={t('explorePage.categories.massage')} className="w-6 h-6 [filter:var(--icon-filter)]" />
              </div>
              <span className="text-theme-text text-xs mt-1">{t('homePage.iconLabels.massage') || 'Massage'}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-theme-secondary rounded-full flex items-center justify-center">
                <img src={BarIcon} alt={t('homePage.iconLabels.bar')} className="w-6 h-6 [filter:var(--icon-filter)]" />
              </div>
              <span className="text-theme-text text-xs mt-1">{t('homePage.iconLabels.bar')}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-theme-secondary rounded-full flex items-center justify-center">
                <img src={EVisaIcon} alt={t('homePage.iconLabels.eVisa')} className="w-6 h-6 [filter:var(--icon-filter)]" />
              </div>
              <span className="text-theme-text text-xs mt-1">{t('homePage.iconLabels.eVisa')}</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-theme-secondary rounded-full flex items-center justify-center">
                <img src={MoreIcon} alt={t('homePage.iconLabels.more')} className="w-6 h-6 [filter:var(--icon-filter)]" />
              </div>
              <span className="text-theme-text text-xs mt-1">{t('homePage.iconLabels.more')}</span>
            </div>
          </div>

          {/* Nearest Places Section */}
          <div className="px-4 py-5 bg-theme-primary">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-theme-text">{t('homePage.nearestPlacesTitle')}</h2>
              <button className="text-[#FFC61B] text-sm">{t('homePage.viewAllButton')}</button>
            </div>
            {/* Horizontal Scroll for Nearest Places */}
            <div className="relative">
              <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
                {nearestPlaces.map((item) => (
                   <div
                     key={item.id}
                     className="w-[300px] h-[180px] flex-none rounded-2xl overflow-hidden relative bg-cover bg-center"
                     style={{ backgroundImage: `url(${item.image})` }}
                   >
                     {/* Overlay Gradient/Darkening */}
                     <div className="absolute inset-0 bg-black opacity-10"></div>
                     {/* Overlay Text at bottom */}
                     <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                       <h2 className="text-md font-bold leading-tight mb-1">{item.overlayText1}</h2>
                       <p className="text-sm leading-tight">{item.overlayText2}</p>
                     </div>
                     {/* Place name with special styling in upper center-left */}
                     <div
                       className="absolute right-4 top-1/3 transform -translate-y-1/2 text-white text-right"
                       style={{
                         color: '#FFF',
                         fontVariantNumeric: 'lining-nums proportional-nums',
                         fontFeatureSettings: '\'dlig\' on',
                         fontFamily: '\'Herr Von Muellerhoff\', cursive',
                         fontSize: '70px',
                         fontStyle: 'normal',
                         fontWeight: '400',
                         lineHeight: 'normal',
                       }}
                     >
                       {item.name}
                     </div>
                   </div>
                 ))}
               </div>
               {/* Pagination dots - Dynamically generated based on nearestPlaces count */}
               <div className="flex justify-center gap-1 mt-2">
                 {nearestPlaces.map((_, dotIndex) => (
                   <div
                     key={dotIndex}
                     className={`w-1.5 h-1.5 rounded-full ${dotIndex === 0 ? 'bg-[#FFC61B]' : 'bg-theme-secondary opacity-50'}`}
                   ></div>
                 ))}
               </div>
             </div>
           </div>

          {/* Feedbacks Section with horizontal scroll */}
          <div className="py-5 mx-0 bg-black">
            <div className="bg-theme-primary p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-theme-primary">{t('homePage.feedbacksTitle')}</h2>
                <button className="text-[#FFC61B] text-sm">{t('homePage.viewAllButton')}</button>
              </div>
              <div className="relative">
                <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
                  {feedbacks.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="w-[280px] flex-none flex"
                    >
                      <SocialPostCard
                        post={feedback}
                        compact
                        setIsModalOpen={setIsModalOpen}
                        className="flex-1 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
                {/* Pagination dots */}
                <div className="flex justify-center gap-1 mt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#FFC61B]"></div>
                  {/* These dots should be dynamically generated based on the number of feedback items and the currently visible item */}
                  {feedbacks.map((_, dotIndex) => (
                    <div
                      key={dotIndex}
                      className={`w-1.5 h-1.5 rounded-full ${dotIndex === 0 ? 'bg-[#FFC61B]' : 'bg-theme-secondary opacity-50'}`}
                    ></div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="sticky top-0 z-10 bg-theme-primary">
            {/* Category Tabs (e.g., Hotels, Motels) - with underline indicator */}
            <div className="flex overflow-x-auto px-4 py-3 gap-4">
              {categoryTabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveCategoryTab(tab)}
                  className={`whitespace-nowrap text-base font-medium transition-all relative pb-2
                    ${activeCategoryTab === tab
                      ? 'text-theme-text'
                      : 'text-theme-secondary'}`}
                >
                  {tab}
                   {activeCategoryTab === tab && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FFC61B]"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Theme Tabs (e.g., All, Nature) - with background highlight */}
            <div className="flex overflow-x-auto px-4 py-3 gap-3">
              {themeTabs.map(theme => (
                <button
                  key={theme}
                  onClick={() => setActiveThemeTab(theme)}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium
                    ${activeThemeTab === theme ? 'bg-[#FFC61B] text-black' : 'bg-theme-secondary text-theme-text'}`}
                >
                  {theme}
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
                onClick={() => { /* Handle navigation to location details */ }}
                setIsModalOpen={setIsModalOpen}
                className="rounded-2xl"
              />
            ))}
          </div>
        </div>

        {!isModalOpen && <BottomNavBar active="home" />}
      </div>
    </div>
  );
};

export default HomePage;