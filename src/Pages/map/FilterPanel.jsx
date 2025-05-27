import React, { useEffect, useState } from "react";
import "./map.css";
import { Range } from "react-range";

const MIN = 0;
const MAX = 1000;

const FilterPanel = ({ filters, setFilters, applyFilters, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ratingOptions = [0, 5, 4, 3, 2, 1];
  const ratingLabels = {
    0: "All",
    5: "5 Stars",
    4: "4 Stars & Above",
    3: "3 Stars & above",
    2: "2 Stars & above",
    1: "1 Star",
  };

  const serviceOptions = [
    "All",
    "Service 1",
    "Service 2",
    "Service 3",
    "Service 4",
    "Service 5",
    "Service 6",
  ];

  useEffect(() => {
    // trigger the slide-in after mount
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handlePrice = (e, index) => {
    const newRange = [...filters.priceRange];
    newRange[index] = Number(e.target.value);
    setFilters({ ...filters, priceRange: newRange });
  };

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
    "Comprehensive",
    "Open Now",
    "24/7",
    "Nearby",
    "Rating",
    "Price",
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
            <h2 className="text-xl text-[var(--text-primary)] font-bold">Filter</h2>
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
              <span>Price Range</span>
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
              <span>Distance</span>
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
            <label className="block text-[var(--text-primary)] font-medium">Rating</label>
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
            <label className="block text-[var(--text-primary)] font-medium">Services</label>
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
            <label className="block text-[var(--text-primary)] font-medium">Sort By</label>
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
          Apply
        </button>
      </div>
    </>
  );
};

export default FilterPanel;
