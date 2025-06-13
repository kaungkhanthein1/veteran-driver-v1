import React from 'react';
import SocialAdCard from '../components/cards/SocialAdCard';

export default function AdSection() {
  const adData = {
    id: 1,
    title: "DREAMING OF A JAMAICA GETAWAY?",
    subtitle: "We'll Help You Get Here",
    description: "Discover an unparalleled escape at our exquisite beachfront resort, where luxury meets tranquility. Immerse yourself in breathtaking ocean views, indulge in world-class amenities, and create unforgettable memories. Book your dream getaway today and experience the ultimate blend of relaxation and adventure. Our resort offers pristine beaches, gourmet dining, and a variety of activities for all ages. Don't miss out on our exclusive deals and make your dream vacation a reality.",
    logoUrl: "/path/to/logo.png", // You'll need to add the actual logo
    logoName: "SKY HAUS",
    deliveredBy: "Delivered to You!",
    time: "33min ago",
    likes: 5324,
    comments: 20,
    shares: 6,
    progress: 0
  };

  const handleBookNow = () => {
    // Implement booking logic
    console.log('Book Now clicked');
  };

  const handleViewPlace = () => {
    // Implement view place logic
    console.log('View Place clicked');
  };

  return (
    <div className="mb-4 relative overflow-hidden">
      <SocialAdCard
        {...adData}
        onBookNow={handleBookNow}
        onViewPlace={handleViewPlace}
      />
    </div>
  );
}