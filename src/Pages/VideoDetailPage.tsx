import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Artplayer from 'artplayer';

interface VideoItem {
  id: number;
  video: string;
  thumbnail: string;
  description: string;
  user: {
    name: string;
    avatar: string;
  };
  likes: number;
  category: string;
}

const VideoDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const videoItem = location.state?.videoItem as VideoItem;

  const [isLiked, setIsLiked] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [seekTime, setSeekTime] = useState(0);

  const artContainerRef = useRef<HTMLDivElement>(null);
  const artInstanceRef = useRef<any>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  const artPlayerOptions = useMemo(() => ({
    url: videoItem?.video || '',
    volume: 0.5,
    autoplay: true,
    loop: true,
    controls: [],
    theme: '#ffb800',
    backdrop: true,
    mutex: true,
    fullscreen: true,
    fullscreenWeb: true,
    setting: false,
    hotkey: true,
    pip: false,
    lang: 'en',
  }), [videoItem]);

  useEffect(() => {
    if (!artContainerRef.current || artInstanceRef.current) return;

    const art = new Artplayer({
      container: artContainerRef.current,
      ...artPlayerOptions,
    });

    artInstanceRef.current = art;

    const handleTimeUpdate = () => {
      if (!isDragging) {
        setCurrentTime(art.currentTime);
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(art.duration);
    };

    art.on('video:timeupdate', handleTimeUpdate);
    art.on('video:loadedmetadata', handleLoadedMetadata);

    return () => {
      art.off('video:timeupdate', handleTimeUpdate);
      art.off('video:loadedmetadata', handleLoadedMetadata);
      art.destroy(false);
      artInstanceRef.current = null;
    };
  }, [artContainerRef, artPlayerOptions]);

  // ✅ Handle release events outside input
  useEffect(() => {
    const handleSeekRelease = () => {
      if (isDragging) {
        setIsDragging(false);
        setCurrentTime(seekTime);
        if (artInstanceRef.current) {
          artInstanceRef.current.currentTime = seekTime;
        }
      }
    };

    if (isDragging) {
      window.addEventListener('mouseup', handleSeekRelease);
      window.addEventListener('touchend', handleSeekRelease);
    }

    return () => {
      window.removeEventListener('mouseup', handleSeekRelease);
      window.removeEventListener('touchend', handleSeekRelease);
    };
  }, [isDragging, seekTime]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (!videoItem) {
    navigate('/explore');
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      <div className="relative flex-1">
        <div ref={artContainerRef} className="w-full h-full" />

        {/* Custom progress bar */}
        <div
          className="absolute left-0 right-0 z-20 flex items-center px-2"
          style={{ bottom: isDragging ? '12px' : '16px', height: isDragging ? '32px' : '24px' }}
        >
          <input
            ref={progressBarRef}
            type="range"
            min={0}
            max={duration}
            step={0.01}
            value={isDragging ? seekTime : currentTime}
            onMouseDown={() => setIsDragging(true)}
            onTouchStart={() => setIsDragging(true)}
            onInput={(e) => {
              const value = parseFloat((e.target as HTMLInputElement).value);
              setSeekTime(value);
              if (!isDragging) setIsDragging(true);
            }}
            className="w-full custom-progress-bar"
            style={{ accentColor: '#ffb800' }}
          />
          {isDragging && (
            <div
              className="absolute left-1/2 -translate-x-1/2 bg-black/70 text-white px-3 py-1 rounded-full text-xs"
              style={{ bottom: '32px' }}
            >
              {formatTime(seekTime)} / {formatTime(duration)}
            </div>
          )}
        </div>

        {/* Back Button */}
        <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center z-10">
          <button 
            className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center"
            onClick={() => navigate(-1)}
          >
            <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Right side icons */}
        <div className="absolute right-4 top-2/3 transform -translate-y-1/2 flex flex-col gap-6 z-10">
          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white mb-1">
                <img src={videoItem.user.avatar} alt="avatar" className="w-full h-full object-cover" />
              </div>
              <button
                className="absolute -bottom-1 right-3 bg-[#ffb800] text-black font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center"
                onClick={() => alert('Following ' + videoItem.user.name)}
              >
                <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
            </div>
          </div>

          <button className="flex flex-col items-center" onClick={() => setIsLiked(!isLiked)}>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-1">
              <svg width="28" height="28" fill={isLiked ? "#ffb800" : "none"} stroke={isLiked ? "#ffb800" : "white"} strokeWidth="2" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 
                  2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09
                  C13.09 3.81 14.76 3 16.5 3 
                  19.58 3 22 5.42 22 8.5
                  c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <span className="text-xs text-white font-medium">10.3M</span>
          </button>

          <button className="flex flex-col items-center" onClick={() => setIsCommentOpen(true)}>
            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-1">
              <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <span className="text-xs text-white font-medium">10.7M</span>
          </button>

        <button className="flex flex-col items-center" onClick={() => alert('Share functionality coming soon!')}>
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center mb-1">
            <svg width="28" height="28" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </div>
          <span className="text-xs text-white font-medium">Share</span>
        </button>
        </div>



        {/* Bottom info */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 z-10 pt-6">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <h3 className="font-bold text-white text-lg">{videoItem.user.name}</h3>
            </div>
          </div>
          <p className="text-sm text-white mt-3 mb-10">{videoItem.description}</p>
        </div>
      </div>

      {/* Comments UI */}
      {isCommentOpen && (
        <div className="fixed inset-0 z-60 bg-black/80" onClick={() => setIsCommentOpen(false)}>
          <div
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-4 max-h-[70vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-1 bg-gray-300 rounded-full mx-auto mb-4"></div>
            <h3 className="text-lg font-bold text-black mb-4">Comments</h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <img src={videoItem.user.avatar} alt="commenter" className="w-8 h-8 rounded-full" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-black">User123</span>
                    <span className="text-xs text-gray-500">2 days ago</span>
                  </div>
                  <p className="text-sm text-gray-800">This place looks amazing!</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-4 border-t border-gray-200 pt-4">
              <img src={videoItem.user.avatar} alt="user" className="w-8 h-8 rounded-full" />
              <input 
                type="text" 
                placeholder="Add a comment..." 
                className="flex-1 bg-gray-100 text-black rounded-full px-4 py-2 text-sm"
              />
              <button className="text-[#ffb800]">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 2L11 13" />
                  <path d="M22 2l-7 20-4-9-9-4 20-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoDetailPage;
