import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormInput from '../components/common/FormInput';
import BackButton from "../components/common/BackButton";
import { useTranslation } from 'react-i18next';
import RecaptchaLogo from '../icons/RecaptchaLogo.svg';
import ViewIcon from '../icons/Views.svg';
import ViewOffIcon from '../icons/ViewOff.svg';


export default function ForgetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background || { pathname: "/" };
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("+66");
  const [newPassword, setNewPassword] = useState("");
  const { t } = useTranslation();
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);


  const isFormFilled = emailOrPhone.trim() !== "+66" && newPassword.trim() !== "";

  const handleClose = () => {
    if (background) {
      navigate(background.pathname, { replace: true });
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="dvh-fallback flex flex-col justify-between items-center bg-theme-primary px-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        <div className="w-full flex items-center mb-8">
          <BackButton />
          <h1 className="text-xl font-bold text-theme-primary flex-1 text-center">{t('forgotPasswordPage.title')}</h1>
          <button onClick={handleClose} className="text-theme-primary text-left">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>        
        <form
          className="w-full mt-8 space-y-6"
          onSubmit={e => {
            e.preventDefault();
            navigate("/otp-verify", { state: { background } });
          }}
        >
          <FormInput
            label={t('forgotPasswordPage.emailOrPhoneLabel')}
            name="emailOrPhone"
            value={emailOrPhone}
            onChange={e => setEmailOrPhone(e.target.value)}
          />
          
          <div className="relative">
            <FormInput
              label={t('forgotPasswordPage.newPasswordLabel')}
              name="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder={t('forgotPasswordPage.newPasswordPlaceholder')}
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
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
          <div className="flex justify-center">
            <div className="bg-theme-secondary rounded-lg px-4 py-3 flex items-center justify-between w-full max-w-[240px]">
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  className="accent-blue-500 border-none"
                  checked={isRecaptchaVerified}
                  onChange={() => setIsRecaptchaVerified((v) => !v)}
                />
                <span className="text-theme-secondary text-sm">{t('registerPage.notRobotCheckbox')}</span>
              </div>
              <div className="flex flex-col items-end gap-1">
                <img src={RecaptchaLogo} alt="reCAPTCHA" className="h-8 w-8 cursor-pointer" onClick={() => setIsRecaptchaVerified(false)} />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className={`w-full rounded-full py-3 text-lg font-semibold mt-2 transition-colors duration-200 ${
              isFormFilled
                ? "bg-yellow-gradient text-black"
                : "bg-theme-secondary text-theme-primary"
            }`}
            disabled={!isFormFilled}
          >
            {t('forgotPasswordPage.continueButton')}
          </button>
        </form>
      </div>
    </div>
  );
}