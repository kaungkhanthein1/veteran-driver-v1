import { useState } from "react";
import { regions } from "../Pages/ChooseLocationPage"; // Import regions from the existing file
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types'; // Import PropTypes

export default function RegionSelectModal({ onSelectRegion, onClose }) {
  const [selected, setSelected] = useState(null);
  const { t } = useTranslation();

  // TODO: Add prop-types validation for onSelectRegion and onClose
// Replaced with actual PropTypes validation
RegionSelectModal.propTypes = {
  onSelectRegion: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

  const handleApply = () => {
    if (selected) {
      onSelectRegion(selected);
      onClose(); // Close modal on apply
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-end bg-black bg-opacity-50">
      <div className="bg-theme-primary rounded-t-3xl p-6 w-full max-w-sm relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-theme-primary">
          X
        </button>

        <h2 className="text-xl font-bold text-theme-primary mb-4">{t('chooseLocation.selectRegionTitle')}</h2>

        {/* Region Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {regions.map(region => (
            <button
              key={region.name}
              className={`flex flex-col items-center justify-center rounded-lg p-4 border-2 bg-theme-secondary ${selected?.name === region.name ? "border-[#FFD75E]" : "border-transparent"}`}
              onClick={() => setSelected(region)}
            >
              <span className="text-3xl mb-2">{region.flag}</span>
              <span className="text-theme-primary text-sm">{t(`regions.${region.name.toLowerCase().replace(' ', '')}`)}</span>
            </button>
          ))}
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