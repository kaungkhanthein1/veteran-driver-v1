import React from 'react';

export default function Modal({ title, children, isOpen, onClose, onApply, type = 'default' }) {
  if (!isOpen) return null;

  if (type === 'bottom') {
    return (
      <div className="fixed inset-0 flex flex-col justify-end">
        <div className="bg-black bg-opacity-50 flex-1" onClick={onClose}></div>
        <div className="bg-[#1C1C1E] rounded-t-xl w-full p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-xl">{title}</h2>
            <button onClick={onClose} className="text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="mb-4">
            {children}
          </div>
          <div className="flex gap-4">
            <button 
              onClick={onClose}
              className="flex-1 py-3 bg-[#2C2C2E] text-white font-medium rounded-lg"
            >
              Cancel
            </button>
            <button 
              onClick={onApply} 
              className="flex-1 py-3 bg-[#FDC51B] text-black font-medium rounded-lg"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-[#1C1C1E] rounded-xl w-full max-w-md mx-4 p-4 relative z-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-white text-xl">{title}</h2>
          <button onClick={onClose} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="mb-4">
          {children}
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onClose}
            className="flex-1 py-3 bg-[#2C2C2E] text-white font-medium rounded-lg"
          >
            Cancel
          </button>
          <button 
            onClick={onApply} 
            className="flex-1 py-3 bg-[#FDC51B] text-black font-medium rounded-lg"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}