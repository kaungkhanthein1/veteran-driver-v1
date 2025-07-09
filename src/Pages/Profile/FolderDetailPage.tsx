import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useGetFavoritesByFolderQuery, useRemoveFavoriteMutation, useGetFolderByIdQuery } from '../services/FavouriteApi';
import { useState } from 'react';
import { FavoriteDto, PlaceResponseDto, FolderDto, MultiLanguageNameDto, PlaceLocationDto } from '../../dto';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import ArrowLeft from '../../icons/BookmarksUpdate/ArrowLeft.svg';
import ThreeDots from '../../icons/BookmarksUpdate/ThreeDots.svg';
import NoRecent from '../../assets/NoRecent.png';
import PlaceCard from '../../components/cards/PlaceCard';
import BookmarkButton from '../../components/common/BookmarkButton';

interface ExtendedPlaceResponseDto extends PlaceResponseDto {
  favoriteId?: string;
  folderId?: string;
}

interface FavoriteMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onRemove: () => void;
}

function FavoriteMenu({ isOpen, onClose, onRemove }: FavoriteMenuProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-black bg-opacity-20"
      onClick={onClose}
    >
      <div 
        className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl py-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            onRemove();
            onClose();
          }}
          className="w-full text-left px-4 py-3 text-red-600 text-[15px] hover:bg-gray-50"
        >
          Remove from favorites
        </button>
        <button
          onClick={onClose}
          className="w-full text-left px-4 py-3 text-gray-900 text-[15px] hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="text-center py-8">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
      <p className="text-gray-500 mt-2">Loading...</p>
    </div>
  );
}

function EmptyState({ folderName }: { folderName: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <div className="mb-6">
        <img src={NoRecent} alt="No favorites" className="w-[120px] h-[102px] opacity-60" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">No places in &ldquo;{folderName}&rdquo; yet</h3>
      <p className="text-gray-500 text-center text-sm leading-relaxed">
        Start exploring and save your favorite places to this collection
      </p>
    </div>
  );
}

