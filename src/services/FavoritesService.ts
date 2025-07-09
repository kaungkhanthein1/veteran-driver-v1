import { gatewayRequest } from "./gateway";

// Use relative URLs for development proxy support
const API_BASE = "/api/v1";

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
        url: `${API_BASE}/user-place-favorite/folders`,
        method: "POST",
        data: folderData,
      });
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
        url: `${API_BASE}/user-place-favorite/folders`,
        method: "GET",
      });
      return data.folders || data;
    } catch (error) {
      console.error("Error fetching folders:", error);
      throw error;
    }
  },

  /**
   * Get a specific folder by ID
   */
  getFolderById: async (folderId: string): Promise<FavoriteFolder> => {
    try {
      const { data } = await gatewayRequest({
        url: `${API_BASE}/user-place-favorite/folders/${folderId}`,
        method: "GET",
      });
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
        url: `${API_BASE}/user-place-favorite/folders/${folderId}`,
        method: "PUT",
        data: folderData,
      });
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
        url: `${API_BASE}/user-place-favorite/folders/${folderId}`,
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
        url: `${API_BASE}/user-place-favorite/favorites`,
        method: "POST",
        data: favoriteData,
      });
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
        url: `${API_BASE}/user-place-favorite/favorites/place/${placeId}`,
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
        url: `${API_BASE}/user-place-favorite/favorites`,
        method: "GET",
        params: { page, limit },
      });
      return data;
    } catch (error) {
      console.error("Error fetching favorites:", error);
      throw error;
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
        url: `${API_BASE}/user-place-favorite/favorites/folder/${folderId}`,
        method: "GET",
        params: { page, limit },
      });
      return data;
    } catch (error) {
      console.error("Error fetching folder favorites:", error);
      throw error;
    }
  },

  /**
   * Check if a place is favorited
   */
  checkFavorite: async (placeId: string): Promise<CheckFavoriteResponse> => {
    try {
      const { data } = await gatewayRequest({
        url: `${API_BASE}/user-place-favorite/favorites/check/${placeId}`,
        method: "GET",
      });
      return data;
    } catch (error) {
      console.error("Error checking favorite:", error);
      throw error;
    }
  },

  /**
   * Move a favorite to another folder
   */
  moveFavorite: async (moveData: MoveFavoriteRequest): Promise<FavoriteItem> => {
    try {
      const { data } = await gatewayRequest({
        url: `${API_BASE}/user-place-favorite/favorites/move`,
        method: "POST",
        data: moveData,
      });
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
        url: `${API_BASE}/user-place-favorite/favorites/batch`,
        method: "DELETE",
        data: batchData,
      });
    } catch (error) {
      console.error("Error batch removing favorites:", error);
      throw error;
    }
  },

  // Utility functions

  /**
   * Check if multiple places are favorited
   */
  checkMultipleFavorites: async (
    placeIds: string[]
  ): Promise<{ [placeId: string]: boolean }> => {
    try {
      const results: { [placeId: string]: boolean } = {};
      
      // Make individual requests for each place (you can optimize this with a batch endpoint if available)
      const promises = placeIds.map(async (placeId) => {
        try {
          const result = await favoritesService.checkFavorite(placeId);
          results[placeId] = result.data.isFavorited;
        } catch (error) {
          results[placeId] = false;
        }
      });

      await Promise.all(promises);
      return results;
    } catch (error) {
      console.error("Error checking multiple favorites:", error);
      throw error;
    }
  },

  /**
   * Get favorite count by folder
   */
  getFavoriteCountsByFolder: async (): Promise<{ [folderId: string]: number }> => {
    try {
      const folders = await favoritesService.getFolders();
      const counts: { [folderId: string]: number } = {};
      
      for (const folder of folders) {
        counts[folder.id] = folder.itemCount || 0;
      }
      
      return counts;
    } catch (error) {
      console.error("Error getting favorite counts:", error);
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
        url: `${API_BASE}/user-place-favorite/favorites/search`,
        method: "GET",
        params,
      });
      return data;
    } catch (error) {
      console.error("Error searching favorites:", error);
      throw error;
    }
  },
};

export default favoritesService; 