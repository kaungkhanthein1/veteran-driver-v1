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
import BottomNavBar from "../components/common/BottomNavBar";

// Import new assets for top 3 places
import FirstPlace from "assets/Explore/First.png";
import SecondPlace from "assets/Explore/Second.png";
import ThirdPlace from "assets/Explore/Third.png";
import FirstMedal from "assets/Explore/FirstTitle.png";
import SecondMedal from "assets/Explore/SecondTitle.png";
import ThirdMedal from "assets/Explore/ThirdTitle.png";

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

interface Place {
  id: number;
  name: string;
  rating: number;
  distance: string;
  image: string;
  medal: string;
}

interface TopThreePlacesProps {
  places: Place[];
  onPlaceClick: (id: number) => void;
}

// Top three places data
const topThreePlaces: Place[] = [
  {
    id: 1,
    name: "Binh Tanh Park",
    rating: 5.0,
    distance: "12km away",
    image: FirstPlace,
    medal: FirstMedal
  },
  {
    id: 2,
    name: "Binh Tanh Park",
    rating: 5.0,
    distance: "12km away",
    image: SecondPlace,
    medal: SecondMedal
  },
  {
    id: 3,
    name: "Binh Tanh Park",
    rating: 5.0,
    distance: "12km away",
    image: ThirdPlace,
    medal: ThirdMedal
  }
];

