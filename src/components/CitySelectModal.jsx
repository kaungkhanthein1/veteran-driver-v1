import { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import { mockCities } from "../data/mockCities"; // Import mockCities

// Import new generic city images
import cityImage0 from "assets/cities/City.png";
import cityImage1 from "assets/cities/City1.png";
import cityImage2 from "assets/cities/City2.png";

// Array of generic city images for the first three cities
const genericCityImages = [cityImage0, cityImage1, cityImage2];

export default function CitySelectModal({ country, onSelectCity, onClose }) {
  const [selectedCity, setSelectedCity] = useState(null);
  const { t } = useTranslation();

  CitySelectModal.propTypes = {
    country: PropTypes.string.isRequired,
    onSelectCity: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  const handleApply = () => {
    if (selectedCity) {
      onSelectCity(selectedCity);
      onClose(); // Close modal on apply
    }
  };

  // Get cities for the selected country
  const cities = country ? mockCities[country] : [];

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-end bg-black bg-opacity-50">
      <div className="bg-theme-primary rounded-t-3xl p-6 w-full max-w-sm relative">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-theme-primary">
          X
        </button>

        <h2 className="text-xl font-bold text-theme-primary mb-4">{t('chooseLocation.selectCityTitle')}</h2> {/* Update title */}

        {/* City Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {cities.map((city, index) => (
            index < 3 ? (
              // Button for the first three cities (with image)
              <button
                key={city}
                className={`flex flex-col items-center justify-center rounded-lg p-2 border-2 bg-theme-secondary ${selectedCity === city ? "border-[#FFD75E]" : "border-transparent"}`}
                onClick={() => setSelectedCity(city)}
              >
                {/* Use generic image for the first three cities */}
                <img src={genericCityImages[index]} alt={city} className="w-full h-16 object-cover rounded-md mb-2" />
                <span className="text-theme-primary text-sm mt-2">{city}</span>
              </button>
            ) : (
              // Button for the rest of the cities (text only)
              <button
                key={city}
                className={`flex items-center justify-center rounded-lg px-4 py-2 border-2 bg-theme-secondary text-theme-primary text-sm ${selectedCity === city ? "border-[#FFD75E]" : "border-transparent"}`}
                onClick={() => setSelectedCity(city)}
              >
                {city}
              </button>
            )
          ))}
        </div>

        {/* Apply Button */}
        <button
          className="w-full bg-yellow-gradient text-black rounded-full py-3 text-lg font-semibold"
          disabled={!selectedCity}
          onClick={handleApply}
        >
          {t('modal.applyButton')}
        </button>
      </div>
    </div>
  );
} 