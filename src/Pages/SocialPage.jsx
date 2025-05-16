import React, { useState } from "react";
import SocialTabs from "../components/SocialTabs";
import SocialPostCard from "../components/SocialPostCard";
import BottomNavBar from "../components/BottomNavBar";
// import UploadModal from "../components/UploadModal"; // This was already removed
import CommentModal from "../components/CommentModal"; // Import CommentModal here
import { useNavigate } from 'react-router-dom';

// Mock posts data
const posts = [
  {
    id: 1,
    user: {
      name: "BLUVARI",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      verified: true,
    },
    place: "View Place",
    content: "这次旅行选择了【XXX酒店】，整体体验非常满意，强烈推荐给正在寻找性价比高、服务贴心的朋友们！\n🏨酒店亮点\n✅ 视频无限观看\n✅ 浏览不限次数\n✅ 上传无广告",
    media: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308",
      { type: "video", thumbnail: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca" }
    ],
    time: "33min ago",
    likes: 5324,
    comments: 20,
    shares: 6,
    isAnonymous: false,
  },
  {
    id: 2,
    user: {
      name: "Anonymous",
      avatar: "",
      verified: false,
    },
    place: "View Place",
    content: "这次旅行选择了【江景花园酒店】，整体体验非常满意，强烈推荐给正在寻找性价比高、服务贴心的朋友们！\n🏨酒店亮点\n✅ 豪华早餐丰富\n✅ 客房宽敞舒适",
    media: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
      "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99",
      { type: "video", thumbnail: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca" }
    ],
    time: "33min ago",
    likes: 1200,
    comments: 8,
    shares: 2,
    isAnonymous: true,
  }
];

export default function SocialPage() {
  const [activeTab, setActiveTab] = useState("newest");
  const navigate = useNavigate();
  const [commentModalPostId, setCommentModalPostId] = useState(null); // State for modal visibility and context

  const openCommentModal = (postId) => {
    setCommentModalPostId(postId);
  };

  const closeCommentModal = () => {
    setCommentModalPostId(null);
  };

  const handleCommentSubmit = (comment) => {
    // Here you would typically handle the comment submission for the specific post
    console.log(`Comment for post ${commentModalPostId}:`, comment);
    // You might want to update the 'posts' data or send it to a server
    closeCommentModal();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#181818]">
      <div className="flex-1 overflow-y-auto pb-16">
        <div className="sticky top-0 z-10 bg-[#181818]">
          <SocialTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onUpload={() => navigate('/social/upload')}
          />
          <div className="h-[1px] bg-[#232323]"></div>
        </div>
        <div className="w-full">
          {posts.map(post => (
            <SocialPostCard
              key={post.id}
              post={post}
              onOpenComments={openCommentModal} // Pass the callback here
            />
          ))}
        </div>
      </div>
      <BottomNavBar active="social" />
      {/* Render CommentModal here, outside the scrollable div */}
      <CommentModal
        isOpen={!!commentModalPostId}
        onClose={closeCommentModal}
        onSubmit={handleCommentSubmit}
        // You might want to pass post-specific data to CommentModal if needed,
        // e.g., existing comments for `commentModalPostId`
      />
    </div>
  );
}