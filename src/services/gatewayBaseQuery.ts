import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { RootState } from "../app/store";

import { gatewayRequest } from "./gateway";
import {
  storeTokens,
  getRefreshToken,
  isTokenExpired,
  clearTokens,
} from "../Pages/services/tokenUtils";
import { AuthApi } from "../Pages/services/AuthApi";

export const gatewayBaseQuery = ({
  baseUrl,
}: { baseUrl?: string } = {}): BaseQueryFn<
  {
    url: string;
    method?: AxiosRequestConfig["method"];
    body?: any;
    params?: any;
    headers?: any;
  },
  unknown,
  unknown
> => {
  const baseQuery = async (
    { url, method = "GET", body, params, headers }: any,
    api: any
  ) => {
    try {
      // Get the recaptcha token from Redux state
      const state = api.getState() as RootState;
      const recaptchaToken = state.recaptchaSlice.data;

      // Prepare headers with recaptcha token if available
      const requestHeaders = {
        ...headers,
        ...(recaptchaToken ? { "x-recaptcha-token": recaptchaToken } : {}),
      };

      // Check if token is expired and we have a refresh token
      if (isTokenExpired() && getRefreshToken() && url !== "/refresh-token") {
        try {
          // Attempt to refresh the token
          const refreshResult = await api.dispatch(
            AuthApi.endpoints.refreshToken.initiate({
              refreshToken: getRefreshToken() as string,
            })
          );
          
          console.log("Refresh result:", refreshResult);

          if (refreshResult.data && refreshResult.data.data && refreshResult.data.data.token) {
            // Store the new tokens
            storeTokens(refreshResult.data.data.token);
            console.log("Token refreshed successfully");
          } else {
            // Refresh failed - clear tokens
            console.warn("Token refresh failed, clearing tokens");
            clearTokens();
            return {
              error: {
                status: 401,
                data: {
                  message: "Session expired. Please log in again.",
                  code: "SESSION_EXPIRED",
                },
              },
            };
          }
        } catch (refreshError) {
          console.error("Token refresh error:", refreshError);
          clearTokens();
          return {
            error: {
              status: 401,
              data: {
                message: "Failed to refresh session. Please log in again.",
                code: "REFRESH_FAILED",
              },
            },
          };
        }
      }

      // Construct the full URL
      const fullUrl = baseUrl ? `${baseUrl}${url}` : url;
      

      // Make the request using the improved gateway
      const response: AxiosResponse = await gatewayRequest({
        url: fullUrl,
        method,
        data: body,
        params, // Let simplified_gateway handle query parameter merging
        headers: requestHeaders,
      });

      // Handle business logic errors at service level
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
      console.error("Gateway request error:", axiosError);

      // Handle different types of errors
      if (axiosError.response) {
        // Server responded with error status
        const errorData = axiosError.response.data;

        // If it's a 401 unauthorized, clear tokens
        if (axiosError.response.status === 401) {
          console.warn("401 Unauthorized, clearing tokens");
          clearTokens();
        }

        return {
          error: {
            status: axiosError.response.status,
            data: {
              message:
                errorData?.error?.message ||
                errorData?.message ||
                "Server error",
              code: errorData?.error?.code || errorData?.code,
              details: errorData,
            },
          },
        };
      } else if (axiosError.request) {
        // Request was made but no response received
        console.error("Network error - no response received:", axiosError.request);
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
        console.error("Unknown error:", axiosError.message);
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

  return baseQuery;
};
