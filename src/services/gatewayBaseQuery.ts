import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosResponse } from "axios";

import { RootState } from "../app/store"; // Adjust the path to your store file
import { gatewayRequest } from "./simplified_gateway";

export const gatewayBaseQuery =
  ({ baseUrl }: { baseUrl?: string } = {}): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      body?: any;
      params?: any;
      headers?: any;
    },
    unknown,
    unknown
  > =>
  async ({ url, method = "GET", body, params, headers }, api) => {
    try {
      // Get the recaptcha token from Redux state
      const state = api.getState() as RootState;
      const recaptchaToken = state.recaptchaSlice.data;

      console.log("Recaptcha Token:", recaptchaToken);

      // Prepare headers with recaptcha token if available
      const requestHeaders = {
        ...headers,
        ...(recaptchaToken ? { "x-recaptcha-token": recaptchaToken } : {}),
      };
      console.log(body, "data in gatewayBaseQuery");
      const response: AxiosResponse = await gatewayRequest({
        url: baseUrl ? baseUrl + url : url,
        method,
        data: body,
        params,
        headers: requestHeaders,
      });
      
      // Handle business logic at service level
      if (response.data && response.data.error) {
        return {
          error: {
            status: response.status,
            data: {
              message: response.data.error.message || "Business error",
              code: response.data.error.code,
              details: response.data.error,
            },
          },
        };
      }
      
      return { data: response.data };
    } catch (axiosError: any) {
      // Handle different types of errors
      if (axiosError.response) {
        // Server responded with error status
        const errorData = axiosError.response.data;
        return {
          error: {
            status: axiosError.response.status,
            data: {
              message: errorData?.error?.message || errorData?.message || "Server error",
              code: errorData?.error?.code || errorData?.code,
              details: errorData,
            },
          },
        };
      } else if (axiosError.request) {
        // Request was made but no response received
        return {
          error: {
            status: 0,
            data: {
              message: "Network error - no response received",
              code: "NETWORK_ERROR",
            },
          },
        };
      } else {
        // Something else happened
        return {
          error: {
            status: 500,
            data: {
              message: axiosError.message || "Unknown error occurred",
              code: "UNKNOWN_ERROR",
            },
          },
        };
      }
    }
  };
