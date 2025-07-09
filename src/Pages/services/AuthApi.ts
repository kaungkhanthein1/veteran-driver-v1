import { createApi } from "@reduxjs/toolkit/query/react";
import { gatewayBaseQuery } from "../../services/gatewayBaseQuery";
import { storeTokens } from "./tokenUtils";

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: gatewayBaseQuery({
    baseUrl: `https://vtt_dev.movie06.com/api/v1/auth`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation<void, { data: any }>({
      query: ({ data }) => ({
        url: `/password-login`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => {
        if (response.data?.token) {
          storeTokens(response.data.token);
        }
        return response;
      },
    }),
    me: builder.query<any, void>({
      query: () => ({
        url: `/profile/me`,
        method: "GET",
      }),
    }),

    register: builder.mutation<void, { data: any }>({
      query: ({ data }) => ({
        url: `/register`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => {
        if (response.data?.token) {
          storeTokens(response.data.token);
        }
        return response;
      },
    }),
    sendverify: builder.mutation<void, { data: any }>({
      query: ({ data }) => {
        // This endpoint is used to send a verification code for registration or login
        // It can be used for both email and phone verification
        // The data object should contain the necessary information like 'to', 'channel', and 'scene'
        return {
          url: `/send-verification-code`,
          method: "POST",
          body: data,
        };
      },
      //   } ({

      // url: `/send-verification-code`,
      // method: "POST",
      // body: data,
      //   }),
    }),
    // Add this to your AuthApi endpoints
    refreshToken: builder.mutation<{ token: any }, { refreshToken: string }>({
      query: ({ refreshToken }) => ({
        url: `/refresh-token`,
        method: "POST",
        body: { refreshToken },
      }),
    }),
    emailOTP: builder.mutation<void, { data: any }>({
      query: ({ data }) => ({
        url: `/email-otp-login`,
        method: "POST",
        body: data,
      }),
    }),
    resetPasswordCode: builder.mutation<void, { data: any }>({
      query: ({ data }) => ({
        url: `/send-reset-password-code`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<void, { data: any }>({
      query: ({ data }) => ({
        url: `/reset-password`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useEmailOTPMutation,
  useRegisterMutation,
  useResetPasswordCodeMutation,
  useSendverifyMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
} = AuthApi;
