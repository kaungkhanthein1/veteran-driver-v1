import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface LocationNearbyParams {
  lat: number;
  lng: number;
  distance: number;
  country_id: string | number;
}

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://vtt_dev.movie06.com/api/v1/auth",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<void, { data: any }>({
      query: (data) => ({
        url: `/password-login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation<void, { data: any }>({
      query: (data) => ({
        url: `/register`,
        method: "POST",
        body: data,
      }),
    }),
    sendverify: builder.mutation<void, { data: any }>({
      query: (data) => ({
        url: `/send-verification-code`,
        method: "POST",
        body: data,
      }),
    }),
    emailOTP: builder.mutation<void, { data: any }>({
      query: (data) => ({
        url: `/email-otp-login`,
        method: "POST",
        body: data,
      }),
    }),
    resetPasswordCode: builder.mutation<void, { data: any }>({
      query: (data) => ({
        url: `/send-reset-password-code`,
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation<void, { data: any }>({
      query: (data) => ({
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
} = AuthApi;
