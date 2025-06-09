import React from 'react';
import PropTypes from 'prop-types';
import Varified from "icons/Varified.svg";
import Views from "icons/Views.svg";
import PlayCircle from "icons/PlayCircle.svg";
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../context/ThemeContext';

export default function TopPickCard({
  item,
  onClick,
  showNumbering,
  showPlayIcon
}) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <div
      className="flex items-center space-x-4 bg-theme-secondary rounded-lg overflow-hidden cursor-pointer p-3"
      onClick={onClick}
    >
      <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden relative">
        {showNumbering && (
          <div className="absolute top-0 left-0 w-6 h-6 bg-black bg-opacity-50 flex items-center justify-center rounded-br-lg z-10">
            <span className="text-white text-xs font-bold">{item.id}</span>
          </div>
        )}
        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
        {showPlayIcon && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
            <img src={PlayCircle} alt="Play" className="w-8 h-8 filter-white" />
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h3 className="text-theme-primary font-semibold text-base flex items-center">
            {item.name}
            <img src={Varified} alt="Verified" className="w-4 h-4 ml-2 [filter:var(--icon-filter)]" />
          </h3>
        </div>
        <div className="text-theme-secondary text-sm mt-1">
          <span>Phenom Penh ({item.distance})</span>
        </div>
        <div className="flex items-center space-x-1 mt-1">
          <div className="flex items-center">
            <span className="text-[#FFC61B] text-sm">{item.rating}</span>
            <span className="text-theme-secondary text-sm ml-1">({item.reviews} {t('exploreCard.reviews')})</span>
          </div>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div>
            <span style={{
              color: theme === 'dark' ? '#FFF' : '#444',
              fontFamily: 'Helvetica Neue',
              fontSize: '18px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: 'normal'
            }}>
              {item.price.split(' ')[0]}
            </span>
            <span style={{
              color: theme === 'dark' ? '#FFF' : '#444',
              fontFamily: 'Helvetica Neue',
              fontSize: '10.75px',
              fontStyle: 'normal',
              fontWeight: '700',
              lineHeight: 'normal',
              marginLeft: '4px'
            }}>
              {item.price.split(' ')[1]}
            </span>
          </div>
          <div className="flex items-center space-x-1 text-theme-secondary text-sm">
            <img src={Views} alt="Views" className="w-4 h-4 [filter:var(--icon-filter)]" />
            <span>{item.views} {t('exploreCard.views')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

TopPickCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    distance: PropTypes.string.isRequired,
    reviews: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    views: PropTypes.number.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
  showNumbering: PropTypes.bool,
  showPlayIcon: PropTypes.bool,
};