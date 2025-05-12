import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OtpVerifyPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(53);
  const inputRefs = useRef([]);

  // Add this line to check if all OTP boxes are filled
  const isOtpFilled = otp.every(char => char.trim() !== "");

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;
    const newOtp = [...otp];
    newOtp[idx] = value[0];
    setOtp(newOtp);
    // Move to next input if not last
    if (idx < 5 && value) {
      inputRefs.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1].focus();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#281c12] via-black to-black px-4 py-8">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex items-center mb-8">
          <button
            className="text-white text-2xl mr-4"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            {/* Left Arrow Icon */}
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-xl font-bold text-white flex-1 text-center">Verify OTP</h1>
          <div className="w-8" /> {/* Spacer for symmetry */}
        </div>
        {/* Info Text */}
        <div className="text-center mb-8">
          <p className="text-gray-300 text-base">
            Verification code sent to <span className="font-semibold text-white">DevelopX10@gmail.com</span> / <span className="font-semibold text-white">+868880818</span>. Please check your messages and be sure to check your spam folder
          </p>
        </div>
        {/* OTP Inputs */}
        <div className="flex justify-center space-x-3 mb-8">
          {otp.map((char, idx) => (
            <input
              key={idx}
              ref={el => inputRefs.current[idx] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-12 rounded-lg border border-gray-600 bg-[#181818] flex items-center justify-center text-2xl text-white text-center outline-none"
              value={char}
              onChange={e => handleChange(e, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
              autoFocus={idx === 0}
            />
          ))}
        </div>
        {/* Confirm Button */}
        <button
          type="button"
          onClick={() => {
            // TODO: Add login logic and success condition here
            navigate("/location-access");
          }}
          className={`w-full rounded-full py-3 text-lg font-semibold mb-4 shadow-lg transition-colors duration-200 ${
            isOtpFilled
              ? "bg-yellow-gradient text-black"
              : "bg-[#232323] text-white"
          }`}
          disabled={!isOtpFilled}
        >
          Confirm
        </button>
        {/* Resend OTP */}
        <div className="text-center">
          <span className="text-gray-400">
            Didn’t get the verification code?{" "}
            <span className="text-yellow-400 font-semibold cursor-pointer">
              {timer > 0 ? `${timer}s` : "Resend OTP"}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}