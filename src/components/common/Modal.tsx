import React from 'react';
import { useTranslation } from 'react-i18next';

type ModalProps = {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onApply?: () => void;
  type?: 'default' | 'bottom';
  hideFooter?: boolean;
};

export default function Modal({ title, children, isOpen, onClose, onApply, type = 'default', hideFooter = false }: ModalProps) {
  const { t } = useTranslation();

  if (!isOpen) return null;

  if (type === 'bottom') {
    return (
      <div className="fixed inset-0 flex flex-col items-end">
        <div className="bg-black bg-opacity-50 flex-1 w-full" onClick={onClose}></div>
        <div className="bg-theme-primary rounded-t-xl w-full max-w-md mx-0 p-4 max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-theme-primary text-xl">{title}</h2>
            <button onClick={onClose} className="text-theme-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mb-2">
            {children}
          </div>
          {!hideFooter && (
            <div className="flex gap-2">
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
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-theme-primary rounded-xl w-full max-w-md mx-4 p-4 relative z-10">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-theme-text text-xl">{title}</h2>
          <button onClick={onClose} className="text-theme-text">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 20 20">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mb-1">
          {children}
        </div>
        <div className="flex gap-2">
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