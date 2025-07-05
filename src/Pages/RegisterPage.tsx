import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormInput from "../components/common/FormInput";
import { useTranslation } from "react-i18next";
import RecaptchaLogo from "../icons/RecaptchaLogo.svg";
import ViewIcon from "../icons/Views.svg";
import ViewOffIcon from "../icons/ViewOff.svg";
import GoogleIcon from "../icons/G.svg";
import FacebookIcon from "../icons/Facebook.svg";
import AppleIcon from "../icons/Apple.svg";
import OtpVerifyPage from "./OtpVerifyPage";
import { useEmailOTPMutation, useSendverifyMutation } from "./services/AuthApi";

type RegisterPageProps = {
  onClose?: () => void;
};

export default function RegisterPage({ onClose }: RegisterPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background || location;
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const [showOpt, setshowOtp] = useState(false);
  const { t } = useTranslation();
  const [triggerVerify] = useSendverifyMutation();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (background) {
      navigate(background.pathname, { replace: true });
    }
  };

  const isFormFilled =
    userName.trim() !== "" &&
    emailOrPhone.trim() !== "" &&
    password.trim() !== "";

  const handleOpt = async () => {
    if (isFormFilled && isRecaptchaVerified) {
      await triggerVerify({
        data: {
          to: emailOrPhone,
          channel: "email",
          scene: "register",
        },
      }).unwrap();
      setshowOtp(true);
    } else {
      alert(
        t(
          "registerPage.fillAllFields",
          "Please fill all fields and verify reCAPTCHA"
        )
      );
    }
  };

  if (showOpt) {
    return (
      <OtpVerifyPage
        emailorPhone={emailOrPhone}
        userName={userName}
        password={password}
      />
    );
  }

  return (
    <div className="dvh-fallback flex flex-col justify-between items-center bg-theme-primary px-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Header with Sign Up text and close button */}
        <div className="w-full flex justify-between items-center mb-2">
          <h1 className="text-xl font-semibold text-theme-primary">
            {t("registerPage.title")}
          </h1>
          <button onClick={handleClose} className="text-theme-primary">
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
        <form
          className="w-full mt-6 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleOpt();

            // navigate("/otp-verify", { state: { background } });
          }}
        >
          {/* User Name Input */}
          <FormInput
            label={t("registerPage.userNameLabel")}
            name="userName"
            placeholder={t("registerPage.userNamePlaceholder")}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <FormInput
            label={t("registerPage.emailOrPhoneLabel")}
            name="emailOrPhone"
            placeholder={t("registerPage.emailOrPhonePlaceholder")}
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
          />
          <div className="relative">
            <FormInput
              label={t("registerPage.passwordLabel")}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={t("registerPage.passwordPlaceholder")}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  className="text-theme-secondary"
                >
                  {showPassword ? (
                    <img
                      src={ViewIcon}
                      alt="Show password"
                      className="w-6 h-6 [filter:var(--icon-filter)]"
                    />
                  ) : (
                    <img
                      src={ViewOffIcon}
                      alt="Hide password"
                      className="w-6 h-6 [filter:var(--icon-filter)]"
                    />
                  )}
                </button>
              }
            />
          </div>
          {/* Password requirements text */}
          <div className="text-xs text-theme-secondary -mt-4 mb-2">
            {t(
              "registerPage.passwordRequirement",
              "Password must be 8–20 characters and include letters, numbers, and symbols"
            )}
          </div>
          {/* Recaptcha Placeholder */}
          <div className="flex justify-center">
            <div className="bg-theme-secondary rounded-lg px-4 py-3 flex items-center justify-between w-full max-w-[240px]">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="accent-blue-500 border-none"
                  checked={isRecaptchaVerified}
                  onChange={() => setIsRecaptchaVerified((v) => !v)}
                />
                <span className="text-theme-secondary text-sm">
                  {t("registerPage.notRobotCheckbox")}
                </span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <img
                  src={RecaptchaLogo}
                  alt="reCAPTCHA"
                  className="h-8 w-8 cursor-pointer"
                  onClick={() => setIsRecaptchaVerified(false)}
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full rounded-full py-3 text-lg font-semibold mt-2 transition-colors duration-200 ${
              isFormFilled && isRecaptchaVerified
                ? "bg-yellow-gradient text-black"
                : "bg-theme-secondary text-theme-primary"
            }`}
            disabled={!isFormFilled || !isRecaptchaVerified}
          >
            {t("registerPage.signUpButton")}
          </button>
        </form>
        {/* Social Login - single button with icons */}
        <div className="w-full mt-6">
          <button className="w-full flex items-center justify-center bg-theme-secondary rounded-full py-3 px-5 text-theme-primary font-medium text-base">
            <span className="whitespace-nowrap">
              Continue with Social Account
            </span>
            <span className="flex items-center gap-2 ml-3">
              <img
                src={GoogleIcon}
                alt="Google"
                className="w-6 h-6 object-contain align-middle [filter:var(--icon-filter)]"
              />
              <img
                src={FacebookIcon}
                alt="Facebook"
                className="w-6 h-6 object-contain align-middle [filter:var(--icon-filter)]"
              />
              <img
                src={AppleIcon}
                alt="Apple"
                className="w-6 h-6 object-contain align-middle mt-[1px] [filter:var(--icon-filter)]"
              />
            </span>
          </button>
        </div>
        {/* Login Link at the bottom */}
        <div className="w-full max-w-md mx-auto mt-6 mb-4 text-center">
          <span className="text-theme-secondary">
            {t("registerPage.alreadyAccountText")}{" "}
          </span>
          <button
            className="text-[#FFC61B] font-semibold"
            onClick={() => navigate("/login", { state: { background } })}
          >
            {t("registerPage.loginLink")}
          </button>
        </div>
      </div>
    </div>
  );
}
