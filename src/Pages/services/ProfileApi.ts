import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../config/env";
import { gatewayBaseQuery } from "../../services/gatewayBaseQuery";
import {
  ProfileApiResponse,
  UpdateProfile,
} from "../../dto";


export const ProfileApi = createApi({
  reducerPath: "ProfileApi",
  baseQuery: gatewayBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  endpoints: (builder) => ({
    me: builder.query<ProfileApiResponse, void>({
      query: () => ({
        url: "/profile/me",
        method: "GET",
      }),
    }),
    updateProfile: builder.mutation<ProfileApiResponse, UpdateProfile>({
      query: (body) => ({
        url: "/profile/me",
        method: "PUT",
        body,
      }),
    }),
   
  }),
});

export const {
  useMeQuery,
  useUpdateProfileMutation,
 
} = ProfileApi;
