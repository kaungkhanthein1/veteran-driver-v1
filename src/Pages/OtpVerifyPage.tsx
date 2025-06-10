import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import { useTranslation } from 'react-i18next';

export default function OtpVerifyPage() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(53);
  const inputRefs = useRef([]);
  const { t } = useTranslation();

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
    <div className="dvh-fallback flex flex-col items-center justify-center bg-theme-primary px-4 py-8">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        <div className="w-full flex items-center mb-8">
          <BackButton/>
          <h1 className="text-xl font-bold text-theme-primary flex-1 text-center">{t('otpVerifyPage.title')}</h1>
          <div className="w-8" />
        </div>
        <div className="text-center mb-8">
          <p className="text-theme-secondary text-base">
            {t('otpVerifyPage.description', { email: 'DevelopX10@gmail.com', phone: '+868880818' })}. {t('otpVerifyPage.checkSpam')}
          </p>
        </div>
        <div className="flex justify-center space-x-3 mb-8">
          {otp.map((char, idx) => (
            <input
              key={idx}
              ref={el => inputRefs.current[idx] = el}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-12 rounded-lg border border-theme bg-theme-primary flex items-center justify-center text-2xl text-theme-primary text-center outline-none"
              value={char}
              onChange={e => handleChange(e, idx)}
              onKeyDown={e => handleKeyDown(e, idx)}
              autoFocus={idx === 0}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => navigate("/location-access")}
          className={`w-full rounded-full py-3 text-lg font-semibold mb-4 shadow-lg transition-colors duration-200 ${
            isOtpFilled
              ? "bg-yellow-gradient text-black"
              : "bg-theme-secondary text-theme-primary"
          }`}
          disabled={!isOtpFilled}
        >
          {t('otpVerifyPage.confirmButton')}
        </button>
        <div className="text-center">
          <span className="text-theme-secondary">
            {t('otpVerifyPage.didntGetCode')}{" "}
            <span className="text-[#FFC61B] font-semibold cursor-pointer">
              {timer > 0 ? t('otpVerifyPage.timer', { timer: timer }) : t('otpVerifyPage.resendButton')}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}