import React from 'react';
import WechatIcon from '../icons/Wechat.svg';
import WeiboIcon from '../icons/Weibo.svg';
import QqIcon from '../icons/Qq.svg';
import BaiduIcon from '../icons/Baidu.svg';

const ShareModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  const shareOptions = [
    { name: 'Wechat', icon: WechatIcon, bgColor: 'bg-[#07C160]' },
    { name: 'Weibo', icon: WeiboIcon, bgColor: 'bg-[#E6162D]' },
    { name: 'QQ', icon: QqIcon, bgColor: 'bg-[#12B7F5]' },
    { name: 'Baidu', icon: BaiduIcon, bgColor: 'bg-[#2932E1]' }
  ];

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/40 z-[1000]" 
        onClick={onClose}
      />
      <div className="fixed inset-x-0 bottom-0 z-[1001] bg-theme-secondary rounded-t-[10px]">
        <div className="p-4 pb-8">
          <div className="flex flex-col items-center">
            <div className="w-10 h-1 bg-theme-primary/20 rounded-full mb-6" />
            <h3 className="text-theme-primary text-lg font-medium mb-6">Share to</h3>
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
                  <img src={option.icon} alt={option.name} className="w-6 h-6 brightness-0 invert" />
                </div>
                <span className="text-theme-primary text-xs">{option.name}</span>
              </button>
            ))}
          </div>

          <div className="bg-theme-primary/10 rounded-lg p-3 flex items-center justify-between">
            <span className="text-theme-secondary text-sm truncate flex-1">
              {window.location.href}
            </span>
            <button
              onClick={handleCopyLink}
              className="ml-4 bg-[#FDC51B] text-black rounded-lg px-4 py-1.5 text-sm font-medium"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShareModal;