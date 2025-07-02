import { useEffect, useState } from "react";
import "./map.css";
import { Range } from "react-range";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import { useTheme } from "../../context/ThemeContext";
import RatingStar from '../../icons/RatingStar.svg';

const MIN = 0;
const MAX = 1000;

const FilterPanel = ({ filters, setFilters, applyFilters, onClose }: any) => {
  const { theme } = useTheme();
  // TODO: Add PropTypes for prop validation
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();
  const ratingOptions = [0, 5, 4, 3, 2, 1];
  const ratingLabels = {
    0: t("filterPanel.ratingOptions.all"),
    5: t("filterPanel.ratingOptions.5stars"),
    4: t("filterPanel.ratingOptions.4starsAbove"),
    3: t("filterPanel.ratingOptions.3starsAbove"),
    2: t("filterPanel.ratingOptions.2starsAbove"),
    1: t("filterPanel.ratingOptions.1star"),
  };

  const serviceOptions = [
    t("filterPanel.serviceOptions.all"),
    t("filterPanel.serviceOptions.service1"),
    t("filterPanel.serviceOptions.service2"),
    t("filterPanel.serviceOptions.service3"),
    t("filterPanel.serviceOptions.service4"),
    t("filterPanel.serviceOptions.service5"),
    t("filterPanel.serviceOptions.service6"),
  ];

  const categoryOptions = [
    t("filterPanel.categoryOptions.all"),
    t("filterPanel.categoryOptions.hotel"),
    t("filterPanel.categoryOptions.massage"),
    t("filterPanel.categoryOptions.club"),
    t("filterPanel.categoryOptions.bar")
  ];
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    // trigger the slide-in after mount
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleChange = (key: any, value: any) => {
    setFilters({ ...filters, [key]: value });
  };

  const toggleService = (service: any) => {
    if (service === "All") {
      setFilters({ ...filters, services: [] });
    } else {
      const exists = filters.services.includes(service);
      const newServices = exists
        ? filters.services.filter((s: any) => s !== service)
        : [...filters.services, service];
      setFilters({ ...filters, services: newServices });
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(), 300); // delay unmount after animation
  };

  const sortOptions = [
    t("filterPanel.sortOptions.comprehensive"),
    t("filterPanel.sortOptions.openNow"),
    t("filterPanel.sortOptions.247"),
    t("filterPanel.sortOptions.nearby"),
    t("filterPanel.sortOptions.rating"),
    t("filterPanel.sortOptions.price"),
  ];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={handleClose} />
      <div
        className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] h-[calc(95vh-50px)] bg-[var(--bg-primary)] p-4 z-[1000] shadow-lg rounded-t-2xl transition-all duration-300 ease-out overflow-y-auto
        ${isVisible ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* Drag handle */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-[#232323] rounded-[8px]" />

        <div className="mt-6 flex flex-col gap-[24px]">
          {/* Header */}
          <div className="flex w-full justify-between items-center top-0 bg-[var(--bg-primary)] py-2">
            <h2 className="text-xl text-[var(--text-primary)] font-bold">
              {t("filterPanel.title")}
            </h2>
            <button
              onClick={handleClose}
              className="w-8 h-8 flex items-center justify-center rounded-[8px] hover:bg-[var(--bg-secondary)]"
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
          <div className="space-y-8">
            <div className="flex w-full price_tags justify-between items-center text-[var(--text-primary)]">
              <span
                className="text-lg font-bold"
              >
                {t("filterPanel.priceRangeLabel")}
              </span>
            </div>

            <div className="relative w-full">
              {/* Tooltip */}
              <div
                className="absolute left-1/2 -translate-x-1/2 -top-10 z-10 flex flex-col items-center"
                style={{ pointerEvents: 'none' }}
              >
                <div className="bg-[#232323] text-white text-xs font-semibold rounded-md px-3 py-2 shadow-lg flex items-center justify-center whitespace-nowrap">
                  {`${filters.priceRange[0]} USD to ${filters.priceRange[1]} USD`}
                </div>
                <svg width="16" height="6" viewBox="0 0 16 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 6L0 0H16L8 6Z" fill="#232323"/>
                </svg>
              </div>
              <Range
                step={1}
                min={MIN}
                max={MAX}
                values={filters.priceRange}
                onChange={(values) =>
                  setFilters({ ...filters, priceRange: values })
                }
                renderTrack={({ props, children }) => {
                  const [minVal, maxVal] = filters.priceRange;
                  const minPercent = ((minVal - MIN) / (MAX - MIN)) * 100;
                  const maxPercent = ((maxVal - MIN) / (MAX - MIN)) * 100;
                  return (
                    <div
                      {...props}
                      className="w-full h-[12px] rounded-full relative bg-theme-secondary"
                    >
                      <div
                        className="absolute h-full rounded-full"
                        style={{
                          left: `${minPercent}%`,
                          width: `${maxPercent - minPercent}%`,
                          background: '#FFC61B',
                          top: 0,
                          bottom: 0,
                        }}
                      />
                      {children}
                    </div>
                  );
                }}
                renderThumb={({ props }) => (
                  <div
                    {...props}
                    className="w-[28px] h-[28px] rounded-full bg-white shadow-lg border border-[#EDEDED]"
                    style={{
                      ...props.style,
                      boxShadow: '0 2px 8px 0 rgba(0,0,0,0.08)',
                      border: '2px solid #EDEDED',
                    }}
                  />
                )}
              />
            </div>
          </div>

          {/* Rating */}
          <div className="space-y-3">
            <label className="block text-[var(--text-primary)] font-medium">
              <span className="text-lg font-bold">{t("filterPanel.ratingLabel")}</span>
              <span className="text-sm text-gray-400 ml-1">. at least</span>
            </label>
            <div className="flex flex-nowrap gap-2 overflow-x-auto no-scrollbar">
              {/* All chip */}
              <button
                onClick={() => handleChange("rating", 0)}
                className={"px-5 py-1 h-9 rounded-[10px] border border-[#E0E0E0] text-base font-[500] flex items-center gap-1 whitespace-nowrap"}
                style={filters.rating === 0 ? { background: 'rgba(255, 195, 0, 0.20)', color: '#FFAE00' } : { background: '#fff', color: '#FFAE00' }}
              >
                All
              </button>
              {/* Number chips */}
              {[2.5, 3.5, 4.5].map((num) => (
                <button
                  key={num}
                  onClick={() => handleChange("rating", num)}
                  className={"px-5 py-1 h-9 rounded-[10px] border border-[#E0E0E0] text-base font-[500] flex items-center gap-1 whitespace-nowrap"}
                  style={filters.rating === num ? { background: 'rgba(255, 195, 0, 0.20)', color: '#FFAE00' } : { background: '#fff', color: '#000' }}
                >
                  {num}
                  <img src={RatingStar} alt="star" className="w-4 h-4 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* category */}
          <div className="space-y-3">
            <label className="block text-[var(--text-primary)] font-medium">
              <span className="text-lg font-bold">Categories</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {categoryOptions.map((category: any) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={"px-3 py-1 h-8 rounded-[8px] border border-[#E0E0E0] text-sm font-[500] flex items-center gap-1 whitespace-nowrap"}
                    style={isActive ? { background: 'rgba(255, 195, 0, 0.20)', color: '#FFAE00' } : { background: '#fff', color: '#000' }}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Services */}
          <div className="space-y-3">
            <label className="block text-[var(--text-primary)] font-medium">
              <span className="text-lg font-bold">{t("filterPanel.servicesLabel")}</span>
            </label>
            <div className="flex flex-wrap gap-2">
              {serviceOptions.map((service: any) => {
                const isActive =
                  service === "All"
                    ? filters.services.length === 0
                    : filters.services.includes(service);
                return (
                  <button
                    key={service}
                    onClick={() => toggleService(service)}
                    className={"px-3 py-1 h-8 rounded-[8px] border border-[#E0E0E0] text-sm font-[500] flex items-center gap-1 whitespace-nowrap"}
                    style={isActive ? { background: 'rgba(255, 195, 0, 0.20)', color: '#FFAE00' } : { background: '#fff', color: '#000' }}
                  >
                    {service}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sort */}
          <div className="space-y-3">
            <label className="block text-[var(--text-primary)] font-medium">
              <span className="text-lg font-bold">{t("filterPanel.sortByLabel")}</span>
            </label>
            <div className="w-full flex rounded-[16px] border border-[#E0E0E0] overflow-hidden">
              {['Relevance', 'Distance'].map((option: string, idx) => (
                <button
                  key={option}
                  onClick={() => handleChange("sort", option)}
                  className={`flex-1 py-3 text-base font-[500] transition-colors duration-150 ${filters.sort === option ? '' : ''}`}
                  style={filters.sort === option
                    ? { background: 'rgba(255, 195, 0, 0.20)', color: '#FFAE00', border: 'none' }
                    : { background: '#fff', color: '#000', border: 'none' }}
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
          className="sticky bottom-0 w-full mt-8 py-[16px] font-medium rounded-[100px] border-0"
          style={{ background: 'linear-gradient(180deg, #FFC61B 0%, #FF9500 100%)', color: '#fff' }}
        >
          {t("filterPanel.applyButton")}
        </button>
      </div>
    </>
  );
};

FilterPanel.propTypes = {
  filters: PropTypes.shape({
    priceRange: PropTypes.arrayOf(PropTypes.number).isRequired,
    distance: PropTypes.number.isRequired,
    rating: PropTypes.number.isRequired,
    services: PropTypes.arrayOf(PropTypes.string).isRequired,
    sort: PropTypes.string.isRequired,
  }).isRequired,
  setFilters: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default FilterPanel;