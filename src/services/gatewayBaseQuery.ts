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
      return { data: response.data };
    } catch (axiosError: any) {
      return {
        error: {
          status: axiosError.response?.status || 500,
          data: axiosError.response?.data || axiosError.message,
        },
      };
    }
  };
