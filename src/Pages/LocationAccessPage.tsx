import React from "react";
import { useNavigate } from "react-router-dom";
import Place from "icons/Place.svg?react";
import useLocation from "../hooks/useLocation";

export default function LocationAccessPage() {
  const navigate = useNavigate();
  const { getCurrentLocation, loading } = useLocation();

  const handleLocationAccess = async () => {
    try {
      await getCurrentLocation();
      navigate("/choose-location");
    } catch (error) {
      // If user denies permission or any other error occurs
      alert("Could not access location. Please try choosing location manually.");
    }
  };

  return (
    <div className="dvh-fallback flex flex-col justify-center items-center bg-theme-primary px-4">
      <div className="flex flex-col items-center max-w-[320px] w-full">
        <div className="bg-theme-secondary rounded-full p-8 mb-12">
          <Place className="w-16 h-16 text-[#FFC61B]" />
        </div>
        <h2 className="text-[28px] font-bold text-theme-primary mb-3 text-center">What is Your Location?</h2>
        <p className="text-theme-secondary text-center mb-12 text-base">
          We need to know your location to suggest you near by services.
        </p>
        <button
          className="w-full bg-[#FFC61B] text-black rounded-full py-3.5 text-lg font-semibold mb-6"
          onClick={handleLocationAccess}
          disabled={loading}
        >
          {loading ? "Getting Location..." : "Allow Location Access"}
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