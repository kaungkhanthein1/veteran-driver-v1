// ===== Media Types and Enums =====

export type MediaType = 'avatar' | 'image' | 'video' | 'audio' | 'document' | 'place-photo' | 'place-video' | 'chat';

export type MediaUsage = 'profile' | 'cover' | 'message-attachment' | 'verification' | 'promotion' | 'other' | 'temp';

// ===== Upload URL Management =====

export interface GetUploadUrlDto {
  type: MediaType;
  usage: MediaUsage;
  mimeType: string;
  expiresIn?: number;
}

export interface UploadUrlResponseDto {
  key: string;
  uploadUrl: string;
  expiresIn: number;
  accessUrl: string;
}

export interface BatchUploadUrlDto {
  uploads: GetUploadUrlDto[];
}

export interface BatchUploadUrlResponseDto {
  results: UploadUrlResponseDto[];
  total: number;
  errors: string[];
}

// ===== Upload Confirmation =====

export interface ConfirmUploadDto {
  key: string;
  size?: number;
  meta?: Record<string, string>;
}

export interface ConfirmUploadResponseDto {
  id: string;
  key: string;
  accessUrl: string;
  success: boolean;
}

// ===== Media Data Structures =====

export interface MediaDto {
  id: string;
  key: string;
  uid?: string;
  type: MediaType;
  mimeType?: string;
  size?: number;
  isPublic: boolean;
  usage: MediaUsage;
  expiresAt?: string;
  meta?: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

// ===== Request Parameters =====

export interface GetUploadUrlRequest {
  type: MediaType;
  usage: MediaUsage;
  mimeType?: string;
  expiresIn?: number;
}

// ===== API Response Types =====

export type GetUploadUrlResponse = UploadUrlResponseDto;
export type GetBatchUploadUrlsResponse = BatchUploadUrlResponseDto;
export type ConfirmUploadResponse = ConfirmUploadResponseDto; 