import { createApi } from "@reduxjs/toolkit/query/react";
import { sendSignedAndDecrypt } from "../../services/gatewayCryptoHelper";
import { apiBaseUrl } from "../../config/env";
import { gatewayBaseQuery } from "../../services/gatewayBaseQuery";

export const ProfileApi = createApi({
  reducerPath: "ProfileApi",
  baseQuery: gatewayBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  endpoints: (builder) => ({
    me: builder.query<any, void>({
      query: () => ({
        url: "/profile/me",
        method: "GET",
      }),
    }),
    getUploadUrl: builder.mutation<
      any,
      { type: string; usage: string; mimeType?: string }
    >({
      async queryFn(params) {
        try {
          const response = await sendSignedAndDecrypt({
            url: `${apiBaseUrl}/media/upload-url`,
            method: "GET",
            query: {
              type: params.type,
              usage: params.usage,
              mimeType: params.mimeType,
            },
          });
          return { data: response };
        } catch (error: any) {
          return { error: error.message || error };
        }
      },
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
      async queryFn(body) {
        try {
          const response = await sendSignedAndDecrypt({
            url: `${apiBaseUrl}/media/batch-upload-urls`,
            method: "POST",
            bodyObject: body,
          });
          return { data: response };
        } catch (error: any) {
          return { error: error.message || error };
        }
      },
    }),
    confirmUpload: builder.mutation<
      any,
      {
        key: string;
        size: number;
        meta?: { width?: number; height?: number; source?: string };
      }
    >({
      async queryFn(body) {
        try {
          const response = await sendSignedAndDecrypt({
            url: `${apiBaseUrl}/media/confirm-upload`,
            method: "POST",
            bodyObject: body,
          });
          return { data: response };
        } catch (error: any) {
          return { error: error.message || error };
        }
      },
    }),
  }),
});

export const {
  useMeQuery,
  useGetUploadUrlMutation,
  useGetBatchUploadUrlsMutation,
  useConfirmUploadMutation,
} = ProfileApi;
