import React, { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

interface Country {
  code: string;
  name: string;
  iso3: string;
  numericCode: string;
  flag: string;
}

interface City {
  code: string;
  name: string;
  countryCode: string;
}

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApply: (country: string, city: string) => void;
  currentCountry?: string;
  currentCity?: string;
}

const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  onApply,
  currentCountry = '',
  currentCity = '',
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);

  // Fetch countries
  useEffect(() => {
    if (isOpen) {
      fetchCountries();
    }
  }, [isOpen]);

  // Reset selections when modal opens
  useEffect(() => {
    if (isOpen) {
      setSelectedCountry(null);
      setSelectedCity(null);
      setCities([]);
    }
  }, [isOpen]);

  const fetchCountries = async () => {
    setLoadingCountries(true);
    try {
      const response = await fetch('https://vtt_dev.movie06.com/api/v1/geo/all-countries');
      const data = await response.json();
      if (data.success && data.data?.countries) {
        setCountries(data.data.countries);
      }
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setLoadingCountries(false);
    }
  };

  const fetchCities = async (countryCode: string) => {
    setLoadingCities(true);
    try {
      const response = await fetch(
        `https://vtt_dev.movie06.com/api/v1/geo/countries/${countryCode}/cities`
      );
      const data = await response.json();
      if (data.success && data.data?.cities) {
        setCities(data.data.cities);
      }
    } catch (error) {
      console.error('Error fetching cities:', error);
    } finally {
      setLoadingCities(false);
    }
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setSelectedCity(null);
    fetchCities(country.code);
  };

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
  };

  const handleApply = () => {
    if (selectedCountry && selectedCity) {
      onApply(selectedCountry.name, selectedCity.name);
      onClose();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-[1000]" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 z-[1001] flex justify-center">
        <div className="w-full max-w-[480px] bg-white rounded-t-3xl overflow-hidden">
          {/* Header */}
          <div className="relative flex items-center justify-center py-4 px-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Location</h2>
            <button
              onClick={onClose}
              className="absolute right-6 w-6 h-6 flex items-center justify-center"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 1L1 13M1 1L13 13"
                  stroke="#666"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {/* Country Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700">Country</span>
                {loadingCountries && (
                  <div className="w-4 h-4 border border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                )}
              </div>
              
              {selectedCountry ? (
                <div
                  onClick={() => {
                    setSelectedCountry(null);
                    setSelectedCity(null);
                    setCities([]);
                  }}
                  className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer"
                >
                  <span className="text-blue-900 font-medium">{selectedCountry.name}</span>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 8L10 12L14 8"
                      stroke="#1D4ED8"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {countries.map((country) => (
                    <button
                      key={country.code}
                      onClick={() => handleCountrySelect(country)}
                      className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
                    >
                      <span className="text-gray-900">{country.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* City Selection */}
            {selectedCountry && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-gray-700">City</span>
                  {loadingCities && (
                    <div className="w-4 h-4 border border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                  )}
                </div>
                
                {selectedCity ? (
                  <div
                    onClick={() => setSelectedCity(null)}
                    className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-pointer"
                  >
                    <span className="text-blue-900 font-medium">{selectedCity.name}</span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M6 8L10 12L14 8"
                        stroke="#1D4ED8"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {cities.length > 0 ? (
                      cities.map((city) => (
                        <button
                          key={city.code}
                          onClick={() => handleCitySelect(city)}
                          className="w-full text-left p-3 hover:bg-gray-50 rounded-lg border border-gray-200 transition-colors"
                        >
                          <span className="text-gray-900">{city.name}</span>
                        </button>
                      ))
                    ) : (
                      !loadingCities && (
                        <p className="text-gray-500 text-center py-4">
                          No cities available for this country
                        </p>
                      )
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Show current selection preview */}
            {selectedCountry && selectedCity && (
              <div className="mb-6 p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="text-sm text-green-700">
                  <span className="font-medium">Selected:</span> {selectedCity.name}, {selectedCountry.name}
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-3 p-6 border-t border-gray-100">
            <button
              onClick={handleCancel}
              className="flex-1 py-3 px-4 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              disabled={!selectedCountry || !selectedCity}
              className={`flex-1 py-3 px-4 font-medium rounded-lg transition-colors ${
                selectedCountry && selectedCity
                  ? 'apply_btn text-white'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocationModal; 