import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BackButton from '../../components/common/BackButton';
import FormInput from '../../components/common/FormInput';
import ViewIcon from '../../icons/Views.svg';
import ViewOffIcon from '../../icons/ViewOff.svg';
import { useMutation } from '@tanstack/react-query';
import { gatewayRequest } from '../../services/gateway';

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updatePasswordMutation = useMutation({
    mutationFn: async (data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
    }) => {
      const response = await gatewayRequest({
        url: 'https://vtt_dev.movie06.com/api/v1/auth/update-password',
        method: 'POST',
        data,
      });
      return response.data;
    },
    onSuccess: () => {
      // Show success message and navigate back
      alert('Password updated successfully');
      navigate(-1);
    },
    onError: (error: any) => {
      setError(error?.response?.data?.message || 'Failed to update password');
    },
  });

  const validateForm = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return false;
    }
    if (newPassword.length < 8 || newPassword.length > 20) {
      setError('Password must be between 8 and 20 characters');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    setError(null);
    if (!validateForm()) return;

    updatePasswordMutation.mutate({
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  const isFormValid = currentPassword && newPassword && confirmPassword;

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* Header */}
      <div className="relative flex items-center justify-center h-14 px-4">
        <div className="absolute left-2">
          <BackButton />
        </div>
        <h1 className="text-lg font-semibold">Change Password</h1>
      </div>

      <div className="px-4 pt-4">
        {/* Current Password */}
        <div className="mb-6">
          <FormInput
            label="Current Password"
            name="currentPassword"
            type={showCurrentPassword ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              setError(null);
            }}
            placeholder="Enter current password"
            rightIcon={
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="focus:outline-none"
              >
                <img
                  src={showCurrentPassword ? ViewIcon : ViewOffIcon}
                  alt={showCurrentPassword ? 'Hide' : 'Show'}
                  className="w-6 h-6"
                />
              </button>
            }
          />
        </div>

        {/* New Password */}
        <div className="mb-6">
          <FormInput
            label="Set New Password"
            name="newPassword"
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setError(null);
            }}
            placeholder="Enter new password"
            rightIcon={
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="focus:outline-none"
              >
                <img
                  src={showNewPassword ? ViewIcon : ViewOffIcon}
                  alt={showNewPassword ? 'Hide' : 'Show'}
                  className="w-6 h-6"
                />
              </button>
            }
          />
        </div>

        {/* Confirm New Password */}
        <div className="mb-6">
          <FormInput
            label="Retype New Password"
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError(null);
            }}
            placeholder="Retype new password"
            rightIcon={
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="focus:outline-none"
              >
                <img
                  src={showConfirmPassword ? ViewIcon : ViewOffIcon}
                  alt={showConfirmPassword ? 'Hide' : 'Show'}
                  className="w-6 h-6"
                />
              </button>
            }
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 px-4 py-2 text-red-500 text-sm">{error}</div>
        )}

        {/* Confirm Button */}
        <button
          onClick={handleSubmit}
          disabled={!isFormValid || updatePasswordMutation.isPending}
          className={`w-full py-3 rounded-full font-medium transition-colors ${
            isFormValid && !updatePasswordMutation.isPending
              ? "apply_btn"
              : 'bg-gray-100 text-gray-400'
          }`}
        >
          {updatePasswordMutation.isPending ? 'Updating...' : 'Confirm'}
        </button>
      </div>
    </div>
  );
}