import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { gatewayBaseQuery } from "../../services/gatewayBaseQuery";
//   // Get the recaptcha token from Redux state
//   const state = api.getState() as RootState;
//   const recaptchaToken = state.recaptchaSlice.data;

//   console.log("Recaptcha Token:", recaptchaToken);

//   // Prepare headers with recaptcha token if available
//   const requestHeaders = {
//     ...headers,
//     ...(recaptchaToken ? { "x-recaptcha-token": recaptchaToken } : {}),
//   };
export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: gatewayBaseQuery({
    baseUrl: "https://vtt_dev.movie06.com/api/v1/auth",
  }),
  endpoints: (builder) => ({
    login: builder.mutation<void, { data: any }>({
      query: ({ data }) => ({
        url: `/password-login`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation<void, { data: any }>({
      query: ({ data }) => ({
        url: `/register`,
        method: "POST",
        body: data,
      }),
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
} = AuthApi;
