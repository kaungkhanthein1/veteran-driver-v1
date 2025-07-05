import { createApi } from "@reduxjs/toolkit/query/react";
import { gatewayBaseQuery } from "../../services/gatewayBaseQuery";

export const ProfileApi = createApi({
  reducerPath: "ProfileApi",
  baseQuery: gatewayBaseQuery({
    baseUrl: "https://vtt_dev.movie06.com/api/v1",
  }),
  endpoints: (builder) => ({
    me: builder.query<any, void>({
      query: () => ({
        url: `/profile/me`,
        method: "GET",
      }),
    }),
  }),
});

export const { useMeQuery } = ProfileApi;
