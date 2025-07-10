import React from 'react';
import { useTranslation } from 'react-i18next';

interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const languages = [
  { code: 'en', name: 'Default', label: 'English' },
  { code: 'zh', name: '简体中文', label: 'Chinese, Simplified' },
  { code: 'zh-hant', name: '繁體中文', label: 'Chinese, Traditional' },
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
      <div className="fixed inset-0 bg-black/50 z-[1000]" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 z-[1001] flex justify-center">
        <div className="w-full max-w-[480px] bg-white rounded-t-3xl overflow-hidden">
          {/* Top indicator bar */}
          <div className="flex justify-center pt-3 pb-2">
            <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
          </div>
          
          {/* Header */}
          <div className="px-6 py-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-medium">LA</span>
              </div>
              <span className="text-sm text-gray-600">Logged In Account</span>
            </div>
          </div>

          {/* Language List */}
          <div className="px-6 pb-8">
            {languages.map((lang, index) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full flex items-center justify-between py-4 ${
                  index !== languages.length - 1 ? 'border-b border-gray-100' : ''
                }`}
              >
                <div className="text-left">
                  <div className="text-base font-medium text-gray-900">{lang.name}</div>
                  <div className="text-sm text-gray-500">{lang.label}</div>
                </div>
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 flex items-center justify-center">
                  {i18n.language === lang.code && (
                    <div className="w-3 h-3 rounded-full bg-[#FFC61B]" />
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