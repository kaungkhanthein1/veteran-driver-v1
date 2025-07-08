import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../config/env";
import { gatewayBaseQuery } from "../../services/gatewayBaseQuery";
import {
  GetCountriesRequest,
  GetCountriesResponse,         
  GetCitiesRequest,
  GetCitiesResponse,
  GetAllCountriesResponse,
  GetCitiesByCountryRequest,
  GetCitiesByCountryResponse,
  GetSupportedLanguagesResponse,
  GetSupportedCountriesResponse,
  ReverseGeocodeRequest,
  GetReverseGeocodeResponse
} from "../../dto";

export const GeoApi = createApi({
  reducerPath: "GeoApi",
  baseQuery: gatewayBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    // Get countries with pagination and filters
    getCountries: builder.query<GetCountriesResponse, GetCountriesRequest>({
      query: (params) => ({
        url: `/geo/countries`,
        method: "GET",
        params,
      }),
    }),

    // Get all countries (simple list)
    getAllCountries: builder.query<GetAllCountriesResponse, void>({
      query: () => ({
        url: `/geo/all-countries`,
        method: "GET",
      }),
    }),

    // Get cities with pagination and filters
    getCities: builder.query<GetCitiesResponse, GetCitiesRequest>({
      query: (params) => ({
        url: `/geo/cities`,
        method: "GET",
        params,
      }),
    }),

    // Get cities by country
    getCitiesByCountry: builder.query<GetCitiesByCountryResponse, GetCitiesByCountryRequest>({
      query: ({ countryCode }) => ({
        url: `/geo/countries/${countryCode}/cities`,
        method: "GET",
      }),
    }),

    // Get supported languages
    getSupportedLanguages: builder.query<GetSupportedLanguagesResponse, void>({
      query: () => ({
        url: `/geo/supported-languages`,
        method: "GET",
      }),
    }),

    // Get supported countries
    getSupportedCountries: builder.query<GetSupportedCountriesResponse, void>({
      query: () => ({
        url: `/geo/supported-countries`,
        method: "GET",
      }),
    }),

    // Reverse geocoding
    reverseGeocode: builder.query<GetReverseGeocodeResponse, ReverseGeocodeRequest>({
      query: (params) => ({
        url: `/geo/reverse`,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useGetAllCountriesQuery,
  useGetCitiesQuery,
  useGetCitiesByCountryQuery,
  useGetSupportedLanguagesQuery,
  useGetSupportedCountriesQuery,
  useReverseGeocodeQuery,
} = GeoApi; 