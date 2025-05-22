import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageModal = ({ isOpen, onClose }) => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', label: 'Default' },
    { code: 'zh', name: '简体中文', label: 'Chinese, Simplified' },
    { code: 'ja', name: '日本語', label: 'Japanese' },
    { code: 'ko', name: '한국어', label: 'Korean' }
  ];

  const handleLanguageSelect = (languageCode) => {
    i18n.changeLanguage(languageCode);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[1000]" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 z-[1001] flex justify-center">
        <div className="w-full max-w-[480px] bg-theme-primary rounded-t-2xl mx-4">
          <div className="p-4 space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className="w-full flex items-center justify-between p-4 rounded-lg bg-theme-secondary"
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

export default LanguageModal;