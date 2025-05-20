import React from 'react';
import { useNavigate } from 'react-router-dom';

const SubmittedLocationModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleOk = () => {
    onClose();
    navigate('/social'); // Navigate back to social page after submission
  };

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 z-[1000]"
      />
      <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[1001] bg-theme-primary rounded-2xl">
        <div className="p-6">
          <h3 className="text-theme-primary text-xl font-medium mb-2">Location Submitted!</h3>
          <p className="text-theme-secondary text-sm mb-6">
            Your location has been added successfully. It will be reviewed by an admin shortly. You'll be notified once it's approved.
          </p>
          
          <div className="flex justify-end">
            <button
              onClick={handleOk}
              className="bg-[#FDC51B] text-black rounded-lg px-8 py-3 text-base font-medium"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubmittedLocationModal;