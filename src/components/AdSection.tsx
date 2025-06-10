import React from 'react';
import SocialAdCard from '../components/cards/SocialAdCard';

export default function AdSection() {
  const adData = {
    id: 1,
    title: "DREAMING OF A JAMAICA GETAWAY?",
    subtitle: "We'll Help You Get Here",
    description: "Experience luxury and tranquility at our beachfront resort. Book now for exclusive deals and unforgettable memories.",
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
    <div className="mb-4">
      <SocialAdCard
        {...adData}
        onBookNow={handleBookNow}
        onViewPlace={handleViewPlace}
      />
    </div>
  );
}