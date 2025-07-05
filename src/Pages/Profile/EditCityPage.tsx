import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useProfileEdit } from '../../context/ProfileEditContext';
import BackButton from '../../components/common/BackButton';

function EditCityContent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profileData, updateField } = useProfileEdit();
  const [city, setCity] = useState(profileData.city);

  const handleSave = () => {
    updateField('city', city.trim());
    navigate('/edit-profile');
  };

  const handleCancel = () => {
    navigate('/edit-profile');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center">
      {/* Header */}
      <div className="relative w-full max-w-[480px] flex items-center justify-center py-4 bg-transparent">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-2">
          <BackButton />
        </div>
        <h1 className="text-xl font-semibold text-center w-full">Edit City</h1>
      </div>

      {/* Content */}
      <div className="w-full max-w-[480px] mx-auto p-4">
        <div className="bg-white rounded-lg p-4 mb-4">
          <label className="block mb-2 font-medium text-gray-700">City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter your city"
            className="w-full bg-theme-secondary text-theme-primary px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC51B]"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={handleCancel}
            className="flex-1 bg-gray-200 text-gray-700 rounded-full py-3 text-lg font-semibold transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-yellow-gradient text-black rounded-full py-3 text-lg font-semibold transition-colors duration-200"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default function EditCityPage() {
  return <EditCityContent />;
} 