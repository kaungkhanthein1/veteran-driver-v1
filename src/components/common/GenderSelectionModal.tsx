import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface GenderSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (gender: string) => void;
  currentGender: string;
}

export default function GenderSelectionModal({ isOpen, onClose, onApply, currentGender }: GenderSelectionModalProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const { t } = useTranslation();

  // Update selected when currentGender changes
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
    <div className="fixed inset-0 z-50 flex justify-center items-end bg-black bg-opacity-50">
      <div className="bg-theme-primary rounded-t-3xl p-6 w-full max-w-sm relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-theme-primary">
          X
        </button>

        <h2 className="text-xl font-bold text-theme-primary mb-4">{t('accountInformation.gender')}</h2>

        {/* Gender Options */}
        <div className="flex flex-col gap-4 mb-6">
          <button
            className={`flex items-center justify-center rounded-lg p-4 border-2 bg-theme-secondary ${
              selected === 'other' ? "border-[#FFD75E]" : "border-transparent"
            }`}
            onClick={() => setSelected('other')}
          >
            <span className="text-theme-primary text-lg">{t('accountInformation.genderOther')}</span>
          </button>

          <button
            className={`flex items-center justify-center rounded-lg p-4 border-2 bg-theme-secondary ${
              selected === 'female' ? "border-[#FFD75E]" : "border-transparent"
            }`}
            onClick={() => setSelected('female')}
          >
            <span className="text-theme-primary text-lg">{t('accountInformation.genderFemale')}</span>
          </button>

          <button
            className={`flex items-center justify-center rounded-lg p-4 border-2 bg-theme-secondary ${
              selected === 'male' ? "border-[#FFD75E]" : "border-transparent"
            }`}
            onClick={() => setSelected('male')}
          >
            <span className="text-theme-primary text-lg">{t('accountInformation.genderMale')}</span>
          </button>
        </div>

        {/* Apply Button */}
        <button
          className="w-full bg-yellow-gradient text-black rounded-full py-3 text-lg font-semibold"
          disabled={!selected}
          onClick={handleApply}
        >
          {t('modal.applyButton')}
        </button>
      </div>
    </div>
  );
} 