import React, { useEffect, useState } from "react";
import "./map.css";
import { Range } from "react-range";
import { useTranslation } from "react-i18next";

const MIN = 0;
const MAX = 1000;

const FilterPanel = ({ filters, setFilters, applyFilters, onClose }) => {
  // TODO: Add PropTypes for prop validation
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();
  const ratingOptions = [0, 5, 4, 3, 2, 1];
  const ratingLabels = {
    0: t('filterPanel.ratingOptions.all'),
    5: t('filterPanel.ratingOptions.5stars'),
    4: t('filterPanel.ratingOptions.4starsAbove'),
    3: t('filterPanel.ratingOptions.3starsAbove'),
    2: t('filterPanel.ratingOptions.2starsAbove'),
    1: t('filterPanel.ratingOptions.1star'),
  };

  const serviceOptions = [
    t('filterPanel.serviceOptions.all'),
    t('filterPanel.serviceOptions.service1'),
    t('filterPanel.serviceOptions.service2'),
    t('filterPanel.serviceOptions.service3'),
    t('filterPanel.serviceOptions.service4'),
    t('filterPanel.serviceOptions.service5'),
    t('filterPanel.serviceOptions.service6'),
  ];

  useEffect(() => {
    // trigger the slide-in after mount
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const toggleService = (service) => {
    if (service === "All") {
      setFilters({ ...filters, services: [] });
    } else {
      const exists = filters.services.includes(service);
      const newServices = exists
        ? filters.services.filter((s) => s !== service)
        : [...filters.services, service];
      setFilters({ ...filters, services: newServices });
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // delay unmount after animation
  };

  const sortOptions = [
    t('filterPanel.sortOptions.comprehensive'),
    t('filterPanel.sortOptions.openNow'),
    t('filterPanel.sortOptions.247'),
    t('filterPanel.sortOptions.nearby'),
    t('filterPanel.sortOptions.rating'),
    t('filterPanel.sortOptions.price'),
  ];

  return (
    <> 
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={handleClose}
      />
      <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-[85vh] bg-[var(--bg-primary)] p-4 z-50 shadow-lg rounded-t-2xl transition-all duration-300 ease-out overflow-y-auto
        ${isVisible ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* Drag handle */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[var(--bg-secondary)] rounded-full" />
        
        <div className="mt-6 flex flex-col gap-[24px]">
          {/* Header */}
          <div className="flex w-full justify-between items-center sticky top-0 bg-[var(--bg-primary)] py-2">
            <h2 className="text-xl text-[var(--text-primary)] font-bold">{t('filterPanel.title')}</h2>
            <button 
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[var(--bg-secondary)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="text-[var(--text-primary)]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Price */}
          <div className="space-y-4">
            <div className="flex w-full price_tags justify-between items-center text-[var(--text-primary)]">
              <span>{t('filterPanel.priceRangeLabel')}</span>
              <span className="text-[#FFC61B]">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </span>
            </div>
            <Range
              step={1}
              min={MIN}
              max={MAX}
              values={filters.priceRange}
              onChange={(values) => setFilters({ ...filters, priceRange: values })}
              renderTrack={({ props, children }) => {
                const { key, ...otherProps } = props;
                return (
                  <div key={key} {...otherProps} className="w-full h-[16px] range_input_c">
                    {children}
                  </div>
                );
              }}
              renderThumb={({ props }) => {
                const { key, ...otherProps } = props;
                return (
                  <div
                    key={key}
                    {...otherProps}
                    className="w-[4px] h-[44px] bg-[#FFC61B] rounded-full shadow"
                  />
                );
              }}
            />
          </div>

          {/* Distance */}
          <div className="space-y-4">
            <div className="flex w-full price_tags justify-between items-center text-[var(--text-primary)]">
              <span>{t('filterPanel.distanceLabel')}</span>
              <span className="text-[#FFC61B]">{filters.distance}km</span>
            </div>
            <Range
              step={1}
              min={0}
              max={50}
              values={[filters.distance]}
              onChange={(values) => handleChange("distance", values[0])}
              renderTrack={({ props, children }) => (
                <div {...props} className="w-full h-[16px] range_input_c rounded">
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="w-[4px] h-[44px] bg-[#FFC61B] rounded-full shadow"
                />
              )}
            />
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <label className="block text-[var(--text-primary)] font-medium">{t('filterPanel.ratingLabel')}</label>
            <div className="flex flex-wrap gap-2">
              {ratingOptions.map((value) => (
                <button
                  key={value}
                  onClick={() => handleChange("rating", value)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200
                    ${filters.rating === value ? "filter_active" : "bg-[var(--bg-secondary)] text-[var(--text-primary)]"}`}
                >
                  {ratingLabels[value]}
                </button>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <label className="block text-[var(--text-primary)] font-medium">{t('filterPanel.servicesLabel')}</label>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((service) => {
                const isActive = service === "All" 
                  ? filters.services.length === 0 
                  : filters.services.includes(service);
                return (
                  <button
                    key={service}
                    onClick={() => toggleService(service)}
                    className={`px-4 py-2 rounded-full text-sm transition-all duration-200
                      ${isActive ? "filter_active" : "bg-[var(--bg-secondary)] text-[var(--text-primary)]"}`}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort */}
          <div className="space-y-3">
            <label className="block text-[var(--text-primary)] font-medium">{t('filterPanel.sortByLabel')}</label>
            <div className="grid grid-cols-3 gap-2">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => handleChange("sort", option)}
                  className={`px-4 py-2 rounded-full text-sm transition-all duration-200
                    ${filters.sort === option ? "filter_active" : "bg-[var(--bg-secondary)] text-[var(--text-primary)]"}`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Apply Button */}
        <button
          onClick={applyFilters}
          className="filter_apply_button w-full mt-8 py-4 text-base font-medium"
        >
          {t('filterPanel.applyButton')}
        </button>
      </div>
    </>
  );
};

export default FilterPanel;
