import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LocationPicker from '../components/LocationPicker';
import BackButton from '../components/common/BackButton';
import { useTranslation } from 'react-i18next';

const SocialUpload = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));
    setSelectedImages(prev => [...prev, ...newImages].slice(0, 6));
  };

  const handleRemoveImage = (index) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen flex justify-center bg-theme-primary">
      <div className="w-full max-w-[480px] flex flex-col">
        <div className="flex-1 overflow-y-auto pb-16">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-theme">
            <BackButton/>
            <h1 className="text-lg font-medium">{t('socialUpload.title')}</h1>
            <button 
              className={`px-4 py-1 rounded-full ${
                content.trim() || selectedImages.length > 0
                  ? 'bg-[#FFC61B] text-black'
                  : 'bg-theme-secondary text-theme-secondary'
              }`}
              disabled={!content.trim() && selectedImages.length === 0}
            >
              {t('socialUpload.postButton')}
            </button>
          </div>

          {/* Content Area */}
          <div className="p-4">
            <textarea
              placeholder={t('socialUpload.writePlaceholder')}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-transparent resize-none outline-none min-h-[100px] text-theme-primary placeholder-theme-secondary"
            />

            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-2 mt-4">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative aspect-square">
                  <img
                    src={image.url}
                    alt={t('socialUpload.uploadImage', { number: index + 1 })}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-1 right-1 bg-theme-primary bg-opacity-50 rounded-full p-1"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              {selectedImages.length < 6 && (
                <label className="aspect-square bg-theme-secondary rounded-lg flex items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-theme-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </label>
              )}
            </div>
          </div>

          {/* Location Button */}
          <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[480px] p-4">
            <button
              onClick={() => navigate('/add-location', { 
                state: { 
                  returnPath: '/social/upload',
                  from: 'socialUpload'
                }
              })}
              className="w-full bg-theme-secondary text-theme-secondary py-3 rounded-full flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {t('socialUpload.addLocation')}
            </button>
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <LocationPicker
              buttonClassName="w-full bg-theme-secondary text-theme-secondary py-3 rounded-full"
              returnPath="/social/upload"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialUpload;