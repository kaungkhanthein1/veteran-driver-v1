import React from "react";
import Bookmark from "../icons/Bookmark.svg";

export default function ExploreCard({ item, status, onClick, selected, isRecycleBin = false, onRestore }) {
  return (
    <div 
      className={`bg-theme-secondary rounded-lg overflow-hidden cursor-pointer ${selected ? 'border-2 border-[#FDC51B]' : ''}`} 
      onClick={onClick}
    >
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-2 relative">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className={`aspect-square bg-theme-primary rounded-lg ${index === 2 ? "relative" : ""}`}
            >
              {index === 2 && (
                <div className="absolute inset-0 bg-theme-primary bg-opacity-50 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-theme-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
          
          {/* Bookmark or Status */}
          {!isRecycleBin ? (
            <div className="absolute top-2 right-2">
              <img src={Bookmark} alt="bookmark" className="w-6 h-6" />
            </div>
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
    </div>
  );
}