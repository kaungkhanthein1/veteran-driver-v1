import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import GoldenGate from "assets/GoldenGate.png";
import GoldenGateRoom from "assets/GoldenGateRoom.png";
import Harrier from "assets/Harrier.png";
import HarrierRoom from "assets/HarrierRoom.png";
import { useTranslation } from 'react-i18next';
import RankingHeader from "assets/RankingHeader.png";
import RegionSelectModal from '../components/RegionSelectModal';
import CitySelectModal from '../components/CitySelectModal';
import TuneIcon from '../icons/Tune.svg';
import FilterPanel from '../Pages/map/FilterPanel';

// Mock data for ranking items
const rankingItems = [
  {
    id: 1,
    name: "BUGARIA",
    price: "50 USD",
    rating: 5.0,
    reviews: 128,
    distance:  "Phnom Penh(12km away)",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel",
    image: GoldenGate
  },
  {
    id: 2,
    name: "HILLSEDQE",
    price: "50 USD",
    rating: 5.0,
    reviews: 128,
    distance:  "Phnom Penh(12km away)",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel",
    image: GoldenGateRoom
  },
  {
    id: 3,
    name: "SIZZA",
    price: "50 USD",
    rating: 5.0,
    reviews: 128,
    distance:  "Phnom Penh(12km away)",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel",
    image: Harrier
  },
  {
    id: 4,
    name: "PHONIEX",
    price: "50 USD",
    rating: 5.0,
    reviews: 128,
    distance:  "Phnom Penh(12km away)",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel",
    image: HarrierRoom
  },
  {
    id: 5,
    name: "BANBILL",
    price: "50 USD",
    rating: 5.0,
    reviews: 128,
    distance: "Phnom Penh(12km away)",
    services: ["Service 1", "Service 2", "Service3"],
    type: "Hotel",
    image: GoldenGate
  }
];

export default function RankingPage() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState(t('rankingPage.popularTab'));
  const navigate = useNavigate();
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const openRegionModal = () => {
    setShowRegionModal(true);
  };

  const closeRegionModal = () => {
    setShowRegionModal(false);
  };

  const handleRegionSelect = (region) => {
    setCountry(region.name.toLowerCase().replace(' ', ''));
    setState('');
    setShowRegionModal(false);
  };

  const openCityModal = () => {
    if (country) {
      setShowCityModal(true);
    }
  };

  const closeCityModal = () => {
    setShowCityModal(false);
  };

  const handleCitySelect = (city) => {
    setState(city);
    setShowCityModal(false);
  };

  const openFilterPanel = () => {
    setShowFilterPanel(true);
  };

  const closeFilterPanel = () => {
    setShowFilterPanel(false);
  };

  const [filters, setFilters] = useState({
    priceRange: [0, 1000],
    distance: 50,
    rating: 0,
    services: [],
    sort: 'Comprehensive',
  });

  const applyFilters = () => {
    console.log('Applying filters:', filters);
    closeFilterPanel();
  };

  return (
    <div className="min-h-screen flex flex-col bg-theme-primary">
      {/* Header Section */}
      <div className="h-[150px] w-full sticky top-0 z-40" style={{ backgroundColor: '#271D00CC' }}>
        <img
          src={RankingHeader}
          alt="Ranking Header Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 w-full h-full" style={{ backgroundColor: '#271D00CC' }}></div>
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-theme-primary">
          <div className="absolute top-4 left-4">
            <BackButton color="text-theme-primary"/>
          </div>
          <h1 className="absolute text-2xl font-bold top-5 text-center">{t('rankingPage.title')}</h1>
          <div className="text-center">
            <p className="text-lg">&#34;Top Picks In Phenom Penh&#34;</p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-[480px] mx-auto flex flex-col flex-1 bg-theme-primary rounded-t-3xl z-20 overflow-y-auto pt-5 sticky top-0">
        <div className="sticky top-0 bg-theme-primary z-30">
          <div className="px-5 mb-4 flex space-x-4">
            <div className="flex-1">
              <div 
                className="relative w-full bg-theme-secondary text-theme-primary py-3 px-4 rounded-xl flex justify-between items-center cursor-pointer"
                onClick={openRegionModal}
              >
                <span>{country ? t(`regions.${country}`) : t('addLocation.selectCountryPlaceholder')}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <div
                className={`relative w-full bg-theme-secondary text-theme-primary py-3 px-4 rounded-xl flex justify-between items-center cursor-pointer ${!country ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={openCityModal}
              >
                 <span>{state ? state : t('addLocation.selectStatePlaceholder')}</span>
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                 </svg>
              </div>
            </div>
          </div>

          <div className="px-5 flex space-x-3 mb-2">
            {[t('rankingPage.popularTab'), t('rankingPage.mostViewTab'), t('rankingPage.trendingTab')].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-xl text-sm text-theme-primary ${activeTab === tab ? 'bg-[#5D4702]' : 'bg-theme-secondary'}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="px-5 flex items-center space-x-2 mb-1 overflow-x-auto no-scrollbar py-5">
            {['Massage', 'Visa', 'Bar', 'Club'].map((service) => (
              <button
                key={service}
                className={`px-5 py-2.5 rounded-xl text-sm flex-shrink-0 ${selectedService === service ? 'border border-[#886600] text-[#A27A00]' : 'text-theme-primary'}`}
                onClick={() => setSelectedService(service)}
              >
                {service}
              </button>
            ))}
            <button className="p-2 flex-shrink-0" onClick={openFilterPanel}>
              <img src={TuneIcon} alt="Tune Icon" />
            </button>
          </div>
        </div>

        <div className="space-y-2 pt-5">
          {rankingItems.map((item, index) => (
            <div key={item.id} 
              className="rounded-2xl overflow-hidden cursor-pointer mx-2"
              onClick={() => navigate(`/location/${item.id}`)}
            >
              <div className="flex items-center p-2">
                <div className="relative w-[150px] h-[120px] bg-theme-primary rounded-lg overflow-hidden mr-4">
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
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-theme-primary text-lg font-semibold">{item.name}</h3>
                  </div>
                  <p className="text-theme-primary text-sm mb-2">{t('rankingPage.distance', { distance: item.distance })}</p>
                  <div className="flex items-center gap-1 mb-2">
                    <span className="text-[#FFC61B] text-sm">{item.rating}</span>
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-[#FFC61B]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="text-theme-primary text-sm">{t('rankingPage.reviews', { count: item.reviews })}</span>
                  </div>
                  {item.services && item.services.length > 0 && (
                    <p className="text-theme-primary text-sm mb-2">{item.services.join(', ')}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <div className="text-[#FFC61B] font-semibold">{item.price}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showRegionModal && <RegionSelectModal onSelectRegion={handleRegionSelect} onClose={closeRegionModal} />}
      {showCityModal && <CitySelectModal country={country} onSelectCity={handleCitySelect} onClose={closeCityModal} />}
      {showFilterPanel && (
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          applyFilters={applyFilters}
          onClose={closeFilterPanel}
        />
      )}
    </div>
  );
}