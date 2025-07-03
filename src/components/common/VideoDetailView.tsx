import React, { useState } from 'react';
import ArtPlayer from './ArtPlayer';
import type { Option } from 'artplayer/types/option';

interface VideoDetailViewProps {
  isOpen: boolean;
  videoUrl: string;
  videoItem: {
    description: string;
    user: {
      name: string;
      avatar: string;
    };
    likes: number;
    category: string;
  };
  onClose: () => void;
}

const VideoDetailView: React.FC<VideoDetailViewProps> = ({ 
  isOpen, 
  videoUrl, 
  videoItem,
  onClose 
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  
  if (!isOpen) return null;

  // Note: container property is required by Option type but will be provided by ArtPlayer component
  const artPlayerOptions: Partial<Option> = {
    url: videoUrl,
    volume: 0.5,
    autoplay: true,
    autoSize: false,
    autoMini: false,
    loop: true,
    flip: false,
    playbackRate: false,
    aspectRatio: false,
    fullscreen: true,
    fullscreenWeb: true,
    setting: false,
    hotkey: true,
    pip: false,
    mutex: true,
    backdrop: true,
    theme: '#ffb800',
    lang: 'en',
    moreVideoAttr: {
      playsInline: true,
    },
    controls: [
      {
        name: 'back',
        position: 'left',
        html: '<svg width="28" height="28" fill="none" stroke="white" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>',
        click: function() {
          onClose();
        },
      } as any,
    ],
  };

  const formatNumber = (num: number) => {
    return num >= 1000 ? (num / 1000).toFixed(1) + 'K' : num;
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* Video Player with Overlay Controls */}
      <div className="relative flex-1">
        <ArtPlayer option={artPlayerOptions} className="w-full h-full" />
        
        {/* Overlay Controls */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
          {/* Left side - Back button already in ArtPlayer controls */}
          <div></div>
          
          {/* Right side - Profile icon */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Right Side Controls */}
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-6 z-10">
          {/* Like Button */}
          <button 
            className="flex flex-col items-center" 
            onClick={() => setIsLiked(!isLiked)}
          >
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-1">
              <svg 
                width="28" 
                height="28" 
                fill={isLiked ? "#ffb800" : "none"} 
                stroke={isLiked ? "#ffb800" : "white"} 
                strokeWidth="2" 
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <span className="text-xs text-white font-medium">{formatNumber(videoItem.likes)}</span>
          </button>
          
          {/* Share Button */}
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-1">
              <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8"></path>
                <polyline points="16 6 12 2 8 6"></polyline>
                <line x1="12" y1="2" x2="12" y2="15"></line>
              </svg>
            </div>
            <span className="text-xs text-white font-medium">Share</span>
          </button>
        </div>
        
        {/* Bottom Info Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white">
              <img 
                src={videoItem.user.avatar} 
                alt="avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg">{videoItem.user.name}</h3>
              <p className="text-xs text-gray-300">{videoItem.category}</p>
            </div>
            <button className="bg-[#ffb800] text-black font-bold py-2 px-6 rounded-full text-sm">
              Follow
            </button>
          </div>
          
          {/* Description */}
          <p className="text-sm text-white mt-3 mb-6">{videoItem.description}</p>
          
          {/* Drag Bar */}
          <div className="w-16 h-1 bg-white/30 rounded-full mx-auto mt-4"></div>
        </div>
      </div>
      
      
      {/* Comment Section - Slide up panel */}
      {isCommentOpen && (
        <div className="fixed inset-0 z-60 bg-black/80" onClick={() => setIsCommentOpen(false)}>
          <div 
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4 max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-bold text-black mb-4">Comments</h3>
            
            {/* Comment list would go here */}
            <div className="space-y-4">
              <div className="flex gap-3">
                <img src={videoItem.user.avatar} alt="commenter" className="w-8 h-8 rounded-full" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-black">User123</span>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-sm text-gray-800">This place looks amazing! I need to visit soon.</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <img src={videoItem.user.avatar} alt="commenter" className="w-8 h-8 rounded-full" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-black">TravelFan</span>
                    <span className="text-xs text-gray-500">1 week ago</span>
                  </div>
                  <p className="text-sm text-gray-800">The atmosphere looks incredible. What&apos;s the best time to visit?</p>
                </div>
              </div>
            </div>
            
            {/* Comment input */}
            <div className="flex items-center gap-2 mt-4 border-t border-gray-200 pt-4">
              <img src={videoItem.user.avatar} alt="user" className="w-8 h-8 rounded-full" />
              <input 
                type="text" 
                placeholder="Add a comment..." 
                className="flex-1 bg-gray-100 text-black rounded-full px-4 py-2 text-sm"
              />
              <button className="text-[#ffb800]">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 2L11 13"></path>
                  <path d="M22 2l-7 20-4-9-9-4 20-7z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetailView;