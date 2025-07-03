import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "../components/common/BottomNavBar";
import GoldenGateImage from 'assets/GoldenGate.png';
import HarrierImage from 'assets/Harrier.png';
import DefaultAvatar from '../icons/DefaultAvatorWhite.svg';
import AdVideo from '../assets/Ad.mp4';
import ExploreVideo from '../assets/Explore.mp4';
import ExploreVdVideo from '../assets/Explore Vd.mp4';
import SampleVideo from '../assets/Sample.mp4';
import BeachImg from '../assets/Beach.png';
import HarrierImg from '../assets/Harrier.png';
import GoldenGateImg from '../assets/GoldenGate.png';
import RoomImg from '../assets/Room.png';
import VideoPlayer from '../components/common/VideoPlayer';
import Masonry from 'react-masonry-css';

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

const videoItems = [
  {
    id: 1,
    video: AdVideo,
    thumbnail: BeachImg,
    description: 'Best Snooker Table In Hochiminh',
    user: { name: 'XUXUI03', avatar: DefaultAvatar },
    likes: 819100,
    category: 'Snooker',
  },
  {
    id: 2,
    video: ExploreVideo,
    thumbnail: HarrierImg,
    description: 'Reddish Porn Service',
    user: { name: 'nana0156', avatar: DefaultAvatar },
    likes: 89100,
    category: 'Lady',
  },
  {
    id: 3,
    video: ExploreVdVideo,
    thumbnail: GoldenGateImg,
    description: 'Sussy KTV Binh Thang',
    user: { name: 'mena', avatar: DefaultAvatar },
    likes: 819000,
    category: 'Bar & Drinks',
  },
  {
    id: 4,
    video: SampleVideo,
    thumbnail: RoomImg,
    description: 'Museum Park',
    user: { name: 'yoyo', avatar: DefaultAvatar },
    likes: 12000,
    category: 'Tour',
  },
  {
    id: 5,
    video: ExploreVdVideo,
    thumbnail: HarrierImg,
    description: 'Yankee Cafe',
    user: { name: 'Jace', avatar: DefaultAvatar },
    likes: 819100,
    category: 'Cafe',
  },
  {
    id: 6,
    video: AdVideo,
    thumbnail: GoldenGateImg,
    description: 'Grace Bar',
    user: { name: 'XUXUI03', avatar: DefaultAvatar },
    likes: 819100,
    category: 'Bar & Drinks',
  },
  {
    id: 7,
    video: ExploreVideo,
    thumbnail: RoomImg,
    description: 'Luxury Hotel',
    user: { name: 'nana0156', avatar: DefaultAvatar },
    likes: 89100,
    category: 'Hotel',
  },
  {
    id: 8,
    video: SampleVideo,
    thumbnail: BeachImg,
    description: 'Sunset Resort',
    user: { name: 'mena', avatar: DefaultAvatar },
    likes: 819000,
    category: 'Resort',
  },
];

