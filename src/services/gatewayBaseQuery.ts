import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { gatewayRequest } from "./gateway";

export const gatewayBaseQuery =
  ({ baseUrl }: { baseUrl?: string } = {}): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: any;
      params?: any;
      headers?: any;
    },
    unknown,
    unknown
  > =>
  async ({ url, method = "GET", data, params, headers }) => {
    try {
      const response: AxiosResponse = await gatewayRequest({
        url: baseUrl ? baseUrl + url : url,
        method,
        data,
        params,
        headers,
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
