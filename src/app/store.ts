import { configureStore } from "@reduxjs/toolkit";
// import { countrySlice } from "./countrySlice";
import countryReducer from "./countrySlice";
import { HomeApi } from "../features/HomeApi";
import { AuthApi } from "../Pages/services/AuthApi";
import recaptchaSlice from "../services/recaptchaSlice";

export const store = configureStore({
  reducer: {
    recaptchaSlice: recaptchaSlice,
    country: countryReducer,
    [HomeApi.reducerPath]: HomeApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(HomeApi.middleware)
      .concat(AuthApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
