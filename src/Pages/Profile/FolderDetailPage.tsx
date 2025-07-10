import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useBookmarks } from '../../hooks/useBookmarks';
import BackButton from '../../components/common/BackButton';
import PlaceCard from '../../components/cards/PlaceCard';
import ThreeDots from '../../icons/BookmarksUpdate/ThreeDots.svg';
import NoRecent from '../../assets/NoRecent.png';
import { favoritesService } from '../../services/FavoritesService';

export default function FolderDetailPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isLoading, error, removeFromBookmarks } = useBookmarks();
  
  const [folderData, setFolderData] = useState<any>(location.state?.folder || null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    loadFolderFavorites();
  }, [folderId]);

  const loadFolderFavorites = async () => {
    if (!folderId) return;

    setIsLoadingFavorites(true);
    try {
      let favoritesData;
      
      if (folderId === 'default') {
        // Load all favorites for the default folder
        const response = await favoritesService.getAllFavorites(1, 100);
        favoritesData = response.data || [];
      } else {
        // Load favorites for specific folder
        const response = await favoritesService.getFavoritesByFolder(folderId, 1, 100);
        favoritesData = response.data || [];
      }

      setFavorites(favoritesData);
      
      // If we don't have folder data, try to get it
      if (!folderData && folderId !== 'default') {
        const folder = await favoritesService.getFolderById(folderId);
        setFolderData(folder);
      }
    } catch (err: any) {
      console.error('Error loading folder favorites:', err);
    } finally {
      setIsLoadingFavorites(false);
    }
  };

  const handlePlaceClick = (favorite: any) => {
    const place = favorite.place || favorite;
    navigate(`/location/${place.id}`, { state: { locationData: place } });
  };

  const handleRemoveFavorite = async (favorite: any) => {
    try {
      await removeFromBookmarks(favorite.placeId);
      setFavorites(prev => prev.filter(f => f.id !== favorite.id));
    } catch (error) {
      console.error('Failed to remove favorite:', error);
    }
  };

  const getCurrentFolderData = () => {
    if (folderId === 'default') {
      return {
        id: 'default',
        name: 'Favourites',
        isDefault: true,
        itemCount: favorites.length
      };
    }
    return folderData;
  };

  const currentFolder = getCurrentFolderData();

  return (
    <div className="dvh-fallback flex justify-center bg-white">
      <div className="w-full max-w-[480px] flex flex-col h-screen">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
          <BackButton />
          
          <h1 className="text-lg font-semibold text-gray-900 flex-1 text-center">
            {currentFolder?.name || 'Loading...'}
          </h1>
          
          {!currentFolder?.isDefault && (
            <button
              onClick={() => setShowMenu(true)}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <img src={ThreeDots} alt="Menu" className="w-5 h-5" />
            </button>
          )}
          {currentFolder?.isDefault && <div className="w-9 h-9"></div>}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {isLoadingFavorites ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          ) : error ? (
            <div className="text-center py-8 px-4">
              <p className="text-red-500 mb-4">{error}</p>
              <button 
                onClick={loadFolderFavorites}
                className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
              >
                Retry
              </button>
            </div>
          ) : favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 px-4">
              <img src={NoRecent} alt="No places yet" className="w-16 h-16 mb-4 opacity-50" />
              <h2 className="text-lg font-medium text-gray-900 mb-2">No Favourite Places Yet</h2>
              <p className="text-gray-500 text-center text-sm">
                Start adding your favorite places to this list
              </p>
            </div>
          ) : (
            <div className="p-4 space-y-2">
              {favorites.map((favorite) => {
                const place = favorite.place || favorite;
                return (
                  <PlaceCard
                    key={favorite.id}
                    image={place.photos?.[0]?.url || place.photos?.[0] || place.image}
                    name={place.name}
                    address={place.address || place.city}
                    distance={place.distance}
                    rating={place.rating || 0}
                    reviews={place.ratingCount || place.reviews || 0}
                    views={place.viewCount || place.views}
                    onClick={() => handlePlaceClick(favorite)}
                  />
                );
              })}
            </div>
          )}
        </div>

        {/* Folder Menu Modal */}
        {showMenu && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg p-4 w-full max-w-xs">
              <h3 className="font-medium text-gray-900 mb-4">{currentFolder?.name}</h3>
              <div className="space-y-2">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    navigate('/bookmarks', { 
                      state: { 
                        openEditModal: true, 
                        editFolder: currentFolder 
                      } 
                    });
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                >
                  Edit Collection
                </button>
                <button
                  onClick={() => {
                    setShowMenu(false);
                    // Handle delete functionality
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-red-600"
                >
                  Delete Collection
                </button>
                <button
                  onClick={() => setShowMenu(false)}
                  className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 