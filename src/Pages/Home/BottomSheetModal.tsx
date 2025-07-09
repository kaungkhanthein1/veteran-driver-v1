import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";

interface BottomSheetModalProps {
  isExpanded: boolean;
  setIsExpanded: (expanded: boolean) => void;
  children?: React.ReactNode;
  minHeight?: number;
  expendable?: boolean;
}

export default function BottomSheetModal({
  isExpanded,
  setIsExpanded,
  children,
  minHeight = 150,
  expendable = true,
}: BottomSheetModalProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [sheetHeight, setSheetHeight] = useState(520);
  const TOP_BAR_HEIGHT = 20;
  const SHEET_MIN = minHeight;
  const [isDragging, setIsDragging] = useState(false);
  const [scrollStartY, setScrollStartY] = useState(0);
  const [isContentScrolled, setIsContentScrolled] = useState(false);

  // Snap points
  const variants = {
    open: { y: 0 },
    closed: { y: sheetHeight - SHEET_MIN },
  };

  useEffect(() => {
    const updateHeight = () => {
      const newHeight = window.innerHeight - TOP_BAR_HEIGHT;
      setSheetHeight(newHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Handle content scroll events
  useEffect(() => {
    const contentElement = contentRef.current;
    if (!contentElement) return;

    const handleScroll = () => {
      setIsContentScrolled(contentElement.scrollTop > 10);
    };

    contentElement.addEventListener('scroll', handleScroll);
    return () => contentElement.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDragStart = () => {
    setIsDragging(true);
    if (contentRef.current) {
      setScrollStartY(contentRef.current.scrollTop);
    }
  };

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    
    // If we're already at the top of the content and user drags down, collapse the sheet
    if (info.velocity.y > 20 && !isContentScrolled) {
      setIsExpanded(false);
      return;
    }
    
    // If user drags up with enough velocity, expand the sheet
    if (info.velocity.y < -20) {
      setIsExpanded(true);
      return;
    }
    
    // Otherwise, base it on the drag distance
    const threshold = (sheetHeight - SHEET_MIN) / 2;
    if (info.offset.y < -threshold) {
      setIsExpanded(true);
    } else if (info.offset.y > threshold) {
      setIsExpanded(false);
    } else {
      // Keep current state if the drag wasn't decisive
      setIsExpanded(isExpanded);
    }
  };

  // Handle content scroll behavior
  const handleContentScroll = () => {
    if (!contentRef.current) return;
    
    // If user scrolls to top, allow sheet to be collapsed
    setIsContentScrolled(contentRef.current.scrollTop > 10);
  };

  return (
    <AnimatePresence>
      <motion.div
        ref={sheetRef}
        className="fixed left-0 right-0 bottom-0 z-30 bg-theme-secondary rounded-t-2xl shadow-xl max-w-[480px] mx-auto"
        style={{ height: sheetHeight }}
        initial={expendable ? "closed" : "closed"}
        animate={expendable && isExpanded ? "open" : "closed"}
        variants={variants}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 300,
          mass: 0.8
        }}
        drag={expendable ? "y" : false}
        dragConstraints={{ top: 0, bottom: sheetHeight - SHEET_MIN }}
        dragElastic={0.1}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        dragMomentum={true}
      >
        {/* Handle bar */}
        <div
          className="w-12 h-1.5 bg-gray-400 rounded-full mx-auto mt-2 mb-4 cursor-grab active:cursor-grabbing"
        />

        {/* Content is scrollable */}
        <motion.div 
          ref={contentRef}
          className="overflow-y-auto h-[calc(100%-32px)] pb-8"
          onScroll={handleContentScroll}
          style={{ 
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
            touchAction: isExpanded && isContentScrolled ? "pan-y" : undefined
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
