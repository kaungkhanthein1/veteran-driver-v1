import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopPicks = ({ items, title = "Top Picks" }) => {
  const navigate = useNavigate();

  return (
    <div className="px-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-theme-primary text-lg font-semibold">{title}</h2>
        <button className="text-[#FFC61B] text-sm">View All</button>
      </div>
      <div className="flex space-x-3 overflow-x-auto pb-2">
        {items.map((item, index) => (
          <div 
            key={item.id} 
            className="relative min-w-[200px] h-32 bg-theme-secondary rounded-lg overflow-hidden cursor-pointer"
            onClick={() => navigate(`/location/${item.id}`, { state: { locationData: item } })}
            style={{
              backgroundImage: `url(${item.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div className="absolute top-0 left-0 w-12 h-12 bg-theme-primary bg-opacity-50 flex items-center justify-center rounded-br-lg">
              <span 
                className="text-transparent text-[32px] font-bold tracking-[1.28px]"
                style={{
                  fontFamily: 'Heebo',
                  fontVariantNumeric: 'lining-nums proportional-nums',
                  fontFeatureSettings: "'dlig' on",
                  WebkitTextStrokeWidth: '1px',
                  WebkitTextStrokeColor: 'var(--text-primary)',
                  textEdge: 'cap',
                  leadingTrim: 'both',
                  lineHeight: '20px'
                }}
              >
                {index + 1}
              </span>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
              <div className="text-theme-primary font-semibold text-lg">{item.name}</div>
              <div className="text-[#FFC61B] font-medium">{item.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPicks;