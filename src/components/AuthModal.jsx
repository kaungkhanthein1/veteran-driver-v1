import { useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import LoginPage from '../Pages/LoginPage'; // Import LoginPage
import RegisterPage from '../Pages/RegisterPage'; // Import RegisterPage

export default function AuthModal({ isOpen, onClose }) {
  const { t } = useTranslation();
  const [isLogin, setIsLogin] = useState(true); // State to toggle between Login and Sign Up

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-theme-primary rounded-lg p-6 max-w-sm w-full mx-4">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-theme-secondary focus:outline-none"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {/* Render Login or Sign Up form based on state */}
        {isLogin ? (
          <LoginPage />
        ) : (
          <RegisterPage />
        )}

        {/* Toggle between Login and Sign Up */}
        <div className="mt-4 text-center">
          {isLogin ? (
            <span className="text-theme-secondary">{t('loginPage.noAccountText')} </span>
          ) : (
            <span className="text-theme-secondary">{t('registerPage.alreadyAccountText')} </span>
          )}
          <button
            className="text-[#FFC61B] font-semibold ml-1 focus:outline-none"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? t('loginPage.signUpLink') : t('registerPage.loginLink')}
          </button>
        </div>
      </div>
    </div>
  );
}

AuthModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}; 