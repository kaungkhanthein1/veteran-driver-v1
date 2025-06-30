import React, { useRef, useEffect, useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import MainContent from "./MainContent";

export default function BottomSheetModal() {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [sheetHeight, setSheetHeight] = useState(520);
  const TOP_BAR_HEIGHT = 155; // px, updated to match actual TopBar height
  const SHEET_MIN = 380; // collapsed height
  const isExpandedRef = useRef(false);

  // Snap points: collapsed and expanded
  const openY = 0;
  const closedY = sheetHeight - SHEET_MIN;

  const [{ y }, api] = useSpring(() => ({ y: closedY }));

  // Always use the latest closedY/openY
  useEffect(() => {
    api.start({ y: isExpandedRef.current ? openY : closedY, immediate: true });
    // eslint-disable-next-line
  }, [sheetHeight]);

  useEffect(() => {
    const updateHeight = () => {
      const newHeight = window.innerHeight - TOP_BAR_HEIGHT;
      setSheetHeight(newHeight);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  const bind = useDrag(({ last, movement: [, my], velocity: [, vy], direction: [, dy], cancel }) => {
    let newY = my + y.get();
    const latestClosedY = sheetHeight - SHEET_MIN;
    newY = Math.max(openY, Math.min(latestClosedY, newY));
    if (last) {
      if (newY < latestClosedY / 2) {
        api.start({ y: openY });
        isExpandedRef.current = true;
      } else {
        api.start({ y: latestClosedY });
        isExpandedRef.current = false;
      }
    } else {
      api.start({ y: newY, immediate: true });
    }
  }, {
    from: () => [0, y.get()],
    bounds: { top: openY, bottom: closedY },
    axis: 'y',
    rubberband: true,
  });

  return (
    <animated.div
      ref={sheetRef}
      className="fixed left-0 right-0 bottom-0 z-30 bg-theme-secondary rounded-t-2xl shadow-xl max-w-[480px] mx-auto"
      style={{
        y,
        height: sheetHeight,
        touchAction: 'none',
      }}
    >
      {/* Drag handle */}
      <div
        className="w-12 h-1.5 bg-gray-400 rounded-full mx-auto mt-2 mb-4 cursor-grab active:cursor-grabbing"
        {...bind()}
        style={{ touchAction: 'none' }}
      />
      {/* Main content */}
      <div className="overflow-y-auto h-[calc(100%-32px)] pb-8">
        <MainContent />
      </div>
    </animated.div>
  );
}
