
export interface CreateFolderDto {
  name: string;
  description?: string;
  isPublic?: boolean;
}

export interface CreateFolderResponseDto {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  createdAt: string;
}

export interface UpdateFolderDto {
  name?: string;
  description?: string;
  isPublic?: boolean;
}

export interface FolderDto {
  id: string;
  name: string;
  description: string;
  isDefault: boolean;
  coverPlaceId?: string;
  itemCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface FolderListResponseDto {
  items: FolderDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ===== Favorites Management =====

export interface AddFavoriteDto {
  placeId: string;
  folderId?: string;
}

export interface AddFavoriteResponseDto {
  id: string;
  folderId: string;
  folderName: string;
  placeId: string;
  createdAt: string;
}

export interface MoveFavoriteDto {
  placeId: string;
  toFolderId: string;
}

export interface BatchRemoveFavoritesDto {
  placeIds: string[];
}

export interface BatchOperationResponseDto {
  successCount: number;
  failedIds?: string[];
}

export interface FavoriteDto {
  id: string;
  folderId: string;
  folder?: {
    id: string;
    name: string;
  };
  placeId: string;
  place?: {
    id: string;
    name: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface FavoriteListResponseDto {
  favorites: FavoriteDto[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ===== Check Favorites =====

export interface CheckFavoritedDto {
  uid: string;
  placeId: string;
}

export interface BatchCheckFavoritedDto {
  uid: string;
  placeIds: string[];
}

// ===== Request Parameters =====

export interface GetUserFoldersRequest {
  page?: number;
  limit?: number;
  search?: string;
}

export interface GetUserFavoritesRequest {
  page?: number;
  limit?: number;
  search?: string;
  lat?: number;
  lng?: number;
}

export interface GetFavoritesByFolderRequest {
  folderId: string;
  page?: number;
  limit?: number;
  search?: string;
  lat?: number;
  lng?: number;
}

// ===== API Response Types =====

export type CreateFolderResponse = CreateFolderResponseDto;
export type GetUserFoldersResponse = FolderListResponseDto;
export type GetFolderByIdResponse = FolderDto;
export type UpdateFolderResponse = FolderDto;
export type AddFavoriteResponse = AddFavoriteResponseDto;
export type GetUserFavoritesResponse = FavoriteListResponseDto;
export type BatchRemoveFavoritesResponse = BatchOperationResponseDto;
export type GetFavoritesByFolderResponse = FavoriteListResponseDto;
export type IsFavoritedResponse = boolean; 