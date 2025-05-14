import React from "react";

export default function ExploreCard({ item }) {
  return (
    <div className="bg-[#232323] rounded-lg overflow-hidden">
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-2 relative">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className={`aspect-square bg-[#181818] rounded-lg ${
                index === 2 ? "relative" : ""
              }`}
            >
              {index === 2 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
          <button className="absolute -top-1 right-0">
            <svg className="w-6 h-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-white font-semibold">{item.name}</h3>
            <span className="text-gray-400 text-sm">{item.distance}</span>
          </div>
          <div className="flex items-center space-x-1 mt-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
              ))}
              <span className="text-white ml-1 text-sm">{item.rating}</span>
            </div>
            <span className="text-gray-400 text-sm">({item.reviews})</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-gray-400">
          {item.services.map((service, index) => (
            <React.Fragment key={index}>
              <span>{service}</span>
              {index < item.services.length - 1 && (
                <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-yellow-400 font-medium">{item.price}</span>
          <button className="bg-yellow-400 text-black px-4 py-1.5 rounded-full text-sm font-medium">
            View Place
          </button>
        </div>
      </div>
    </div>
  );
}