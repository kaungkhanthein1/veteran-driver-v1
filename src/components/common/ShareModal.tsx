import React, { useState, useEffect, useRef } from 'react';
import WechatIcon from 'icons/Wechat.svg';
import WeiboIcon from 'icons/Weibo.svg';
import QqIcon from 'icons/Qq.svg';
import BaiduIcon from 'icons/Baidu.svg';
import { useTranslation } from 'react-i18next';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ShareModal = ({ isOpen, onClose }: ShareModalProps) => {
  const { t } = useTranslation();
  const modalRef = useRef<HTMLDivElement>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [translateY, setTranslateY] = useState(0);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setTranslateY(0); // Reset translateY when modal is closed
      setIsCopied(false); // Reset copied state when modal is closed
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    const currentY = e.touches[0].clientY;
    const diffY = currentY - touchStartY;

    if (diffY > 0) { // Only allow dragging downwards
      setTranslateY(diffY);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartY === null) return;
    const currentY = modalRef.current?.getBoundingClientRect().top || 0;
    const initialY = window.innerHeight - (modalRef.current?.offsetHeight || 0);
    const dragDistance = currentY - initialY;

    if (dragDistance > 100) { // If dragged down more than 100px, close modal
      onClose();
    } else {
      setTranslateY(0); // Snap back to original position
    }
    setTouchStartY(null);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 30000);
  };

  const shareOptions = [
    { name: t('shareModal.wechat'), icon: WechatIcon, bgColor: 'bg-[#07C160]' },
    { name: t('shareModal.weibo'), icon: WeiboIcon, bgColor: 'bg-[#E6162D]' },
    { name: t('shareModal.qq'), icon: QqIcon, bgColor: 'bg-[#12B7F5]' },
    { name: t('shareModal.baidu'), icon: BaiduIcon, bgColor: 'bg-[#2932E1]' }
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-[1000]" onClick={onClose} />
      <div 
        className="fixed inset-x-0 bottom-0 z-[1001] flex justify-center transition-transform duration-300 ease-out"
        ref={modalRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ transform: `translateY(${translateY}px)` }}
      >
        <div className="w-full max-w-[480px] bg-theme-secondary rounded-t-[10px] mx-4">
          <div className="p-4 pb-8">
            {/* Draggable indicator */}
            <div className="flex justify-center mb-4">
              <div className="w-10 h-1 bg-white rounded-full" />
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-theme-primary text-lg font-medium mb-6 hidden">{t('shareModal.title')}</h3>
            </div>
            
            <div className="flex justify-around items-center mb-8">
              {shareOptions.map((option) => (
                <button
                  key={option.name}
                  className="flex flex-col items-center"
                  onClick={() => {
                    console.log(`Share to ${option.name}`);
                  }}
                >
                  <div className={`w-12 h-12 rounded-full ${option.bgColor} flex items-center justify-center mb-2`}>
                    <img src={option.icon} alt={option.name} className="w-6 h-6" />
                  </div>
                  <span className="text-theme-primary text-xs">{option.name}</span>
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between overflow-hidden h-12">
              <input
                type="text"
                value={window.location.href}
                className="flex-1 bg-[#2D2D2D] text-gray-300 text-sm px-4 h-full rounded-l-full focus:outline-none border-none focus:ring-0 focus:border-0 placeholder-white appearance-none"
              />
              <button
                onClick={handleCopyLink}
                className={`flex-shrink-0 ${isCopied ? 'bg-[#D4A415]' : 'bg-[#FDC51B]'} text-black rounded-r-full text-sm font-medium h-full flex items-center justify-center w-14 transition-colors duration-200`}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM15 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H20C21.1 23 22 22.1 22 21V7C22 5.9 21.1 5 20 5H15ZM20 21H8V7H20V21Z" fill="white"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareModal;