import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from '../components/common/FormInput';
import BackButton from "../components/common/BackButton";
import { useTranslation } from 'react-i18next';

export default function ForgetPasswordPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("+66");
  const [newPassword, setNewPassword] = useState("");
  const { t } = useTranslation();

  const isFormFilled = emailOrPhone.trim() !== "+66" && newPassword.trim() !== "";

  return (
    <div className="dvh-fallback flex flex-col justify-between items-center bg-theme-primary px-4 py-8">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        <div className="w-full flex items-center mb-8">
          <BackButton/>
          <h1 className="text-xl font-bold text-theme-primary flex-1 text-center">{t('forgotPasswordPage.title')}</h1>
          <div className="w-8" />
        </div>
        <p className="text-theme-secondary text-base text-center mb-8">{t('forgotPasswordPage.description')}</p>
        
        <form className="w-full mt-8 space-y-6" onSubmit={e => { e.preventDefault(); navigate("/otp-verify"); }}>
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
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {showPassword ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.657.336-3.234.938-4.675M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.938-2.675A9.956 9.956 0 0022 12c0 5.523-4.477 10-10 10a9.956 9.956 0 01-4.675-.938M3.06 3.06l17.88 17.88" />
                    )}
                  </svg>
                </button>
              }
            />
          </div>
          <div className="flex justify-center">
            <div className="bg-theme-primary rounded-lg px-4 py-3 flex items-center gap-2 w-full max-w-xs">
              <input type="checkbox" className="accent-blue-500" />
              <span className="text-theme-secondary text-sm">{t('forgotPasswordPage.notRobotCheckbox')}</span>
              <div className="ml-20 text-theme-secondary text-md">{t('forgotPasswordPage.recaptchaLabel')}</div>
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