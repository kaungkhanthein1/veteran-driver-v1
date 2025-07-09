import React, { useState, useEffect, useRef } from "react";
import WechatIcon from "icons/Wechat.svg";
import WeiboIcon from "icons/Weibo.svg";
import QqIcon from "icons/Qq.svg";
import BaiduIcon from "icons/Baidu.svg";
import TelegramIcon from "icons/ProfileUpdate/Telegram.svg";
import { useTranslation } from "react-i18next";

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

    if (diffY > 0) {
      // Only allow dragging downwards
      setTranslateY(diffY);
    }
  };

  const handleTouchEnd = () => {
    if (touchStartY === null) return;
    const currentY = modalRef.current?.getBoundingClientRect().top || 0;
    const initialY = window.innerHeight - (modalRef.current?.offsetHeight || 0);
    const dragDistance = currentY - initialY;

    if (dragDistance > 100) {
      // If dragged down more than 100px, close modal
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
    }, 3000);
  };

  const shareOptions = [
    { name: "Wechat", icon: WechatIcon, bgColor: "bg-[#07C160]" },
    { name: "Weibo", icon: WeiboIcon, bgColor: "bg-[#E6162D]" },
    { name: "QQ", icon: QqIcon, bgColor: "bg-[#12B7F5]" },
    { name: "Baidu", icon: BaiduIcon, bgColor: "bg-[#2932E1]" },
    { name: "Telegram", icon: TelegramIcon, bgColor: "bg-[#2AABEE]" },
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
        style={{ transform: `translateY(${translateY}px)`, zIndex: 1001 }}
      >
        <div className="w-full max-w-[480px] bg-white rounded-t-2xl shadow-lg mx-0 px-0 pb-4">
          {/* Drag Indicator at the very top */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
          </div>
          {/* Header Row */}
          <div className="flex items-center justify-between px-6 pt-1 pb-2">
            <h3 className="text-gray-900 text-lg font-bold">Share Our App</h3>
            <button onClick={onClose} className="p-2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18"
                  stroke="#222"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M6 6L18 18"
                  stroke="#222"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          {/* Share Options */}
          <div className="flex justify-between items-center px-6 mb-6 w-full">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                className="flex flex-col items-center"
                onClick={() => {
                  console.log(`Share to ${option.name}`);
                }}
              >
                <div
                  className={`w-12 h-12 rounded-full ${option.bgColor} flex items-center justify-center mb-2`}
                >
                  <img
                    src={option.icon}
                    alt={option.name}
                    className="w-6 h-6"
                  />
                </div>
                <span className="text-gray-700 text-xs font-medium mt-1">
                  {option.name}
                </span>
              </button>
            ))}
          </div>
          {/* Copy Link Row */}
          <div className="flex items-center justify-between px-6 w-full">
            <input
              type="text"
              value={window.location.href}
              readOnly
              className="flex-1 bg-[#F5F6FA] text-gray-700 text-sm px-4 h-12 rounded-l-full focus:outline-none border-none focus:ring-0 focus:border-0 placeholder-gray-400 appearance-none"
            />
            <button
              onClick={handleCopyLink}
              className={`flex-shrink-0 w-12 h-12 rounded-r-full flex items-center justify-center transition-colors duration-200 ${
                isCopied
                  ? "bg-[#D4A415]"
                  : "bg-gradient-to-b from-[#FFC61B] to-[#FF9500]"
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="24" height="24" rx="6" fill="none" />
                <path
                  d="M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM15 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H20C21.1 23 22 22.1 22 21V7C22 5.9 21.1 5 20 5H15ZM20 21H8V7H20V21Z"
                  fill="white"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareModal;
