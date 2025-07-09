// import { createApi } from "@reduxjs/toolkit/query/react";
// import { gatewayBaseQuery } from "../services/gatewayBaseQuery";
// // import { gatewayUrl } from "../config/env";

// interface LocationNearbyParams {
//   lat: number;
//   lng: number;
//   distance: number;
//   country_id: string | number;
// }

// export const HomeApi = createApi({
//   reducerPath: "HomeApi",
//   baseQuery: gatewayBaseQuery({
//     baseUrl: "https://vtt_dev.movie06.com/api/v1",
//   }),
//   endpoints: (build) => ({
//     getCountries: build.query({
//       query: () => ({ url: "/countries" }),
//     }),
//     getLocationNearby: build.query<any, LocationNearbyParams>({
//       query: ({ lat, lng, distance, country_id }) => ({
//         url: `/locations/nearby`,
//         params: { lat, lng, distance, country_id },
//       }),
//     }),
//     getConfigall: build.query<any, any>({
//       query: () => ({
//         url: `/ui-config/all`,
//         params: { country: "th", platform: "h5" },
//       }),
//     }),
//   }),
// });

// export const {
//   useGetCountriesQuery,
//   useGetLocationNearbyQuery,
//   useGetConfigallQuery,
// } = HomeApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import { gatewayBaseQuery } from "../services/gatewayBaseQuery";
import { sendSignedAndDecrypt } from "../services/gatewayCryptoHelper";

// Create a custom base query wrapper for endpoints that need signed requests
const signedBaseQuery = async (args: any) => {
  try {
    const response = await sendSignedAndDecrypt({
      url: `https://vtt_dev.movie06.com/api/v1${args.url}`,
      method: args.method || "GET",
      query: args.params,
    });
    return { data: response };
  } catch (error: any) {
    return { error: error.message || error };
  }
};

export const HomeApi = createApi({
  reducerPath: "HomeApi",
  baseQuery: gatewayBaseQuery({
    baseUrl: "https://vtt_dev.movie06.com/api/v1",
  }),
  endpoints: (build) => ({
    // Regular endpoints using gatewayBaseQuery
    getCountries: build.query({
      query: () => ({ url: "/countries" }),
    }),

    getLocationNearby: build.query<any, any>({
      async queryFn() {
        return signedBaseQuery({
          url: "/places/nearby-for-map",
          params: { lat: "11.5458547", lng: "104.9305413" },
        });
      },
    }),

    // Endpoint using signed requests
    getConfigall: build.query<any, any>({
      async queryFn() {
        return signedBaseQuery({
          url: "/ui-config/all",
          params: { country: "kh", platform: "h5" },
        });
      },
    }),
    getRecommand: build.query<any, any>({
      async queryFn({ query }) {
        return signedBaseQuery({
          url: "/places/nearby-for-recommendation",
          params: { lat: "11.5458547", lng: "104.9305413", limit: 23, query },
        });
      },
    }),
    getPlace: build.query<any, any>({
      async queryFn({ id }) {
        return signedBaseQuery({
          url: `/places/${id}`,
          params: { lat: "11.5458547", lng: "104.9305413", id },
        });
      },
    }),

    // Example of a mutation that needs signing
  }),
});

export const {
  useGetCountriesQuery,
  useGetLocationNearbyQuery,
  useGetConfigallQuery,
  useGetRecommandQuery,
  useGetPlaceQuery,
} = HomeApi;
