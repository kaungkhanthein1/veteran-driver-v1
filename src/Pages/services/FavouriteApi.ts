import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseUrl } from "../../config/env";
import { gatewayBaseQuery } from "../../services/gatewayBaseQuery";
import {
  CreateFolderDto,
  CreateFolderResponse,
  UpdateFolderDto,
  GetUserFoldersRequest,
  GetUserFoldersResponse,
  GetFolderByIdResponse,
  UpdateFolderResponse,
  AddFavoriteDto,
  AddFavoriteResponse,
  GetUserFavoritesRequest,
  GetUserFavoritesResponse,
  BatchRemoveFavoritesDto,
  BatchRemoveFavoritesResponse,
  MoveFavoriteDto,
  GetFavoritesByFolderRequest,
  GetFavoritesByFolderResponse,
  IsFavoritedResponse
} from "../../dto";

export const FavouriteApi = createApi({
  reducerPath: "FavouriteApi",
  baseQuery: gatewayBaseQuery({ baseUrl: apiBaseUrl }),
  endpoints: (builder) => ({
    // Folder Management
    getUserFolders: builder.query<GetUserFoldersResponse, GetUserFoldersRequest>({
      query: (params) => ({
        url: "/user-place-favorite/folders",
        method: "GET",
        params,
      }),
    }),
    createFolder: builder.mutation<CreateFolderResponse, CreateFolderDto>({
      query: (body) => ({
        url: "/user-place-favorite/folders",
        method: "POST",
        body,
      }),
    }),
    getFolderById: builder.query<GetFolderByIdResponse, string>({
      query: (id) => ({
        url: `/user-place-favorite/folders/${id}`,
        method: "GET",
      }),
    }),
    updateFolder: builder.mutation<UpdateFolderResponse, { id: string; data: UpdateFolderDto }>({
      query: ({ id, data }) => ({
        url: `/user-place-favorite/folders/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteFolder: builder.mutation<{ success: boolean }, string>({
      query: (id) => ({
        url: `/user-place-favorite/folders/${id}`,
        method: "DELETE",
      }),
    }),

    // Favorites Management
    addFavorite: builder.mutation<AddFavoriteResponse, AddFavoriteDto>({
      query: (body) => ({
        url: "/user-place-favorite/favorites",
        method: "POST",
        body,
      }),
    }),
    getUserFavorites: builder.query<GetUserFavoritesResponse, GetUserFavoritesRequest>({
      query: (params) => ({
        url: "/user-place-favorite/favorites",
        method: "GET",
        params,
      }),
    }),
    removeFavorite: builder.mutation<{ success: boolean }, string>({
      query: (placeId) => ({
        url: `/user-place-favorite/favorites/place/${placeId}`,
        method: "DELETE",
      }),
    }),
    batchRemoveFavorites: builder.mutation<BatchRemoveFavoritesResponse, BatchRemoveFavoritesDto>({
      query: (body) => ({
        url: "/user-place-favorite/favorites/batch",
        method: "DELETE",
        body,
      }),
    }),
    moveFavorite: builder.mutation<{ success: boolean }, MoveFavoriteDto>({
      query: (body) => ({
        url: "/user-place-favorite/favorites/move",
        method: "POST",
        body,
      }),
    }),
    getFavoritesByFolder: builder.query<GetFavoritesByFolderResponse, GetFavoritesByFolderRequest>({
      query: ({ folderId, ...params }) => ({
        url: `/user-place-favorite/favorites/folder/${folderId}`,
        method: "GET",
        params,
      }),
    }),
    isFavorited: builder.query<IsFavoritedResponse, string>({
      query: (placeId) => ({
        url: `/user-place-favorite/favorites/check/${placeId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserFoldersQuery,
  useCreateFolderMutation,
  useGetFolderByIdQuery,
  useUpdateFolderMutation,
  useDeleteFolderMutation,
  useAddFavoriteMutation,
  useGetUserFavoritesQuery,
  useRemoveFavoriteMutation,
  useBatchRemoveFavoritesMutation,
  useMoveFavoriteMutation,
  useGetFavoritesByFolderQuery,
  useIsFavoritedQuery,
} = FavouriteApi; 