function ErrorState({ error, onRetry }: { error: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-8">
      <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-4">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 2C8.268 2 2 8.268 2 16s6.268 14 14 14 14-6.268 14-14S23.732 2 16 2zM16 22c-1.104 0-2-.896-2-2s.896-2 2-2 2 .896 2 2-.896 2-2 2zM18 14h-4V8h4v6z" fill="#EF4444"/>
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Something went wrong</h3>
      <p className="text-red-500 text-center text-sm mb-6 leading-relaxed">{error}</p>
      <button 
        onClick={onRetry}
        className="px-6 py-3 bg-orange-500 text-white rounded-xl font-medium hover:bg-orange-600 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

export default function FolderDetailPage() {
  const navigate = useNavigate();
  const { folderId = '' } = useParams();
  const { state } = useLocation();
  const folderFromState = (state as { folder: FolderDto | undefined })?.folder;

  const [page, setPage] = useState(1);
  const [selectedFavorite, setSelectedFavorite] = useState<FavoriteDto | null>(null);
  const [showMenu, setShowMenu] = useState(false);

  // Fetch folder details from API
  const { 
    data: folderData, 
    isLoading: folderLoading,
    error: folderError 
  } = useGetFolderByIdQuery(folderId, {
    skip: !folderId || folderId === 'default' // Skip API call for default folder
  });

  // Use folder from API or fallback to navigation state or default
  const folder = folderData || folderFromState || (folderId === 'default' ? {
    id: 'default',
    name: 'Favourites',
    description: 'Your favorite places',
    isDefault: true,
    itemCount: 0,
    createdAt: '',
    updatedAt: ''
  } : null);

  // Use the fixed getFavoritesByFolder endpoint with query parameters
  const { 
    data, 
    isLoading: favoritesLoading, 
    isFetching,
    error: favoritesError,
    refetch 
  } = useGetFavoritesByFolderQuery({
    folderId,
    page,
    limit: 20
  }, {
    skip: !folderId
  });

  const [removeFavorite] = useRemoveFavoriteMutation();

  const handleRemoveFavorite = async () => {
    if (selectedFavorite?.placeId) {
      try {
        await removeFavorite(selectedFavorite.placeId);
        refetch();
      } catch (error) {
        console.error('Failed to remove favorite:', error);
      }
    }
  };

  const handleLoadMore = () => {
    if (data && page < data.totalPages) {
      setPage(page + 1);
    }
  };

  const getErrorMessage = (error: FetchBaseQueryError | SerializedError | undefined | null) => {
    if (!error) return 'An unknown error occurred';
    
    if ('status' in error) {
      const fetchError = error as FetchBaseQueryError;
      if (typeof fetchError.data === 'object' && fetchError.data && 'message' in fetchError.data) {
        return (fetchError.data as { message: string }).message;
      }
      return `Error ${fetchError.status}`;
    }
    
    return error.message || 'An unknown error occurred';
  };

  // Show loading if either folder or favorites are loading
  const isLoading = folderLoading || favoritesLoading;
  // Show error if either folder or favorites have error
  const error = folderError || favoritesError;

  // Get the proper folder name for display - prioritize passed state data
  const displayFolderName = folderFromState?.name || folderData?.name || (folderId === 'default' ? 'Favourites' : 'Folder');

  return (
    <div className="dvh-fallback flex justify-center bg-white">
      <div className="w-full max-w-[480px] flex flex-col h-screen">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-100">
          <div className="relative flex items-center px-4 h-[56px]">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-4 p-2 -ml-2 hover:bg-gray-100 rounded-full"
            >
              <img src={ArrowLeft} alt="Back" className="w-6 h-6" />
            </button>
            <h1 className="flex-1 text-center text-lg font-medium text-gray-900 truncate px-12">
              {displayFolderName}
            </h1>
            <button
              onClick={() => setShowMenu(true)}
              className="absolute right-4 p-2 -mr-2 hover:bg-gray-100 rounded-full"
            >
              <img src={ThreeDots} alt="Menu" className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {/* Loading state */}
          {(isLoading === true) && <LoadingState />}

          {/* Error state */}
          {(error !== undefined) && (
            <ErrorState 
              error={getErrorMessage(error)}
              onRetry={() => refetch()}
            />
          )}

          {/* Empty state */}
          {!isLoading && !error && (!data?.favorites || data.favorites.length === 0) && (
            <EmptyState folderName={displayFolderName} />
          )}

          {/* Favorites list */}
          {!isLoading && !error && data?.favorites && data.favorites.length > 0 && (
            <>
              <div className="space-y-4 py-4 px-4">
                {data.favorites.map((favorite) => {
                  if (!favorite.place) return null;

                  const placeName: MultiLanguageNameDto = 
                    typeof favorite.place.name === 'string'
                      ? { en: favorite.place.name }
                      : favorite.place.name;
                  
                  const location: PlaceLocationDto = {
                    type: 'Point' as const,
                    coordinates: [0, 0]
                  };
                  
                  // Convert the minimal place object to full PlaceResponseDto
                  const basePlace = {
                    location,
                    country: '',
                    city: '',
                    tags: [],
                    isActive: true,
                    ...favorite.place,
                  };

                  const place: ExtendedPlaceResponseDto = {
                    ...basePlace,
                    name: placeName,
                    favoriteId: favorite.id,
                    folderId: favorite.folderId
                  };
                  
                  return (
                    <PlaceCard
                      key={favorite.id}
                      image={place.photos?.[0]}
                      name={place.name.en}
                      address={place.address?.en}
                      rating={place.rating || 0}
                      reviews={place.ratingCount || 0}
                      rightSection={
                        <BookmarkButton
                          place={place}
                          size="sm"
                        />
                      }
                      onClick={() => {
                        setSelectedFavorite(favorite);
                        setShowMenu(true);
                      }}
                    />
                  );
                })}
              </div>

              {/* Load more button */}
              {data.page < data.totalPages && (
                <div className="py-4 px-4">
                  <button
                    onClick={handleLoadMore}
                    disabled={isFetching}
                    className="w-full py-3 bg-gray-50 rounded-xl text-gray-900 font-medium hover:bg-gray-100 disabled:opacity-50 transition-colors"
                  >
                    {isFetching ? (
                      <div className="flex items-center justify-center">
                        <div 
                          className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent mr-2"
                          style={{
                            borderColor: 'transparent',
                            borderTopColor: '#FF9500'
                          }}
                        ></div>
                        Loading...
                      </div>
                    ) : (
                      'Load More'
                    )}
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Menu Modal */}
        <FavoriteMenu
          isOpen={showMenu}
          onClose={() => setShowMenu(false)}
          onRemove={handleRemoveFavorite}
        />
      </div>
    </div>
  );
} 