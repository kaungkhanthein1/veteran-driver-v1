import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import BackButton from '../components/common/BackButton';
import ShareIcon from 'icons/Share.svg'; // Assuming ShareIcon is needed

export default function ReviewPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // State for review form elements
  const [isAccurate, setIsAccurate] = useState(null); // null, true, or false
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [photos, setPhotos] = useState([]); // Array of photo objects/URLs
  const [postAsAnonymous, setPostAsAnonymous] = useState(false);

  // Sample suggestion tags (initially visible)
  const suggestionTags = [
    'Great Service', 'Not Bad', 'Wrong location',
    'Poor Service', 'Business Closed', 'Not as described'
  ];

  // Placeholder function for photo upload
  const handlePhotoUpload = () => {
    // Implement photo upload logic here
    console.log('Photo upload triggered');
    // Example: Add a placeholder photo
    if (photos.length < 8) {
      setPhotos([...photos, `placeholder-${photos.length + 1}.png`]); // Use a placeholder filename
    }
  };

  // Placeholder function for removing a photo
  const handleRemovePhoto = (index) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  // Placeholder function for posting the review
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
    <div className="min-h-screen bg-theme-primary text-theme-text">
      {/* Header */}
      <div className="px-4 py-4 relative flex items-center justify-between">
        <BackButton onClick={() => navigate(-1)} />
        <h1 className="flex-grow text-center text-xl font-semibold">{t('reviewPage.title')}</h1> {/* Use translation */}
        {/* Share icon - assuming it's needed here as per LocationDetailsPage */}
        <button className="p-2">
          <img src={ShareIcon} alt={t('reviewPage.shareAltText')} className="w-6 h-6 [filter:var(--icon-filter)]" /> {/* Use translation */}
        </button>
      </div>

      {/* Review Content */}
      <div className="p-4 space-y-6">

        {/* Was the location accurate? */}
        <div>
          <h3 className="text-theme-text text-lg font-semibold mb-3">{t('reviewPage.accurateQuestion')}</h3> {/* Use translation */}
          <div className="flex space-x-3">
            <button
              className={`px-4 py-2 rounded-full border ${isAccurate === true ? 'bg-green-600 border-green-600 text-white' : 'border-theme-secondary text-theme-secondary'}`}
              onClick={() => setIsAccurate(true)}
            >
              {t('common.yes')} {/* Use translation */}
            </button>
            <button
              className={`px-4 py-2 rounded-full border ${isAccurate === false ? 'bg-red-600 border-red-600 text-white' : 'border-theme-secondary text-theme-secondary'}`}
              onClick={() => setIsAccurate(false)}
            >
              {t('common.no')} {/* Use translation */}
            </button>
          </div>
        </div>

        {/* Write Review Input */}
        <div>
          {/* Textarea for review */}
          <textarea
            placeholder={t('reviewPage.writeReviewPlaceholder')}
            className="bg-theme-secondary rounded-lg p-3 w-full h-32 resize-none outline-none focus:outline-none focus:ring-0 focus:border-transparent text-theme-text"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          {/* Suggestion Tags - Only show if reviewText is empty */}
          {reviewText === '' && (
            <div className="flex flex-wrap gap-2 mt-2">
              {suggestionTags.map((tag, index) => (
                <button 
                  key={index}
                  className="px-3 py-1 rounded-full bg-theme-secondary text-theme-secondary text-sm"
                  onClick={() => setReviewText(tag)} // Add tag to textarea
                >
                  {tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* How Was Your Experience? - Star Rating */}
        <div>
          <h3 className="text-theme-text text-lg font-semibold mb-3">{t('reviewPage.howWasExperienceQuestion')}</h3> {/* Use translation */}
          <div className="flex space-x-1">
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
        <div>
           <h3 className="text-theme-text text-lg font-semibold mb-3">{t('reviewPage.addPhotoLabel', { max: 8 })}</h3> {/* Use translation */}
           <div className="flex flex-wrap gap-2">
             {/* Add photo button */}
             {photos.length < 8 && (
               <button 
                 className="w-24 h-24 bg-theme-secondary rounded-lg flex items-center justify-center text-theme-secondary text-4xl"
                 onClick={handlePhotoUpload}
               >
                 +
               </button>
             )}
             {/* Uploaded photos preview */}
             {photos.map((photo, index) => (
               <div key={index} className="relative w-24 h-24 rounded-lg overflow-hidden">
                 <img src={photo} alt={`Uploaded photo ${index + 1}`} className="w-full h-full object-cover" />
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
        <div className="flex items-center justify-between">
           <span className="text-theme-text text-lg font-semibold">{t('reviewPage.postAsAnonymousLabel')}</span> {/* Use translation */}
           {/* Placeholder for Toggle Switch component */}
           {/* Replace with a real toggle component like react-switch or similar */}
           <button 
             className={`w-14 h-8 rounded-full flex items-center px-1 ${postAsAnonymous ? 'bg-yellow-500' : 'bg-gray-300'}`}
             onClick={() => setPostAsAnonymous(!postAsAnonymous)}
           >
             <div className={`w-6 h-6 rounded-full bg-white shadow-md transform transition-transform ${postAsAnonymous ? 'translate-x-6' : 'translate-x-0'}`}></div>
           </button>
        </div>

        {/* Post Button */}
        <div className="mt-8">
          <button 
            className="w-full py-3 rounded-full bg-[#FDC51B] text-black text-lg font-semibold disabled:opacity-50"
            onClick={handlePostReview}
            disabled={!reviewText || rating === 0} // Disable if no text or rating
          >
            {t('reviewPage.postButton')} {/* Use translation */}
          </button>
        </div>

      </div>
    </div>
  );
}
