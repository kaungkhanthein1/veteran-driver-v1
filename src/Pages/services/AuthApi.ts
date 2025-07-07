import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { gatewayBaseQuery } from "../../services/gatewayBaseQuery";
import { storeTokens } from "./tokenUtils";
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
    baseUrl:
      "http://ec2-52-221-179-216.ap-southeast-1.compute.amazonaws.com/api/v1/auth",
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
