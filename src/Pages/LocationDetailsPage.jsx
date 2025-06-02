import { useNavigate, useLocation } from 'react-router-dom';
import BackButton from '../components/common/BackButton';
import PlaceIcon from 'icons/Place.svg';
import ScheduleIcon from 'icons/Schedule.svg';
import ShareIcon from 'icons/Share.svg';
import BookmarkIcon from 'icons/Bookmark.svg';
import RoomImage from 'assets/Room.png';
import GoldenGateRoomImage from 'assets/GoldenGateRoom.png';
import HarrierRoomImage from 'assets/HarrierRoom.png';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import ReviewCard from '../components/cards/ReviewCard';
import ExploreCard from '../components/cards/ExploreCard';

const LocationDetailsPage = () => {
  console.log('LocationDetailsPage component is rendering');
  const navigate = useNavigate();
  const location = useLocation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showHeaderBg, setShowHeaderBg] = useState(false);
  const { t } = useTranslation();
  
  useEffect(() => {
    const rootElement = document.getElementById('root');
    if (!rootElement) return; // Exit if root element is not found

    const handleScroll = () => {
      const scrollPosition = rootElement.scrollTop;
      // Show background when scrolled past the image carousel height (approx 300px)
      const shouldShow = scrollPosition > 300;
      setShowHeaderBg(shouldShow);
      console.log('Scroll Position:', scrollPosition);
      console.log('Show Header Background:', shouldShow);
    };

    rootElement.addEventListener('scroll', handleScroll);
    // Check initial scroll position
    handleScroll();
    return () => rootElement.removeEventListener('scroll', handleScroll);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  const defaultLocationData = {
    id: 1,
    name: 'Angela House',
    distance: '(12km away)',
    price: '50 USD',
    rating: 4,
    description: 'Discover the ultimate relaxation you deserve. Our professional massage services are tailored to melt away your escape today ',
    address: 'Soi Sukhumvit 71, Phra Khanong Nuea Subdistrict, Watthana District',
    phone: '09428428533',
    openHours: '24 Hour Open',
    images: [
      RoomImage, GoldenGateRoomImage, HarrierRoomImage
    ],
    services: [
      { name: 'Service 1', price: '60 USD' },
      { name: 'Service 2', price: '79 USD' },
      { name: 'Service 3', price: '90 USD' },
      { name: 'Service 4', price: '120 USD' }
    ]
  };

  const locationData = location.state?.locationData || defaultLocationData;

  return (
    <div className="min-h-screen bg-theme-primary">
      {/* Header */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${showHeaderBg ? 'bg-theme-primary' : 'bg-transparent'}`} style={{ top: '0' }}>
        <div className="flex items-center justify-between p-4">
          <BackButton onClick={() => navigate(-1)} />
          <div className="flex items-center flex-grow justify-center">
            <h1 className={`text-lg font-semibold transition-colors duration-300 ${showHeaderBg ? 'text-theme-text' : 'text-white'}`}>{locationData.name}</h1>
          </div>
          <button className="p-2 z-10">
            <img 
              src={ShareIcon} 
              alt={t('locationDetails.shareAltText')} 
              className={`w-6 h-6 transition-all duration-300 ${showHeaderBg ? '[filter:var(--icon-filter)]' : '[filter:brightness(0)_invert(1)]'}`}
            />
          </button>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative w-full h-[300px] image-carousel">
        <img 
          src={locationData.images && locationData.images.length > 0 ? locationData.images[activeImageIndex] : RoomImage} 
          alt={`${locationData.name} view ${activeImageIndex + 1}`} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {locationData.images && locationData.images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === activeImageIndex ? 'bg-[#FDC51B]' : 'bg-white/50'}`}
              onClick={() => setActiveImageIndex(index)}
            />
          ))}
        </div>
        <button className="absolute bottom-4 right-4 p-2 rounded-full bg-black/30">
          <img src={BookmarkIcon} alt={t('locationDetails.bookmarkAltText')} className="w-6 h-6 [filter:brightness(0)_saturate(100%)_invert(100%)]" />
        </button>
      </div>

      {/* Location Details */}
      <div className="p-4 space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <h2 className="text-theme-text text-xl font-semibold mr-2">{locationData.name}</h2>
              <span className="text-theme-secondary text-sm">{t('locationDetails.distance', { distance: locationData.distance })}</span>
            </div>
            <div className="flex text-[#FDC51B] text-sm font-medium">
              {locationData.price}
            </div>
          </div>
          <div className="flex items-center space-x-1 mt-1">
            {[...Array(5)].map((_, index) => (
              <span 
                key={index}
                className={`text-xl ${index < locationData.rating ? 'text-[#FDC51B]' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="mt-4 text-theme-secondary line-clamp-3 text-sm">{t('locationDetails.description', { description: locationData.description })}</p>
          <button className="text-[#FDC51B] text-sm mt-1">{t('locationDetails.seeMoreButton')}</button>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img src={PlaceIcon} alt={t('locationDetails.addressAltText')} className="w-6 h-6 [filter:var(--icon-filter)]" />
            <span className="text-theme-secondary flex-1">{locationData.address}</span>
            <button className="px-3 py-1 rounded-full border border-[#FDC51B] text-[#FDC51B] text-sm">
              {t('locationDetails.checkMapButton')}
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <img src={ScheduleIcon} alt={t('locationDetails.hoursAltText')} className="w-6 h-6 [filter:var(--icon-filter)]" />
            <span className="text-theme-secondary">{locationData.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <img src={ScheduleIcon} alt={t('locationDetails.hoursAltText')} className="w-6 h-6 [filter:var(--icon-filter)]" />
            <span className="text-theme-secondary">{t('locationDetails.openHours', { openHours: locationData.openHours })}</span>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-theme-text text-lg font-semibold mb-3">{t('locationDetails.servicesTitle')}</h3>
          <div className="space-y-3">
            {locationData?.services?.map((service, index) => (
              <div 
                key={index}
                className="flex items-center justify-between px-4 py-3 rounded-lg bg-theme-secondary"
              >
                <span className="text-theme-text">{service.name}</span>
                <span className="text-[#FDC51B] font-medium">{service.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="p-4 space-y-4">
          <h3 className="text-theme-text text-lg font-semibold">{t('locationDetails.reviewsTitle', { count: 120 })}</h3>
          {/* Write a Review Input */}
          <div 
            className="bg-theme-secondary rounded-lg p-3 flex h-[100px] cursor-pointer"
            onClick={() => navigate('/review')}
          >
            <textarea 
              type="text" 
              placeholder={t('reviewPage.writeReviewPlaceholder')} 
              className="bg-transparent text-theme-text w-full outline-none resize-none focus:outline-none focus:ring-0 focus:border-transparent"
            />
          </div>

          {/* Sample Reviews - Replace with actual data fetch */}
          {[ /* Sample Review Data */
            {
              user: { name: t('common.anonymous'), profilePic: null },
              rating: 5,
              date: '12 Aug 2025',
              text: t('locationDetails.sampleReview1'),
              photos: [GoldenGateRoomImage], // Example with photo
              likes: 1,
              replies: [{ user: { name: 'FOXY' }, text: t('locationDetails.sampleReply1') }]
            },
            {
              user: { name: 'Huston', profilePic: null },
              rating: 4,
              date: '12 Aug 2025',
              text: t('locationDetails.sampleReview2'),
              photos: [], // Example without photos
              likes: 0,
              replies: []
            }
          ].map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}

          {/* Show More Reviews Button */}
          <button className="text-[#FDC51B] text-sm w-full text-center mt-2">{t('locationDetails.showMoreReviewsButton')}</button>
        </div>

        {/* Recommended Section */}
        <div className="p-4 space-y-4">
          <h3 className="text-theme-text text-lg font-semibold">{t('locationDetails.recommendedTitle')}</h3>
          {/* Sample Recommended Locations - Replace with actual data fetch */}
          {[ /* Sample Recommended Data - Using structure similar to exploreItems */
              {
                id: 101,
                name: 'Baligan',
                price: '50 USD',
                rating: 5.0,
                reviews: 128,
                distance: '(12km away)',
                services: [],
                type: 'Hotel',
                image: RoomImage // Using one of the existing images for example
              },
              // Add more sample recommended items as needed
            ].map((item) => (
            <ExploreCard
              key={item.id}
              item={item}
              onClick={() => navigate(`/location/${item.id}`)}
              // Add bookmark props if needed for recommended items
              isBookmarked={false} 
              onBookmarkClick={() => {}} 
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocationDetailsPage;