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
  isRecycleBin = false,
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

  return (
    <div
      className={`bg-theme-secondary rounded-lg overflow-hidden cursor-pointer ${selected ? 'border-2 border-[#FDC51B]' : ''}`}
      onClick={onClick}
    >
      <div className="p-2 space-y-2">
        <div className="grid grid-cols-3 gap-2 relative">
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

          {/* Status (Bookmark will be moved) */}
          {status && (
            <div className={`absolute -top-1 right-0 px-2 py-1 rounded-full text-xs font-medium ${status.toLowerCase() === 'approved' ? 'bg-green-500 text-white' : status.toLowerCase() === 'rejected' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'}`}>
              {status}
            </div>
          )}
        </div>

        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-theme-primary font-semibold">{item.name}</h3>
            </div>
            {/* Address and Distance */}
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
          {/* Bookmark Icon */}
          {!isRecycleBin && (
            <button
              className="p-1 ml-4"
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
          <button
            className="bg-[#FFC61B] text-black px-4 py-1.5 rounded-full text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              if (isRecycleBin && onRestore) {
                onRestore(item);
              }
            }}
          >
            {isRecycleBin ? t('exploreCard.restoreButton') : t('exploreCard.viewPlaceButton')}
          </button>
        </div>
      </div>

      {/* Media Modals */}
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
    services: PropTypes.arrayOf(PropTypes.string).isRequired
  }).isRequired,
  status: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool,
  isRecycleBin: PropTypes.bool,
  onRestore: PropTypes.func,
  isBookmarked: PropTypes.bool,
  onBookmarkClick: PropTypes.func,
  setIsModalOpen: PropTypes.func
};