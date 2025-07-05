import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ProfileEditProvider } from '../../context/ProfileEditContext';
import EditProfilePage from './EditProfilePage';
import EditNicknamePage from './EditNicknamePage';
import EditUsernamePage from './EditUsernamePage';
import EditBioPage from './EditBioPage';
import EditGenderPage from './EditGenderPage';
import EditCountryPage from './EditCountryPage';
import EditCityPage from './EditCityPage';

export default function ProfileEditWrapper() {
  return (
    <ProfileEditProvider>
      <Routes>
        <Route path="" element={<EditProfilePage />} />
        <Route path="nickname" element={<EditNicknamePage />} />
        <Route path="username" element={<EditUsernamePage />} />
        <Route path="bio" element={<EditBioPage />} />
        <Route path="gender" element={<EditGenderPage />} />
        <Route path="country" element={<EditCountryPage />} />
        <Route path="city" element={<EditCityPage />} />
      </Routes>
    </ProfileEditProvider>
  );
} 