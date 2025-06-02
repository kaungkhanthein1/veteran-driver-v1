import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ImageModal = ({ images, initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);

  const handlePrevious = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Touch event handlers for swipe
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEndX(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX !== null && touchEndX !== null) {
      const distance = touchStartX - touchEndX;
      if (distance > 50) {
        // Swiped left
        handleNext();
      } else if (distance < -50) {
        // Swiped right
        handlePrevious();
      }
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        handlePrevious(e);
      } else if (e.key === 'ArrowRight') {
        handleNext(e);
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentMedia = images[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-4 left-4 text-white bg-gray-800/50 hover:bg-gray-800/70 rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white z-50"
        aria-label="Close"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Main Content Area */}
      <div className="flex flex-col items-center justify-center w-full h-full max-h-[80vh] pb-20">
        {/* Main Image Area and Navigation */}
        <div className="relative flex items-center justify-center w-full h-full flex-grow">
          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white transition"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 focus:outline-none focus:ring-2 focus:ring-white transition"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Render Image or Video */}
          {currentMedia.type === 'image' ? (
            <img 
              src={currentMedia.url} 
              alt={`Image ${currentIndex + 1}`} 
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
            />
          ) : (
            <video 
              src={currentMedia.url} 
              controls 
              className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
            />
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="mt-4 flex justify-center space-x-2 overflow-x-auto px-4 pb-4">
            {/* Thumbnails */}
            {images.map((media, index) => (
              <img 
                key={index}
                src={media.type === 'video' && media.thumbnailUrl ? media.thumbnailUrl : media.url} // Use thumbnailUrl for video if available
                alt={`${media.type === 'video' ? 'Video' : 'Image'} Thumbnail ${index + 1}`}
                className={`w-16 h-16 flex-shrink-0 object-cover rounded-md cursor-pointer ${currentIndex === index ? 'border-2 border-white' : 'border-2 border-transparent hover:border-gray-400'}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Image Counter - Removed as per design */}
    </div>
  );
};

ImageModal.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({
    type: PropTypes.oneOf(['image', 'video']).isRequired,
    url: PropTypes.string.isRequired,
    thumbnailUrl: PropTypes.string, // Optional for video thumbnails
  })).isRequired,
  initialIndex: PropTypes.number,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;