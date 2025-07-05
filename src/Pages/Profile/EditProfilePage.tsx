import React, { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { fetchProfile, updateProfile } from '../../services/ProfileService';
import { useProfileEdit } from '../../context/ProfileEditContext';
import BackButton from '../../components/common/BackButton';
import DefaultAvatorWhite from '../../icons/DefaultAvatorWhite.svg';
import EditProfileIcon from '../../icons/ProfileUpdate/EditProfile.svg';
import NextIcon from '../../icons/Next.svg';

const FieldRow: React.FC<{
  label: string;
  value: string;
  onClick?: () => void;
  clickable?: boolean;
  showArrow?: boolean;
  last?: boolean;
}> = ({ label, value, onClick, clickable, showArrow, last }) => (
  <div
    className={`flex items-center justify-between px-4 py-4 ${
      !last ? 'border-b border-gray-100' : ''
    } ${clickable ? 'cursor-pointer hover:bg-gray-50 transition-colors' : ''}`}
    onClick={clickable ? onClick : undefined}
  >
    <span className="text-gray-500 text-base">{label}</span>
    <span className="flex items-center gap-2">
      <span className={`text-right text-base ${value ? 'text-gray-900' : 'text-gray-400'}`}>{value || ''}</span>
      {showArrow && (
        <img src={NextIcon} alt="Next" className="w-4 h-4 ml-2" />
      )}
    </span>
  </div>
);

const EditProfileContent: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    profileData,
    setProfileData,
    updateField,
    setOriginalData,
    hasChanges,
    resetChanges
  } = useProfileEdit();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProfile()
      .then(res => {
        setProfileData(res.data);
        setOriginalData(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch profile');
        setLoading(false);
      });
  }, [setProfileData, setOriginalData]);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await updateProfile(profileData);
      setSuccess('Profile updated successfully!');
      setOriginalData(profileData);
    } catch {
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  // Helper for location string
  const locationString = [profileData.country, profileData.city].filter(Boolean).join(' , ');

  if (loading) {
    return <div className="text-center py-8">{t('editProfilePage.loading', 'Loading...')}</div>;
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center">
      {/* Header with Back Button and Title */}
      <div className="relative w-full max-w-[480px] flex items-center justify-center py-4 bg-transparent">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-2">
          <BackButton />
        </div>
        <h1 className="text-xl font-semibold text-center w-full">Edit Profile</h1>
      </div>

      {/* Avatar Section */}
      <div className="flex flex-col items-center mt-2 mb-4">
        <div className="relative">
          <img
            src={profileData.avatar || DefaultAvatorWhite}
            alt="Avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow"
          />
          <label className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow cursor-pointer border border-gray-200">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const newAvatar = reader.result as string;
                    updateField('avatar', newAvatar);
                  };
                  reader.readAsDataURL(file);
                }
              }}
              className="hidden"
            />
            <img src={EditProfileIcon} alt="Upload" className="w-6 h-6 text-blue-500" />
          </label>
        </div>
      </div>

      {/* Cards Section */}
      <div className="w-full max-w-[480px] mx-auto p-4 space-y-4">
        {/* First Card: Profile Name, Username, Veteran ID */}
        <div className="bg-white rounded-xl shadow p-0 overflow-hidden">
          <FieldRow
            label="Profile Name"
            value={profileData.nickname}
            clickable={true}
            showArrow={true}
            onClick={() => navigate('nickname')}
          />
          <FieldRow
            label="Username"
            value={profileData.username || ''}
            clickable={true}
            showArrow={true}
            onClick={() => navigate('username')}
          />
          <FieldRow
            label="Veteran ID"
            value={profileData.userId || ''}
            clickable={false}
            showArrow={false}
            last={true}
          />
        </div>

        {/* Second Card: Bio */}
        <div className="bg-white rounded-xl shadow p-0 overflow-hidden">
          <FieldRow
            label="Bio"
            value={profileData.bio}
            clickable={true}
            showArrow={true}
            onClick={() => navigate('bio')}
            last={true}
          />
        </div>

        {/* Third Card: Gender, Location */}
        <div className="bg-white rounded-xl shadow p-0 overflow-hidden">
          <FieldRow
            label="Gender"
            value={profileData.gender}
            clickable={true}
            showArrow={true}
            onClick={() => navigate('gender')}
          />
          <FieldRow
            label="Location"
            value={locationString}
            clickable={true}
            showArrow={true}
            onClick={() => navigate('country')}
            last={true}
          />
        </div>
      </div>

      {/* Save Button */}
      <div className="w-full max-w-[480px] mx-auto p-4">
        <button
          onClick={handleSave}
          disabled={saving}
          className={`w-full rounded-full py-3 text-lg font-semibold transition-colors duration-200 ${
            !saving 
              ? 'bg-yellow-gradient text-black' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
        {error && <div className="text-red-500 text-center py-2 mt-2">{error}</div>}
        {success && <div className="text-green-600 text-center py-2 mt-2">{success}</div>}
      </div>
    </div>
  );
};

export default EditProfileContent;