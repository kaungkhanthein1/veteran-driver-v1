import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import BackButton from '../../components/common/BackButton';
import FormInput from '../../components/common/FormInput';
import ViewIcon from '../../icons/Views.svg';
import ViewOffIcon from '../../icons/ViewOff.svg'



export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
    <div className="dvh-fallback bg-theme-primary text-theme-primary flex flex-col px-4">
      {/* Header */}
      <div className="py-4 relative flex items-center">
        <div className="absolute left-3">
          <BackButton />
        </div>
        <h1 className="flex-grow text-center text-xl font-semibold">{t('Password')}</h1>
      </div>

      {/* Warning Text */}
      <div className="text-theme-secondary text-sm mb-4">
        <p>{t('Your password must be at least 6 characters and should include a combination of numbers, letters and special characters (!%@$).')}</p>
      </div>

      <form onSubmit={handleSubmit} className="py-2">
        <div className="mb-6">
          <FormInput
            label={t('Current password')}
            name="currentPassword"
            type={showCurrentPassword ? 'text' : 'password'}
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder={t('Enter your current password')}
            rightIcon={
              <button type="button" onClick={() => setShowCurrentPassword(!showCurrentPassword)}>
                {showCurrentPassword ? (
                  <img
                  src={ViewIcon}
                  alt={t("changePasswordPage.iconLabels.views")}
                  className="w-6 h-6 [filter:var(--icon-filter)]"
                />
                ) : (
                  <img
                    src={ViewOffIcon}
                    alt={t("changePasswordPage.iconLabels.viewOff")}
                    className="w-6 h-6 [filter:var(--icon-filter)]"
                  />
                )}
              </button>
            }
          />
        </div>

        <div className="mb-6">
          <FormInput
            label={t('New password')}
            name="newPassword"
            type={showNewPassword ? 'text' : 'password'}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={t('Enter your new password')}
            rightIcon={
              <button type="button" onClick={() => setShowNewPassword(!showNewPassword)}>
                {showNewPassword ? (
                  <img
                  src={ViewIcon}
                  alt={t("changePasswordPage.iconLabels.views")}
                  className="w-6 h-6 [filter:var(--icon-filter)]"
                />
                ) : (
                  <img
                    src={ViewOffIcon}
                    alt={t("changePasswordPage.iconLabels.viewOff")}
                    className="w-6 h-6 [filter:var(--icon-filter)]"
                  />
                )}
              </button>
            }
          />
        </div>

        <div className="mb-6">
          <FormInput
            label={t('Retype new password')}
            name="confirmNewPassword"
            type={showConfirmNewPassword ? 'text' : 'password'}
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
            placeholder={t('Retype new password')}
            rightIcon={
              <button type="button" onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}>
                {showConfirmNewPassword ? (
                   <img
                   src={ViewIcon}
                   alt={t("changePasswordPage.iconLabels.views")}
                   className="w-6 h-6 [filter:var(--icon-filter)]"
                 />
                 ) : (
                   <img
                     src={ViewOffIcon}
                     alt={t("changePasswordPage.iconLabels.viewOff")}
                     className="w-6 h-6 [filter:var(--icon-filter)]"
                   />
                )}
              </button>
            }
          />
        </div>

        {/* Forgot Password Link */}
        <div className="text-right mb-6">
          <button
            type="button"
            onClick={() => navigate('/forget-password')}
            className="text-[#FDC51B] text-sm font-medium"
          >
            {t('Forgot Password?')}
          </button>
        </div>
      </form>

      {/* Moved Apply button outside the form */}
      <button
        type="submit"
        className="bg-[#FDC51B] text-black py-3 rounded-3xl font-semibold w-full mx-auto mt-auto mb-8"
      >
        {t('Apply')}
      </button>
    </div>
  );
}