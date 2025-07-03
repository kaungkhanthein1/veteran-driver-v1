import React from "react";
import TuneIcon from '../../icons/Tune.svg';
import DropIcon from '../../icons/Drop.svg';

interface SearchFilterBarProps {
  onTuneClick?: () => void;
  onSortClick?: () => void;
  onServicesClick?: () => void;
  onCategoriesClick?: () => void;
  sortLabel?: string;
  selectedSortLabel?: string;
  servicesLabel?: string;
  selectedServicesLabel?: string;
  categoriesLabel?: string;
  selectedCategoriesLabel?: string;
  children?: React.ReactNode;
}

const SearchFilterBar: React.FC<SearchFilterBarProps> = ({
  onTuneClick,
  onSortClick,
  onServicesClick,
  onCategoriesClick,
  sortLabel = 'Sort By',
  selectedSortLabel = 'Sort By',
  servicesLabel = 'Services',
  selectedServicesLabel = 'Services',
  categoriesLabel = 'Categories',
  selectedCategoriesLabel = 'Categories',
  children,
}) => {
  const isSortSelected = selectedSortLabel && selectedSortLabel !== 'Sort By';
  const isServicesSelected = selectedServicesLabel && selectedServicesLabel !== 'Services';
  const isCategoriesSelected = selectedCategoriesLabel && selectedCategoriesLabel !== 'Categories';
  return (
    <div className="w-full pt-0 pb-2 z-20 bg-transparent">
      <div className="flex items-center gap-3 overflow-x-auto no-scrollbar bg-transparent px-2">
        {/* Tune icon chip */}
        <button
          className="flex items-center justify-center rounded-full border border-gray-200 bg-white w-10 h-10 min-w-[40px] min-h-[40px]"
          onClick={onTuneClick}
        >
          <img src={TuneIcon} alt="Filter" className="w-5 h-5 [filter:var(--icon-filter)]" />
        </button>
        {/* Sort By chip */}
        <button
          className="flex items-center justify-center rounded-full border border-gray-200 bg-white h-10 min-w-[100px] px-5 text-sm font-medium whitespace-nowrap"
          onClick={onSortClick}
        >
          <span style={isSortSelected ? { color: '#FFAE00' } : { color: '#000' }}>
            {isSortSelected ? selectedSortLabel : sortLabel}
          </span>
          <img src={DropIcon} alt="▼" className="w-3 h-3 ml-2" style={{ filter: isSortSelected ? 'invert(62%) sepia(98%) saturate(1000%) hue-rotate(0deg) brightness(101%) contrast(101%)' : 'none' }} />
        </button>
        {/* Services chip */}
        <button
          className="flex items-center justify-center rounded-full border border-gray-200 bg-white h-10 min-w-[100px] px-5 text-sm font-medium whitespace-nowrap"
          onClick={onServicesClick}
        >
          <span style={isServicesSelected ? { color: '#FFAE00' } : { color: '#000' }}>
            {isServicesSelected ? selectedServicesLabel : servicesLabel}
          </span>
          <img src={DropIcon} alt="▼" className="w-3 h-3 ml-2" style={{ filter: isServicesSelected ? 'invert(62%) sepia(98%) saturate(1000%) hue-rotate(0deg) brightness(101%) contrast(101%)' : 'none' }} />
        </button>
        {/* Categories chip */}
        <button
          className="flex items-center justify-center rounded-full border border-gray-200 bg-white h-10 min-w-[100px] px-5 text-sm font-medium whitespace-nowrap"
          onClick={onCategoriesClick}
        >
          <span style={isCategoriesSelected ? { color: '#FFAE00' } : { color: '#000' }}>
            {isCategoriesSelected ? selectedCategoriesLabel : categoriesLabel}
          </span>
          <img src={DropIcon} alt="▼" className="w-3 h-3 ml-2" style={{ filter: isCategoriesSelected ? 'invert(62%) sepia(98%) saturate(1000%) hue-rotate(0deg) brightness(101%) contrast(101%)' : 'none' }} />
        </button>
        {/* Additional chips from children */}
        {children}
      </div>
    </div>
  );
};

export default SearchFilterBar; 