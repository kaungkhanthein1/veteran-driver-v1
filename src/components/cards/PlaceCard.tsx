import React from 'react';
import RatingStar from '../../icons/RatingStar.svg';
import ViewsIcon from '../../icons/Views.svg';
import DefaultAvator from '../../icons/DefaultAvator.svg';

interface PlaceCardProps {
  image?: string;
  name: string;
  address?: string;
  distance?: string;
  rating: number;
  reviews: number;
  views?: number;
  onClick?: () => void;
  rightSection?: React.ReactNode;
}

const PlaceCard: React.FC<PlaceCardProps> = ({
  image,
  name,
  address,
  distance,
  rating,
  reviews,
  views,
  onClick,
  rightSection,
}) => {
  return (
    <div
      className="flex items-center py-1.5 cursor-pointer hover:bg-theme-secondary rounded-xl transition"
      onClick={onClick}
    >
      <div className="w-28 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-theme-secondary">
        <img
          src={image || DefaultAvator}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 min-w-0 ml-4">
        <div className="font-semibold text-theme-primary text-xl truncate">{name}</div>
        <div className="text-theme-secondary text-base truncate">
          {address}
          {address && distance && <span className="mx-1">•</span>}
          {distance}
        </div>
        <div className="flex items-center mt-1 space-x-2">
          <span className="flex items-center text-theme-primary font-bold text-lg">
            {rating}
            <img src={RatingStar} alt="star" className="w-5 h-5 ml-1" />
          </span>
          <span className="text-theme-secondary text-base">({reviews})</span>
          {views !== undefined && (
            <span className="flex items-center text-theme-secondary text-base ml-2">
              <img src={ViewsIcon} alt="views" className="w-5 h-5 mr-1" />
              {views.toLocaleString()} view
            </span>
          )}
        </div>
      </div>
      {rightSection && <div className="ml-2">{rightSection}</div>}
    </div>
  );
};

export default PlaceCard; 