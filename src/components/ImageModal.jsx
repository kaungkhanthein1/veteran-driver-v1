import React from 'react';

const ImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-black/50">
      <div className="relative max-w-3xl mx-4">
        <button 
          onClick={onClose}
          className="absolute -top-10 right-0 text-white"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img 
          src={imageUrl} 
          alt="Full size" 
          className="max-h-[90vh] w-auto object-contain backdrop-blur-none"
        />
      </div>
    </div>
  );
};

export default ImageModal;