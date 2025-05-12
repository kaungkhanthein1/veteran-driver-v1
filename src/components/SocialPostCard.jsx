import React, { useState } from "react";

export default function SocialPostCard({ post }) {
  const [expanded, setExpanded] = useState(false);

  // For demo, limit content length for "see more/less"
  const maxLength = 60;
  const showSeeMore = post.content.length > maxLength;
  const displayContent = expanded ? post.content : post.content.slice(0, maxLength);

  return (
    <div className="bg-[#232323] rounded-xl px-4 pt-4 pb-3 mb-4" style={{ minHeight: 210 }}>
      {/* User Info Row */}
      <div className="flex items-center mb-2">
        <div className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center mr-2">
          <span className="text-lg text-white font-bold">{post.userInitials}</span>
        </div>
        <span className="font-bold text-white mr-1">{post.userName}</span>
        {post.verified && (
          <span className="ml-1">
            <svg className="w-4 h-4 inline" fill="#3b82f6" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#3b82f6"/><path d="M10 14l2 2 4-4" stroke="#fff" strokeWidth="2" fill="none"/></svg>
          </span>
        )}
        <button className="ml-auto bg-yellow-400 text-black rounded-full px-3 py-1 text-xs font-semibold flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M17.657 16.657L13.414 12.414a2 2 0 00-2.828 0l-4.243 4.243M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          View Place
        </button>
      </div>
      {/* Content */}
      <div className="mb-2 whitespace-pre-line text-sm text-white leading-snug">
        {displayContent}
        {showSeeMore && (
          <span
            className="text-gray-400 cursor-pointer ml-1"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "...see less" : "...see more"}
          </span>
        )}
      </div>
      {/* Media Grid Placeholder */}
      <div className="flex space-x-2 mb-2">
        {[1, 2, 3].map((_, idx) => (
          <div key={idx} className="w-20 h-20 rounded-lg bg-[#181818] flex items-center justify-center">
            {/* Empty placeholder, add image/video if needed */}
          </div>
        ))}
      </div>
      {/* Actions Row */}
      <div className="flex items-center text-gray-400 text-xs mb-1">
        <span>{post.time}</span>
        <span className="ml-auto flex items-center space-x-4">
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M5 15l7-7 7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
            {post.likes}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M8 12h8M8 16h8M8 8h8" /></svg>
            {post.comments}
          </span>
          <span className="flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M4 4v16h16" /></svg>
            {post.shares}
          </span>
        </span>
      </div>
    </div>
  );
}