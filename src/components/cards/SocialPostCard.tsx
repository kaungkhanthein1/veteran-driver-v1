import { useState } from "react";
import ImageModal from "../common/ImageModal";
import ShareModal from "../common/ShareModal";
import PropTypes from 'prop-types';
import BeachImg from "assets/Beach.png";
import RoomImg from "assets/Room.png";
import SampleVideo from "assets/Sample.mp4";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import SocialShareIcon from "icons/SocialShare.svg";

interface PostUser {
  name: string;
  avatar?: string;
  verified: boolean;
}

interface PostTag {
  icon?: string;
  text: string;
}

interface PostMediaItem {
  type: 'image' | 'video';
  url: string;
  thumbnailUrl?: string;
}

interface Post {
  id: string | number;
  user: PostUser;
  place?: string;
  content: string;
  media: PostMediaItem[];
  time: string;
  likes: string | number;
  comments: string | number;
  shares: string | number;
  isAnonymous?: boolean;
  tags?: PostTag[];
  locationId?: string | number;
}

interface SocialPostCardProps {
  post: Post;
  onOpenComments?: (postId: number) => void;
  compact?: boolean;
  setIsModalOpen?: (isOpen: boolean) => void;
  className?: string;
}

interface SelectedMediaState {
  type: 'modal';
  media: PostMediaItem[];
  initialIndex: number;
}

