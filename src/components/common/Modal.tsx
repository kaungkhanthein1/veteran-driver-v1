import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSpring, animated } from '@react-spring/web';
import { useDrag, FullGestureState } from '@use-gesture/react';

type ModalProps = {
  title?: string;
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onApply?: () => void;
  type?: 'default' | 'bottom';
  hideFooter?: boolean;
  showDragHandle?: boolean;
};

export default function Modal({ title, children, isOpen, onClose, onApply, type = 'default', hideFooter = false, showDragHandle = true }: ModalProps) {
  const { t } = useTranslation();

  // Debug logging
  useEffect(() => {
    console.log("Modal - isOpen changed:", isOpen);
  }, [isOpen]);

  // Spring for modal animation including opacity and pointerEvents
  const [{ y, opacity }, api] = useSpring(() => ({
    y: isOpen ? 0 : window.innerHeight,
    opacity: isOpen ? 1 : 0,
    config: { tension: 170, friction: 26 },
  }));

  const animatedPointerEvents = opacity.to((o) => (o > 0 ? 'auto' : 'none'));

  // Animate in/out based on isOpen prop
  useEffect(() => {
    console.log("Modal - Starting animation for isOpen:", isOpen);
    api.start({ 
      y: isOpen ? 0 : window.innerHeight, 
      opacity: isOpen ? 1 : 0, 
    });
  }, [isOpen, api]);

  // Drag logic using useDrag
  const bind = useDrag(
    ({ last, movement: [, my], velocity: [, vy], direction: [, dy] }: FullGestureState<'drag'>) => {
      if (last) {
        // Determine if modal should close or snap back
        if (my > 100 || (vy > 0.5 && dy > 0)) { // Dragged down more than 100px or fast enough downwards
          api.start({ y: window.innerHeight, opacity: 0, onRest: onClose }); // Animate off-screen, then close
        } else {
          api.start({ y: 0, opacity: 1 }); // Snap back
        }
      } else {
        api.start({ y: Math.max(0, my), immediate: true }); // Follow the drag
      }
    },
    { 
      from: () => [0, y.get()], 
      bounds: { top: 0 }, 
      rubberband: true,
      axis: 'y' 
    }
  );

  // Debug render
  console.log("Modal - Rendering with isOpen:", isOpen, "opacity:", opacity.get());

  // Only return null if not open AND not animating out (opacity is 0)
  if (!isOpen && opacity.get() === 0) {
    console.log("Modal - Returning null because !isOpen && opacity === 0");
    return null;
  }

  if (type === 'bottom') {
    return (
      <animated.div className="fixed inset-0 flex flex-col items-end" style={{ zIndex: 9999, opacity, pointerEvents: animatedPointerEvents }}>
        <div 
          className="bg-black bg-opacity-40 flex-1 w-full" 
          onClick={(e) => {
            // Only close if clicking directly on the backdrop
            if (e.target === e.currentTarget) {
              console.log("Modal - Backdrop clicked, closing");
              onClose();
            }
          }}
        />
        <animated.div 
          className="bg-theme-primary rounded-t-xl w-full max-w-md mx-0 p-4 max-h-[80vh] overflow-y-auto relative modal-content"
          style={{ y }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Draggable indicator bar - conditionally rendered */}
          {showDragHandle && (
            <div 
              className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-1.5 bg-gray-400 rounded-full mb-4 cursor-grab active:cursor-grabbing"
              style={{ touchAction: 'none' }}
              {...bind()}
            />
          )}
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
                className="flex-1 py-3 bg-[#FFC61B] text-black font-medium rounded-lg"
              >
                {t('modal.applyButton')}
              </button>
            </div>
          )}
        </animated.div>
      </animated.div>
    );
  }

  return (
    <animated.div className="fixed inset-0 flex items-center justify-center" style={{ zIndex: 9999, opacity, pointerEvents: animatedPointerEvents }}>
      <div 
        className="bg-black bg-opacity-50 absolute inset-0" 
        onClick={(e) => {
          // Only close if clicking directly on the backdrop
          if (e.target === e.currentTarget) {
            console.log("Modal - Backdrop clicked, closing");
            onClose();
          }
        }}
      />
      <div 
        className="bg-theme-primary rounded-xl w-full max-w-md mx-4 p-4 relative z-10"
        onClick={(e) => e.stopPropagation()}
      >
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
    </animated.div>
  );
}