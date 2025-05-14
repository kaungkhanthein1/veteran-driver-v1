import React, { useEffect, useState } from "react";
import "./map.css";
import { Range } from "react-range";

const MIN = 0;
const MAX = 1000;

const FilterPanel = ({ filters, setFilters, applyFilters, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

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
    const exists = filters.services.includes(service);
    const newServices = exists
      ? filters.services.filter((s) => s !== service)
      : [...filters.services, service];
    setFilters({ ...filters, services: newServices });
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // delay unmount after animation
  };

  return (
    <div
      className={`absolute bottom-0 left-0 w-full sm:w-96 h-[85%] filter_box p-4 z-50 shadow-lg rounded-t-2xl transition-transform duration-300 ease-out
      ${isVisible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className=" flex w-full justify-between items-center">
        <h2 className="text-xl text-white font-bold mb-4">Filter</h2>
        <svg
          onClick={handleClose}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M6.4 19L5 17.6L10.6 12L5 6.4L6.4 5L12 10.6L17.6 5L19 6.4L13.4 12L19 17.6L17.6 19L12 13.4L6.4 19Z"
            fill="white"
          />
        </svg>
      </div>

      {/* price */}
      <div className="mb-4">
        <div className="flex w-full price_tags justify-between items-center py-[10px]">
          <span>Price:</span>
          <span>
            {filters.priceRange[0]}$- {filters.priceRange[1]}$
          </span>
        </div>
        <Range
          step={1}
          min={MIN}
          max={MAX}
          values={filters.priceRange}
          onChange={(values) => setFilters({ ...filters, priceRange: values })}
          renderTrack={({ props, children }) => (
            <div {...props} className="w-full h-[16px] range_input_c">
              {children}
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              className="w-[4px] h-[44px] bg-[#FFC61B] rounded-full shadow"
            />
          )}
        />
      </div>

      <div className="mb-4">
        <div className="flex w-full price_tags justify-between items-center py-[10px]">
          <span>Distance</span>
          <span>0km - {filters.distance}km</span>
        </div>{" "}
        <Range
          step={1}
          min={0}
          max={50}
          values={[filters.distance]}
          // onChange={(e) => handleChange("distance", Number(e.target.value))}
          onChange={(values) => handleChange("distance", values[0])}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className="w-full h-[16px] range_input_c rounded"
            >
              {children}
            </div>
          )}
          renderThumb={({ props, index }) => (
            <div
              {...props}
              className="w-[4px] h-[44px] bg-[#FFC61B] rounded-full shadow"
            />
          )}
        />
      </div>

      <div className="mb-4">
        <label>Rating (min):</label>
        <input
          type="number"
          min="0"
          max="5"
          value={filters.rating}
          onChange={(e) => handleChange("rating", Number(e.target.value))}
        />
      </div>

      <div className="mb-4">
        <label>Services:</label>
        <div>
          <label>
            <input
              type="checkbox"
              checked={filters.services.includes("Service 1")}
              onChange={() => toggleService("Service 1")}
            />{" "}
            Service 1
          </label>
          <br />
          <label>
            <input
              type="checkbox"
              checked={filters.services.includes("Service 2")}
              onChange={() => toggleService("Service 2")}
            />{" "}
            Service 2
          </label>
        </div>
      </div>

      <div className="flex gap-2 mt-6">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={applyFilters}
        >
          Apply
        </button>
        <button className="bg-gray-300 px-4 py-2 rounded" onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default FilterPanel;
