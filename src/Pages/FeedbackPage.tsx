import React from "react";
import { useNavigate } from "react-router-dom";
import VeteranIcon from "../icons/ProfileUpdate/Veteran.png";
import BackButton from "../components/common/BackButton";

const APP_VERSION = "1.0.0.1";

const FeedbackPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center justify-between rounded-2xl p-0">
      {/* Header */}
      <div className="w-full flex items-center justify-center relative pt-6 pb-4">
        <button className="absolute left-4 top-1/2 -translate-y-1/2" onClick={() => navigate(-1)}>
          <BackButton />
        </button>
        <h1 className="text-lg font-semibold text-center w-full">FeedBack</h1>
      </div>
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center flex-1 w-full">
        <img src={VeteranIcon} alt="Veteran Driver" className="w-20 h-20 mb-4" />
        <div className="text-gray-800 text-base font-medium mb-2">Version: {APP_VERSION}</div>
      </div>
      {/* Contact Us Button */}
      <div className="w-full flex justify-center pb-8">
        <button
          className="w-[90%] py-3 text-lg font-semibold text-white"
          style={{
            borderRadius: "100px",
            background: "linear-gradient(180deg, #FFC61B 0%, #FF9500 100%)",
            boxShadow: "0px 0px 8px 0px rgba(255, 255, 255, 0.80) inset",
          }}
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default FeedbackPage; 