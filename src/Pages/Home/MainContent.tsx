import { useTranslation } from "react-i18next";
import { useState } from "react";
import ExploreCard from "../../components/cards/ExploreCard";
import SocialPostCard from "../../components/cards/SocialPostCard";
import GoldenGateImage from "../../assets/GoldenGate.png";
import HarrierImage from "../../assets/Harrier.png";
import RoomImage from "../../assets/Room.png";

export default function MainContent() {
  const { t } = useTranslation();

  // Mock data for nearest places
  const nearestPlaces = [
    {
      id: "np1",
      name: "Kuma",
      price: "50 USD",
      rating: 4.5,
      reviews: 80,
      distance: "1.2km away",
      image: GoldenGateImage,
      overlayText1: "Escape to Bali this Summer",
      overlayText2: "Over 100 travelers booked this week!",
    },
    {
      id: "np2",
      name: "Sunny",
      price: "45 USD",
      rating: 4.0,
      reviews: 60,
      distance: "2.5km away",
      image: HarrierImage,
      overlayText1: "Enjoy your Dream Vacation",
      overlayText2: "Plan your perfect getaway with our exclusive deals",
    },
    {
      id: "np3",
      name: "New Place",
      price: "60 USD",
      rating: 4.8,
      reviews: 120,
      distance: "0.5km away",
      image: RoomImage,
      overlayText1: "Discover a Hidden Gem",
      overlayText2: "Highly rated by recent visitors!",
    },
  ];

  // Mock data for favorite places
  const favoritePlaces = [
    {
      id: "fav1",
      name: "GYIN Spa",
      location: "Phenom Penh ( 12km away )",
      rating: 5.0,
      reviews: 128,
      price: 15,
      images: [GoldenGateImage, HarrierImage, RoomImage],
      services: ["Service 1", "Service 2", "Service3"],
    },
  ];

  // Mock data for recommended
  const recommended = [
    {
      id: "rec1",
      name: "Thanh Cafe",
      location: "District 1",
      rating: 4.7,
      reviews: 98,
      price: 10,
      images: [RoomImage, GoldenGateImage],
      services: ["Service 1", "Service 2"],
    },
  ];

  // Mock data for feedbacks
  const feedbacks = [
    {
      id: "1",
      user: {
        name: "BLUVARI",
        verified: true,
      },
      content:
        "这次旅行选择了【XXX酒店】，整体体验非常满意，强烈推荐给正在寻找性价比高、服务贴心的朋友们！",
      tags: [
        { icon: "🏨", text: "酒店亮点" },
        { text: "视频无限观看" },
        { text: "浏览不限次数" },
        { text: "上传无广告" },
      ],
      time: "33min ago",
      likes: "5324",
      comments: "20",
      shares: "6",
      media: [],
    },
  ];

  return (
    <div className="w-full max-w-[480px] mx-auto">
      {/* Nearest Places Section */}
      <div className="px-4 py-5 bg-theme-primary">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-theme-text">
            {t("homePage.nearestPlacesTitle") || "Nearest Place"}
          </h2>
          <button className="text-[#FFC61B] text-sm">
            {t("homePage.viewAllButton") || "View All"}
          </button>
        </div>
        {/* Horizontal Scroll for Nearest Places */}
        <div className="relative">
          <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
            {nearestPlaces.map((item) => (
              <div
                key={item.id}
                className="w-[300px] h-[180px] flex-none rounded-2xl overflow-hidden relative bg-cover bg-center"
                style={{ backgroundImage: `url(${item.image})` }}
              >
                {/* Overlay Gradient/Darkening */}
                <div className="absolute inset-0 bg-black opacity-10"></div>
                {/* Overlay Text at bottom */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
                  <h2 className="text-md font-bold leading-tight mb-1">
                    {item.overlayText1}
                  </h2>
                  <p className="text-sm leading-tight">
                    {item.overlayText2}
                  </p>
                </div>
                {/* Place name with special styling in upper center-left */}
                <div
                  className="absolute right-4 top-1/3 transform -translate-y-1/2 text-white text-right"
                  style={{
                    color: "#FFF",
                    fontVariantNumeric: "lining-nums proportional-nums",
                    fontFeatureSettings: "'dlig' on",
                    fontFamily: "'Herr Von Muellerhoff', cursive",
                    fontSize: "70px",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",
                  }}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
          {/* Pagination dots */}
          <div className="flex justify-center gap-1 mt-2">
            {nearestPlaces.map((_, dotIndex) => (
              <div
                key={dotIndex}
                className={`w-1.5 h-1.5 rounded-full ${dotIndex === 0 ? "bg-[#FFC61B]" : "bg-theme-secondary opacity-50"}`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Favorite Places Section */}
      <div className="px-4 py-5 bg-theme-primary">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-theme-text">
            {t("homePage.favoritePlacesTitle") || "Favorite Places"}
          </h2>
          <button className="text-[#FFC61B] text-sm">
            {t("homePage.viewAllButton") || "View All"}
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {favoritePlaces.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="font-semibold text-base text-theme-primary mb-1">{item.name}</div>
                  <div className="text-xs text-theme-secondary mb-1">{item.location}</div>
                  <div className="flex items-center text-xs text-yellow-500 mb-1">
                    {item.rating} <span className="ml-1">★</span> <span className="ml-2 text-theme-secondary">({item.reviews})</span>
                  </div>
                </div>
                <button className="text-[#FFC61B] text-xl">♥</button>
              </div>
              <div className="flex gap-2 mb-2">
                {item.images.map((img, idx) => (
                  <img key={idx} src={img} alt="" className="w-16 h-16 rounded-lg object-cover" />
                ))}
              </div>
              <div className="text-xs text-theme-secondary mb-2">
                {item.services.join(", ")}
              </div>
              <div className="flex justify-between items-center">
                <div className="font-bold text-lg text-theme-primary">{item.price} <span className="text-xs">USD</span></div>
                <button className="bg-[#FFC61B] text-white px-4 py-2 rounded-full text-sm font-medium">View Place</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recommended Section */}
      <div className="px-4 py-5 bg-theme-primary">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-theme-text">
            {t("homePage.recommendedTitle") || "Recommended"}
          </h2>
          <button className="text-[#FFC61B] text-sm">
            {t("homePage.viewAllButton") || "View All"}
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {recommended.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl p-4 shadow">
              <div className="flex justify-between items-center mb-2">
                <div>
                  <div className="font-semibold text-base text-theme-primary mb-1">{item.name}</div>
                  <div className="text-xs text-theme-secondary mb-1">{item.location}</div>
                  <div className="flex items-center text-xs text-yellow-500 mb-1">
                    {item.rating} <span className="ml-1">★</span> <span className="ml-2 text-theme-secondary">({item.reviews})</span>
                  </div>
                </div>
                <button className="text-[#FFC61B] text-xl">♥</button>
              </div>
              <div className="flex gap-2 mb-2">
                {item.images.map((img, idx) => (
                  <img key={idx} src={img} alt="" className="w-16 h-16 rounded-lg object-cover" />
                ))}
              </div>
              <div className="text-xs text-theme-secondary mb-2">
                {item.services.join(", ")}
              </div>
              <div className="flex justify-between items-center">
                <div className="font-bold text-lg text-theme-primary">{item.price} <span className="text-xs">USD</span></div>
                <button className="bg-[#FFC61B] text-white px-4 py-2 rounded-full text-sm font-medium">View Place</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feedbacks Section */}
      <div className="px-4 py-5 bg-theme-primary">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-theme-text">
            {t("homePage.feedbacksTitle") || "Feedbacks"}
          </h2>
          <button className="text-[#FFC61B] text-sm">
            {t("homePage.viewAllButton") || "View All"}
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {feedbacks.map((feedback) => (
            <SocialPostCard key={feedback.id} post={feedback} compact />
          ))}
        </div>
      </div>
    </div>
  );
}
