import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from './Modal';

interface GenderSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (gender: string) => void;
  currentGender: string;
}

export default function GenderSelectionModal({ isOpen, onClose, onApply, currentGender }: GenderSelectionModalProps) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    setSelected(currentGender);
  }, [currentGender]);

  const handleApply = () => {
    if (selected) {
      onApply(selected);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      type="bottom"
      hideFooter
      title=""
      showDragHandle={false}
    >
      {/* Custom Header for Gender Selection Modal */}
      <div className="flex justify-between items-center px-4 py-3">
        <h2 className="text-lg font-semibold text-theme-text">{t('accountInformation.gender')}</h2>
        <button onClick={onClose} className="text-theme-text">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <button
        className={`w-full py-3 text-center text-lg font-medium transition-colors duration-200 
        ${selected === 'other' ? 'text-[#FFC61B]' : 'text-theme-text'}`}
        onClick={() => setSelected('other')}
      >
        {t('accountInformation.genderOther')}
      </button>
      <div className="w-full h-[1px] bg-white/30 my-2" />
      <button
        className={`w-full py-3 text-center text-lg font-medium transition-colors duration-200 
        ${selected === 'female' ? 'text-[#FFC61B]' : 'text-theme-text'}`}
        onClick={() => setSelected('female')}
      >
        {t('accountInformation.genderFemale')}
      </button>
      <div className="w-full h-[1px] bg-white/30 my-2" />
      <button
        className={`w-full py-3 text-center text-lg font-medium transition-colors duration-200 
        ${selected === 'male' ? 'text-[#FFC61B]' : 'text-theme-text'}`}
        onClick={() => setSelected('male')}
      >
        {t('accountInformation.genderMale')}
      </button>

      {/* Custom Footer Buttons */}
      <div className="flex gap-2 px-4 py-3">
        <button 
          onClick={onClose}
          className="flex-1 py-3 bg-theme-secondary text-theme-text font-medium rounded-lg"
        >
          {t('modal.cancelButton')}
        </button>
        <button 
          onClick={handleApply}
          className="flex-1 py-3 bg-[#FFC61B] text-black font-medium rounded-lg"
          disabled={!selected}
        >
          {t('modal.applyButton')}
        </button>
      </div>
    </Modal>
  );
} 