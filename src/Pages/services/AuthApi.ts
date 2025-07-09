import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../config/env";
import { gatewayBaseQuery } from "../../services/gatewayBaseQuery";
import { storeTokens } from "./tokenUtils";
import { config } from "process";
//   // Get the recaptcha token from Redux state
//   const state = api.getState() as RootState;
//   const recaptchaToken = state.recaptchaSlice.data;

//   console.log("Recaptcha Token:", recaptchaToken);

//   // Prepare headers with recaptcha token if available
//   const requestHeaders = {
//     ...headers,
//     ...(recaptchaToken ? { "x-recaptcha-token": recaptchaToken } : {}),
//   };
import {
  SendVerificationCodeDto,
  SendVerificationCodeResponse,
  UserRegisterDto,
  UserRegisterResponse,
  PasswordLoginDto,
  PasswordLoginResponse,
  EmailOtpLoginDto,
  EmailOtpLoginResponse,
  SendResetPasswordCodeDto,
  SendResetPasswordCodeResponse,
  ResetPasswordDto,
  ResetPasswordResponse,
  RefreshTokenDto,
  RefreshTokenResponse,
  UpdateUsernameDto,
  UpdateUsernameResponse,
  UpdateEmailDto,
  UpdateEmailResponse,
  UpdatePasswordDto,
  UpdatePasswordResponse
} from "../../dto";

export const AuthApi = createApi({
  reducerPath: "AuthApi",
  baseQuery: gatewayBaseQuery({
    baseUrl:
      `https://vtt_dev.movie06.com/api/v1/auth`,
  }),
  baseQuery: gatewayBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    // Send Verification Code
    sendVerificationCode: builder.mutation<SendVerificationCodeResponse, SendVerificationCodeDto>({
      query: (data) => ({
        url: `/auth/send-verification-code`,
        method: "POST",
        body: data,
      }),
    }),

    // User Registration
    register: builder.mutation<UserRegisterResponse, UserRegisterDto>({
      query: (data) => ({
        url: `/auth/register`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: UserRegisterResponse) => {
        if (response?.token) {
          storeTokens(response.token);
        }
        return response;
      },
    }),

    // Password Login
    passwordLogin: builder.mutation<PasswordLoginResponse, PasswordLoginDto>({
      query: (data) => ({
        url: `/auth/password-login`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: PasswordLoginResponse) => {
        if (response?.token) {
          storeTokens(response.token);
        }
        return response;
      },
    }),

    // Email OTP Login
    emailOtpLogin: builder.mutation<EmailOtpLoginResponse, EmailOtpLoginDto>({
      query: (data) => ({
        url: `/auth/email-otp-login`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: EmailOtpLoginResponse) => {
        if (response?.token) {
          storeTokens(response.token);
        }
        return response;
      },
    }),

    // Send Reset Password Code
    sendResetPasswordCode: builder.mutation<SendResetPasswordCodeResponse, SendResetPasswordCodeDto>({
      query: (data) => ({
        url: `/auth/send-reset-password-code`,
        method: "POST",
        body: data,
      }),
    }),

    // Reset Password
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordDto>({
      query: (data) => ({
        url: `/auth/reset-password`,
        method: "POST",
        body: data,
      }),
    }),

    // Refresh Token
    refreshToken: builder.mutation<RefreshTokenResponse, RefreshTokenDto>({
      query: (data) => ({
        url: `/auth/refresh-token`,
        method: "POST",
        body: data,
      }),
      transformResponse: (response: RefreshTokenResponse) => {
        if (response?.token) {
          storeTokens(response.token);
        }
        return response;
      },
    }),

    // Update Username
    updateUsername: builder.mutation<UpdateUsernameResponse, UpdateUsernameDto>({
      query: (data) => ({
        url: `/auth/update-username`,
        method: "POST",
        body: data,
      }),
    }),

    // Update Email
    updateEmail: builder.mutation<UpdateEmailResponse, UpdateEmailDto>({
      query: (data) => ({
        url: `/auth/update-email`,
        method: "POST",
        body: data,
      }),
    }),

    // Update Password
    updatePassword: builder.mutation<UpdatePasswordResponse, UpdatePasswordDto>({
      query: (data) => ({
        url: `/auth/update-password`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSendVerificationCodeMutation,
  useRegisterMutation,
  usePasswordLoginMutation,
  useEmailOtpLoginMutation,
  useSendResetPasswordCodeMutation,
  useResetPasswordMutation,
  useRefreshTokenMutation,
  useUpdateUsernameMutation,
  useUpdateEmailMutation,
  useUpdatePasswordMutation,
} = AuthApi;
