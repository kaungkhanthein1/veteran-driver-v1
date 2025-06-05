import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SetTimeIcon from 'icons/SetTime.svg';
import RightIcon from 'icons/Right.svg';
import SetTimeModal from './SetTimeModal';

const OpeningTime = ({ formData, setFormData }) => {
  const { t } = useTranslation();
  const [setTimeType, setSetTimeType] = useState(null);
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

  const handleTimeSet = (timeData) => {
    setFormData(prev => ({
      ...prev,
      openingTime: {
        ...prev.openingTime,
        [setTimeType === 'from' ? 'fromTime' : 'toTime']: timeData
      }
    }));
    setSetTimeType(null);
  };

  const formatTime = (time) => {
    if (!time) return t('location.notSet');
    return `${time.hour}:${String(time.minute).padStart(2, '0')} ${time.period}`;
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">{t('addLocation.openingTime')}</h2>
      
      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <p>{t('addLocation.serviceAvailable247')}</p>
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
          <div className="w-11 h-6 bg-theme-secondary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#FDC51B]"></div>
        </label>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSetTimeType('from');
          }}
          className="w-1/2 bg-theme-secondary rounded-lg px-4 py-3 flex justify-between items-center"
        >
          <div className="flex items-center">
            <img
              src={SetTimeIcon}
              alt={t('addLocation.setTimeAlt')}
              className="w-5 h-5 mr-1.5"
              style={{
                filter: 'brightness(0) saturate(100%) invert(85%) sepia(30%) saturate(1000%) hue-rotate(359deg) brightness(103%) contrast(106%)',
                WebkitFilter: 'brightness(0) saturate(100%) invert(85%) sepia(30%) saturate(1000%) hue-rotate(359deg) brightness(103%) contrast(106%)'
              }}
            />
            <span>{t('addLocation.fromTimeLabel') || 'From'}</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="text-theme-secondary ml-1.3" style={{ fontSize: '14px', fontWeight: 400, fontStyle: 'normal' }}>
              {formatTime(formData.openingTime.fromTime)}
            </span>
            <img src={RightIcon} alt="right" className="w-[25px] h-[30px]" />
          </div>
        </button>

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setSetTimeType('to');
          }}
          className="w-1/2 bg-theme-secondary rounded-lg px-4 py-3 flex justify-between items-center"
        >
          <div className="flex items-center">
            <img
              src={SetTimeIcon}
              alt={t('addLocation.setTimeAlt')}
              className="w-5 h-5 mr-2"
              style={{
                filter: 'brightness(0) saturate(100%) invert(85%) sepia(30%) saturate(1000%) hue-rotate(359deg) brightness(103%) contrast(106%)',
                WebkitFilter: 'brightness(0) saturate(100%) invert(85%) sepia(30%) saturate(1000%) hue-rotate(359deg) brightness(103%) contrast(106%)'
              }}
            />
            <span>{t('addLocation.toTimeLabel') || 'To'}</span>
          </div>
          <div className="flex items-center justify-end">
            <span className="text-theme-secondary" style={{ fontSize: '14px', fontWeight: 400, fontStyle: 'normal' }}>
              {formatTime(formData.openingTime.toTime)}
            </span>
            <img src={RightIcon} alt="right" className="w-[25px] h-[30px] ml-1" />
          </div>
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {days.map((day) => (
          <button
            key={day}
            type="button"
            onClick={() => handleDayToggle(day)}
            className={`px-4 py-2 rounded-xl text-md ${formData.openingTime.selectedDays.includes(day)
                ? 'text-[#FFD75E]'
                : 'text-theme-primary'
            }`}
            style={formData.openingTime.selectedDays.includes(day)
                ? { backgroundColor: '#FFD75E1F' }
                : { backgroundColor: '#FFFFFF1F' }
            }
          >
            {day}
          </button>
        ))}
      </div>

      <SetTimeModal
        isOpen={setTimeType !== null}
        onClose={() => setSetTimeType(null)}
        onSave={handleTimeSet}
        initialTime={setTimeType === 'from' ? formData.openingTime.fromTime : formData.openingTime.toTime}
      />
    </div>
  );
};

export default OpeningTime;