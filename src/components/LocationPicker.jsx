import React from 'react';
import { useNavigate } from 'react-router-dom';
import useLocation from '../hooks/useLocation';

const LocationPicker = ({ 
  onLocationSelect, 
  buttonClassName = "", 
  returnPath = "" 
}) => {
  const navigate = useNavigate();
  const { getCurrentLocation, loading } = useLocation();

  const handleLocationClick = async () => {
    try {
      const location = await getCurrentLocation();
      
      if (returnPath) {
        navigate('/map', {
          state: {
            selectedLocation: location,
            returnPath: returnPath
          }
        });
      } else if (onLocationSelect) {
        onLocationSelect(location);
      }
    } catch (error) {
      alert("Could not get your location. Please try again.");
    }
  };

  return (
    <button 
      onClick={handleLocationClick}
      disabled={loading}
      className={`flex items-center justify-center gap-2 text-theme-primary ${
        loading ? 'opacity-50' : ''
      } ${buttonClassName}`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
        />
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
        />
      </svg>
      {loading ? 'Getting location...' : 'Add Location'}
    </button>
  );
};

export default LocationPicker;