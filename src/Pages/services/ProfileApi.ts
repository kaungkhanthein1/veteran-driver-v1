// import { createApi } from "@reduxjs/toolkit/query/react";
// import { gatewayBaseQuery } from "../../services/gatewayBaseQuery";

// export const ProfileApi = createApi({
//   reducerPath: "ProfileApi",
//   baseQuery: gatewayBaseQuery({
//     baseUrl: "https://vtt_dev.movie06.com/api/v1",
//   }),
//   endpoints: (builder) => ({
//     me: builder.query<any, void>({
//       query: () => ({
//         url: `/profile/me`,
//         method: "GET",
//       }),
//     }),
//   }),
// });

// export const { useMeQuery } = ProfileApi;

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
    getUploadUrl: builder.mutation<
      any,
      { type: string; usage: string; mimeType?: string }
    >({
      query: (params) => ({
        url: `/public/media/upload-url`,
        method: "GET",
        params: {
          type: params.type,
          usage: params.usage,
          // mimeType: params.mimeType,
        },
      }),
    }),
    getBatchUploadUrls: builder.mutation<
      any,
      {
        uploads: Array<{
          type: string;
          usage: string;
          mimeType: string;
          expiresIn?: number;
        }>;
      }
    >({
      query: (body) => ({
        url: `/public/media/batch-upload-urls`,
        method: "POST",
        body,
      }),
    }),
    confirmUpload: builder.mutation<
      any,
      {
        key: string;
        size: number;
        meta?: { width?: number; height?: number; source?: string };
      }
    >({
      query: (body) => ({
        url: `/public/media/confirm-upload`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useMeQuery,
  useGetUploadUrlMutation,
  useGetBatchUploadUrlsMutation,
  useConfirmUploadMutation,
} = ProfileApi;
