import React from 'react';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '../icons/ArrowBack.svg';

export default function BackButton({ className = '' }) {
  const navigate = useNavigate();

  return (
    <button 
      className={`p-2 -ml-2 ${className}`}
      onClick={() => navigate(-1)}
    >
      <img 
        src={ArrowBackIcon} 
        alt="Back" 
        className="w-6 h-6 [filter:var(--icon-filter)]"
      />
    </button>
  );
}