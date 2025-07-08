
export interface CountryTranslationDto {
  language: string; 
  name: string; 
  code?: string; 
}

export interface CityTranslationDto {
  language: string; 
  name: string; 
  code?: string; 
}

export interface CountryResponseDto {
  id: string; 
  code: string; 
  iso3: string; 
  numericCode: string; // example: "840"
  flag?: string; 
  timezone?: string; 
  currency?: string; 
  currencySymbol?: string; 
  translations: CountryTranslationDto[];
  createdAt: string; 
  updatedAt: string; 
}

export interface CountryListResponseDto {
  countries: CountryResponseDto[];
  total: number; 
  page: number; 
  limit: number; 
}

export interface SimpleCountryDto {
  code: string; 
  name: string; 
  iso3: string; 
  numericCode: string; 
  flag: string; 
}

export interface SimpleCountryListResponseDto {
  countries: SimpleCountryDto[];
  total: number; 
}

export interface CityResponseDto {
  id: string; 
  code: string; 
  countryCode: string; 
  translations: CityTranslationDto[];
  createdAt: string; 
  updatedAt: string; 
}

export interface CityListResponseDto {
  cities: CityResponseDto[];
  total: number; 
  page: number; 
  limit: number; 
}

export interface SimpleCityDto {
  code: string; 
  name: string; 
  countryCode: string; 
}

export interface SimpleCityListResponseDto {
  cities: SimpleCityDto[];
  total: number; 
}

export interface SupportedLanguagesResponseDto {
  code: string; 
  name: string; 
  englishName: string; 
}

export interface SupportedCountriesResponseDto {
  code: string; 
  iso3: string; 
  englishName: string; 
  name: string; 
  phoneCode: string; 
  flag: string; 
}

export interface AddressComponentDto {
  street: string; 
  houseNumber: string; 
  neighbourhood: string; 
  district: string; 
  city: string; 
  state: string; 
  postcode: string; 
  country: string; 
  countryCode: string; 
}

/**
 * Geocoding result structure
 */
export interface GeocodingResultDto {
  name: string; 
  displayName: string; 
  lat: number; 
  lon: number; 
  address: AddressComponentDto;
  type: string; 
  importance: number; 
  boundingbox: string[]; // example: ["10.7796208","10.7803417","106.6996491","106.7003930"]
}

export interface ReverseGeocodingResponseDto {
  result: GeocodingResultDto;
  provider: string; 
}


// ===== Public API Request Parameters =====


export interface GetCountriesRequest {
  language?: string; 
  code?: string; 
  iso3?: string; 
  search?: string; 
  page?: number; 
  limit?: number; 
}

export interface GetCitiesRequest {
  language?: string; 
  code?: string; 
  countryCode?: string; 
  stateCode?: string; 
  search?: string; 
  page?: number; 
  limit?: number; 
}

export interface GetCitiesByCountryRequest {
  countryCode: string;
}

export interface ReverseGeocodeRequest {
  lat: number; 
  lon: number; 
}

// ===== Public API Response Types =====

export type GetCountriesResponse = CountryListResponseDto;

export type GetCitiesResponse = CityListResponseDto;

export type GetAllCountriesResponse = SimpleCountryListResponseDto;

export type GetCitiesByCountryResponse = SimpleCityListResponseDto;

export type GetSupportedLanguagesResponse = SupportedLanguagesResponseDto[];

export type GetSupportedCountriesResponse = SupportedCountriesResponseDto[];

export type GetReverseGeocodeResponse = ReverseGeocodingResponseDto;

 