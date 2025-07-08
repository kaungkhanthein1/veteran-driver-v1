// DEPRECATED: This file is deprecated. Use the following service APIs instead:
// - GeoApi for countries and location data
// - PlaceApi for place-related data  
// - UiConfigApi for UI configuration
// - ProfileApi for user profile data

import { createApi } from "@reduxjs/toolkit/query/react";
import { gatewayBaseQuery } from "../services/gatewayBaseQuery";

// This API is kept for backward compatibility only
// New implementations should use the specific service APIs
export const HomeApi = createApi({
  reducerPath: "HomeApi",
  baseQuery: gatewayBaseQuery({
    baseUrl: "https://vtt_dev.movie06.com/api/v1",
  }),
  endpoints: (build) => ({
    // Deprecated - use GeoApi.useGetAllCountriesQuery() instead
    getCountries: build.query<any, void>({
      query: () => ({ url: "/countries" }),
    }),
  }),
});

export const {
  useGetCountriesQuery,
} = HomeApi;