// Top Three Places Component
const TopThreePlaces: React.FC<TopThreePlacesProps> = ({ places, onPlaceClick }) => {
  return (
    <div className="flex gap-2 px-4 py-6 overflow-x-auto no-scrollbar">
      {places.map((place: Place, index: number) => (
        <div 
          key={place.id}
          className="relative flex-shrink-0 cursor-pointer"
          onClick={() => onPlaceClick(place.id)}
          style={{ width: 'calc(33.333% - 8px)' }}
        >
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden">
            <img 
              src={place.image} 
              alt={place.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2">
              <img 
                src={place.medal} 
                alt={`${index + 1} place`}
                className="w-8 h-8"
              />
            </div>
            <div className="absolute bottom-2 left-2 right-2 flex flex-col">
              <h3 className="text-white text-base truncate">{place.name}</h3>
              <div className="flex items-center gap-1 text-white font-bold text-sm mt-1 truncate">
                <span>{place.rating}</span>
                <span className="text-[#FFC61B]">★</span>
                <span className="font-normal">({place.distance})</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

interface Region {
  name: string;
}

export default function RankingPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [showRegionModal, setShowRegionModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [activeTab, setActiveTab] = useState('Today');

  const handleRegionSelect = (region: Region) => {
    setCountry(region.name.toLowerCase().replace(' ', ''));
    setState('');
    setShowRegionModal(false);
  };

  const handleCitySelect = (city: string) => {
    setState(city);
    setShowCityModal(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F8F8]">
      {/* Header */}
      <div className="bg-white">
        <div className="relative px-4 pt-4 pb-3">
          <div className="absolute left-4 top-4">
            <BackButton className="text-theme-primary" />
          </div>
          <h1 className="text-xl font-semibold text-center text-theme-primary">Top Travel Destination</h1>
        </div>

        {/* Filter Tabs */}
        <div className="px-4 py-3">
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {['Today', 'This Week', 'Trending', 'Nearby'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-xl whitespace-nowrap text-sm ${
                  activeTab === tab
                    ? 'bg-[#FFC61B] text-[#5D4702]'
                    : 'bg-[#F5F5F5] text-theme-primary'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-4">
        {/* Top 3 Places (first place taller, 2nd/3rd shorter, all vertically centered) */}
        <div className="flex gap-2 px-2 py-4 items-center justify-center">
          {[topThreePlaces[1], topThreePlaces[0], topThreePlaces[2]].map((place, idx) => (
            <div key={place.id} className={`flex-1 relative rounded-2xl overflow-hidden`} style={{ height: idx === 1 ? '180px' : '160px', aspectRatio: '3/4' }}>
              <img src={place.image} alt={place.name} className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 z-20">
                <img src={place.medal} alt={`${idx + 1} place`} className="w-8 h-8" />
              </div>
              {/* Strong dark gradient overlay for text readability, edge-to-edge */}
              <div className="absolute bottom-0 left-0 right-0 pb-3 pt-2 bg-gradient-to-t from-black/80 to-transparent">
                <div className="px-4">
                  <h3 className="text-white font-bold text-sm truncate">{place.name}</h3>
                  <div className="flex items-center gap-1 text-white font-bold text-xs mt-1 truncate">
                    <span>{place.rating}</span>
                    <span className="text-[#FFC61B]">★</span>
                    <span className="font-normal">({place.distance})</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Region/City Selection - restore previous design */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            <div
              className="relative w-full py-3 px-4 rounded-xl flex justify-between items-center cursor-pointer"
              onClick={() => setShowRegionModal(true)}
              style={{ background: 'linear-gradient(#FFE3D4, #FEA269)' }}
            >
              <span style={{ color: '#581E00' }}>{country || 'Select Country'}</span>
              <span className="w-6 h-6 flex items-center justify-center rounded-full" style={{ backgroundColor: '#B15200' }}>
                <svg className="w-4 h-4 text-theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </div>
          </div>
          <div className="flex-1">
            <div
              className={`relative w-full py-3 px-4 rounded-xl flex justify-between items-center cursor-pointer ${!country ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => country && setShowCityModal(true)}
              style={{ background: 'linear-gradient(268deg, #FFDF7D 5.8%, #FFF7DF 85.51%)' }}
            >
              <span style={{ color: '#1A1300' }}>{state || 'Select State'}</span>
              <span className="w-6 h-6 flex items-center justify-center rounded-full" style={{ backgroundColor: '#DAA400' }}>
                <svg className="w-4 h-4 text-theme-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* Ranking List (rounded L-shaped cut corner for number) */}
        <div className="space-y-4 pb-4">
          {rankingItems.map((item, idx) => (
            <div
              key={item.id}
              className="flex bg-white rounded-2xl cursor-pointer overflow-hidden h-[110px] items-center"
              style={{ minHeight: '110px', boxShadow: '0 2px 8px 0 rgba(0,0,0,0.04)' }}
              onClick={() => navigate(`/location/${item.id}`)}
            >
              {/* Image with rounded L-shaped cut corner and number */}
              <div className="relative h-[110px] w-[110px] flex-shrink-0">
                {/* Rounded L-shaped (square) cut for number */}
                <div className="absolute top-[-2px] left-[-2px] z-10" style={{ width: '28px', height: '28px', background: '#ffffff', borderBottomRightRadius: '10px' }} />
                <div
                  className="absolute top-0 left-0 z-20 flex items-center justify-center"
                  style={{ width: '28px', height: '28px', background: 'transparent' }}
                >
                  <span
                    style={{
                      fontFamily: 'Heebo, sans-serif',
                      fontWeight: 700,
                      fontSize: '20px',
                      lineHeight: '18px',
                      letterSpacing: '1.1px',
                      background: 'linear-gradient(180deg, #FFC61B 0%, #FF9500 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      display: 'inline-block',
                    }}
                  >
                    {idx + 1}
                  </span>
                </div>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-xl"
                  style={{ height: '110px', width: '110px' }}
                />
              </div>
              {/* Content */}
              <div className="flex-1 min-w-0 flex flex-col justify-center h-full pl-4">
                <div className="flex items-center mb-1">
                  <h3 className="font-bold text-[17px] leading-[22px] text-[#222] truncate" style={{ fontFamily: 'Heebo, sans-serif' }}>{item.name}</h3>
                </div>
                <div className="text-[13px] leading-[16px] text-[#888] mb-1 truncate" style={{ fontFamily: 'Heebo, sans-serif' }}>
                  {item.distance}
                </div>
                <div className="flex items-center mb-1">
                  <span className="text-[#FFC61B] font-bold text-[15px] leading-[18px]" style={{ fontFamily: 'Heebo, sans-serif' }}>{item.rating}</span>
                  <span className="ml-1 text-[#FFC61B] text-[15px] leading-[18px]">{'★★★★★'}</span>
                  <span className="ml-2 text-[#888] text-[13px] leading-[16px]" style={{ fontFamily: 'Heebo, sans-serif' }}>({item.reviews})</span>
                </div>
                <div className="text-[13px] leading-[16px] text-[#888] truncate mb-1" style={{ fontFamily: 'Heebo, sans-serif' }}>
                  {item.services.join(', ')}
                </div>
                <div className="flex items-end gap-1 mt-1">
                  <span className="text-[#FFC61B] font-bold text-[18px] leading-[22px]" style={{ fontFamily: 'Heebo, sans-serif' }}>{item.price.split(' ')[0]}</span>
                  <span className="text-[#FFC61B] text-[12px] font-bold" style={{ fontFamily: 'Heebo, sans-serif' }}>{item.price.split(' ')[1]}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modals */}
      {showRegionModal && (
        <RegionSelectModal
          onSelectRegion={handleRegionSelect}
          onClose={() => setShowRegionModal(false)}
        />
      )}
      {showCityModal && (
        <CitySelectModal
          country={country}
          onSelectCity={handleCitySelect}
          onClose={() => setShowCityModal(false)}
        />
      )}
       {!showRegionModal && !showCityModal && <BottomNavBar active="ranking" />}
    </div>
  );
}