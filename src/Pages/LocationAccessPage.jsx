import React from "react";
import { useNavigate } from "react-router-dom";

export default function LocationAccessPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black px-4 py-8">
      <div className="flex flex-col items-center">
        <div className="bg-yellow-700 bg-opacity-10 rounded-full p-8 mb-8">
          <svg className="w-16 h-16 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" fill="#fff3" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10a2 2 0 100 4 2 2 0 000-4zm0 0V7m0 7v3" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2 text-center">What is Your Location?</h2>
        <p className="text-gray-400 text-center mb-8 max-w-xs">
          We need to know your location to suggest you nearby services.
        </p>
        <button
          className="w-full bg-yellow-gradient text-black rounded-full py-3 text-lg font-semibold mb-4"
          onClick={() => {
            // TODO: Implement location access logic
            // For now, just navigate to manual selection
            navigate("/choose-location");
          }}
        >
          Allow Location Access
        </button>
        <button
          className="w-full text-[#FFC61B] font-semibold"
          onClick={() => navigate("/choose-location")}
        >
          Choose Location Manually
        </button>
      </div>
    </div>
  );
}