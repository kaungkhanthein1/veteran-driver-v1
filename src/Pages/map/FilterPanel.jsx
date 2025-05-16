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
    <div
      className={`absolute bottom-0 left-0 w-full sm:w-96 h-[90%] filter_box p-4 z-50 shadow-lg rounded-t-2xl transition-transform duration-300 ease-out
      ${isVisible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className=" flex flex-col  gap-[20px]">
        {/* header */}
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
            onChange={(values) =>
              setFilters({ ...filters, priceRange: values })
            }
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

        {/* distance */}
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
              <div {...props} className="w-full h-[16px] range_input_c rounded">
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

        {/* rating */}
        <div className="mb-4">
          <label className="block mb-2 text-white">Rating</label>
          <div className="flex flex-wrap gap-2">
            {ratingOptions.map((value) => (
              <button
                key={value}
                onClick={() => handleChange("rating", value)}
                className={`px-3 py-1 rounded-full text-sm transition 
          ${
            filters.rating === value
              ? "filter_active"
              : "filter_UnActive bg-neutral-900"
          }`}
              >
                {ratingLabels[value]}
              </button>
            ))}
          </div>
        </div>

        {/* services */}
        <div className="mb-4">
          <label className="block mb-2 text-white">Services</label>
          <div className="flex flex-wrap gap-2">
            {serviceOptions.map((service) => {
              const isActive =
                service === "All"
                  ? filters.services.length === 0
                  : filters.services.includes(service);

              return (
                <button
                  key={service}
                  onClick={() => toggleService(service)}
                  className={`px-3 py-1 rounded-full text-sm transition
            ${isActive ? "filter_active" : "filter_UnActive bg-neutral-900"}`}
                >
                  {service}
                </button>
              );
            })}
          </div>
        </div>

        {/* sort */}
        <div className="mb-4">
          <label className="block mb-2 text-white">Sort</label>
          <div className="flex flex-wrap gap-2">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleChange("sort", option)}
                className={`px-3 py-1 rounded-full text-sm transition 
          ${
            filters.sort === option
              ? "filter_active"
              : "filter_UnActive bg-neutral-900"
          }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 my-6 w-full">
          <button
            className="filter_apply_button w-full  px-4 py-[10px]"
            onClick={applyFilters}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
