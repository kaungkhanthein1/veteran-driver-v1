import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const NearestPlaceCard = ({ item, rank }) => {
  const { t } = useTranslation();

  // Apply the specific font styles for the location name
  const locationNameStyle = {
    color: '#FFF',
    fontVariantNumeric: 'lining-nums proportional-nums',
    fontFeatureSettings: "'dlig' on",
    fontFamily: "'Herr Von Muellerhoff', cursive", // Add a fallback font
    fontSize: '70.373px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
  };

  return (
    <div className="bg-theme-secondary rounded-2xl overflow-hidden">
      <div className="flex items-center p-4">
        {/* Image and Rank */}
        <div className="relative w-[150px] h-[120px] bg-theme-primary rounded-lg overflow-hidden mr-4">
          {/* Rank Number */}
          <div className="absolute top-0 left-0 w-10 h-10 bg-theme-primary bg-opacity-50 flex items-center justify-center rounded-br-lg">
            <span
              className="text-transparent text-2xl font-bold"
              style={{
                WebkitTextStrokeWidth: '1px',
                WebkitTextStrokeColor: 'var(--text-primary)',
              }}
            >
              {rank}
            </span>
          </div>
          {/* Location Image */}
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Details */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 style={locationNameStyle}>{item.name}</h3> {/* Apply the special style here */}
            {/* Bookmark Icon Placeholder (if needed for nearest places) */}
            {/* <button className="text-[#FFC61B]"><svg>...</svg></button> */}
          </div>
          <p className="text-theme-primary text-sm mb-2">{item.distance}</p>
          <div className="flex items-center gap-1 mb-2">
            <span className="text-[#FFC61B] text-sm">{item.rating}</span>
            {/* Star Icons (adjust based on rating) */}
             {[...Array(5)].map((_, i) => (
              <svg key={i} className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-[#FFC61B]' : 'text-gray-300'}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="text-theme-primary text-sm">({item.reviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-[#FFC61B] font-semibold">{item.price}</div>
            <button className="bg-[#FFC61B] text-theme-primary px-4 py-1 rounded-full text-sm font-medium">
              {t('rankingPage.bookNowButton')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

NearestPlaceCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    distance: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  rank: PropTypes.number.isRequired,
};

export default NearestPlaceCard;
