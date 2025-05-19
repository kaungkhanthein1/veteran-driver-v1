import React from "react";
import thai from "./thai.png";
import search from "./search.svg";
import map from "./map.svg";
import { useNavigate } from "react-router-dom";

const TopNav = () => {
  const navigate = useNavigate()

  return (
    <div className="px-[16px] py-[20px] flex justify-between w-full items-center bg-white">
      <div className="flex justify-center items-center">
        <img src={thai} alt="" />
        <span className="text-gray-800 text-[16px] font-[500] leading-[20px] pl-[8px] pr-[6px]">
          Thailand
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="8"
          viewBox="0 0 10 8"
          fill="none"
        >
          <path
            d="M8.825 0.912109L5 4.72878L1.175 0.912109L0 2.08711L5 7.08711L10 2.08711L8.825 0.912109Z"
            fill="currentColor"
            className="text-gray-800"
          />
        </svg>
      </div>
      {/* icons */}
      <div className="flex gap-[12px]">
        <div onClick={() => navigate("/map")} className="bg-gray-100 rounded-full p-[12px]">
          <img 
            src={search} 
            alt="" 
            className="[filter:var(--icon-filter)]"
          />
        </div>
        <div className="bg-gray-100 rounded-full p-[12px]">
          <img 
            src={map} 
            alt="" 
            className="[filter:var(--icon-filter)]"
          />
        </div>
      </div>
    </div>
  );
};

export default TopNav;
