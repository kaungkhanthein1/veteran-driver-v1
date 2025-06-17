import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

type ModalProps = {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onApply?: () => void;
  type?: 'default' | 'bottom';
  hideFooter?: boolean;
};

export default function Modal({ title, children, isOpen, onClose, onApply, type = 'default', hideFooter = false }: ModalProps) {
  const { t } = useTranslation();
  const [translateY, setTranslateY] = useState(0);
  const startY = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    if (isOpen) {
      setTranslateY(0); // Reset position when modal opens
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTouchStart = (e: React.TouchEvent) => {
    startY.current = e.touches[0].clientY;
    isDragging.current = true;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current) return;
    e.preventDefault(); // Prevent default scroll behavior for dragging
    const currentY = e.touches[0].clientY;
    const dy = currentY - startY.current;
    setTranslateY(Math.max(0, dy)); // Only allow dragging downwards
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    const modalContentElement = document.querySelector('.modal-content') as HTMLElement;
    const modalHeight = modalContentElement?.offsetHeight || 0;
    // Adjust threshold for closing, e.g., 25% of modal height or a fixed pixel value
    if (translateY > 100) { // Using a fixed pixel threshold for responsiveness, adjust as needed
      onClose();
    } else {
      setTranslateY(0); // Snap back
    }
  };

  if (type === 'bottom') {
    return (
      <div className="fixed inset-0 flex flex-col items-end" style={{ zIndex: 9999 }} onTouchMove={(e) => { /* Prevent scrolling on the backdrop if modal is not dragged yet */ if (!isDragging.current) e.preventDefault(); }}>
        <div className="bg-black bg-opacity-50 flex-1 w-full" onClick={onClose}></div>
        <div 
          className="bg-theme-primary rounded-t-xl w-full max-w-md mx-0 p-4 max-h-[80vh] overflow-y-auto relative modal-content"
          style={{ transform: `translateY(${translateY}px)`, transition: isDragging.current ? 'none' : 'transform 0.3s ease-out' }}
        >
          {/* Draggable indicator bar */}
          <div 
            className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gray-400 rounded-full mb-4 cursor-grab active:cursor-grabbing"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          ></div>
          <div className="flex justify-between items-center mb-2 mt-4">
            <h2 className="text-theme-primary text-xl">{title}</h2>
          </div>
          <div className="mb-2">
            {children}
          </div>
          {!hideFooter && (
            <div className="flex gap-2">
              <button 
                onClick={onClose}
                className="flex-1 py-3 bg-theme-secondary text-theme-primary font-medium rounded-lg"
              >
                {t('modal.cancelButton')}
              </button>
              <button 
                onClick={onApply} 
                className="flex-1 py-3 bg-[#FDC51B] text-black font-medium rounded-lg"
              >
                {t('modal.applyButton')}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999 }}>
      <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-theme-primary rounded-xl w-full max-w-md mx-4 p-4 relative z-10">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-theme-text text-xl">{title}</h2>
        </div>
        <div className="mb-1">
          {children}
        </div>
        <div className="flex gap-2">
          <button 
            onClick={onClose}
            className="flex-1 py-3 bg-theme-secondary text-theme-text font-medium rounded-lg"
          >
            {t('modal.cancelButton')}
          </button>
          <button 
            onClick={onApply} 
            className="flex-1 py-3 bg-[#FFC61B] text-black font-medium rounded-lg"
          >
            {t('modal.applyButton')}
          </button>
        </div>
      </div>
    </div>
  );
}