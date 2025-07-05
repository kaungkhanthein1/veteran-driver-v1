import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useProfileEdit } from '../../context/ProfileEditContext';
import BackButton from '../../components/common/BackButton';

function EditBioContent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profileData, updateField } = useProfileEdit();
  const [bio, setBio] = useState(profileData.bio);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    updateField('bio', bio.trim());
    navigate('/edit-profile');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center">
      {/* Header */}
      <div className="relative w-full max-w-[480px] flex items-center justify-center py-4 bg-transparent">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-2">
          <BackButton />
        </div>
        <h1 className="text-xl font-semibold text-center w-full">Bio</h1>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 pr-4 text-[#007AFF] text-base font-medium"
          onClick={handleSave}
        >
          save
        </button>
      </div>

      {/* Content */}
      <div className="w-full max-w-[480px] mx-auto p-4">
        <div className="relative">
          <textarea
            value={bio}
            onChange={e => {
              setBio(e.target.value);
              setError(null);
            }}
            placeholder="Tell us about yourself"
            className="w-full bg-transparent border border-theme rounded-lg px-4 py-3 text-base focus:outline-none focus:ring-0 placeholder:text-theme-secondary/50 min-h-[120px] resize-none pt-7"
            maxLength={200}
          />
          <span className="absolute -top-[10px] left-[18px] px-1 text-sm text-theme-secondary bg-[#F8F9FB]">
            Bio
          </span>
        </div>
        <div className="text-sm text-gray-500 mt-1">{bio.length}/200 characters</div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
      </div>
    </div>
  );
}

export default function EditBioPage() {
  return <EditBioContent />;
} 