import React, { useState } from 'react';
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

const LocationDetailsPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const { t } = useTranslation();
  
  const defaultLocationData = {
    id: 1,
    name: 'Angela House',
    distance: '12km away',
    price: '50 USD',
    rating: 4,
    description: 'Discover the ultimate relaxation you deserve. Our professional massage services are tailored to melt away your escape today — your wellness journey starts here.',
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
      <div className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <div className="flex items-center justify-between p-4">
          <BackButton onClick={() => navigate(-1)} />
          <h1 className="text-theme-text text-lg font-semibold">{locationData.name}</h1>
          <button className="p-2">
            <img src={ShareIcon} alt={t('locationDetails.shareAltText')} className="w-6 h-6 [filter:var(--icon-filter)]" />
          </button>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative w-full h-[300px] mt-14">
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
        <button className="absolute top-4 right-4 p-2 rounded-full bg-black/30">
          <img src={BookmarkIcon} alt={t('locationDetails.bookmarkAltText')} className="w-6 h-6 [filter:brightness(0)_saturate(100%)_invert(100%)]" />
        </button>
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded bg-[#FDC51B] text-black font-medium">
          {locationData.price}
        </div>
      </div>

      {/* Location Details */}
      <div className="p-4 space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-theme-text text-xl font-semibold">{locationData.name}</h2>
              <p className="text-theme-secondary text-sm">{t('locationDetails.distance', { distance: locationData.distance })}</p>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, index) => (
                <span 
                  key={index}
                  className={`text-2xl ${index < locationData.rating ? 'text-[#FDC51B]' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="mt-2 text-theme-secondary line-clamp-3">{t('locationDetails.description', { description: locationData.description })}</p>
          <button className="text-[#FDC51B] text-sm mt-1">{t('locationDetails.seeMoreButton')}</button>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img src={PlaceIcon} alt={t('locationDetails.addressAltText')} className="w-6 h-6 [filter:var(--icon-filter)]" />
            <span className="text-theme-secondary">{locationData.address}</span>
            <button className="px-3 py-1 rounded border border-[#FDC51B] text-[#FDC51B] text-sm">
              {t('locationDetails.checkMapButton')}
            </button>
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
                className="flex items-center justify-between p-3 rounded-lg bg-theme-secondary"
              >
                <span className="text-theme-text">{service.name}</span>
                <span className="text-[#FDC51B] font-medium">{service.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-theme-text text-lg font-semibold">{t('locationDetails.reviewsTitle', { count: 120 })}</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 rounded bg-[#FDC51B] text-black text-sm">{t('locationDetails.hottestReviewButton')}</button>
              <button className="px-3 py-1 rounded border border-theme-secondary text-theme-secondary text-sm">{t('locationDetails.latestReviewButton')}</button>
            </div>
          </div>
          {/* Review list will be implemented later */}
        </div>
      </div>
    </div>
  );
};

export default LocationDetailsPage;