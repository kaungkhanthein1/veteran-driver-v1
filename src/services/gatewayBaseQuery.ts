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
