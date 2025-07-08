export interface MultiLanguageNameDto {
  en: string; 
  zh?: string; 
}

export interface MultiLanguageDescriptionDto {
  en?: string; 
  zh?: string; 
}

export interface MultiLanguageAddressDto {
  en?: string; 
  zh?: string; 
}

export interface PlaceLocationDto {
  type: "Point";
  coordinates: [number, number]; 
}

export interface PlaceResponseDto {
  id: string; 
  googlePlaceId?: string; 
  name: MultiLanguageNameDto;
  description?: MultiLanguageDescriptionDto;
  address?: MultiLanguageAddressDto;
  location: PlaceLocationDto;
  country: string; 
  city: string; 
  tags: string[]; 
  rating?: number; 
  ratingCount?: number; 
  isActive: boolean; 
  photos?: string[]; 
  createdAt?: string; 
  updatedAt?: string; 
  distance?: number; // calculated field
}

export interface PlaceDetailResponseDto extends PlaceResponseDto {
  views?: number;
  favorites?: number;
  popularityScore?: number;
}

export interface NearbyForMapResponseDto {
  places: PlaceResponseDto[];
  total: number;
}

export interface NearbyForMapRequest {
  lat: number; 
  lng: number; 
  distance?: number; 
  limit: number; 
}

export interface NearbyForRecommendationRequest {
  lat: number; 
  lng: number; 
  distance?: number; 
  limit: number; 
}

export interface PlaceDetailRequest {
  id: string;
  lat: number; 
  lng: number; 
}

export type GetNearbyForMapResponse = NearbyForMapResponseDto;

export type GetNearbyForRecommendationResponse = NearbyForMapResponseDto;

export type GetPlaceDetailResponse = PlaceDetailResponseDto; 