import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import test from "./test.png";
import { Autoplay } from "swiper/modules";

const Carousel = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleOnChange = (swiper) => {
    setSelectedIndex(swiper.realIndex);
  };

  return (
    <div className="relative">
      <Swiper
        className="w-full"
        slidesPerView={1.2}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
        onSlideChange={handleOnChange}
        spaceBetween={3}
      >
        {[0, 1, 2, 3].map((_, index) => (
  <SwiperSlide key={index} className="w-full transition-all duration-300">
    <img
      src={test}
      alt=""
      className={`w-full h-full object-cover rounded-lg transition-transform duration-300 ${
        selectedIndex === index ? "scale-100" : "scale-95 opacity-80"
      }`}
    />
  </SwiperSlide>
))}
      </Swiper>
    </div>
  );
};

export default Carousel;
