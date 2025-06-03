import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import SetLocationIcon from 'icons/SetLocation.svg';
import OpeningTime from './OpeningTime';
import ServiceAndPrice from './ServiceAndPrice';
import FormInput from '../../components/common/FormInput';
import DocumentIcon from 'icons/Document.svg';
import SubmittedLocationModal from './SubmittedLocationModal';
import BackButton from '../../components/common/BackButton';

const AddLocationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    address: '',
    mobileNumber: '',
    locationSet: false,
    openingTime: {
      is24Hours: false,
      timeSet: false,
      selectedDays: []
    },
    services: [],
    price: '', 
    basicPrice: '',
    photos: [],
    document: null,
    agreementChecked: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Form validation and submission logic will be implemented here
    
    // Temporarily simulate successful submission
    setIsSubmitted(true);
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, ...newImages].slice(0, 10)
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleDocumentSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        document: file
      }));
    }
  };

  return (
    <div className="dvh-fallback flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col">
        <div>
          <div className="px-4 pt-4 pb-6">
            <div className="relative flex items-center mb-6">
              <div className="absolute left-0">
                <BackButton/>
              </div>
              <h1 className="flex-grow text-center text-xl font-semibold">{t('location.addLocation')}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-8">
                <FormInput
                  label={t('common.name')}
                  name="name"
                  placeholder={t('location.enterName')}
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />

                <FormInput
                  label={t('common.description')}
                  name="description"
                  placeholder={t('location.enterDescription')}
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                />

                <FormInput
                  label={t('common.address')}
                  name="address"
                  placeholder={t('location.enterAddress')}
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />

                <FormInput
                  label={t('common.mobileNumber')}
                  name="mobileNumber"
                  type="tel"
                  placeholder={t('location.enterMobileNumber')}
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  required
                />

                <button 
                  type="button" 
                  className="w-full bg-theme-secondary rounded-lg px-4 py-3 flex justify-between items-center"
                  onClick={() => navigate('/map', { state: { from: 'addLocation', formData } })}
                >
                  <div className="flex items-center">
                    <img 
                      src={SetLocationIcon} 
                      alt={t('location.setLocation')} 
                      className="w-5 h-5 mr-2"
                      style={{ filter: 'invert(76%) sepia(41%) saturate(845%) hue-rotate(338deg) brightness(101%) contrast(103%)' }}
                    />
                    <span>{t('location.setLocationOnMap')}</span>
                  </div>
                  <span className={`text-theme-secondary ${formData.locationSet ? 'text-[#FDC51B]' : ''}`}>
                    {formData.locationSet ? 'Change' : 'Not Set'}
                  </span>
                </button>
              </div>

              {/* Opening Time Component */}
              <OpeningTime
                formData={formData}
                setFormData={setFormData}
              />

              {/* Service and Price Component */}
              <ServiceAndPrice
                formData={formData}
                setFormData={setFormData}
              />

              {/* Photo Upload */}
              <div>
                <label className="block text-sm mb-2">
                  {t('location.shareLocationPicture')} ({formData.photos.length}/10) *
                </label>
                <div className="flex flex-wrap gap-2">
                  {formData.photos.map((image, index) => (
                    <div key={index} className="relative w-[100px] h-[100px]">
                      <img
                        src={image.url}
                        alt={`Upload ${index + 1}`}
                        className="w-full h-full object-cover rounded-lg"
                      />
                      <button
                        onClick={() => handleRemoveImage(index)}
                        className="absolute top-1 right-1 bg-theme-primary bg-opacity-50 rounded-full p-1"
                      >
                        <svg className="w-4 h-4 text-theme-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {formData.photos.length < 10 && (
                    <label className="w-[100px] h-[100px] bg-theme-secondary rounded-lg flex items-center justify-center cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageSelect}
                        className="hidden"
                      />
                      <svg className="w-8 h-8 text-theme-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </label>
                  )}
                </div>
              </div>

              {/* Document Upload */}
              <div>
                <label className="block text-sm mb-2">{t('location.uploadDocument')} *</label>
                <p className="text-theme-secondary text-xs mb-2">{t('location.uploadCertification')}</p>
                <label className="cursor-pointer block w-[100px]">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleDocumentSelect}
                    className="hidden"
                  />
                  <div className="w-[100px] h-[100px] bg-theme-secondary rounded-lg flex items-center justify-center">
                    {formData.document ? (
                      <div className="text-center">
                        <img 
                          src={DocumentIcon} 
                          alt="Document" 
                          className="w-8 h-8 mx-auto mb-2"
                        />
                        <span className="text-sm text-theme-secondary">{t('location.documentUploaded')}</span>
                      </div>
                    ) : (
                      <img 
                        src={DocumentIcon} 
                        alt={t('location.uploadDocument')} 
                        className="w-8 h-8"
                      />
                    )}
                  </div>
                </label>
              </div>

              {/* Agreement */}
              <div className="space-y-4">
                <p className="text-theme-secondary text-xs">{t('location.guestAccountNote')}</p>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={formData.agreementChecked}
                    onChange={(e) => setFormData(prev => ({ ...prev, agreementChecked: e.target.checked }))}
                    className="mr-2"
                  />
                  <label htmlFor="agreement" className="text-sm">{t('location.agreementText')}</label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#FDC51B] text-black rounded-lg py-3 font-medium"
                disabled={!formData.agreementChecked}
              >
                {t('location.submit')}
              </button>
            </form>
            
            <SubmittedLocationModal 
              isOpen={isSubmitted}
              onClose={() => setIsSubmitted(false)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLocationPage;