import React, { useState } from "react";
import BottomNavBar from "./BottomNavBar";
import Carousel from "./home/Carousel";
import Near from "./home/Near";
import Topic from "./home/topic";
import Filternav from "./home/Filternav";
import Service from "./home/Service";
import ServiceCard from "./home/ServiceCard";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Hotels");

  return (
    <div className=" pb-[100px]">
      Home Page
      <Carousel />
      <Near />
      <Topic />
      <Filternav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <Service />
      <BottomNavBar active="home" />
      <ServiceCard />
    </div>
  );
}
