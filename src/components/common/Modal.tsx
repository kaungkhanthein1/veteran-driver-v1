import React from 'react';
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

  const [{ y, opacity }, api] = useSpring(() => ({
    y: isOpen ? 0 : window.innerHeight,
    opacity: isOpen ? 1 : 0,
    config: { tension: 300, friction: 20 },
    immediate: true
  }));

  const animatedPointerEvents = opacity.to((o) => (o > 0 ? 'auto' : 'none'));

  React.useEffect(() => {
    if (isOpen) {
      api.start({ y: 0, opacity: 1, immediate: true });
    } else {
      api.start({ y: window.innerHeight, opacity: 0, immediate: false });
    }
  }, [isOpen, api]);

  const bind = useDrag(
    ({ last, movement: [, my], velocity: [, vy], direction: [, dy] }: FullGestureState<'drag'>) => {
      if (last) {
        if (my > 100 || (vy > 0.5 && dy > 0)) {
          api.start({ y: window.innerHeight, opacity: 0, onRest: onClose });
        } else {
          api.start({ y: 0, opacity: 1 });
        }
      } else {
        api.start({ y: Math.max(0, my), immediate: true });
      }
    },
    { 
      from: () => [0, y.get()], 
      bounds: { top: 0 }, 
      rubberband: true,
      axis: 'y' 
    }
  );

  if (!isOpen && opacity.get() === 0) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (type === 'bottom') {
    return (
      <animated.div 
        className="fixed inset-0 flex items-end justify-center z-[9999]" 
        style={{ 
          opacity, 
          pointerEvents: animatedPointerEvents,
          visibility: opacity.to(o => o === 0 ? 'hidden' : 'visible')
        }}
        onClick={handleBackdropClick}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />
        <animated.div 
          className="bg-[#F8F9FB] rounded-t-xl w-full sm:max-w-md mx-0 p-4 max-h-[80vh] overflow-y-auto overflow-x-auto relative z-10 modal-content min-w-[304px]"
          style={{ y, minWidth: 304 }}
          onClick={handleContentClick}
        >
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
    <animated.div 
      className="fixed inset-0 flex items-center justify-center z-[9999]" 
      style={{ 
        opacity, 
        pointerEvents: animatedPointerEvents,
        visibility: opacity.to(o => o === 0 ? 'hidden' : 'visible')
      }}
      onClick={handleBackdropClick}
    >
      <div className="bg-black bg-opacity-50 absolute inset-0 z-0" />
      <div 
        className="bg-theme-primary rounded-xl w-full max-w-md mx-4 p-4 relative z-10 overflow-x-auto"
        onClick={handleContentClick}
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