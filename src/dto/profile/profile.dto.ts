import { ApiResponse } from "../common";
import { Gender, ProfileResponseDto } from "../auth/auth.dto";

export interface UpdateProfileDto {
  nickname?: string; 
  bio?: string; 
  gender?: Gender; 
  country?: string; 
  city?: string; 
  avatar?: string; 
}

export type ProfileApiResponse = ApiResponse<ProfileResponseDto>;
export type UpdateProfile = UpdateProfileDto;