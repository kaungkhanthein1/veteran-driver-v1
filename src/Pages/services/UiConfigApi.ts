import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../config/env";
import { gatewayBaseQuery } from "../../services/gatewayBaseQuery";
import {
  GetUiConfigByKeyRequest,
  GetUiConfigByKeyResponse,
  GetAllUiConfigsRequest,
  GetAllUiConfigsResponse
} from "../../dto";

export const UiConfigApi = createApi({
  reducerPath: "UiConfigApi",
  baseQuery: gatewayBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    getUiConfigByKey: builder.query<GetUiConfigByKeyResponse, GetUiConfigByKeyRequest>({
      query: ({ key, ...params }) => ({
        url: `/ui-config/key`,
        method: "GET",
        params: { key, ...params },
      }),
    }),
    getAllUiConfigs: builder.query<GetAllUiConfigsResponse, GetAllUiConfigsRequest>({
      query: (params) => ({
        url: "/ui-config/all",
        method: "GET",
        params,
      }),
    }),
  }),
});

export const {
  useGetUiConfigByKeyQuery,
  useGetAllUiConfigsQuery,
} = UiConfigApi; 