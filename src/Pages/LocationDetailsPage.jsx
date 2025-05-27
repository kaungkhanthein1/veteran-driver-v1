import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

const LocationDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Mock data structure for a location
  const location = {
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
      '/src/assets/Room.png',
      '/src/assets/GoldenGateRoom.png',
      '/src/assets/HarrierRoom.png'
    ],
    services: [
      { name: 'Service 1', price: '60 USD' },
      { name: 'Service 2', price: '79 USD' },
      { name: 'Service 3', price: '90 USD' },
      { name: 'Service 4', price: '120 USD' }
    ]
  };

  return (
    <div className="min-h-screen bg-theme">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-theme">
        <div className="flex items-center justify-between p-4">
          <BackButton onClick={() => navigate(-1)} />
          <h1 className="text-theme-primary text-lg font-semibold">{location.name}</h1>
          <button className="p-2">
            <img src="/src/icons/Share.svg" alt="Share" className="w-6 h-6 [filter:var(--icon-filter)]" />
          </button>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="relative w-full h-[300px] mt-14">
        <img 
          src={location.images[activeImageIndex]} 
          alt={`${location.name} view ${activeImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
          {location.images.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === activeImageIndex ? 'bg-[#FDC51B]' : 'bg-white/50'}`}
              onClick={() => setActiveImageIndex(index)}
            />
          ))}
        </div>
        <button className="absolute top-4 right-4 p-2 rounded-full bg-black/30">
          <img src="/src/icons/Bookmark.svg" alt="Bookmark" className="w-6 h-6 [filter:brightness(0)_saturate(100%)_invert(100%)]" />
        </button>
        <div className="absolute bottom-4 right-4 px-3 py-1 rounded bg-[#FDC51B] text-black font-medium">
          {location.price}
        </div>
      </div>

      {/* Location Details */}
      <div className="p-4 space-y-6">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-theme-primary text-xl font-semibold">{location.name}</h2>
              <p className="text-theme-secondary text-sm">{location.distance}</p>
            </div>
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, index) => (
                <span 
                  key={index}
                  className={`text-2xl ${index < location.rating ? 'text-[#FDC51B]' : 'text-gray-300'}`}
                >
                  ★
                </span>
              ))}
            </div>
          </div>
          <p className="mt-2 text-theme-secondary line-clamp-3">{location.description}</p>
          <button className="text-[#FDC51B] text-sm mt-1">see more</button>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <img src="/src/icons/Place.svg" alt="Address" className="w-6 h-6 [filter:var(--icon-filter)]" />
            <span className="text-theme-secondary flex-1">{location.address}</span>
            <button className="px-3 py-1 rounded border border-[#FDC51B] text-[#FDC51B] text-sm">
              Check Map
            </button>
          </div>
          <div className="flex items-center space-x-3">
            <img src="/src/icons/Phone.svg" alt="Phone" className="w-6 h-6 [filter:var(--icon-filter)]" />
            <span className="text-theme-secondary">{location.phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <img src="/src/icons/Schedule.svg" alt="Hours" className="w-6 h-6 [filter:var(--icon-filter)]" />
            <span className="text-theme-secondary">{location.openHours}</span>
          </div>
        </div>

        {/* Services */}
        <div>
          <h3 className="text-theme-primary text-lg font-semibold mb-3">Services</h3>
          <div className="space-y-3">
            {location.services.map((service, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-lg bg-theme-secondary"
              >
                <span className="text-theme-primary">{service.name}</span>
                <span className="text-[#FDC51B] font-medium">{service.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-theme-primary text-lg font-semibold">Review (120)</h3>
            <div className="flex space-x-2">
              <button className="px-3 py-1 rounded bg-[#FDC51B] text-black text-sm">Hottest</button>
              <button className="px-3 py-1 rounded border border-theme-secondary text-theme-secondary text-sm">Latest</button>
            </div>
          </div>
          {/* Review list will be implemented later */}
        </div>
      </div>
    </div>
  );
};

export default LocationDetailsPage;