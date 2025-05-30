import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Modal({ title, children, isOpen, onClose, onApply, type = 'default' }) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  if (type === 'bottom') {
    return (
      <div className="fixed inset-0 flex flex-col justify-end">
        <div className="bg-black bg-opacity-50 flex-1" onClick={onClose}></div>
        <div className="bg-theme-primary rounded-t-xl w-full p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-theme-primary text-xl">{title}</h2>
            <button onClick={onClose} className="text-theme-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mb-4">
            {children}
          </div>
          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-3 bg-theme-secondary text-theme-primary font-medium rounded-lg"
            >
              {t('modal.cancelButton')}
            </button>
            <button 
              onClick={onApply} 
              className="flex-1 py-3 bg-[#FDC51B] text-black font-medium rounded-lg"
            >
              {t('modal.applyButton')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-theme-primary rounded-xl w-full max-w-md mx-4 p-4 relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-theme-text text-xl">{title}</h2>
          <button onClick={onClose} className="text-theme-text">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mb-4">
          {children}
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-3 bg-theme-secondary text-theme-text font-medium rounded-lg"
          >
            {t('modal.cancelButton')}
          </button>
          <button 
            onClick={onApply} 
            className="flex-1 py-3 bg-[#FDC51B] text-black font-medium rounded-lg"
          >
            {t('modal.applyButton')}
          </button>
        </div>
      </div>
    </div>
  );
}