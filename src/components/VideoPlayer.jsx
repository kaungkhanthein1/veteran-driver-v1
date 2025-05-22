import React from 'react';
import ReactPlayer from 'react-player';

const VideoPlayer = ({ isOpen, videoUrl, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-lg bg-theme-primary/50">
      <div className="relative w-full max-w-3xl mx-4">
        <button 
          onClick={onClose}
          className="absolute -top-10 right-0 text-theme-primary"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="relative pt-[56.25%]">
          <ReactPlayer
            url={videoUrl}
            width="100%"
            height="100%"
            controls
            playing
            className="absolute top-0 left-0"
          />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;