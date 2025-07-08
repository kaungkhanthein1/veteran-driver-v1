import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const languages = [
  { code: 'en', name: 'English', label: 'Default' },
  { code: 'zh', name: '简体中文', label: 'Chinese, Simplified' },
  { code: 'ja', name: '日本語', label: 'Japanese' },
  { code: 'ko', name: '한국어', label: 'Korean' }
];

const LanguageModal: React.FC<LanguageModalProps> = ({ isOpen, onClose }) => {
  const { i18n } = useTranslation();

  const handleLanguageSelect = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[1000]" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 z-[1001] flex justify-center transition-transform duration-300 ease-out">
        <div className="w-full max-w-[480px] bg-white rounded-t-2xl shadow-lg mx-0 px-0 pb-4">
          {/* Drag Indicator at the very top */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
          </div>
          {/* Header Row */}
          <div className="flex items-center justify-between px-6 pt-1 pb-2">
            <h3 className="text-gray-900 text-lg font-bold">Language</h3>
            <button onClick={onClose} className="p-2">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
                <path d="M6 6L18 18" stroke="#222" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          {/* Language Options */}
          <div className="p-4 space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className="w-full flex items-center justify-between p-4 rounded-lg bg-theme-secondary mb-2"
              >
                <div>
                  <div className="text-theme-primary text-left">{lang.name}</div>
                  <div className="text-theme-secondary text-sm text-left">{lang.label}</div>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-theme-primary flex items-center justify-center">
                  {i18n.language === lang.code && (
                    <div className="w-3 h-3 rounded-full bg-[#FDC51B]" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

LanguageModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LanguageModal;