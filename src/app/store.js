import { configureStore } from "@reduxjs/toolkit";
// import { countrySlice } from "./countrySlice";
import countryReducer from "./countrySlice";
import { HomeApi } from "../features/HomeApi";

export const store = configureStore({
  reducer: {
    country: countryReducer,
    [HomeApi.reducerPath]: HomeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(HomeApi.middleware),
});
