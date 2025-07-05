import { gatewayRequest } from "./gateway";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Fetch current user's profile
export const fetchProfile = () =>
  gatewayRequest({
    url: `${API_BASE_URL}/profile/me`,
    method: "GET",
  }).then((res) => res.data);

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
  gatewayRequest({
    url: `${API_BASE_URL}/profile/me`,
    method: "PUT",
    data,
  }).then((res) => res.data); 