import { useState, useEffect, useCallback } from 'react';
import { 
  useGetUserFavoritesQuery,
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useIsFavoritedQuery
} from '../Pages/services/FavouriteApi';
import { PlaceResponseDto } from '../dto/place/place.dto';
import { useAuth } from '../context/AuthContext';

interface BookmarkItem extends PlaceResponseDto {
  favoriteId?: string;
  folderId?: string;
  folderName?: string;
}

interface UseBookmarksReturn {
  bookmarkedItems: BookmarkItem[];
  toggleBookmark: (item: BookmarkItem, folderId?: string) => Promise<void>;
  isBookmarked: (itemId: string) => boolean;
  addBookmark: (item: BookmarkItem, folderId?: string) => Promise<void>;
  removeBookmark: (itemId: string) => Promise<void>;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useBookmarks(): UseBookmarksReturn {
  const { isAuthenticated } = useAuth();
  const [localBookmarks, setLocalBookmarks] = useState<BookmarkItem[]>(() => {
    const saved = localStorage.getItem('bookmarkedItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [error, setError] = useState<string | null>(null);

  // Get user favorites from API only if authenticated
  const { 
    data: favoritesData, 
    isLoading: favoritesLoading, 
    error: favoritesError,
    refetch: refetchFavorites
  } = useGetUserFavoritesQuery({ 
    page: 1, 
    limit: 1000 // Get all favorites
  }, {
    skip: !isAuthenticated // Skip API call if not authenticated
  });

  const [addFavorite, { isLoading: addLoading }] = useAddFavoriteMutation();
  const [removeFavorite, { isLoading: removeLoading }] = useRemoveFavoriteMutation();

  const loading = favoritesLoading || addLoading || removeLoading;

  // Merge API favorites with place data for display, or use localStorage if not authenticated
  const bookmarkedItems: BookmarkItem[] = isAuthenticated 
    ? favoritesData?.favorites?.map(fav => ({
        ...localBookmarks.find(local => local.id === fav.placeId) || { 
          id: fav.placeId,
          name: fav.place?.name ? { en: fav.place.name, zh: fav.place.name } : { en: 'Unknown Place' },
          location: { type: 'Point' as const, coordinates: [0, 0] },
          country: '',
          city: '',
          tags: [],
          isActive: true
        },
        favoriteId: fav.id,
        folderId: fav.folderId,
        folderName: fav.folder?.name
      })) || []
    : localBookmarks;

  // Sync localStorage when API data changes
  useEffect(() => {
    if (bookmarkedItems.length > 0) {
      localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarkedItems));
    }
  }, [bookmarkedItems]);

  // Handle API errors
  useEffect(() => {
    if (favoritesError) {
      setError('Failed to load favorites');
      console.error('Favorites error:', favoritesError);
    } else {
      setError(null);
    }
  }, [favoritesError]);

  const isBookmarked = useCallback((itemId: string): boolean => {
    return bookmarkedItems.some(item => item.id === itemId);
  }, [bookmarkedItems]);

  const addBookmark = useCallback(async (item: BookmarkItem, folderId?: string): Promise<void> => {
    try {
      setError(null);
      
      // If not authenticated, just use localStorage
      if (!isAuthenticated) {
        const newBookmark = { ...item, folderId };
        setLocalBookmarks(prev => {
          const updated = [...prev.filter(b => b.id !== item.id), newBookmark];
          localStorage.setItem('bookmarkedItems', JSON.stringify(updated));
          return updated;
        });
        return;
      }
      
      // Optimistically update local state
      const newBookmark = { ...item, folderId };
      setLocalBookmarks(prev => {
        const updated = [...prev.filter(b => b.id !== item.id), newBookmark];
        localStorage.setItem('bookmarkedItems', JSON.stringify(updated));
        return updated;
      });

      // API call
      const result = await addFavorite({ 
        placeId: item.id, 
        folderId 
      }).unwrap();

      // Update with API response
      setLocalBookmarks(prev => {
        const updated = prev.map(b => 
          b.id === item.id 
            ? { ...b, favoriteId: result.id, folderId: result.folderId, folderName: result.folderName }
            : b
        );
        localStorage.setItem('bookmarkedItems', JSON.stringify(updated));
        return updated;
      });

      // Refetch to ensure sync
      refetchFavorites();
    } catch (err: any) {
      setError(err?.data?.message || 'Failed to add favorite');
      // Revert optimistic update
      setLocalBookmarks(prev => {
        const reverted = prev.filter(b => b.id !== item.id);
        localStorage.setItem('bookmarkedItems', JSON.stringify(reverted));
        return reverted;
      });
      throw err;
    }
  }, [addFavorite, refetchFavorites, isAuthenticated]);

  const removeBookmark = useCallback(async (itemId: string): Promise<void> => {
    // Find the bookmark to remove
    const bookmarkToRemove = bookmarkedItems.find(item => item.id === itemId);
    if (!bookmarkToRemove) return;

    try {
      setError(null);

      // If not authenticated, just use localStorage
      if (!isAuthenticated) {
        setLocalBookmarks(prev => {
          const updated = prev.filter(b => b.id !== itemId);
          localStorage.setItem('bookmarkedItems', JSON.stringify(updated));
          return updated;
        });
        return;
      }

      // Optimistically update local state
      setLocalBookmarks(prev => {
        const updated = prev.filter(b => b.id !== itemId);
        localStorage.setItem('bookmarkedItems', JSON.stringify(updated));
        return updated;
      });

      // API call
      await removeFavorite(itemId).unwrap();

      // Refetch to ensure sync
      refetchFavorites();
    } catch (err: any) {
      setError(err?.data?.message || 'Failed to remove favorite');
      // Revert optimistic update
      setLocalBookmarks(prev => {
        const reverted = [...prev, bookmarkToRemove];
        localStorage.setItem('bookmarkedItems', JSON.stringify(reverted));
        return reverted;
      });
      throw err;
    }
  }, [removeFavorite, refetchFavorites, bookmarkedItems, isAuthenticated]);

  const toggleBookmark = useCallback(async (item: BookmarkItem, folderId?: string): Promise<void> => {
    if (isBookmarked(item.id)) {
      await removeBookmark(item.id);
    } else {
      await addBookmark(item, folderId);
    }
  }, [isBookmarked, addBookmark, removeBookmark]);

  const refetch = useCallback(() => {
    if (isAuthenticated) {
      refetchFavorites();
    }
  }, [refetchFavorites, isAuthenticated]);

  return { 
    bookmarkedItems, 
    toggleBookmark, 
    isBookmarked, 
    addBookmark,
    removeBookmark,
    loading, 
    error,
    refetch
  };
}