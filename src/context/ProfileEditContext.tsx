import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ProfileData {
  nickname: string;
  username: string;
  bio: string;
  gender: string;
  country: string;
  city: string;
  avatar: string;
  userId: string;
}

interface ProfileEditContextType {
  profileData: ProfileData;
  setProfileData: (data: ProfileData) => void;
  updateField: (field: keyof ProfileData, value: string) => void;
  hasChanges: boolean;
  originalData: ProfileData | null;
  setOriginalData: (data: ProfileData) => void;
  resetChanges: () => void;
}

const ProfileEditContext = createContext<ProfileEditContextType | undefined>(undefined);

export const useProfileEdit = () => {
  const context = useContext(ProfileEditContext);
  if (!context) {
    throw new Error('useProfileEdit must be used within a ProfileEditProvider');
  }
  return context;
};

interface ProfileEditProviderProps {
  children: ReactNode;
}

export const ProfileEditProvider: React.FC<ProfileEditProviderProps> = ({ children }) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    nickname: '',
    username: '',
    bio: '',
    gender: '',
    country: '',
    city: '',
    avatar: '',
    userId: ''
  });
  
  const [originalData, setOriginalData] = useState<ProfileData | null>(null);

  const updateField = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const hasChanges = originalData ? 
    JSON.stringify(profileData) !== JSON.stringify(originalData) : false;

  const resetChanges = () => {
    if (originalData) {
      setProfileData(originalData);
    }
  };

  const value: ProfileEditContextType = {
    profileData,
    setProfileData,
    updateField,
    hasChanges,
    originalData,
    setOriginalData,
    resetChanges
  };

  return (
    <ProfileEditContext.Provider value={value}>
      {children}
    </ProfileEditContext.Provider>
  );
}; 