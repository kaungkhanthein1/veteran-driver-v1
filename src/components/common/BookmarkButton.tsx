import React, { useState } from 'react';
import { useBookmarks } from '../../hooks/useBookmarks';
import BookmarkIcon from '../../icons/Bookmark.svg';
import { PlaceResponseDto } from '../../dto/place/place.dto';

interface BookmarkButtonProps {
  place: PlaceResponseDto & {
    favoriteId?: string;
    folderId?: string;
    folderName?: string;
  };
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  folderId?: string;
  className?: string;
  onToggle?: (isBookmarked: boolean) => void;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({
  place,
  size = 'md',
  showLabel = false,
  folderId,
  className = '',
  onToggle
}) => {
  const { isBookmarked, toggleBookmark, loading } = useBookmarks();
  const [localLoading, setLocalLoading] = useState(false);
  
  const bookmarked = isBookmarked(place.id);

  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6', 
    lg: 'w-8 h-8'
  };

  const buttonSizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-3'
  };

  const handleToggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (loading || localLoading) return;

    try {
      setLocalLoading(true);
      await toggleBookmark(place, folderId);
      onToggle?.(!bookmarked);
    } catch (error) {
      console.error('Failed to toggle bookmark:', error);
      // You could show a toast notification here
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={loading || localLoading}
      className={`
        relative inline-flex items-center justify-center rounded-full
        transition-all duration-200 ease-in-out
        ${buttonSizeClasses[size]}
        ${bookmarked 
          ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-600' 
          : 'bg-white/80 hover:bg-white text-gray-600'
        }
        ${(loading || localLoading) ? 'opacity-60 cursor-not-allowed' : 'hover:scale-110 active:scale-95'}
        ${className}
      `}
      title={bookmarked ? 'Remove from favorites' : 'Add to favorites'}
    >
      {/* Loading spinner */}
      {(loading || localLoading) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`
            animate-spin rounded-full border-2 border-current border-t-transparent
            ${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : 'w-5 h-5'}
          `} />
        </div>
      )}
      
      {/* Bookmark icon */}
      <img
        src={BookmarkIcon}
        alt={bookmarked ? 'Bookmarked' : 'Bookmark'}
        className={`
          ${sizeClasses[size]}
          ${(loading || localLoading) ? 'opacity-0' : 'opacity-100'}
          transition-opacity duration-200
          ${bookmarked ? 'filter-yellow' : '[filter:var(--icon-filter)]'}
        `}
      />

      {/* Label */}
      {showLabel && (
        <span className={`
          ml-2 text-sm font-medium
          ${bookmarked ? 'text-yellow-600' : 'text-gray-600'}
        `}>
          {bookmarked ? 'Saved' : 'Save'}
        </span>
      )}

      {/* Animated heart effect */}
      {bookmarked && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 animate-ping">
            <img
              src={BookmarkIcon}
              alt=""
              className={`${sizeClasses[size]} filter-yellow opacity-30`}
            />
          </div>
        </div>
      )}
    </button>
  );
};

export default BookmarkButton; 