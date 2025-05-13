import React from "react";
import { useNavigate } from "react-router-dom";
import Place from "../icons/Place.svg?react";

export default function LocationAccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black px-4">
      <div className="flex flex-col items-center max-w-[320px] w-full">
        <div className="bg-[#281C12] rounded-full p-8 mb-12">
          <Place className="w-16 h-16 text-[#FFC61B]" />
        </div>
        <h2 className="text-[28px] font-bold text-white mb-3 text-center">What is Your Location?</h2>
        <p className="text-gray-400 text-center mb-12 text-base">
          We need to know your location to suggest you near by services.
        </p>
        <button
          className="w-full bg-[#FFC61B] text-black rounded-full py-3.5 text-lg font-semibold mb-6"
          onClick={() => {
            // TODO: Implement location access logic
            navigate("/choose-location");
          }}
        >
          Allow Location Access
        </button>
        <button
          className="w-full text-[#FFC61B] font-semibold text-base"
          onClick={() => navigate("/choose-location")}
        >
          Choose Location Manually
        </button>
      </div>
    </div>
  );
}