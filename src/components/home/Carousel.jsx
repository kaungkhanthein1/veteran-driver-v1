import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import test from "./test.png";
import { Autoplay } from "swiper/modules"; // Import Swiper's autoplay module


const Carousel = () => {
  const [spaceBetween, setSpaceBetween] = useState(150);
  const [selectedIndex, setSelectedIndex] = useState(0);


  const handleOnChange = (swiper) => {
    setSelectedIndex(swiper.realIndex);
  };

  useEffect(() => {
    const updateSpace = () => {
      const width = window.innerWidth;
      if (width >= 390) {
        setSpaceBetween(100);
      } else {
        setSpaceBetween(120);
      }
    };
    updateSpace();
    window.addEventListener("resize", updateSpace);
    return () => window.removeEventListener("resize", updateSpace);
  }, []);
  return (
    <div>
      <Swiper
        className=""
        slidesPerView={1.2}
        spaceBetween={15}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
        onSlideChange={handleOnChange}
      >
        <SwiperSlide className=" w-full ">
          <img src={test} alt="" />
        </SwiperSlide>
        <SwiperSlide className=" w-full ">
          <img src={test} alt="" />
        </SwiperSlide>
        <SwiperSlide className=" w-full ">
          <img src={test} alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Carousel;