export default function SocialPostCard({ post: providedPost, onOpenComments, compact = false, setIsModalOpen, className }: SocialPostCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<SelectedMediaState | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const navigate = useNavigate();

  // Use provided post
  const post = providedPost;

  // Define all available media for this post
  const allMedia: PostMediaItem[] = [
    { type: 'image', url: BeachImg },
    { type: 'image', url: RoomImg },
    { type: 'video', url: SampleVideo, thumbnailUrl: RoomImg }
  ];

  const { t } = useTranslation();

  const handleMediaClick = (media: PostMediaItem, index: number) => {
    setSelectedMedia({
      type: 'modal',
      media: allMedia,
      initialIndex: index,
    });
    if (setIsModalOpen) setIsModalOpen(true);
  };

  const handleCloseMediaModal = () => {
    setSelectedMedia(null);
    if (setIsModalOpen) {
      setIsModalOpen(false);
    }
  };

  // Add handlers for comments and share
  const handleCommentClick = () => {
    if (onOpenComments) {
      onOpenComments(post.id as number);
    }
  };

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  return (
    <div className={`bg-theme-secondary border-b border-theme ${compact ? 'text-sm' : ''} ${className}`}>
      {/* User Info Row */}
      <div className={`flex items-center justify-between ${compact ? 'px-3 py-2' : 'px-5 py-4'}`}>
        <div className="flex items-center">
          <div className={`${compact ? 'w-7 h-7' : 'w-9 h-9'} rounded-full bg-blue-500 flex items-center justify-center mr-3`}>
            <span className={`${compact ? 'text-sm' : 'text-base'} text-white`}>{post.user.name[0]}</span>
          </div>
          <div className="flex items-center">
            <span className={`font-semibold ${compact ? 'text-xs' : 'text-[14px]'} text-theme-primary mr-1.5`}>{post.user.name}</span>
            {post.user.verified && (
              <svg className={`${compact ? 'w-3 h-3' : 'w-4 h-4'}`} viewBox="0 0 24 24" fill="#3b82f6">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
            )}
          </div>
        </div>
        {compact ? (
          <button 
            className="ml-auto text-[#FFC61B] text-xs flex items-center"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Navigating to location:', post.locationId);
              navigate(`/location/${post.locationId}`);
            }}
          >
            <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
            </svg>
            {t('socialPostCard.viewPlace')}
          </button>
        ) : (
          <button 
            className="ml-auto bg-theme-secondary text-[#FFC61B] rounded-full px-3 py-1.5 text-[13px] font-medium flex items-center"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log('Navigating to location:', post.locationId);
              navigate(`/location/${post.locationId}`);
            }}
          >
            <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            </svg>
            {t('socialPostCard.viewPlace')}
          </button>
        )}
      </div>

      {/* Content */}
      {compact ? (
        <div className="px-3 text-xs text-theme-primary">
          {post.content.slice(0, 80)}...
          <div className="flex flex-wrap gap-1 mt-1 mb-2">
            {(post.tags || []).slice(0, 2).map((tag: PostTag, index: number) => {
              const currentTags = post.tags || [];
              return (
              <span key={index} className="text-[11px] text-theme-primary flex items-center">
                {tag.icon && <span className="mr-1">{tag.icon}</span>}
                {tag.text}
                {index < currentTags.length - 1 && <span className="mx-1">•</span>}
              </span>
            )})}
          </div>
        </div>
      ) : (
        <div className="text-[14px] text-theme-primary leading-6 px-5">
          {expanded ? post.content : post.content.slice(0, 100)}
          {post.content.length > 100 && (
            <span
              className="text-theme-secondary cursor-pointer ml-1.5 text-[13px]"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? t('socialPostCard.seeLess') : t('socialPostCard.seeMore')}
            </span>
          )}
          <div className="flex flex-wrap gap-1.5 mt-2.5 mb-4">
            {(post.tags || []).map((tag: PostTag, index: number) => {
              const currentTags = post.tags || [];
              return (
              <span key={index} className="text-[13px] text-theme-primary flex items-center">
                {tag.icon && <span className="mr-1.5">{tag.icon}</span>}
                {tag.text}
                {index < currentTags.length - 1 && <span className="mx-1.5">•</span>}
              </span>
            )})}
          </div>
        </div>
      )}

      {/* Media Grid */}
      <div className={`grid grid-cols-3 gap-2 mt-4 ${compact ? 'aspect-[3/1]' : ''} px-5`}>
        {allMedia.map((media, idx) => (
          <div 
            key={idx} 
            className="aspect-square bg-theme-primary cursor-pointer overflow-hidden rounded-lg"
            onClick={() => handleMediaClick(media, idx)}
          >
            {media.type === 'image' && (
              <img 
                src={media.url} 
                alt={t('socialPostCard.mediaAlt', { number: idx + 1 })}
                className="w-full h-full object-cover"
              />
            )}
            {media.type === 'video' && (
              <div className="relative w-full h-full">
                <img 
                  src={media.thumbnailUrl} 
                  alt={t('socialPostCard.videoAlt', { number: idx + 1 })}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Actions Row */}
      <div className={`flex items-center ${compact ? 'px-3 py-2' : 'py-4'} text-theme-secondary px-5`}>
        <span className={`${compact ? 'text-[10px]' : 'text-[12px]'}`}>{post.time}</span>
        <div className="ml-auto flex items-center space-x-4">
          <button className={`flex items-center ${compact ? 'text-[11px]' : 'text-[13px]'}`}>
            <svg className={`${compact ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-1.5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            {post.likes}
          </button>
          <button 
            onClick={handleCommentClick}
            className={`flex items-center ${compact ? 'text-[11px]' : 'text-[13px]'}`}
          >
            <svg className={`${compact ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-1.5'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {post.comments}
          </button>
          <button 
            onClick={handleShareClick}
            className={`flex items-center ${compact ? 'text-[11px]' : 'text-[13px]'}`}
          >
            <img src={SocialShareIcon} alt="Share" className={`${compact ? 'w-3 h-3 mr-1' : 'w-4 h-4 mr-1.5'} [filter:var(--icon-filter)]`} />
            {post.shares}
          </button>
        </div>
      </div>

      {/* Media Modals */}
      {selectedMedia && (
        <ImageModal
          images={selectedMedia.media}
          initialIndex={selectedMedia.initialIndex}
          onClose={handleCloseMediaModal}
        />
      )}
      
      <ShareModal
        isOpen={showShareModal}
        onClose={() => setShowShareModal(false)}
      />
    </div>
  );
}

// Remove PropTypes as TypeScript interfaces are used
/*
SocialPostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    locationId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      verified: PropTypes.bool
    }).isRequired,
    content: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.shape({
      icon: PropTypes.string,
      text: PropTypes.string.isRequired
    })),
    time: PropTypes.string.isRequired,
    likes: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    comments: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    shares: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
  }).isRequired,
  onOpenComments: PropTypes.func,
  compact: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
  className: PropTypes.string,
};
*/