import React, { useState } from "react";
import VideoPlayer from "./VideoPlayer";
import ImageModal from "./ImageModal";
import BeachImg from "../assets/Beach.png";
import RoomImg from "../assets/Room.png";
import SampleVideo from "../assets/Sample.mp4";

export default function SocialPostCard({ post }) {
  const [expanded, setExpanded] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  // Sample post data to match the design
  const samplePost = {
    user: {
      name: "BLUVARI",
      verified: true,
    },
    content: "这次旅行选择了【XXX酒店】，整体体验非常满意，强烈推荐给正在寻找性价比高、服务贴心的朋友们！",
    tags: [
      { icon: "🏨", text: "酒店亮点" },
      { text: "视频无限观看" },
      { text: "浏览不限次数" },
      { text: "上传无广告" }
    ],
    media: [
      BeachImg,
      RoomImg,
      {
        type: "video",
        url: SampleVideo,
        thumbnail: RoomImg
      }
    ],
    time: "33min ago",
    likes: "5324",
    comments: "20",
    shares: "6"
  };

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
  };

  return (
    <div className="bg-[#232323] border-b border-[#181818]">
      {/* User Info Row */}
      <div className="flex items-center px-5 py-4">
        <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center mr-3">
          <span className="text-base text-white">B</span>
        </div>
        <div className="flex items-center">
          <span className="font-semibold text-[14px] text-white mr-1.5">{samplePost.user.name}</span>
          {samplePost.user.verified && (
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#3b82f6">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          )}
        </div>
        <button className="ml-auto bg-[#3A3A3A] text-yellow-400 rounded-full px-3 py-1.5 text-[13px] font-medium flex items-center">
          <svg className="w-3.5 h-3.5 mr-1.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
          </svg>
          View Place
        </button>
      </div>

      {/* Content */}
      <div className="px-5 text-[14px] text-white leading-6">
        {expanded ? samplePost.content : samplePost.content.slice(0, 100)}
        {samplePost.content.length > 100 && (
          <span
            className="text-gray-400 cursor-pointer ml-1.5 text-[13px]"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "...see less" : "...see more"}
          </span>
        )}
        <div className="flex flex-wrap gap-1.5 mt-2.5 mb-4">
          {samplePost.tags?.map((tag, index) => (
            <span key={index} className="text-[13px] text-white flex items-center">
              {tag.icon && <span className="mr-1.5">{tag.icon}</span>}
              {tag.text}
              {index < samplePost.tags.length - 1 && <span className="mx-1.5">•</span>}
            </span>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-3 gap-[2px]">
        {samplePost.media.map((media, idx) => (
          <div 
            key={idx} 
            className="aspect-square bg-[#181818] cursor-pointer"
            onClick={() => handleMediaClick(media)}
          >
            {typeof media === 'string' ? (
              <img 
                src={media} 
                alt={`Media ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            ) : media.type === 'video' && (
              <div className="relative w-full h-full">
                <img 
                  src={media.thumbnail} 
                  alt={`Video ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                  <svg className="w-12 h-12 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modals */}
      {selectedMedia && (
        typeof selectedMedia === 'string' ? (
          <ImageModal 
            imageUrl={selectedMedia} 
            onClose={() => setSelectedMedia(null)} 
          />
        ) : (
          <VideoPlayer 
            url={selectedMedia.url} 
            thumbnail={selectedMedia.thumbnail}
            onClose={() => setSelectedMedia(null)} 
          />
        )
      )}

      {/* Actions Row */}
      <div className="flex items-center px-5 py-4 text-gray-400">
        <span className="text-[12px]">{samplePost.time}</span>
        <div className="ml-auto flex items-center space-x-7">
          <span className="flex items-center text-[13px]">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            {samplePost.likes}
          </span>
          <span className="flex items-center text-[13px]">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {samplePost.comments}
          </span>
          <span className="flex items-center text-[13px]">
            <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            {samplePost.shares}
          </span>
        </div>
      </div>
    </div>
  );
}