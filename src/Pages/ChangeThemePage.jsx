import React from 'react';
import { useTheme } from '../context/ThemeContext';
import BackButton from '../components/common/BackButton';
import { useTranslation } from 'react-i18next';

const ChangeThemePage = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen flex justify-center bg-[var(--bg-primary)]">
      <div className="w-full max-w-[480px] flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16">
          <div className="px-4 pt-6 relative">
            {/* Header */}
            <div className="flex items-center pb-6">
             <BackButton className="absolute left-4"/>
              <h1 className="text-xl font-semibold text-center flex-grow">{t('changeTheme.title')}</h1>
            </div>

            {/* Main Content */}
            <div className="px-4">
              <h2 className="text-2xl font-bold mb-2">{t('changeTheme.changeApplicationTheme')}</h2>
              <p className="text-gray-400 text-base mb-6">
                {t('changeTheme.description')}
              </p>

              {/* Theme Options */}
              <div className="space-y-3">
                {/* White Theme */}
                <button 
                  className={`w-full bg-[var(--bg-secondary)] rounded-lg p-4 flex items-center justify-between ${
                    theme === 'white' ? 'border border-[#FDC51B]' : ''
                  }`}
                  onClick={() => toggleTheme('white')}
                >
                  <div>
                    <h3 className="text-left font-medium mb-1">{t('changeTheme.whiteThemeTitle')}</h3>
                    <p className="text-gray-400 text-sm text-left">{t('changeTheme.whiteThemeDescription')}</p>
                  </div>
                  {theme === 'white' && (
                    <svg className="w-6 h-6 text-[#FDC51B]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                {/* Dark Theme */}
                <button 
                  className={`w-full bg-[var(--bg-secondary)] rounded-lg p-4 flex items-center justify-between ${
                    theme === 'dark' ? 'border border-[#FDC51B]' : ''
                  }`}
                  onClick={() => toggleTheme('dark')}
                >
                  <div>
                    <h3 className="text-left font-medium mb-1">{t('changeTheme.darkThemeTitle')}</h3>
                    <p className="text-gray-400 text-sm text-left">{t('changeTheme.darkThemeDescription')}</p>
                  </div>
                  {theme === 'dark' && (
                    <svg className="w-6 h-6 text-[#FDC51B]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>

                {/* System Theme */}
                <button 
                  className={`w-full bg-[var(--bg-secondary)] rounded-lg p-4 flex items-center justify-between ${
                    theme === 'system' ? 'border border-[#FDC51B]' : ''
                  }`}
                  onClick={() => toggleTheme('system')}
                >
                  <div>
                    <h3 className="text-left font-medium mb-1">{t('changeTheme.systemThemeTitle')}</h3>
                    <p className="text-gray-400 text-sm text-left">{t('changeTheme.systemThemeDescription')}</p>
                  </div>
                  {theme === 'system' && (
                    <svg className="w-6 h-6 text-[#FDC51B]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeThemePage;