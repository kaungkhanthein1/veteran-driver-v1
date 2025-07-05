import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Trans } from "react-i18next";
import BackButton from "components/common/BackButton";
import { useRegisterMutation } from "./services/AuthApi";

type OtpVerifyPageProps = {
  onClose?: () => void;
  emailorPhone: any;
  userName: any;
  password: any;
};

export default function OtpVerifyPage({
  onClose,
  emailorPhone,
  userName,
  password,
}: OtpVerifyPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background || location;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(53);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { t } = useTranslation();
  const [triggerResgister] = useRegisterMutation(); // Assuming this is the correct hook for sending verification

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (background) {
      navigate(background.pathname, { replace: true });
    }
  };

  console.log("Email or Phone:", emailorPhone);
  console.log("User Name:", userName);
  console.log("Password:", password);

  // Add this line to check if all OTP boxes are filled
  const isOtpFilled = otp.every((char) => char.trim() !== "");

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleRegister = async () => {
    if (isOtpFilled) {
      const otpCode = otp.join("");
      console.log("OTP Code:", otpCode);
      try {
        const response = await triggerResgister({
          data: {
            code: +otpCode,
            email: emailorPhone,
            username: userName,
            password,
          },
        }).unwrap();

        localStorage.setItem("token", response?.data.token.accessToken);
        localStorage.setItem("profileData", JSON.stringify(response?.data));

        console.log("Register response:", response);

        navigate("/profile", { replace: true });
      } catch (error) {
        console.error("register failed:", error);
      }
    } else {
      alert(t("otpVerifyPage.fillAllFields"));
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;
    const newOtp = [...otp];
    newOtp[idx] = value[0];
    setOtp(newOtp);
    // Move to next input if not last
    if (idx < 5 && value) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
  };

  return (
    <div className="dvh-fallback flex flex-col items-center justify-start bg-theme-primary px-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        <div className="w-full flex items-center mb-8">
          <BackButton />
          <h1 className="text-xl font-bold text-theme-primary flex-1 text-center">
            {t("otpVerifyPage.title")}
          </h1>
          <button onClick={handleClose} className="text-theme-primary ml-auto">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="text-center mb-8">
          <Trans
            i18nKey="otpVerifyPage.description"
            values={{
              email: "DevelopX10@gmail.com",
              phone: "+868880818",
            }}
            components={{
              email: <span className="font-semibold text-theme-primary" />,
              phone: <span className="font-semibold text-theme-primary" />,
            }}
          />
        </div>
        <div className="flex justify-center space-x-3 mb-8">
          {otp.map((char, idx) => (
            <input
              key={idx}
              ref={(el) => (inputRefs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-12 rounded-lg border border-theme bg-theme-primary flex items-center justify-center text-2xl text-theme-primary text-center outline-none"
              value={char}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              autoFocus={idx === 0}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => handleRegister()}
          className={`w-full rounded-full py-3 text-lg font-semibold mb-4 shadow-lg transition-colors duration-200 ${
            isOtpFilled
              ? "bg-yellow-gradient text-black"
              : "bg-theme-secondary text-theme-primary"
          }`}
          disabled={!isOtpFilled}
        >
          {t("otpVerifyPage.confirmButton")}
        </button>
        <div className="text-center">
          <span className="text-theme-secondary">
            {t("otpVerifyPage.didntGetCode")}{" "}
            <span className="text-[#FFC61B] font-semibold cursor-pointer">
              {timer > 0
                ? t("otpVerifyPage.timer", { timer: timer })
                : t("otpVerifyPage.resendButton")}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
