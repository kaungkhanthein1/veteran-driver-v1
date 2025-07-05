import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useProfileEdit } from '../../context/ProfileEditContext';
import BackButton from '../../components/common/BackButton';
import { updateProfile } from '../../services/ProfileService';

function EditUsernameContent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { profileData, updateField } = useProfileEdit();
  const [username, setUsername] = useState(profileData.username);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSave = async () => {
    if (!username.trim()) {
      setError('Username cannot be empty');
      return;
    }
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await updateProfile({ username: username.trim() });
      updateField('username', username.trim());
      setSuccess('Username updated successfully!');
      setTimeout(() => navigate('/edit-profile'), 1000);
    } catch {
      setError('Failed to update username');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FB] flex flex-col items-center">
      {/* Header */}
      <div className="relative w-full max-w-[480px] flex items-center justify-center py-4 bg-transparent">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-2">
          <BackButton />
        </div>
        <h1 className="text-xl font-semibold text-center w-full">Username</h1>
        <button
          className="absolute right-0 top-1/2 -translate-y-1/2 pr-4 text-[#007AFF] text-base font-medium"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? 'Saving...' : 'save'}
        </button>
      </div>

      {/* Content */}
      <div className="w-full max-w-[480px] mx-auto p-4">
        <div className="relative">
          <input
            type="text"
            value={username}
            onChange={e => {
              setUsername(e.target.value);
              setError(null);
            }}
            placeholder="Enter Username"
            className="w-full bg-transparent border border-theme rounded-lg px-4 h-[56px] text-base focus:outline-none focus:ring-0 placeholder:text-theme-secondary/50 flex items-center"
            maxLength={50}
          />
          <span className="absolute -top-[10px] left-[18px] px-1 text-sm text-theme-secondary bg-[#F8F9FB]">
            Username
          </span>
        </div>
        {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
        {success && <div className="text-green-600 text-sm mt-2">{success}</div>}
      </div>
    </div>
  );
}

export default function EditUsernamePage() {
  return <EditUsernameContent />;
} 