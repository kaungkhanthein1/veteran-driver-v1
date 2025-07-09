import { useState, useRef, useEffect } from "react";

const LocationDescription = ({ description }: { description: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsToggle, setNeedsToggle] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);

  // Check if text needs truncation
  useEffect(() => {
    if (textRef.current) {
      const lineHeight = parseInt(getComputedStyle(textRef.current).lineHeight);
      const maxHeight = lineHeight * 3; // 3 lines
      setNeedsToggle(textRef.current.scrollHeight > maxHeight);
    }
  }, [description]);

  return (
    <div className="">
      <p
        ref={textRef}
        className={`loc-des ${!isExpanded && needsToggle ? "truncated" : ""}`}
      >
        {description}
      </p>
      <div className="flex justify-end">
        {needsToggle && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className={`text-[#FF9500] mt-1 text-sm font-medium ${
              !isExpanded ? "-mt-[22px] z-[99]" : ""
            }`}
          >
            {isExpanded ? "see less..." : "...see more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default LocationDescription;