const categories = [
  { label: 'Bar & Drinks', icon: '🍸' },
  { label: 'Lady', icon: '👩‍🦰' },
  { label: 'Snooker', icon: '🎱' },
  { label: 'Coffee', icon: '☕' },
];

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState('Trending');
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredVideoId, setHoveredVideoId] = useState<number | null>(null);
  const [modalVideo, setModalVideo] = useState<string | null>(null);
  const navigate = useNavigate();
  const [showNavBar, setShowNavBar] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Use a callback ref to always attach the event to the correct element
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const setScrollRef = (node: HTMLDivElement | null) => {
    if (scrollRef.current) {
      scrollRef.current.removeEventListener('scroll', handleScroll);
    }
    if (node) {
      node.addEventListener('scroll', handleScroll);
    }
    scrollRef.current = node;
  };

  function handleScroll() {
    if (!scrollRef.current) return;
    const currentScrollY = scrollRef.current.scrollTop;
    
    // Add a small threshold to prevent accidental triggers
    const threshold = 5;
    const scrollDelta = currentScrollY - lastScrollY.current;
    
    if (Math.abs(scrollDelta) > threshold) {
      setShowNavBar(scrollDelta < 0);
      lastScrollY.current = currentScrollY;
    }
  }

  useEffect(() => {
    // Clean up on unmount
    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('scroll', handleScroll);
      }
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  return (
    <div className="dvh-fallback flex justify-center bg-theme-primary min-h-screen">
      <div className="w-full max-w-[480px] flex flex-col h-screen">
        <div
          className="flex-1 overflow-y-auto pb-24"
          ref={setScrollRef}
        >
          {/* Sticky Filter Tabs */}
          <div className="sticky top-0 z-10 bg-theme-primary">
            <div className="flex items-center justify-center px-4 pt-4 pb-2 relative">
              <div className="flex gap-6">
                {['Trending', 'Nearby'].map(tab => (
                  <button
                    key={tab}
                    className={`text-lg font-semibold pb-1 border-b-2 ${activeTab === tab ? 'border-[var(--accent-yellow)] text-theme-primary' : 'border-transparent text-theme-secondary'}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button className="absolute right-4 text-theme-secondary">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              </button>
            </div>
          </div>

          {/* Category Chips */}
          <div className="flex gap-2 px-4 pb-3 overflow-x-auto no-scrollbar h-12 items-center whitespace-nowrap">
            {categories.map(cat => (
              <button
                key={cat.label}
                className={`flex items-center gap-1 px-4 py-1 h-9 rounded-full border ${activeCategory === cat.label ? 'bg-theme-secondary border-theme-primary' : 'bg-theme-primary border-theme-secondary'} text-base`}
                onClick={() => setActiveCategory(cat.label)}
                style={{ minWidth: 'max-content' }}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            ))}
          </div>

          {/* Masonry Video Grid */}
          <div className="px-1">
            <Masonry
              breakpointCols={2}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {videoItems.map((item, idx) => (
                <div
                  key={item.id}
                  className="mb-3 rounded-2xl overflow-hidden bg-theme-secondary flex flex-col break-inside-avoid cursor-pointer"
                  onMouseEnter={() => setHoveredVideoId(item.id)}
                  onMouseLeave={() => setHoveredVideoId(null)}
                  onClick={() => setModalVideo(item.video)}
                >
                  <div className={`w-full bg-black relative ${idx % 3 === 0 ? 'h-56' : idx % 3 === 1 ? 'h-64' : 'h-72'}`}>
                    {hoveredVideoId === item.id ? (
                      <video
                        src={item.video}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    ) : (
                      <img
                        src={item.thumbnail}
                        alt="thumbnail"
                        className="w-full h-full object-cover absolute inset-0"
                      />
                    )}
                  </div>
                  <div className="p-2">
                    <div className="font-semibold text-theme-primary text-sm truncate mb-1">{item.description}</div>
                    <div className="flex items-center gap-2 mt-1">
                      <img src={item.user.avatar} alt="avatar" className="w-6 h-6 rounded-full object-cover" />
                      <span className="text-xs text-theme-primary font-medium">{item.user.name}</span>
                      <span className="ml-auto flex items-center gap-1 text-xs text-theme-secondary">
                        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
                        {item.likes >= 1000 ? (item.likes/1000).toFixed(1) + 'K' : item.likes}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </Masonry>
          </div>
        </div>
        <div className="relative w-full">
          <div
            className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] z-20 transition-transform duration-300 ${
              showNavBar ? "translate-y-0" : "translate-y-full"
            }`}
          >
            <BottomNavBar active="explore" />
          </div>
        </div>
        {/* Video Modal */}
        {modalVideo && (
          <VideoPlayer isOpen={!!modalVideo} videoUrl={modalVideo} onClose={() => setModalVideo(null)} />
        )}
      </div>
    </div>
  );
}