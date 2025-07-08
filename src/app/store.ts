import { configureStore } from "@reduxjs/toolkit";
// import { countrySlice } from "./countrySlice";
import countryReducer from "./countrySlice";
import { HomeApi } from "../features/HomeApi";
import { AuthApi } from "../Pages/services/AuthApi";
import recaptchaSlice from "../services/recaptchaSlice";
import { ProfileApi } from "../Pages/services/ProfileApi";
import { GeoApi } from "../Pages/services/GeoApi";
import { PlaceApi } from "../Pages/services/PlaceApi";
import { MediaApi } from "../Pages/services/MediaApi";
import { FavouriteApi } from "../Pages/services/FavouriteApi";
import { UiConfigApi } from "../Pages/services/UiConfigApi";

export const store = configureStore({
  reducer: {
    recaptchaSlice: recaptchaSlice,
    country: countryReducer,
    [HomeApi.reducerPath]: HomeApi.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [ProfileApi.reducerPath]: ProfileApi.reducer,
    [GeoApi.reducerPath]: GeoApi.reducer,
    [PlaceApi.reducerPath]: PlaceApi.reducer,
    [MediaApi.reducerPath]: MediaApi.reducer,
    [FavouriteApi.reducerPath]: FavouriteApi.reducer,
    [UiConfigApi.reducerPath]: UiConfigApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(HomeApi.middleware)
      .concat(AuthApi.middleware)
      .concat(ProfileApi.middleware)
      .concat(GeoApi.middleware)
      .concat(PlaceApi.middleware)
      .concat(MediaApi.middleware)
      .concat(FavouriteApi.middleware)
      .concat(UiConfigApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
