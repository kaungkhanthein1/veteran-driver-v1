import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgetPasswordPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("+66");
  const [newPassword, setNewPassword] = useState("");

  const isFormFilled = emailOrPhone.trim() !== "+66" && newPassword.trim() !== "";

  return (
    <div className="min-h-screen flex flex-col justify-between items-center bg-gradient-to-b from-[#281c12] via-black to-black px-4 py-8">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        <div className="w-full flex items-center mb-8">
          <button
            className="text-white text-2xl mr-4"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
              <path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <h1 className="text-xl font-bold text-white flex-1 text-center">Forgot Password</h1>
          <div className="w-8" />
        </div>
        <p className="text-gray-300 text-base text-center mb-8">Complete registration with your phone number</p>
        
        <form className="w-full mt-8 space-y-6" onSubmit={e => { e.preventDefault(); navigate("/otp-verify"); }}>
          <div>
            <label className="block text-sm text-gray-400 mb-1 ml-1">Email or Phone Number</label>
            <input
              type="text"
              className="w-full bg-transparent border border-gray-500 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
              value={emailOrPhone}
              onChange={e => setEmailOrPhone(e.target.value)}
            />
          </div>
          <div className="relative">
            <label className="block text-sm text-gray-400 mb-1 ml-1">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              className="w-full bg-transparent border border-gray-500 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
              placeholder="Enter New Password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-9 text-gray-400"
              onClick={() => setShowPassword((v) => !v)}
              tabIndex={-1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {showPassword ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.938-2.675A9.956 9.956 0 0022 12c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.675-.938M3.06 3.06l17.88 17.88" />
                )}
              </svg>
            </button>
          </div>
          <div className="flex justify-center">
            <div className="bg-[#181818] rounded-lg px-4 py-3 flex items-center gap-2 w-full max-w-xs">
              <input type="checkbox" className="accent-blue-500" />
              <span className="text-gray-400 text-sm">I'm not a robot</span>
              <div className="ml-20 text-gray-500 text-md">Recaptcha</div>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full rounded-full py-3 text-lg font-semibold mt-2 transition-colors duration-200 ${
              isFormFilled
                ? "bg-yellow-gradient text-black"
                : "bg-[#232323] text-white"
            }`}
            disabled={!isFormFilled}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}