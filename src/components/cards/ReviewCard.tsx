import { useTranslation } from 'react-i18next';
import ReviewProfileGif from 'assets/ReviewProfile.gif';
import PropTypes from 'prop-types';

const ReviewCard = ({ review }) => {
  const { t } = useTranslation();

  // Helper to render star rating
  const renderRating = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span 
        key={index}
        className={`text-xl ${index < rating ? 'text-[#FDC51B]' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="bg-theme-secondary rounded-lg p-4 mb-4">
      {/* Reviewer Info */}
      <div className="flex items-center mb-3">
        <img 
          src={review.user.profilePic || ReviewProfileGif} 
          alt={review.user.name || t('common.anonymous')} 
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <div className="text-theme-text font-semibold">{review.user.name || t('common.anonymous')}</div> {/* Use translation for Anonymous */}
          <div className="text-theme-secondary text-sm">{review.date}</div>
        </div>
      </div>

      {/* Rating */}
      <div className="flex items-center space-x-1 mb-3">
        {renderRating(review.rating)}
      </div>

      {/* Review Text */}
      <p className="text-theme-text text-sm mb-3">{review.text}</p>

      {/* Review Photos Placeholder */}
      {review.photos && review.photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2 mb-3">
          {review.photos.map((photo, index) => (
            <img key={index} src={photo} alt={`Review photo ${index + 1}`} className="w-full h-auto object-cover rounded" />
          ))}
        </div>
      )}

      {/* Actions (Reply, Likes) - Basic structure */}
      <div className="flex items-center text-theme-secondary text-sm">
        <button className="mr-4 hover:underline">{t('common.reply')}</button> {/* Use translation for Reply */}
        <div className="flex items-center">
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21H6v-7a3 3 0 013-3h4zM7 13v-6a3 3 0 016 0v6m-3 5h.01" />
          </svg>
          <span>{review.likes || 0}</span>
        </div>
      </div>

      {/* Expand Replies Placeholder */}
      {review.replies && review.replies.length > 0 && (
        <button className="text-theme-secondary text-sm mt-2 hover:underline">{t('common.expandReplies', { count: review.replies.length })}</button>
      )}
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    user: PropTypes.shape({
      name: PropTypes.string,
      profilePic: PropTypes.string
    }),
    rating: PropTypes.number,
    date: PropTypes.string,
    text: PropTypes.string,
    photos: PropTypes.arrayOf(PropTypes.string),
    likes: PropTypes.number,
    replies: PropTypes.arrayOf(PropTypes.shape({
      user: PropTypes.shape({
        name: PropTypes.string
      }),
      text: PropTypes.string
    }))
  }).isRequired
};

export default ReviewCard; 