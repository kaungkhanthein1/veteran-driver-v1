import React, { useState } from "react";
import SocialTabs from "../Components/SocialTabs";
import SocialPostCard from "../Components/SocialPostCard";
import BottomNavBar from "../Components/BottomNavBar";
import UploadModal from "../Components/UploadModal";

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
  const [showUpload, setShowUpload] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#181818]">
      <div className="flex-1 overflow-y-auto pb-16">
        <div className="sticky top-0 z-10 bg-[#181818]">
          <SocialTabs activeTab={activeTab} setActiveTab={setActiveTab} onUpload={() => setShowUpload(true)} />
          <div className="h-[1px] bg-[#232323]"></div>
        </div>
        <div className="w-full">
          {posts.map(post => (
            <SocialPostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
      <BottomNavBar active="social" />
      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </div>
  );
}