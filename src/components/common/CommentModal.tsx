import React, { useState } from 'react';
import CommentIcon from "icons/Comment.svg";
import SendIcon from "icons/Send.svg";

interface CommentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (comment: string) => void;
}

const CommentModal = ({ isOpen, onClose, onSubmit }: CommentModalProps) => {
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
    <>
      <div className="fixed inset-0 bg-black/60 z-[1000]" onClick={onClose} />
      <div className="fixed inset-x-0 bottom-0 z-[1001] flex justify-center">
        <div className="w-full max-w-[480px] flex flex-col bg-theme-secondary rounded-t-2xl animate-slide-up min-h-[50vh] mx-4">
          <div className="flex items-center justify-between p-4 border-b border-theme">
            <h3 className="text-theme-primary text-lg font-medium">Comments</h3>
            <button onClick={onClose}>
              <svg className="w-6 h-6 text-theme-secondary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto px-4">
            <div className="text-theme-secondary text-center py-4">
              <img src={CommentIcon} alt="No comments" className="w-12 h-12 mx-auto mb-2 [filter:var(--icon-filter)]" />
              No comments yet
            </div>
          </div>
    
          <div className="sticky bottom-0 bg-theme-secondary p-4">
            <div className="flex items-center space-x-0">
              <div className="flex-1 flex items-center bg-[#2D2D2D] rounded-full h-12 pl-4 pr-2">
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write Comments..."
                  className="flex-1 bg-transparent text-white focus:outline-none placeholder-white border-none focus:ring-0 focus:border-0"
                />
                <button
                  onClick={handleSubmit}
                  disabled={!comment.trim()}
                  className={`p-2 ${!comment.trim() ? 'opacity-50' : 'hover:opacity-80'}`}
                >
                  <img src={SendIcon} alt="Send" className="w-6 h-6 text-white [filter:var(--icon-filter)]" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommentModal;