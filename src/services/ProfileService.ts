import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch current user's profile
export const fetchProfile = () => axios.get(`${API_BASE_URL}/api/v1/profile/me`);

// Update current user's profile
export type ProfileUpdatePayload = {
  nickname?: string;
  bio?: string;
  gender?: string;
  country?: string;
  city?: string;
  avatar?: string;
};

export const updateProfile = (data: ProfileUpdatePayload) =>
  axios.put(`${API_BASE_URL}/api/v1/profile/me`, data); 