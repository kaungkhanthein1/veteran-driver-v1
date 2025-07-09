import { gatewayRequest } from "./gateway";

import { gatewayUrl } from "../config/env";

// Type definitions for favorites/bookmarks

export interface FavoriteFolder {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  itemCount?: number;
}

export interface CreateFolderRequest {
  name: string;
  description?: string;
}

export interface UpdateFolderRequest {
  name?: string;
  description?: string;
}

export interface FavoriteItem {
  id: string;
  placeId: string;
  folderId?: string;
  createdAt: string;
  place?: {
    id: string;
    name: string;
    description?: string;
    rating?: number;
    latitude?: number;
    longitude?: number;
    city?: string;
    photos?: Array<{
      id: string;
      url: string;
      width: string;
      height: string;
    }>;
  };
}

export interface AddFavoriteRequest {
  placeId: string;
  folderId?: string;
}

export interface MoveFavoriteRequest {
  placeId: string;
  targetFolderId?: string;
}

export interface BatchRemoveFavoritesRequest {
  placeIds: string[];
}

export interface SearchFavoritesRequest {
  query: string;
  folderId?: string;
  page?: number;
  limit?: number;
  lat?: number;
  lng?: number;
}

export interface FavoritesResponse {
  success: boolean;
  data: FavoriteItem[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface FoldersResponse {
  success: boolean;
  data: FavoriteFolder[];
}

export interface CheckFavoriteResponse {
  success: boolean;
  data: {
    placeId: string;
    isFavorited: boolean;
    folderId?: string;
  };
}



// Favorites Service
export const favoritesService = {
  // Folder Management
  
  /**
   * Create a new favorite folder
   */
  createFolder: async (folderData: CreateFolderRequest): Promise<FavoriteFolder> => {
    try {
      const { data } = await gatewayRequest({
        url: `${gatewayUrl}/user-place-favorite/folders`,
        method: "POST",
        data: folderData,
      });
      
      // Handle different response formats
      if (data.data) {
        return data.data;
      }
      return data;
    } catch (error) {
      console.error("Error creating folder:", error);
      throw error;
    }
  },

  /**
   * Get all user's favorite folders
   */
  getFolders: async (): Promise<FavoriteFolder[]> => {
    try {
      const { data } = await gatewayRequest({
        url: `${gatewayUrl}/user-place-favorite/folders`,
        method: "GET",
      });
      
      // Handle different response formats
      if (data.data && Array.isArray(data.data.items)) {
        return data.data.items;
      }
      if (data.data && Array.isArray(data.data)) {
        return data.data;
      }
      if (Array.isArray(data)) {
        return data;
      }
      
      // If no folders exist, return empty array
      return [];
    } catch (error) {
      console.error("Error fetching folders:", error);
      // Return empty array if API fails - allows user to create first folder
      return [];
    }
  },

  /**
   * Get a specific folder by ID
   */
  getFolderById: async (folderId: string): Promise<FavoriteFolder> => {
    try {
      const { data } = await gatewayRequest({
        url: `${gatewayUrl}/user-place-favorite/folders/${folderId}`,
        method: "GET",
      });
      
      if (data.data) {
        return data.data;
      }
      return data;
    } catch (error) {
      console.error("Error fetching folder:", error);
      throw error;
    }
  },

  /**
   * Update a favorite folder
   */
  updateFolder: async (
    folderId: string,
    folderData: UpdateFolderRequest
  ): Promise<FavoriteFolder> => {
    try {
      const { data } = await gatewayRequest({
        url: `${gatewayUrl}/user-place-favorite/folders/${folderId}`,
        method: "PUT",
        data: folderData,
      });
      
      if (data.data) {
        return data.data;
      }
      return data;
    } catch (error) {
      console.error("Error updating folder:", error);
      throw error;
    }
  },

  /**
   * Delete a favorite folder
   */
  deleteFolder: async (folderId: string): Promise<void> => {
    try {
      await gatewayRequest({
        url: `${gatewayUrl}/user-place-favorite/folders/${folderId}`,
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error deleting folder:", error);
      throw error;
    }
  },

  // Favorites Management

  /**
   * Add a place to favorites
   */
  addFavorite: async (favoriteData: AddFavoriteRequest): Promise<FavoriteItem> => {
    try {
      const { data } = await gatewayRequest({
        url: `${gatewayUrl}/user-place-favorite/favorites`,
        method: "POST",
        data: favoriteData,
      });
      
      if (data.data) {
        return data.data;
      }
      return data;
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  },

  /**
   * Remove a place from favorites
   */
  removeFavorite: async (placeId: string): Promise<void> => {
    try {
      await gatewayRequest({
        url: `${gatewayUrl}/user-place-favorite/favorites/place/${placeId}`,
        method: "DELETE",
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
      throw error;
    }
  },

  /**
   * Get all user's favorites with pagination
   */
  getAllFavorites: async (
    page: number = 1,
    limit: number = 20
  ): Promise<FavoritesResponse> => {
    try {
      const { data } = await gatewayRequest({
        url: `${gatewayUrl}/user-place-favorite/favorites`,
        method: "GET",
        params: { page, limit },
      });
      
      if (data.data) {
        return {
          success: true,
          data: data.data.favorites || data.data,
          pagination: {
            page: data.data.page || page,
            limit: data.data.limit || limit,
            total: data.data.total || 0,
            totalPages: data.data.totalPages || 0
          }
        };
      }
      
      return {
        success: true,
        data: [],
        pagination: { page, limit, total: 0, totalPages: 0 }
      };
    } catch (error) {
      console.error("Error fetching favorites:", error);
      return {
        success: false,
        data: [],
        pagination: { page, limit, total: 0, totalPages: 0 }
      };
    }
  },

  /**
   * Get favorites in a specific folder
   */
  getFavoritesByFolder: async (
    folderId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<FavoritesResponse> => {
    try {
      const { data } = await gatewayRequest({
        url: `${gatewayUrl}/user-place-favorite/favorites/folder/${folderId}`,
        method: "GET",
        params: { page, limit },
      });
      
      if (data.data) {
        return {
          success: true,
          data: data.data.favorites || data.data,
          pagination: {
            page: data.data.page || page,
            limit: data.data.limit || limit,
            total: data.data.total || 0,
            totalPages: data.data.totalPages || 0
          }
        };
      }
      
      return {
        success: true,
        data: [],
        pagination: { page, limit, total: 0, totalPages: 0 }
      };
    } catch (error) {
      console.error("Error fetching folder favorites:", error);
      return {
        success: false,
        data: [],
        pagination: { page, limit, total: 0, totalPages: 0 }
      };
    }
  },

  /**
   * Check if a place is favorited
   */
  checkFavorite: async (placeId: string): Promise<CheckFavoriteResponse> => {
    try {
      const { data } = await gatewayRequest({
        url: `${gatewayUrl}/user-place-favorite/favorites/check/${placeId}`,
        method: "GET",
      });
      
      return {
        success: true,
        data: data.data || data
      };
    } catch (error) {
      console.error("Error checking favorite:", error);
      return {
        success: false,
        data: { placeId, isFavorited: false }
      };
    }
  },

  /**
   * Move a favorite to another folder
   */
  moveFavorite: async (moveData: MoveFavoriteRequest): Promise<FavoriteItem> => {
    try {
      const { data } = await gatewayRequest({
        url: `${gatewayUrl}/user-place-favorite/favorites/move`,
        method: "POST",
        data: moveData,
      });
      
      if (data.data) {
        return data.data;
      }
      return data;
    } catch (error) {
      console.error("Error moving favorite:", error);
      throw error;
    }
  },

  /**
   * Batch remove favorites
   */
  batchRemoveFavorites: async (
    batchData: BatchRemoveFavoritesRequest
  ): Promise<void> => {
    try {
      await gatewayRequest({
        url: `${gatewayUrl}/user-place-favorite/favorites/batch`,
        method: "DELETE",
        data: batchData,
      });
    } catch (error) {
      console.error("Error batch removing favorites:", error);
      throw error;
    }
  },

  /**
   * Search favorites
   */
  searchFavorites: async (
    searchData: SearchFavoritesRequest
  ): Promise<FavoritesResponse> => {
    const { query, page = 1, limit = 20, ...filters } = searchData;
    
    try {
      const params = {
        search: query,
        page,
        limit,
        ...filters
      };
      
      const { data } = await gatewayRequest({
        url: `${gatewayUrl}/user-place-favorite/favorites/search`,
        method: "GET",
        params,
      });
      
      if (data.data) {
        return {
          success: true,
          data: data.data.favorites || data.data,
          pagination: {
            page: data.data.page || page,
            limit: data.data.limit || limit,
            total: data.data.total || 0,
            totalPages: data.data.totalPages || 0
          }
        };
      }
      
      return {
        success: true,
        data: [],
        pagination: { page, limit, total: 0, totalPages: 0 }
      };
    } catch (error) {
      console.error("Error searching favorites:", error);
      return {
        success: false,
        data: [],
        pagination: { page, limit, total: 0, totalPages: 0 }
      };
    }
  },
};

export default favoritesService; 