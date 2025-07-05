import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormInput from '../components/common/FormInput';
import ReCaptcha, { ReCaptchaRef } from '../components/common/ReCaptcha';
import { useTranslation } from 'react-i18next';
import { verifyRecaptchaToken } from '../services/recaptchaService';
import RecaptchaLogo from '../icons/RecaptchaLogo.svg';
import ViewIcon from '../icons/Views.svg';
import ViewOffIcon from '../icons/ViewOff.svg';
import { useGoogleLogin } from '@react-oauth/google';
import { authService } from '../services/authService';
import { useAuth } from '../context/AuthContext';
import axios from 'axios'; // Added axios import

type LoginPageProps = {
  onShowRegister?: () => void;
  onClose?: () => void;
};

export default function LoginPage({ onShowRegister, onClose }: LoginPageProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const background = location.state?.background || location;
  const [showPassword, setShowPassword] = useState(false);
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const recaptchaRef = useRef<ReCaptchaRef>(null);
  const { t } = useTranslation();
  const { login } = useAuth();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true);
      try {
        const response = await authService.handleGoogleLogin({
          code: tokenResponse.code,
          scope: tokenResponse.scope
        });

        if (response.success && response.user && response.token) {
          login(response.user, response.token);
          navigate("/location-access");
        }
      } catch (error) {
        console.error('Error during Google login:', error);
        // Handle error appropriately - you might want to show an error message
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: () => {
      console.error('Google login failed');
      // Handle error appropriately
    },
    flow: 'auth-code',
    redirect_uri: import.meta.env.VITE_GOOGLE_REDIRECT_URI,
  });

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else if (background) {
      navigate(background.pathname, { replace: true });
    }
  };

  const handleRecaptchaVerify = (token: string | null) => {
    setRecaptchaToken(token);
    setRecaptchaError(null);
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
    setRecaptchaError(t('loginPage.recaptchaExpired') || 'reCAPTCHA expired. Please try again.');
  };

  const handleRecaptchaError = () => {
    setRecaptchaToken(null);
    setRecaptchaError(t('loginPage.recaptchaError') || 'reCAPTCHA error occurred. Please try again.');
  };

  const handleLogin = async () => {
    if (!recaptchaToken) {
      setRecaptchaError(t('loginPage.recaptchaRequired') || 'Please complete the reCAPTCHA verification.');
      return;
    }

    setIsVerifying(true);
    setRecaptchaError(null);

    try {
      // Send login data + recaptchaToken to your gateway
      const response = await axios.post(
        import.meta.env.VITE_API_BASE_URL + '/api/auth/login', // Replace with your gateway endpoint
        {
          emailOrPhone,
          password,
          recaptchaToken, // <-- include this
        }
      );
      // Handle response (e.g., store JWT, redirect, etc.)
      // ...
    } catch (error) {
      // Handle error
      // ...
    } finally {
      setIsVerifying(false);
    }
  };

  const isFormFilled = emailOrPhone.trim() !== "" && password.trim() !== "";

  return (
    <div className="dvh-fallback flex flex-col items-center bg-theme-primary px-4">
      <div className="w-full max-w-md mx-auto flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-xl font-semibold text-theme-primary">{t('loginPage.title')}</h1>
          <button onClick={handleClose} className="text-theme-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form className="w-full space-y-6" onSubmit={(e) => e.preventDefault()}>
          <FormInput
            label={t('loginPage.emailOrPhoneLabel')}
            name="emailOrPhone"
            placeholder={t('loginPage.emailOrPhonePlaceholder')}
            value={emailOrPhone}
            onChange={e => setEmailOrPhone(e.target.value)}
          />
          
          <div className="relative">
            <FormInput
              label={t('loginPage.passwordLabel')}
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder={t('loginPage.passwordPlaceholder')}
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
          <div className="w-full text-right mt-4 mb-4">
            <button 
              className="text-theme-primary"
              onClick={() => navigate("/forgot-password", { state: { background } })}
            >
              {t('loginPage.forgotPasswordLink')}
            </button>
          </div>
          
          
          {/* Real reCAPTCHA Component */}
          <ReCaptcha
            onVerify={handleRecaptchaVerify}
            onExpired={handleRecaptchaExpired}
            onError={handleRecaptchaError}
          />

          <button
            type="button"
            onClick={handleLogin}
            disabled={!isFormFilled || !recaptchaToken || isVerifying}
            className={`w-full rounded-full py-3 text-lg font-semibold mt-2 transition-colors duration-200 ${
              isFormFilled && recaptchaToken && !isVerifying
                ? "bg-yellow-gradient text-black"
                : "bg-theme-secondary text-theme-primary"
            }`}
          >
            {isVerifying ? t('loginPage.verifying') || 'Verifying...' : t('loginPage.loginButton')}
          </button>
         
         </form>
       
         {/* Register Link */}
         <div className="mt-4 mb-4 text-center">
          <span className="text-theme-secondary">{t('loginPage.noAccountText')} </span>
          <button
            className="text-[#FFC61B] font-semibold"
            onClick={() => navigate("/register", { state: { background } })}
          >
            {t('loginPage.signUpLink')}
          </button>
        </div>

        <div className="w-full mt-2 space-y-4">
          <button 
            onClick={() => handleGoogleLogin()}
            disabled={isGoogleLoading}
            className={`w-full flex items-center justify-center bg-theme-secondary rounded-full py-3 text-theme-primary font-medium text-base space-x-3 ${
              isGoogleLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <span>
              <svg className="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21.805 10.023h-9.765v3.954h5.617c-.242 1.242-1.484 3.648-5.617 3.648-3.375 0-6.133-2.789-6.133-6.25s2.758-6.25 6.133-6.25c1.922 0 3.211.82 3.953 1.523l2.703-2.633c-1.703-1.578-3.891-2.547-6.656-2.547-5.523 0-10 4.477-10 10s4.477 10 10 10c5.742 0 9.547-4.023 9.547-9.711 0-.656-.07-1.156-.156-1.633z"/>
              </svg>
            </span>
            <span>
              {isGoogleLoading 
                ? t('loginPage.signingInWithGoogle') || 'Signing in with Google...'
                : t('loginPage.continueWithGoogleButton')}
            </span>
          </button>
          <button className="w-full flex items-center justify-center bg-theme-secondary rounded-full py-3 text-theme-primary font-medium text-base space-x-3">
            <span>
              <svg className="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0"/></svg>
            </span>
            <span>{t('loginPage.continueWithFacebookButton')}</span>
          </button>
        </div>
      </div>
    </div>
  );
} 