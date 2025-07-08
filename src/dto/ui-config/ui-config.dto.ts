// ===== Enums and Types =====

export type UiConfigScope = 'global' | 'country' | 'locale' | 'locale-country';

export type Platform = 'app' | 'web' | 'h5';

// ===== UI Configuration Structure =====

export interface UiConfigDto {
  id: string;
  key: string;
  scope: UiConfigScope;
  country?: string;
  lang?: string;
  platform?: Platform;
  value: Record<string, string>;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UiConfigListResponseDto {
  data: UiConfigDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface BatchUiConfigResponseDto {
  data: Record<string, string>;
}

// ===== Request Parameters =====

export interface GetUiConfigByKeyRequest {
  key: string;
  country?: string;
  lang?: string;
  platform?: Platform;
}

export interface GetAllUiConfigsRequest {
  country?: string;
  lang?: string;
  platform?: Platform;
}

export interface BatchQueryUiConfigDto {
  keys: string[];
  country?: string;
  lang?: string;
  platform?: Platform;
  enabledOnly?: boolean;
}

// ===== API Response Types =====

export type GetUiConfigByKeyResponse = UiConfigDto;
export type GetAllUiConfigsResponse = UiConfigListResponseDto;
export type BatchQueryUiConfigResponse = BatchUiConfigResponseDto; 