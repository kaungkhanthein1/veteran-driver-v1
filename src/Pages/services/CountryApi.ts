import { createApi } from "@reduxjs/toolkit/query/react";
import { gatewayBaseQuery } from "../../services/gatewayBaseQuery";

export const CountryApi = createApi({
  reducerPath: "CountryApi",
  baseQuery: gatewayBaseQuery({
    baseUrl: "https://vtt_dev.movie06.com/api/v1", // Adjust if needed
  }),
  endpoints: (builder) => ({
    getCountries: builder.query<any, void>({
      query: () => ({
        url: "/geo/countries", // Use the correct endpoint from your API docs
        method: "GET",
      }),
      transformResponse: (response: any) => response.data?.countries || [],
    }),
    getLanguages: builder.query<any, void>({
      query: () => ({
        url: "/geo/supported-languages", // Use the correct endpoint from your API docs
        method: "GET",
      }),
      transformResponse: (response: any) => response.data || [],
    }),
  }),
});

export const { useGetCountriesQuery, useGetLanguagesQuery } = CountryApi;
