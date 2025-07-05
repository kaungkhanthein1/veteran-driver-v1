import { createApi } from "@reduxjs/toolkit/query/react";
import { gatewayBaseQuery } from "../services/gatewayBaseQuery";
import { gatewayUrl } from "../config/env";

interface LocationNearbyParams {
  lat: number;
  lng: number;
  distance: number;
  country_id: string | number;
}

export const HomeApi = createApi({
  reducerPath: "HomeApi",
  baseQuery: gatewayBaseQuery({
    baseUrl: gatewayUrl,
  }),
  endpoints: (build) => ({
    getCountries: build.query({
      query: () => ({ url: "/countries" }),
    }),
    getLocationNearby: build.query<any, LocationNearbyParams>({
      query: ({ lat, lng, distance, country_id }) => ({
        url: `/locations/nearby`,
        params: { lat, lng, distance, country_id },
      }),
    }),
  }),
});

export const { useGetCountriesQuery, useGetLocationNearbyQuery } = HomeApi;
