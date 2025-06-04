import React, { useState } from "react";
import PropTypes from 'prop-types';
import Bookmark from "icons/Bookmark.svg";
import GoldenGate from "assets/GoldenGate.png";
import Harrier from "assets/Harrier.png";
import HarrierRoom from "assets/HarrierRoom.png";
import ExploreVideo from "assets/Explore.mp4";
import ImageModal from "../common/ImageModal";
import { useTranslation } from 'react-i18next';

export default function ExploreCard({
  item,
  status,
  onClick,
  selected,
  context,
  onRestore,
  isBookmarked = false,
  onBookmarkClick,
  setIsModalOpen
}) {
  const { t } = useTranslation();
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Define all available media for this card
  const allMedia = [
    { type: 'image', url: GoldenGate },
    { type: 'image', url: Harrier },
    { type: 'video', url: ExploreVideo, thumbnailUrl: HarrierRoom }
  ];

  const handleMediaClick = (media, index) => {
    setSelectedMedia({
      type: 'modal',
      media: allMedia,
      initialIndex: index,
    });
    if (setIsModalOpen) setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMedia(null);
    if (setIsModalOpen) {
      setIsModalOpen(false);
    }
  };

  // Determine button text based on context
  const renderButton = () => {
    if (context === 'uploaded') {
      return (
        <button
          className="bg-[#FFC61B] text-black px-4 py-1.5 rounded-full text-sm font-medium"
          onClick={(e) => {
            e.stopPropagation();
            onClick(); // assuming onClick handles the edit details navigation
          }}
        >
          {t('exploreCard.editDetailsButton') || 'Edit Details'}
        </button>
      );
    } else if (context === 'recycleBin' && onRestore) {
      return (
         <button
            className="bg-[#FFC61B] text-black px-4 py-1.5 rounded-full text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              onRestore(item);
            }}
          >
            {t('exploreCard.restoreButton') || 'Restore'}
          </button>
      );
    } else {
      return (
        <button
          className="bg-[#FFC61B] text-black px-4 py-1.5 rounded-full text-sm font-medium"
          onClick={(e) => {
            e.stopPropagation();
            onClick(); // assuming onClick handles the view place navigation
          }}
        >
          {t('exploreCard.viewPlaceButton') || 'View Details'}
        </button>
      );
    }
  };

  // Determine status label color and background using inline styles
  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'approved':
        return { backgroundColor: '#00B96E1F', color: '#00B96E' };
      case 'pending':
        return { backgroundColor: '#FF9D001F', color: '#FF9D00' };
      case 'rejected':
        return { backgroundColor: '#FF3F3F33', color: '#FF3F3F' };
      default:
        return { backgroundColor: '#8080801F', color: '#808080' }; 
    }
  };

  return (
    <div
      className={`bg-theme-primary rounded-xl overflow-hidden cursor-pointer shadow-lg ${selected ? 'border-2 border-[#FDC51B]' : ''}`}
      onClick={onClick}
    >
      <div className="p-2 space-y-2 relative">
        <div className="grid grid-cols-3 gap-2">
          <div
            className="aspect-square bg-theme-primary rounded-lg overflow-hidden cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleMediaClick(allMedia[0], 0);
            }}
          >
            <img src={GoldenGate} alt={t('exploreCard.goldenGateAlt')} className="w-full h-full object-cover" />
          </div>
          <div
            className="aspect-square bg-theme-primary rounded-lg overflow-hidden cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleMediaClick(allMedia[1], 1);
            }}
          >
            <img src={Harrier} alt={t('exploreCard.harrierAlt')} className="w-full h-full object-cover" />
          </div>
          <div
            className="aspect-square bg-theme-primary rounded-lg relative overflow-hidden cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              handleMediaClick({ type: "video", url: ExploreVideo, thumbnail: HarrierRoom }, 2);
            }}
          >
            <img src={HarrierRoom} alt={t('exploreCard.videoThumbnailAlt')} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>

        {(context === 'uploaded' || context === 'recycleBin') && status ? (
          <div
            className="absolute right-3 p-1.5 rounded-xl text-xs font-medium"
            style={getStatusColor(status)}
          >
            {status}
          </div>
        ) : null}

        {(context !== 'uploaded' && context !== 'recycleBin') && (
          <button
            className="absolute right-4 p-1"
            onClick={(e) => {
              e.stopPropagation();
              if (onBookmarkClick) {
                onBookmarkClick(item);
              }
            }}
          >
            <img
              src={Bookmark}
              alt={t('exploreCard.bookmarkAlt')}
              className={`w-6 h-6 ${isBookmarked ? '[filter:invert(70%)_sepia(74%)_saturate(1115%)_hue-rotate(359deg)_brightness(103%)_contrast(106%)]' : '[filter:var(--icon-filter)]'}`}
            />
          </button>
        )}

        <div>
          <h3 className="text-theme-primary font-semibold">{item.name}</h3>
          <div className="text-theme-secondary text-sm mt-1">
            <span>{item.address}</span>
            {item.address && item.distance && <span className="mx-1">•</span>}
            <span>{item.distance}</span>
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#FFC61B] text-sm">★</span>
              ))}
              <span className="text-theme-primary ml-1 text-sm">{item.rating}</span>
            </div>
            <span className="text-theme-secondary text-sm">({t('exploreCard.reviewsCount', { count: item.reviews })})</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-theme-secondary">
          {item.services.map((service, index) => (
            <React.Fragment key={index}>
              <span>{service}</span>
              {index < item.services.length - 1 && (
                <span className="w-1 h-1 bg-theme-secondary rounded-full"></span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[#FFC61B] font-medium">{item.price}</span>
          {renderButton()}
        </div>
      </div>

      {selectedMedia && (
        <ImageModal
          isOpen={!!selectedMedia}
          images={selectedMedia.media}
          initialIndex={selectedMedia.initialIndex}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

ExploreCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.string,
    distance: PropTypes.string,
    rating: PropTypes.number.isRequired,
    reviews: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    services: PropTypes.arrayOf(PropTypes.string).isRequired,
    status: PropTypes.string, // Ensure status is in item shape if it's part of item
  }).isRequired,
  status: PropTypes.string, // Added status to PropTypes if passed separately
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  context: PropTypes.oneOf(['uploaded', 'recycleBin', 'explore']), // Added context to PropTypes
  onRestore: PropTypes.func,
  isBookmarked: PropTypes.bool,
  onBookmarkClick: PropTypes.func,
  setIsModalOpen: PropTypes.func
};