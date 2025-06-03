import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import BackButton from '../components/common/BackButton';
import ShareIcon from 'icons/Share.svg';

export default function ReviewPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // State for review form elements
  const [isAccurate, setIsAccurate] = useState(null); // null, true, or false
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [photos, setPhotos] = useState([]); // Array of photo file objects/URLs or URLs
  const [postAsAnonymous, setPostAsAnonymous] = useState(false);

  // Sample suggestion tags
  const suggestionTags = [
    t('reviewPage.suggestionTags.greatService'),
    t('reviewPage.suggestionTags.notBad'),
    t('reviewPage.suggestionTags.wrongLocation'),
    t('reviewPage.suggestionTags.poorService'),
    t('reviewPage.suggestionTags.businessClosed'),
    t('reviewPage.suggestionTags.notAsDescribed')
  ];

  // Photo upload handler
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({
      url: URL.createObjectURL(file),
      file: file
    }));
    setPhotos(prev => [...prev, ...newPhotos].slice(0, 8)); // Limit to max 8 photos
  };

  // Remove photo handler
  const handleRemovePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  // Post review handler
  const handlePostReview = () => {
    // Implement review posting logic here
    console.log('Review posted:', {
      isAccurate,
      reviewText,
      rating,
      photos,
      postAsAnonymous
    });
    // Navigate back or show confirmation
    // navigate(-1);
  };

  return (
    <div className="dvh-fallback bg-theme-primary text-theme-text">
      {/* Header */}
      <div className="px-4 py-4 relative flex items-center justify-between">
        <BackButton onClick={() => navigate(-1)} />
        <h1 className="flex-grow text-center text-xl font-semibold">{t('reviewPage.title')}</h1>
        <button className="p-2">
          <img src={ShareIcon} alt={t('reviewPage.shareAltText')} className="w-6 h-6 [filter:var(--icon-filter)]" />
        </button>
      </div>

      {/* Review Content */}
      <div className="p-4 space-y-6">

        {/* Was the location accurate? Bar */}
        <div className={`flex items-center justify-between px-4 py-3 rounded-lg 
          ${isAccurate === true ? 'bg-[#00B4451F]' : isAccurate === false ? 'bg-[#FF3F3F1F]' : 'bg-theme-secondary'}
        `}>
          <h3 className={`text-lg font-semibold 
            ${isAccurate === true ? 'text-[#00B445]' : isAccurate === false ? 'text-[#FF3F3F]' : 'text-theme-text'}
          `}>{t('reviewPage.accurateQuestion')}</h3>
          <div className="flex space-x-3">
            <button
              className={`px-4 py-2 rounded-full border flex items-center 
                ${isAccurate === true ? 'border-[#00B445] text-[#00B445]' : 'border-theme-secondary text-theme-secondary'}
              `}
              onClick={() => setIsAccurate(true)}
            >
              {t('common.yes')}
              {isAccurate === true && (
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"></path>
                </svg>
              )}
            </button>
            <button
              className={`px-4 py-2 rounded-full border 
                ${isAccurate === false ? 'border-[#FF3F3F] text-[#FF3F3F]' : 'border-theme-secondary text-theme-secondary'}
              `}
              onClick={() => setIsAccurate(false)}
            >
              {t('common.no')}
            </button>
          </div>
        </div>

        {/* Share your thoughts or suggestions... */}
        <div>
          <textarea
            placeholder={t('reviewPage.writeReviewPlaceholder')}
            className="bg-theme-secondary rounded-lg p-3 w-full h-32 resize-none outline-none focus:outline-none focus:ring-0 focus:border-transparent text-theme-text"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          {/* Suggestion Tags - Only show if reviewText is empty */}
          {reviewText === '' && (
            <div className="flex flex-wrap gap-2 mt-4">
              {suggestionTags.map((tag, index) => (
                <button 
                  key={index}
                  className="px-3 py-1 rounded-full bg-theme-secondary text-theme-secondary text-sm"
                  onClick={() => setReviewText(prevText => prevText ? `${prevText} ${tag}` : tag)} // Append tag to textarea
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* How Was Your Experience? - Star Rating */}
        <div>
          <h3 className="text-theme-text text-lg font-semibold mb-3">{t('reviewPage.howWasExperienceQuestion')}</h3>
          <div className="flex justify-between w-full">
            {[...Array(5)].map((_, index) => (
              <span 
                key={index}
                className={`text-3xl cursor-pointer ${index < rating ? 'text-[#FDC51B]' : 'text-gray-300'}`}
                onClick={() => setRating(index + 1)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Add a photo (max/8) */}
        <div className="mt-8">
           <h3 className="text-theme-text text-lg font-semibold mb-3">{t('reviewPage.addPhotoLabel', { max: 8 })}</h3>
           <div className="flex flex-wrap gap-2">
             {/* Add photo button */}
             {photos.length < 8 && (
               <label className="w-24 h-24 bg-theme-secondary rounded-lg flex items-center justify-center text-theme-secondary text-4xl cursor-pointer">
                 <input
                   type="file"
                   accept="image/*"
                   multiple
                   onChange={handlePhotoUpload}
                   className="hidden"
                 />
                 +
               </label>
             )}
             {/* Uploaded photos preview */}
             {photos.map((photo, index) => (
               <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden">
                 <img src={photo.url} alt={`Uploaded photo ${index + 1}`} className="w-full h-full object-cover" />
                 <button 
                   className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                   onClick={() => handleRemovePhoto(index)}
                 >
                   X
                 </button>
               </div>
             ))}
           </div>
        </div>

        {/* Post as anonymous profile toggle */}
        <div className="flex items-center justify-between mt-8">
           <span className="text-theme-text text-lg font-semibold">{t('reviewPage.postAsAnonymousLabel')}</span>
           {/* Placeholder for Toggle Switch component */}
           {/* Replace with a real toggle component like react-switch or similar */}
           <button 
             className={`w-14 h-8 rounded-full flex items-center px-1 ${postAsAnonymous ? 'bg-[#FFC61B]' : 'bg-gray-300'}`}
             onClick={() => setPostAsAnonymous(!postAsAnonymous)}
           >
             <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${postAsAnonymous ? 'translate-x-6' : 'translate-x-0'}`}></div>
           </button>
        </div>

        {/* Post Button */}
        <div className="mt-20">
          <button 
            className="w-full py-3 rounded-full bg-[#FDC51B] text-black text-lg font-semibold disabled:opacity-50"
            onClick={handlePostReview}
            disabled={!reviewText || rating === 0} // Disable if no text or rating
          >
            {t('reviewPage.postButton')}
          </button>
        </div>

      </div>
    </div>
  );
}

ReviewPage.propTypes = {};