import React from "react";

const Near = () => {
  const exploreItems = [
    {
      id: 1,
      name: "BUGARIA",
      price: "50 USD",
      rating: 5.0,
      reviews: 128,
      distance: "12km away",
      services: ["Service 1", "Service 2", "Service3"],
      type: "Hotel",
    },
    {
      id: 2,
      name: "HARRIER",
      price: "50 USD",
      rating: 5.0,
      reviews: 128,
      distance: "12km away",
      services: ["Service 1", "Service 2", "Service3"],
      type: "Hotel",
    },
  ];
  return (
    <div className="px-4 py-[20px]">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-theme-primary text-lg font-semibold">Nearest Places</h2>
        <button className="text-[#FFC61B] text-sm">View All</button>
      </div>
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {[1, 2].map((num) => (
          <div
            key={num}
            className="relative min-w-[300px] h-[200px] bg-theme-secondary rounded-lg overflow-hidden"
          >
            <div className="absolute hidden top-0 left-0 w-12 h-12 bg-theme-primary bg-opacity-50 flex items-center justify-center rounded-br-lg">
              <span
                className="text-transparent text-[32px] font-bold tracking-[1.28px]"
                style={{
                  fontFamily: "Heebo",
                  fontVariantNumeric: "lining-nums proportional-nums",
                  fontFeatureSettings: "'dlig' on",
                  WebkitTextStrokeWidth: "1px",
                  WebkitTextStrokeColor: "#FFF",
                  textEdge: "cap",
                  leadingTrim: "both",
                  lineHeight: "20px",
                }}
              >
                {num}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-theme-primary font-semibold text-lg">
                {exploreItems[num - 1].name}
              </div>
              <div className="text-[#FFC61B] font-medium">
                {exploreItems[num - 1].price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Near;
