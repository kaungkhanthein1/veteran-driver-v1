import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const HomeApi = createApi({
  reducerPath: "HomeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://18.139.108.25:3201/api/v1" }),
  endpoints: (build) => ({
    getCountries: build.query({
      query: (name) => `/countries`,
    }),
    getLocationNearby: build.query({
      query: ({ lat, lng, distance, country_id }) => {
        return `/locations/nearby?lat=${lat}&lng=${lng}&distance=${distance}&country_id=${country_id}`;
      },
    }),
  }),
});

export const { useGetCountriesQuery, useGetLocationNearbyQuery } = HomeApi;
