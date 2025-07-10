import { configureStore } from "@reduxjs/toolkit";
// import { countrySlice } from "./countrySlice";
import countryReducer from "./countrySlice";
import { HomeApi } from "../features/HomeApi";
import { AuthApi } from "../Pages/services/AuthApi";
import recaptchaSlice from "../services/recaptchaSlice";
import { ProfileApi } from "../Pages/services/ProfileApi";
import { CountryApi } from "../Pages/services/CountryApi";
import ErrorSlice from "../Pages/ErrorSlice";

export const store = configureStore({
  reducer: {
    recaptchaSlice: recaptchaSlice,
    country: countryReducer,
    errorslice: ErrorSlice,
    [HomeApi.reducerPath]: HomeApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [ProfileApi.reducerPath]: ProfileApi.reducer,
    [CountryApi.reducerPath]: CountryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(HomeApi.middleware)
      .concat(AuthApi.middleware)
      .concat(ProfileApi.middleware)
      .concat(CountryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
