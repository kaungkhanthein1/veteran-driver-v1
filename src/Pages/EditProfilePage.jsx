import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ProfilePic from '../icons/Profile/ProfilePic.svg';
import Modal from '../components/Modal';
import BackButton from "../components/BackButton";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "Rachel Zane Noel",
    bio: "Passionate traveller 🌍",
    gender: "Female",
    location: "Cambodia , Phnom Penh",
    avatar: ProfilePic,
    userId: "5839234"
  });

  const [modalState, setModalState] = useState({
    name: false,
    bio: false,
    gender: false,
    location: false
  });

  const handleOpenModal = (field) => {
    setModalState({ ...modalState, [field]: true });
  };

  const handleCloseModal = (field) => {
    setModalState({ ...modalState, [field]: false });
  };

  const handleApply = (field, value) => {
    setFormData({ ...formData, [field]: value });
    localStorage.setItem('profileData', JSON.stringify({ ...formData, [field]: value }));
    handleCloseModal(field);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          avatar: reader.result
        }));
        // Save to localStorage
        localStorage.setItem('profileData', JSON.stringify({
          ...formData,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-theme-background">
      <div className="max-w-[480px] mx-auto">
        {/* Header */}
        <div className="flex items-center px-4 py-4">
          <BackButton/>
          <h1 className="flex-1 text-center text-xl font-normal text-theme-text">Edit Profile</h1>
          <div className="w-6"></div>
        </div>

        {/* Profile Picture */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img 
                src={formData.avatar} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <label className="absolute bottom-0 right-0 w-6 h-6 bg-[#FDC51B] rounded-full flex items-center justify-center cursor-pointer">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
              </svg>
            </label>
          </div>
        </div>

        {/* Menu List Container */}
        <div className="mx-4 bg-theme-secondary rounded-xl overflow-hidden">
          <button 
            onClick={() => handleOpenModal('name')}
            className="w-full px-4 py-4 flex items-center justify-between"
          >
            <span className="text-theme-text">Change Username</span>
            <div className="flex items-center gap-2">
              <span className="text-theme-subtext">{formData.name}</span>
              <svg className="w-5 h-5 text-theme-subtext" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <button 
            onClick={() => handleOpenModal('bio')}
            className="w-full px-4 py-4 flex items-center justify-between"
          >
            <span className="text-theme-text">Change Bio</span>
            <div className="flex items-center gap-2">
              <span className="text-theme-subtext">{formData.bio}</span>
              <svg className="w-5 h-5 text-theme-subtext" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <button 
            onClick={() => handleOpenModal('gender')}
            className="w-full px-4 py-4 flex items-center justify-between"
          >
            <span className="text-theme-text">Gender</span>
            <div className="flex items-center gap-2">
              <span className="text-theme-subtext">{formData.gender}</span>
              <svg className="w-5 h-5 text-theme-subtext" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <button 
            onClick={() => handleOpenModal('location')}
            className="w-full px-4 py-4 flex items-center justify-between"
          >
            <span className="text-theme-text">Location</span>
            <div className="flex items-center gap-2">
              <span className="text-theme-subtext">{formData.location}</span>
              <svg className="w-5 h-5 text-theme-subtext" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>

          <div className="w-full px-4 py-4 flex items-center justify-between">
            <span className="text-theme-text">User ID</span>
            <span className="text-theme-subtext">{formData.userId}</span>
          </div>
        </div>

        {/* Modals */}
        <Modal
          title="Change Username"
          isOpen={modalState.name}
          onClose={() => handleCloseModal('name')}
          onApply={() => handleApply('name', formData.name)}
        >
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full bg-theme-secondary text-theme-primary px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC51B]"
            placeholder="Enter your username"
          />
        </Modal>

        <Modal
          title="Change Bio"
          isOpen={modalState.bio}
          onClose={() => handleCloseModal('bio')}
          onApply={() => handleApply('bio', formData.bio)}
        >
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full bg-theme-secondary text-theme-primary px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FDC51B] min-h-[100px] resize-none"
            placeholder="Write something about yourself"
          />
        </Modal>

        <Modal
          title="Gender"
          isOpen={modalState.gender}
          onClose={() => handleCloseModal('gender')}
          onApply={() => handleApply('gender', formData.gender)}
          type="bottom"
        >
          <div className="flex flex-col space-y-2">
            {['Male', 'Female', 'Other'].map((option) => (
              <button
                key={option}
                onClick={() => setFormData({ ...formData, gender: option })}
                className={`w-full p-2 rounded-lg ${formData.gender === option ? 'bg-[#FDC51B] text-black' : 'bg-theme-secondary text-theme-text'}`}
              >
                {option}
              </button>
            ))}
          </div>
        </Modal>

        <Modal
          title="Location"
          isOpen={modalState.location}
          onClose={() => handleCloseModal('location')}
          onApply={() => handleApply('location', formData.location)}
          type="bottom"
        >
          <div className="flex flex-col space-y-2">
            {['Thailand', 'Cambodia', 'Phnom Penh', 'Krong'].map((option) => (
              <button
                key={option}
                onClick={() => setFormData({ ...formData, location: option })}
                className={`w-full p-2 rounded-lg ${
                  formData.location === option 
                    ? 'bg-[#FDC51B] text-black' 
                    : 'bg-theme-secondary text-theme-text'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </Modal>
      </div>
    </div>
  );
}