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
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50" onClick={onClose}>{/* Background Overlay */}
      {/* Modal Content Container */}
      <div
        className="fixed top-32 bottom-16 left-0 right-0 bg-theme-primary rounded-t-2xl p-6 max-w-[480px] w-full mx-auto overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing modal
      >
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 text-theme-secondary focus:outline-none"
          onClick={onClose}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        {/* Modal Header (Optional, based on design - the design shows 'Sign Up' as the main title within the form itself) */}
        {/* <div className="text-xl font-bold text-theme-primary mb-4">{isLogin ? t('loginPage.title') : t('registerPage.title')}</div> */}

        {/* Render Login or Sign Up form based on state */}
        {/* LoginPage and RegisterPage components are assumed to have their own internal padding and layout */}
        {isLogin ? (
          <LoginPage />
        ) : (
          <RegisterPage />
        )}

        {/* Toggle between Login and Sign Up */}
        {/* Assuming LoginPage and RegisterPage don't include this toggle internally */}
        <div className="mt-6 text-center">
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