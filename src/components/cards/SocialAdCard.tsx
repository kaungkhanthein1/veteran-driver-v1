import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import LikeIcon from "icons/Like.svg";
import CommentIcon from "icons/Comment.svg";
import ShareIcon from "icons/Share.svg";
import PlayIcon from "icons/PlayCircle.svg";
import PauseIcon from "icons/Pause.svg";
import MuteIcon from "icons/Mute.svg";
import UnmuteIcon from "icons/Unmute.svg";
import ReviewProfile from "../../assets/ReviewProfile.gif";
import AdVideo from "../../assets/Ad.mp4";
import ReactPlayer from 'react-player';

interface SocialAdCardProps {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  logoUrl: string;
  logoName: string;
  deliveredBy: string;
  time: string;
  likes: number;
  comments: number;
  shares: number;
  progress: number; 
  onBookNow: () => void;
  onViewPlace: () => void;
}

export default function SocialAdCard({
  id,
  title,
  subtitle,
  description,
  logoUrl,
  logoName,
  deliveredBy,
  time,
  likes,
  comments,
  shares,
  progress,
  onBookNow,
  onViewPlace,
}: SocialAdCardProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [internalIsPaused, setInternalIsPaused] = useState(false); 
  const [internalIsMuted, setInternalIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(30); 
  const playerRef = useRef<ReactPlayer>(null);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Update progress based on current time
  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current && !internalIsPaused) {
        const currentSeconds = playerRef.current.getCurrentTime();
        setCurrentTime(currentSeconds);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [internalIsPaused]);

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  // Modified to handle text-based truncation rather than just line-based
  const truncateText = (text: string, maxLines: number, charsPerLine: number) => {
    const lines = text.split('\n');
    if (lines.length <= maxLines) return text;
    
    // Join the first maxLines lines
    return lines.slice(0, maxLines).join('\n');
  };

  const truncatedDescription = truncateText(description, 3, 50);
  const needsTruncation = description.length > truncatedDescription.length;

  const handlePlayPause = () => {
    setInternalIsPaused(prev => !prev);
  };

  const handleMuteUnmute = () => {
    setInternalIsMuted(prev => !prev);
  };

  const handleProgress = (state: { played: number; playedSeconds: number; loaded: number; loadedSeconds: number }) => {
    setCurrentTime(state.playedSeconds);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  // Calculate progress percentage
  const progressPercentage = (currentTime / duration) * 100;

  return (
    <div className="bg-theme-secondary border-b border-theme mb-4 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4">
        <div className="flex items-center">
          <img src={ReviewProfile} alt={logoName} className="w-9 h-9 rounded-full mr-3" />
          <div>
            <span className="font-semibold text-[14px] text-theme-primary block">{logoName}</span>
            <span className="text-gray-500 text-[12px]">Sponsored</span>
          </div>
        </div>
        <button
          className="ml-auto bg-black/20 text-[#FFC61B] rounded-full px-3 py-1.5 text-[13px] font-medium flex items-center"
          onClick={onViewPlace}
        >
          <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          {t('socialPostCard.viewPlace')}
        </button>
      </div>

      {/* Description */}
      <div className="px-5 py-3 bg-theme-secondary">
        <p className="text-theme-primary text-base leading-relaxed whitespace-pre-line">
          {showFullDescription ? description : truncatedDescription}
          {needsTruncation && !showFullDescription && (
            <span className="text-gray-500 ml-1 cursor-pointer inline-block" onClick={toggleDescription}>
              ...see more
            </span>
          )}
        </p>
      </div>

      {/* Media Section with Overlay Text */}
      <div className="relative w-full h-[389px] bg-black overflow-hidden">
        <ReactPlayer
          ref={playerRef}
          url={AdVideo}
          playing={!internalIsPaused}
          muted={internalIsMuted}
          controls={false}
          loop={true}
          width="100%"
          height="100%"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
          config={{
            file: {
              attributes: {
                style: {
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%) scale(1.5)' // Scale up the video to ensure it fills the container
                }
              }
            }
          }}
          onProgress={handleProgress}
          onDuration={handleDuration}
        />
        
        {/* Overlay Text - Top center */}
        <div className="absolute top-0 left-0 right-0 flex flex-col items-center text-white text-center p-6 z-10">
          <div className="p-2 w-full">
            <h2 className="text-sm uppercase tracking-wider mb-1">{title}</h2>
            <h1 className="text-3xl font-light">{subtitle}</h1>
          </div>
        </div>

        <div className="absolute inset-0 p-4 text-white z-20">
          {/* Top Right: Mute/Unmute Button */}
          <button onClick={handleMuteUnmute} className="p-2 rounded-full bg-black/50 absolute top-4 right-4">
            <img src={internalIsMuted ? MuteIcon : UnmuteIcon} alt={internalIsMuted ? "Mute" : "Unmute"} className="w-6 h-6" />
          </button>

          {/* Bottom Controls Container - Aligned horizontally */}
          <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-4">
            {/* Play/Pause Button */}
            <button onClick={handlePlayPause} className="p-2 rounded-full bg-black/50">
              <img src={internalIsPaused ? PlayIcon : PauseIcon} alt={internalIsPaused ? "Play" : "Pause"} className="w-6 h-6" />
            </button>
            
            {/* Progress Bar - Center */}
            <div className="flex-1 mx-4">
              <div className="h-1 bg-gray-600 rounded w-full">
                <div className="h-full bg-white rounded" style={{ width: `${progressPercentage}%` }}></div>
              </div>
            </div>
            
            {/* Time Display */}
            <div>
              <span className="text-sm">{formatTime(currentTime)} / {formatTime(duration)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="px-5 py-4">
        <div className="flex items-center mb-3">
          <img src={ReviewProfile} alt={logoName} className="w-8 h-8 rounded-full mr-2" />
          <div>
            <span className="text-theme-primary font-semibold text-[14px]">{logoName}</span>
            <span className="text-gray-500 text-[12px] block">{deliveredBy}</span>
          </div>
          <button
            className="ml-auto bg-[#FDC51B] text-[#5D4702] rounded-full px-4 py-2 text-[13px] font-bold"
            onClick={onBookNow}
          >
            Book Now
          </button>
        </div>

        <div className="flex justify-between items-center text-gray-500 text-[12px]">
          <span>{time}</span>
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <img src={LikeIcon} alt="Likes" className="w-4 h-4 mr-1.5 [filter:var(--icon-filter)]" />
              <span>{likes}</span>
            </div>
            <div className="flex items-center">
              <img src={CommentIcon} alt="Comments" className="w-4 h-4 mr-1.5 [filter:var(--icon-filter)]" />
              <span>{comments}</span>
            </div>
            <div className="flex items-center">
              <img src={ShareIcon} alt="Shares" className="w-4 h-4 mr-1.5 [filter:var(--icon-filter)]" />
              <span>{shares}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}