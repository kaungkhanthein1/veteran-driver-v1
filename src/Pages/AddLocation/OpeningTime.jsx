import React from 'react';
import SetTimeIcon from '../../icons/SetTime.svg';

const OpeningTime = ({ formData, setFormData }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sun', 'Sat'];

  const handleDayToggle = (day) => {
    setFormData(prev => ({
      ...prev,
      openingTime: {
        ...prev.openingTime,
        selectedDays: prev.openingTime.selectedDays.includes(day)
          ? prev.openingTime.selectedDays.filter(d => d !== day)
          : [...prev.openingTime.selectedDays, day]
      }
    }));
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Opening Time *</h2>
      
      <div className="flex items-center justify-between bg-[#232323] rounded-lg px-4 py-3">
        <div>
          <p>Our services are available 24/7.</p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={formData.openingTime.is24Hours}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              openingTime: { ...prev.openingTime, is24Hours: e.target.checked }
            }))}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FDC51B]"></div>
        </label>
      </div>

      <button className="w-full bg-[#232323] rounded-lg px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <img 
            src={SetTimeIcon} 
            alt="Set Time" 
            className="w-5 h-5 mr-2"
            style={{ filter: 'invert(76%) sepia(41%) saturate(845%) hue-rotate(338deg) brightness(101%) contrast(103%)' }}
          />
          <span>Set Opening Time</span>
        </div>
        <span className="text-gray-400">Not Set</span>
      </button>

      <div className="flex flex-wrap gap-2">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => handleDayToggle(day)}
            className={`px-4 py-2 rounded-full text-sm ${
              formData.openingTime.selectedDays.includes(day)
                ? 'bg-[#FDC51B] text-black'
                : 'bg-[#232323] text-white'
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OpeningTime;