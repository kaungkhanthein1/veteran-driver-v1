import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BackButton from '../../components/common/BackButton';
import FormInput from '../../components/common/FormInput';

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle password change logic here
    console.log({
      currentPassword,
      newPassword,
      confirmNewPassword,
    });
    // On success, navigate back or to a confirmation page
    // navigate('/settings');
  };

  return (
    <div className="dvh-fallback bg-theme-primary text-theme-primary">
      {/* Header */}
      <div className="px-4 py-4 relative flex items-center">
        <div className="absolute left-3">
          <BackButton />
        </div>
        <h1 className="flex-grow text-center text-xl font-semibold">{t('Change Password')}</h1>
      </div>

      {/* Warning Text */}
      <div className="px-4 text-theme-primary text-sm mb-4">
        <p>{t('Please ensure your password is at least 8 characters long and includes a mix of uppercase, lowercase, numbers, and symbols.')}</p>
      </div>

      <form onSubmit={handleSubmit} className="px-4 py-2">
        <div className="mb-6">
          <FormInput
            label={t('Current Password')}
            type={showCurrentPassword ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder={t('Enter your current password')}
            rightIcon={
              <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
              </button>
            }
          />
        </div>

        <div className="mb-6">
          <FormInput
            label={t('New Password')}
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={t('Enter your new password')}
            rightIcon={
              <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
              </button>
            }
          />
        </div>

        <div className="mb-6">
          <FormInput
            label={t('Confirm New Password')}
            type={showConfirmNewPassword ? 'text' : 'password'}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder={t('Confirm your new password')}
            rightIcon={
              <button type="button" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
              </button>
            }
          />
        </div>

        {/* Forgot Password Link */}
        <div className="text-right mb-4">
          <button
            type="button"
            onClick={() => navigate('/forget-password')}
            className="text-theme-accent text-sm font-medium"
          >
            {t('Forgot Password?')}
          </button>
        </div>

        {/* I'm not a robot checkbox - Placeholder */}
        <div className="flex items-center mb-6">
          <input type="checkbox" id="not-robot" className="mr-2" />
          <label htmlFor="not-robot" className="text-theme-primary text-sm">{t("I'm not a robot")}</label>
        </div>

        <button
          type="submit"
          className="w-full bg-theme-accent text-white py-3 rounded-lg font-semibold mt-4"
        >
          {t('Change Password')}
        </button>
      </form>
    </div>
  );
}