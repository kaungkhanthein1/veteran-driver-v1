import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormInput from '../components/common/FormInput';
import { useTranslation } from 'react-i18next';
import RecaptchaLogo from '../icons/RecaptchaLogo.svg';
import ViewIcon from '../icons/Views.svg';
import ViewOffIcon from '../icons/ViewOff.svg';

type RegisterPageProps = {
  onClose?: () => void;
};

export default function RegisterPage({ onClose }: RegisterPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background || location;
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [isRecaptchaVerified, setIsRecaptchaVerified] = useState(false);
  const { t } = useTranslation();

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (background) {
      navigate(background.pathname, { replace: true });
    }
  };

  const isFormFilled = emailOrPhone.trim() !== "" && password.trim() !== "";

  return (
    <div className="dvh-fallback flex flex-col justify-between items-center bg-theme-primary px-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        {/* Header with Sign Up text and close button */}
        <div className="w-full flex justify-between items-center mb-2">
          <h1 className="text-xl font-semibold text-theme-primary">{t('registerPage.title')}</h1>
          <button onClick={handleClose} className="text-theme-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form className="w-full mt-6 space-y-6" onSubmit={e => { 
          e.preventDefault(); 
          navigate("/otp-verify", { state: { background } }); 
        }}>
          <FormInput
            label={t('registerPage.emailOrPhoneLabel')}
            name="emailOrPhone"
            placeholder={t('registerPage.emailOrPhonePlaceholder')}
            value={emailOrPhone}
            onChange={e => setEmailOrPhone(e.target.value)}
          />
          
          <div className="relative">
            <FormInput
              label={t('registerPage.passwordLabel')}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={t('registerPage.passwordPlaceholder')}
              value={password}
              onChange={e => setPassword(e.target.value)}
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
              isFormFilled && isRecaptchaVerified
                ? "bg-yellow-gradient text-black"
                : "bg-theme-secondary text-theme-primary"
            }`}
            disabled={!isFormFilled || !isRecaptchaVerified}
          >
            {t('registerPage.signUpButton')}
          </button>
        </form>
         {/* Login Link */}
         <div className="mt-4 text-center">
          <span className="text-theme-secondary">{t('registerPage.alreadyAccountText')} </span>
          <button
            className="text-[#FFC61B] font-semibold"
            onClick={() => navigate('/login', {state: {background}})}
          >
            {t('registerPage.loginLink')}
          </button>
        </div>
        {/* Social Login */}
        <div className="w-full mt-4 space-y-4">
          <button className="w-full flex items-center justify-center bg-theme-secondary rounded-full py-3 text-theme-primary font-medium text-base space-x-3">
            {/* <GoogleIcon className="w-6 h-6" /> */}
            <span>
              <svg className="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M21.805 10.023h-9.765v3.954h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.133-2.789-6.133-6.25s2.758-6.25 6.133-6.25c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.703-1.578-3.891-2.547-6.656-2.547-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.023 9.547-9.711 0-.656-.07-1.156-.156-1.633z"/></svg>
            </span>
            <span>{t('registerPage.continueWithGoogleButton')}</span>
          </button>
          <button 
            className="w-full flex items-center justify-center bg-theme-secondary rounded-full py-3 text-theme-primary font-medium text-base space-x-3"
            onClick={() => navigate("/phone-signup")}
          >
            {/* <PhoneIcon className="w-6 h-6" /> */}
            {/* <span>
              <svg className="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2a1.003 1.003 0 011.11-.21c1.21.48 2.53.73 3.88.73a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 22 2 13.93 2 4.5A1 1 0 013 3.5h3.5a1 1 0 011 1c0 1.35.25 2.67.73 3.88a1.003 1.003 0 01-.21 1.11l-2.2 2.2z"/></svg>
            </span>
            <span>{t('registerPage.continueWithPhoneButton')}</span>
          </button>
          <button className="w-full flex items-center justify-center bg-theme-secondary rounded-full py-3 text-theme-primary font-medium text-base space-x-3"> */}
            {/* <FacebookIcon className="w-6 h-6" /> */}
            <span>
              <svg className="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0"/></svg>
            </span>
            <span>{t('registerPage.continueWithFacebookButton')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}