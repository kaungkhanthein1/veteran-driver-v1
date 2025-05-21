import React, { useState } from "react";
import BottomNavBar from "./BottomNavBar";
import Carousel from "./home/Carousel";
import Near from "./home/Near";
import Topic from "./home/Topic"; 
import Filternav from "./home/Filternav";
import Service from "./home/Service";
import ServiceCard from "./home/ServiceCard";
import TopNav from "./home/TopNav";

export default function Home() {
  const [activeTab, setActiveTab] = useState("Hotels");

  return (
    <div className="min-h-screen flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16">
          <TopNav />
          <Carousel />
          <Near />
          <Topic />
          <Filternav activeTab={activeTab} setActiveTab={setActiveTab} />
          <Service />
          <ServiceCard />
        </div>
        <BottomNavBar active="home" />
      </div>
    </div>
  );
}
