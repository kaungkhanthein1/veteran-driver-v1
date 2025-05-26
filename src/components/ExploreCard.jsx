import React, { useState } from "react";
import Bookmark from "../icons/Bookmark.svg";
import BeachImg from "../assets/Beach.png";
import RoomImg from "../assets/Room.png";
import SampleVideo from "../assets/Sample.mp4";
import VideoPlayer from "./VideoPlayer";

export default function ExploreCard({ 
  item, 
  status, 
  onClick, 
  selected, 
  isRecycleBin = false, 
  onRestore, 
  isBookmarked = false, 
  onBookmarkClick 
}) {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
  };

  return (
    <div 
      className={`bg-theme-secondary rounded-lg overflow-hidden cursor-pointer ${selected ? 'border-2 border-[#FDC51B]' : ''}`} 
      onClick={onClick}
    >
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-2 relative">
          <div 
            className="aspect-square bg-theme-primary rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleMediaClick(BeachImg)}
          >
            <img src={BeachImg} alt="Beach" className="w-full h-full object-cover" />
          </div>
          <div 
            className="aspect-square bg-theme-primary rounded-lg overflow-hidden cursor-pointer"
            onClick={() => handleMediaClick(RoomImg)}
          >
            <img src={RoomImg} alt="Room" className="w-full h-full object-cover" />
          </div>
          <div 
            className="aspect-square bg-theme-primary rounded-lg relative overflow-hidden cursor-pointer"
            onClick={() => handleMediaClick({ type: "video", url: SampleVideo, thumbnail: RoomImg })}
          >
            <img src={RoomImg} alt="Video thumbnail" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
              <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
          
          {/* Bookmark or Status */}
          {!isRecycleBin ? (
            <button 
              className="absolute top-2 right-2 p-1"
              onClick={(e) => {
                e.stopPropagation();
                if (onBookmarkClick) {
                  onBookmarkClick(item);
                }
              }}
            >
              <img 
                src={Bookmark} 
                alt="bookmark" 
                className={`w-6 h-6 ${isBookmarked ? '[filter:invert(70%)_sepia(74%)_saturate(1115%)_hue-rotate(359deg)_brightness(103%)_contrast(106%)]' : '[filter:var(--icon-filter)]'}`} 
              />
            </button>
          ) : status && (
            <div className={`absolute -top-1 right-0 px-2 py-1 rounded-full text-xs font-medium ${status.toLowerCase() === 'approved' ? 'bg-green-500 text-white' : status.toLowerCase() === 'rejected' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'}`}>
              {status}
            </div>
          )}
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-theme-primary font-semibold">{item.name}</h3>
            <span className="text-theme-secondary text-sm">{item.distance}</span>
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-[#FFC61B] text-sm">★</span>
              ))}
              <span className="text-theme-primary ml-1 text-sm">{item.rating}</span>
            </div>
            <span className="text-theme-secondary text-sm">({item.reviews})</span>
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
          <button 
            className="bg-[#FFC61B] text-black px-4 py-1.5 rounded-full text-sm font-medium"
            onClick={(e) => {
              e.stopPropagation();
              if (isRecycleBin && onRestore) {
                onRestore(item);
              }
            }}
          >
            {isRecycleBin ? 'Restore' : 'View Place'}
          </button>
        </div>
      </div>

      {/* Video Player Modal */}
      {selectedMedia && selectedMedia.type === "video" && (
        <VideoPlayer
          isOpen={!!selectedMedia}
          videoUrl={selectedMedia.url}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </div>
  );
}