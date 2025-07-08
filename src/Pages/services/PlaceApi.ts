import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../config/env";
import { gatewayBaseQuery } from "../../services/gatewayBaseQuery";
import {
  NearbyForMapRequest,
  GetNearbyForMapResponse,
  NearbyForRecommendationRequest,
  GetNearbyForRecommendationResponse,
  PlaceDetailRequest,
  GetPlaceDetailResponse
} from "../../dto";

export const PlaceApi = createApi({
  reducerPath: "PlaceApi",
  baseQuery: gatewayBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    // Get nearby places for map display
    getNearbyPlacesForMap: builder.query<GetNearbyForMapResponse, NearbyForMapRequest>({
      query: (params) => ({
        url: `/places/nearby-for-map`,
        method: "GET",
        params,
      }),
    }),

    // Get nearby places for recommendation
    getNearbyPlacesForRecommendation: builder.query<GetNearbyForRecommendationResponse, NearbyForRecommendationRequest>({
      query: (params) => ({
        url: `/places/nearby-for-recommendation`,
        method: "GET",
        params,
      }),
    }),

    // Get place details by ID
    getPlaceById: builder.query<GetPlaceDetailResponse, PlaceDetailRequest>({
      query: ({ id, ...params }) => ({
        url: `/places/${id}`,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useGetNearbyPlacesForMapQuery,
  useGetNearbyPlacesForRecommendationQuery,
  useGetPlaceByIdQuery,
} = PlaceApi; 