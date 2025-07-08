import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface LoginPromptProps {
  title?: string;
  subtitle?: string;
  onLoginClick?: () => void;
  className?: string;
}

const LoginPrompt: React.FC<LoginPromptProps> = ({
  title = "Save Your Favorite Places",
  subtitle = "Log in to access your saved spots and trips anytime",
  onLoginClick,
  className = ""
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLoginClick = () => {
    if (onLoginClick) {
      onLoginClick();
    } else {
      navigate('/login');
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center min-h-[60vh] px-8 ${className}`}>
      {/* Location Icon with Animation */}
      <div className="relative mb-8">
        {/* Main Location Circle */}
        <div className="relative w-24 h-24 rounded-full border-4 border-yellow-400 bg-white flex items-center justify-center">
          {/* Location Pin */}
          <div className="w-8 h-8 bg-yellow-400 rounded-full relative">
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white rounded-full"></div>
          </div>
          
          {/* Decorative Elements */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 transform rotate-45"></div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-yellow-400 rounded-full opacity-60"></div>
        </div>

        {/* Animated Signal Waves */}
        <div className="absolute -top-2 -left-2 w-28 h-28 border-2 border-yellow-300 rounded-full opacity-50 animate-ping"></div>
        <div className="absolute -top-4 -left-4 w-32 h-32 border-2 border-yellow-200 rounded-full opacity-30 animate-ping" style={{ animationDelay: '0.5s' }}></div>

        {/* Dotted Line to Pin */}
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
          <svg width="2" height="40" viewBox="0 0 2 40" className="text-blue-400">
            <line 
              x1="1" 
              y1="0" 
              x2="1" 
              y2="40" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeDasharray="4,4"
            />
          </svg>
        </div>

        {/* Destination Pin */}
        <div className="absolute top-16 left-20 w-6 h-8">
          <div className="w-6 h-6 bg-red-500 rounded-full relative">
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent border-t-red-500"></div>
          </div>
        </div>

        {/* Dotted Box */}
        <div className="absolute top-12 left-8 w-16 h-12 border-2 border-blue-300 border-dashed rounded-lg opacity-60"></div>
      </div>

      {/* Content */}
      <div className="text-center space-y-4 mb-8">
        <h2 className="text-2xl font-bold text-theme-primary">
          {title}
        </h2>
        <p className="text-base text-theme-secondary leading-relaxed max-w-sm">
          {subtitle}
        </p>
      </div>

      {/* Login Button */}
      <button
        onClick={handleLoginClick}
        className="w-full max-w-xs bg-yellow-gradient text-black font-semibold text-lg py-4 px-8 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200"
      >
        {t('loginPrompt.loginButton', 'Log in')}
      </button>
    </div>
  );
};

export default LoginPrompt; 