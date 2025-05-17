import React from 'react';
import WechatIcon from '../icons/Wechat.svg';
import WeiboIcon from '../icons/Weibo.svg';
import QqIcon from '../icons/Qq.svg';
import BaiduIcon from '../icons/Baidu.svg';

const ShareModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    // You might want to add a toast notification here
  };

  const shareOptions = [
    { name: 'Wechat', icon: WechatIcon, color: 'bg-[#07C160]' },
    { name: 'Weibo', icon: WeiboIcon, color: 'bg-[#E6162D]' },
    { name: 'QQ', icon: QqIcon, color: 'bg-[#12B7F5]' },
    { name: 'Baidu', icon: BaiduIcon, color: 'bg-[#2932E1]' }
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-[1000]" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 z-[1001] bg-[#232323] rounded-t-2xl">
        <div className="p-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-white text-lg font-medium">Share to</h3>
            <button onClick={onClose} className="text-gray-400">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="grid grid-cols-4 gap-4 mb-6">
            {shareOptions.map((option) => (
              <button
                key={option.name}
                className="flex flex-col items-center"
                onClick={() => {
                  console.log(`Share to ${option.name}`);
                }}
              >
                <div className={`w-14 h-14 rounded-full ${option.color} flex items-center justify-center mb-2`}>
                  <img src={option.icon} alt={option.name} className="w-8 h-8" />
                </div>
                <span className="text-white text-xs">{option.name}</span>
              </button>
            ))}
          </div>

          <div className="bg-[#181818] rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm truncate flex-1">
                {window.location.href}
              </span>
              <button
                onClick={handleCopyLink}
                className="ml-4 bg-[#3A3A3A] text-white rounded-full px-4 py-1.5 text-sm"
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareModal;