import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const CustomDropdown = ({ options, value, onChange, placeholder, className, name, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(option => option.value === value);

  const handleOptionClick = (optionValue) => {
    onChange({ target: { name: name, value: optionValue } });
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        className="relative z-20 w-full bg-theme-secondary rounded-lg px-3 py-4 text-md text-theme-primary placeholder-theme-secondary flex items-center justify-between disabled:opacity-50 disabled:cursor-not-allowed h-[48px]"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
      >
        <span className="flex items-center">
          {selectedOption?.flag && <span className="mr-2 text-lg flex-shrink-0">{selectedOption.flag}</span>}
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
        </span>
        {/* Dropdown arrow icon */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} flex-shrink-0`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-30 mt-1 w-full bg-theme-secondary rounded-md shadow-lg max-h-[200px] overflow-y-auto">
          <ul className="py-1">
            {options.map(option => (
              <li
                key={option.value}
                className={`px-4 py-2 cursor-pointer hover:bg-theme-primary-light ${selectedOption?.value === option.value ? 'bg-theme-primary-light' : ''} text-lg`}
                onClick={() => handleOptionClick(option.value)}
              >
                <span className="flex items-center">
                  {option.flag && <span className="mr-2 text-lg flex-shrink-0">{option.flag}</span>}
                  <span className="truncate">{option.label}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

CustomDropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any.isRequired,
    label: PropTypes.node.isRequired,
    flag: PropTypes.node,
  })).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default CustomDropdown; 