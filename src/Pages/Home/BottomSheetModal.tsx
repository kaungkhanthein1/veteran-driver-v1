import React, { useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";
import MainContent from "./MainContent";

const SHEET_HEIGHT = 520; // px, expanded height
const SHEET_MIN = 280; // collapsed height, shows more of the cards

export default function BottomSheetModal() {
  const sheetRef = useRef<HTMLDivElement>(null);
  const [{ y }, api] = useSpring(() => ({ y: SHEET_HEIGHT - SHEET_MIN }));

  // Snap points: collapsed and expanded
  const openY = 0;
  const closedY = SHEET_HEIGHT - SHEET_MIN;

  const bind = useDrag(({ last, movement: [, my], velocity: [, vy], direction: [, dy], cancel }) => {
    let newY = my + y.get();
    newY = Math.max(openY, Math.min(closedY, newY));
    if (last) {
      // Snap to closest point
      if (newY < closedY / 2) {
        api.start({ y: openY });
      } else {
        api.start({ y: closedY });
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
      className="fixed left-0 right-0 bottom-0 z-30 bg-theme-primary rounded-t-2xl shadow-xl max-w-[480px] mx-auto"
      style={{
        y,
        height: SHEET_HEIGHT,
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
