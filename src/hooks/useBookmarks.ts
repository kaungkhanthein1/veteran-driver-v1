import { useState, useEffect, useCallback, useRef } from 'react';
import { favoritesService, FavoriteItem } from '../services/FavoritesService';

interface BookmarkItem {
  id: string | number;
  name?: string;
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
  [key: string]: any;
}

interface UseBookmarksReturn {
  bookmarkedItems: FavoriteItem[];
  folders: any[];
  isLoading: boolean;
  error: string | null;
  toggleBookmark: (item: BookmarkItem) => Promise<void>;
  isBookmarked: (itemId: string | number) => boolean;
  addToFolder: (item: BookmarkItem, folderId?: string) => Promise<void>;
  removeFromBookmarks: (placeId: string) => Promise<void>;
  createFolder: (name: string, description?: string) => Promise<void>;
  updateFolder: (folderId: string, name: string, description?: string) => Promise<void>;
  deleteFolder: (folderId: string) => Promise<void>;
  moveToFolder: (placeId: string, targetFolderId?: string) => Promise<void>;
  refreshBookmarks: () => Promise<void>;
}

export function useBookmarks(): UseBookmarksReturn {
  const [bookmarkedItems, setBookmarkedItems] = useState<FavoriteItem[]>([]);
  const [folders, setFolders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasInitialized, setHasInitialized] = useState<boolean>(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Load bookmarks from API - only called manually or on mount
  const loadBookmarks = useCallback(async () => {
    // Prevent multiple simultaneous calls
    if (isLoading) return;

    // Cancel any ongoing request
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new abort controller
    abortControllerRef.current = new AbortController();

    setIsLoading(true);
    setError(null);
    
    try {
      // Load favorites and folders in parallel with timeout
      const [favoritesResponse, foldersData] = await Promise.all([
        favoritesService.getAllFavorites(1, 100),
        favoritesService.getFolders(),
      ]);
      
      // Check if request was aborted
      if (abortControllerRef.current?.signal.aborted) {
        return;
      }
      
      setBookmarkedItems(favoritesResponse.data || []);
      setFolders(foldersData || []);
      setHasInitialized(true);
    } catch (err: any) {
      // Don't set error if request was aborted
      if (err.name === 'AbortError' || abortControllerRef.current?.signal.aborted) {
        return;
      }

      setError(err.message || 'Failed to load bookmarks');
      console.error('Error loading bookmarks:', err);
      
      // Fallback to localStorage if API fails
      const saved = localStorage.getItem('bookmarkedItems');
      if (saved) {
        try {
          const localBookmarks = JSON.parse(saved);
          setBookmarkedItems(localBookmarks);
        } catch (parseError) {
          console.error('Error parsing local bookmarks:', parseError);
        }
      }
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]); // Only depend on isLoading to prevent infinite loops

  // Initialize on mount only
  useEffect(() => {
    if (!hasInitialized) {
      loadBookmarks();
    }
    
    // Cleanup on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []); // Empty dependency array - only run on mount

  // Save to localStorage as backup
  useEffect(() => {
    if (bookmarkedItems.length > 0 && hasInitialized) {
      localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarkedItems));
    }
  }, [bookmarkedItems, hasInitialized]);

  const toggleBookmark = useCallback(async (item: BookmarkItem): Promise<void> => {
    const placeId = String(item.id);
    const isCurrentlyBookmarked = bookmarkedItems.some(bookmark => bookmark.placeId === placeId);
    
    setError(null);
    try {
      if (isCurrentlyBookmarked) {
        await favoritesService.removeFavorite(placeId);
        setBookmarkedItems(prev => prev.filter(bookmarked => bookmarked.placeId !== placeId));
      } else {
        const newFavorite = await favoritesService.addFavorite({ placeId });
        setBookmarkedItems(prev => [...prev, newFavorite]);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update bookmark');
      console.error('Error toggling bookmark:', err);
      
      // Fallback to localStorage behavior
      setBookmarkedItems(prev => {
        const filtered = prev.filter(bookmarked => bookmarked.placeId !== placeId);
        if (!isCurrentlyBookmarked) {
          const favoriteItem: FavoriteItem = {
            id: Date.now().toString(),
            placeId,
            createdAt: new Date().toISOString(),
            place: {
              id: placeId,
              name: item.name || '',
              description: item.description,
              rating: item.rating,
              latitude: item.latitude,
              longitude: item.longitude,
              city: item.city,
              photos: item.photos,
            }
          };
          return [...filtered, favoriteItem];
        }
        return filtered;
      });
    }
  }, [bookmarkedItems]);

  const isBookmarked = useCallback((itemId: string | number): boolean => {
    const placeId = String(itemId);
    return bookmarkedItems.some(item => item.placeId === placeId);
  }, [bookmarkedItems]);

  const addToFolder = useCallback(async (item: BookmarkItem, folderId?: string): Promise<void> => {
    const placeId = String(item.id);
    setError(null);
    try {
      const newFavorite = await favoritesService.addFavorite({ placeId, folderId });
      setBookmarkedItems(prev => {
        const filtered = prev.filter(bookmarked => bookmarked.placeId !== placeId);
        return [...filtered, newFavorite];
      });
    } catch (err: any) {
      setError(err.message || 'Failed to add to folder');
      console.error('Error adding to folder:', err);
    }
  }, []);

  const removeFromBookmarks = useCallback(async (placeId: string): Promise<void> => {
    setError(null);
    try {
      await favoritesService.removeFavorite(placeId);
      setBookmarkedItems(prev => prev.filter(bookmarked => bookmarked.placeId !== placeId));
    } catch (err: any) {
      setError(err.message || 'Failed to remove bookmark');
      console.error('Error removing bookmark:', err);
    }
  }, []);

  const createFolder = useCallback(async (name: string, description?: string): Promise<void> => {
    setError(null);
    try {
      const newFolder = await favoritesService.createFolder({ name, description });
      setFolders(prev => [...prev, newFolder]);
    } catch (err: any) {
      setError(err.message || 'Failed to create folder');
      console.error('Error creating folder:', err);
    }
  }, []);

  const updateFolder = useCallback(async (folderId: string, name: string, description?: string): Promise<void> => {
    setError(null);
    try {
      const updatedFolder = await favoritesService.updateFolder(folderId, { name, description });
      setFolders(prev => prev.map(folder => 
        folder.id === folderId ? { ...folder, ...updatedFolder } : folder
      ));
    } catch (err: any) {
      setError(err.message || 'Failed to update folder');
      console.error('Error updating folder:', err);
    }
  }, []);

  const deleteFolder = useCallback(async (folderId: string): Promise<void> => {
    setError(null);
    try {
      await favoritesService.deleteFolder(folderId);
      setFolders(prev => prev.filter(folder => folder.id !== folderId));
      // Refresh bookmarks to update items that were in the deleted folder
      await loadBookmarks();
    } catch (err: any) {
      setError(err.message || 'Failed to delete folder');
      console.error('Error deleting folder:', err);
    }
  }, [loadBookmarks]);

  const moveToFolder = useCallback(async (placeId: string, targetFolderId?: string): Promise<void> => {
    setError(null);
    try {
      await favoritesService.moveFavorite({ placeId, targetFolderId });
      setBookmarkedItems(prev => 
        prev.map(item => 
          item.placeId === placeId ? { ...item, folderId: targetFolderId } : item
        )
      );
    } catch (err: any) {
      setError(err.message || 'Failed to move to folder');
      console.error('Error moving to folder:', err);
    }
  }, []);

  const refreshBookmarks = useCallback(async (): Promise<void> => {
    await loadBookmarks();
  }, [loadBookmarks]);

  return { 
    bookmarkedItems, 
    folders,
    isLoading,
    error,
    toggleBookmark, 
    isBookmarked,
    addToFolder,
    removeFromBookmarks,
    createFolder,
    updateFolder,
    deleteFolder,
    moveToFolder,
    refreshBookmarks,
  };
}