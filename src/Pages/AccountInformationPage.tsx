import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FormInput from '../components/common/FormInput';
import GenderSelectionModal from '../components/common/GenderSelectionModal';

export default function AccountInformationPage() {
  console.log("AccountInformationPage - Rendering");
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [showGenderModal, setShowGenderModal] = useState(false);

  useEffect(() => {
    console.log("AccountInformationPage - showGenderModal:", showGenderModal);
  }, [showGenderModal]);

  const handleConfirm = () => {
    console.log('Username:', username);
    console.log('Gender:', gender);
    // TODO: Implement logic to save account information and proceed
    navigate('/location-access'); // Assuming next step is LocationAccessPage
  };

  const handleGenderApply = (selected: string) => {
    console.log("AccountInformationPage - handleGenderApply received:", selected);
    setGender(selected);
    setShowGenderModal(false);
  };

  const handleGenderModalClose = () => {
    console.log("AccountInformationPage - handleGenderModalClose called");
    setShowGenderModal(false);
  };

  const handleOpenGenderModal = () => {
    console.log("AccountInformationPage - Opening gender modal");
    setShowGenderModal(true);
  };

  return (
    <div className="dvh-fallback flex flex-col bg-theme-primary text-theme-text">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-5">
        <div className="w-8"></div> 
        <h1 className="text-xl font-semibold text-center flex-grow">{t('accountInformation.title')}</h1>
        <button 
          onClick={() => navigate('/location-access')} 
          className="text-theme-secondary text-base font-medium"
        >
          {t('accountInformation.skip')}
        </button>
      </div>

      {/* Form Fields */}
      <div className="px-4 py-5 flex-1">
        {/* Username Input using FormInput component */}
        <FormInput
          label={t('accountInformation.username')}
          name="username"
          value={username}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
          placeholder={t('accountInformation.enterUsername')}
          required
        />

        {/* Gender Selection Button */}
        <div className="relative mt-6">
          <button
            type="button"
            onClick={handleOpenGenderModal}
            className="w-full bg-theme-secondary border border-theme rounded-lg px-4 h-[56px] text-base focus:outline-none focus:ring-0 appearance-none pr-8 text-theme-text flex items-center justify-between"
          >
            <span>{gender ? t('accountInformation.gender' + gender.charAt(0).toUpperCase() + gender.slice(1)) : t('accountInformation.selectGender')}</span>
            <svg className="fill-current h-4 w-4 text-theme-secondary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Confirm Button */}
      <div className="px-4 py-5">
        <button 
          onClick={handleConfirm}
          className="w-full py-3 bg-yellow-gradient text-black font-medium rounded-lg"
        >
          {t('accountInformation.confirm')}
        </button>
      </div>

      {/* Gender Selection Modal */}
      <GenderSelectionModal
        isOpen={showGenderModal}
        onClose={handleGenderModalClose}
        onApply={handleGenderApply}
        currentGender={gender}
      />
    </div>
  );
} 