import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../config/env";
import { gatewayBaseQuery } from "../../services/gatewayBaseQuery";
import {
  GetUploadUrlRequest,
  GetUploadUrlResponse,
  BatchUploadUrlDto,
  GetBatchUploadUrlsResponse,
  ConfirmUploadDto,
  ConfirmUploadResponse
} from "../../dto";

export const MediaApi = createApi({
  reducerPath: "MediaApi",
  baseQuery: gatewayBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    // Get single upload URL
    getUploadUrl: builder.query<GetUploadUrlResponse, GetUploadUrlRequest>({
      query: (params) => ({
        url: `/media/upload-url`,
        method: "GET",
        params,
      }),
    }),

    // Get batch upload URLs
    getBatchUploadUrls: builder.mutation<GetBatchUploadUrlsResponse, BatchUploadUrlDto>({
      query: (body) => ({
        url: `/media/batch-upload-urls`,
        method: "POST",
        body,
      }),
    }),

    // Confirm upload completion
    confirmUpload: builder.mutation<ConfirmUploadResponse, ConfirmUploadDto>({
      query: (body) => ({
        url: `/media/confirm-upload`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetUploadUrlQuery,
  useGetBatchUploadUrlsMutation,
  useConfirmUploadMutation,
} = MediaApi; 