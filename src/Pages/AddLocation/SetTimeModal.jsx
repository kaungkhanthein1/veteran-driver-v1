import React, { useState } from 'react';
import ScheduleIcon from '../../icons/Schedule.svg';

const SetTimeModal = ({ isOpen, onClose, onSave, initialTime }) => {
  const [hour, setHour] = useState(initialTime?.hour || 12);
  const [minute, setMinute] = useState(initialTime?.minute || 0);
  const [period, setPeriod] = useState(initialTime?.period || 'AM');
  const [focusedInput, setFocusedInput] = useState(null);

  const handleSave = () => {
    onSave({ hour, minute, period });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-theme-primary bg-opacity-50 flex items-center justify-center">
      <div className="bg-theme-primary rounded-lg p-6 w-[300px]">
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1 text-center">
            <input
              type="number"
              value={hour}
              onChange={(e) => setHour(Math.min(12, Math.max(1, parseInt(e.target.value) || 0)))}
              onFocus={() => setFocusedInput('hour')}
              onBlur={() => setFocusedInput(null)}
              className={`w-20 text-center text-2xl p-2 rounded text-theme-primary ${
                focusedInput === 'hour' ? 'bg-[#FFC61B52]' : 'bg-theme-secondary'
              }`}
            />
            <div className="text-sm text-theme-secondary mt-1">Hour</div>
          </div>
          <div className="flex-1 text-center">
            <input
              type="number"
              value={minute.toString().padStart(2, '0')}
              onChange={(e) => setMinute(Math.min(59, Math.max(0, parseInt(e.target.value) || 0)))}
              onFocus={() => setFocusedInput('minute')}
              onBlur={() => setFocusedInput(null)}
              className={`w-20 text-center text-2xl p-2 rounded text-theme-primary ${
                focusedInput === 'minute' ? 'bg-[#FFC61B52]' : 'bg-theme-secondary'
              }`}
            />
            <div className="text-sm text-theme-secondary mt-1">Minute</div>
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-2">
              <button
                className={`px-4 py-2 rounded ${period === 'AM' ? 'bg-[#FDC51B] text-black' : 'bg-theme-secondary text-theme-primary'}`}
                onClick={() => setPeriod('AM')}
              >
                AM
              </button>
              <button
                className={`px-4 py-2 rounded ${period === 'PM' ? 'bg-[#FDC51B] text-black' : 'bg-theme-secondary text-theme-primary'}`}
                onClick={() => setPeriod('PM')}
              >
                PM
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img
              src={ScheduleIcon}
              alt="Schedule"
              className="w-5 h-5 mr-2"
            />
          </div>
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2 text-theme-secondary"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 text-[#FDC51B]"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetTimeModal;