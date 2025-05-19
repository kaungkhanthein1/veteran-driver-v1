import React, { useState } from 'react';

const CommentModal = ({ isOpen, onClose, onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    if (comment.trim()) {
      onSubmit(comment);
      setComment('');
      onClose();
    } 
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 top-[50%] bottom-0 z-50 flex flex-col bg-theme-secondary rounded-t-2xl animate-slide-up min-h-[50vh]">
      <div className="flex items-center justify-between p-4 border-b border-theme">
        <h3 className="text-theme-primary text-lg font-medium">Write Comments</h3>
        <button onClick={onClose}>
          <svg className="w-6 h-6 text-theme-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4">
        <div className="text-theme-secondary text-center py-4">
          No comments yet
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-theme bg-theme-secondary p-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-theme-secondary flex-shrink-0"></div>
          <div className="flex-1 flex items-center bg-theme-primary rounded-full pr-2">
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your comment..."
              className="flex-1 bg-transparent text-theme-primary px-4 py-2 focus:outline-none placeholder-theme-secondary"
            />
            <button
              onClick={handleSubmit}
              disabled={!comment.trim()}
              className={`p-2 ${!comment.trim() ? 'opacity-50' : 'hover:opacity-80'}`}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="w-6 h-6 text-theme-primary"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 2L11 13" />
                <path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;