import { useBookmarks } from '../../hooks/useBookmarks';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import LoginIcon from '../../icons/BookmarksUpdate/Login.svg';
import NoNoti from '../../icons/NoNoti.svg';
import HighlightBar from '../../icons/Highlight.png';
import ToAdd from '../../icons/BookmarksUpdate/ToAdd.svg';
import ThreeDots from '../../icons/BookmarksUpdate/ThreeDots.svg';
import Favourite from '../../icons/BookmarksUpdate/Favorite.svg';
import ArrowLeft from '../../icons/BookmarksUpdate/ArrowLeft.svg';
import HotelRoom from '../../assets/HarrierRoom.png';
import RemoveIcon from '../../icons/BookmarksUpdate/Remove.svg';
import { favoritesService } from '../../services/FavoritesService';
import PlaceCard from '../../components/cards/PlaceCard';
import { useAuth } from '../../context/AuthContext';

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
}

function CreateFolderModal({ isOpen, onClose, onConfirm }: CreateFolderModalProps) {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    if (name.trim()) {
      onConfirm(name.trim());
      setName('');
      onClose();
    }
  };

  const handleClose = () => {
    setName('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="relative flex items-center p-4 border-b border-gray-100">
        <button
          onClick={handleClose}
          className="absolute left-4 p-2 -ml-2 hover:bg-gray-100 rounded-full"
        >
          <img src={ArrowLeft} alt="Back" className="w-8 h-8" />
        </button>
        
        <h1 className="flex-1 text-center text-lg font-medium text-gray-900">Add New List</h1>
        
        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className={`absolute px-4 py-2 font-medium transition-colors ${
            name.trim()
              ? 'cursor-pointer'
              : 'cursor-not-allowed'
          }`}
          style={{
            right: '0',
            color: name.trim() 
              ? 'transparent'
              : '#B5B5B5',
            background: name.trim() 
              ? 'linear-gradient(180deg, #FFC61B 0%, #FF9500 100%)'
              : 'transparent',
            WebkitBackgroundClip: name.trim() ? 'text' : 'initial',
            backgroundClip: name.trim() ? 'text' : 'initial',
          }}
        >
          Create
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4">
        <div className="relative mt-8">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Give this list a title"
            className="w-full bg-transparent border border-gray-300 rounded-lg px-4 h-[56px] text-base focus:outline-none focus:ring-0 focus:border-gray-300 placeholder:text-gray-400"
            style={{ outline: 'none', boxShadow: 'none' }}
            autoFocus
          />
          <span className="absolute -top-[10px] left-[18px] px-1 text-sm text-gray-600 bg-white">
            List Title
          </span>
        </div>
      </div>
    </div>
  );
}

interface EditFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
  initialName: string;
  folderId: string;
}

function EditFolderModal({ isOpen, onClose, onConfirm, initialName, folderId }: EditFolderModalProps) {
  const [name, setName] = useState(initialName);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [isLoadingFavorites, setIsLoadingFavorites] = useState(false);
  const [pendingRemovals, setPendingRemovals] = useState<Set<string>>(new Set());
  const [showDiscardModal, setShowDiscardModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  useEffect(() => {
    if (isOpen && folderId) {
      loadFolderFavorites();
      setPendingRemovals(new Set()); // Reset pending removals when opening
    }
  }, [isOpen, folderId]);

  const loadFolderFavorites = async () => {
    if (!folderId) return;

    setIsLoadingFavorites(true);
    try {
      let favoritesData;
      
      if (folderId === 'default') {
        const response = await favoritesService.getAllFavorites(1, 100);
        favoritesData = response.data || [];
      } else {
        const response = await favoritesService.getFavoritesByFolder(folderId, 1, 100);
        favoritesData = response.data || [];
      }

      setFavorites(favoritesData);
    } catch (err: any) {
      console.error('Error loading folder favorites:', err);
    } finally {
      setIsLoadingFavorites(false);
    }
  };

  const handleSubmit = async () => {
    if (name.trim()) {
      try {
        // First update the folder name
        await onConfirm(name.trim());
        
        // Then remove all pending removals
        if (pendingRemovals.size > 0) {
          for (const placeId of pendingRemovals) {
            try {
              await favoritesService.removeFavorite(placeId);
            } catch (error) {
              console.error(`Failed to remove favorite ${placeId}:`, error);
            }
          }
        }
        
        setPendingRemovals(new Set());
      onClose();
      } catch (error) {
        console.error('Failed to save changes:', error);
      }
  }
  };

  const handleClose = () => {
    console.log('=== HANDLE CLOSE DEBUG ===');
    console.log('Current name:', name);
    console.log('Initial name:', initialName);
    console.log('Pending removals size:', pendingRemovals.size);
    console.log('Has name changed:', name !== initialName);
    console.log('Has pending removals:', pendingRemovals.size > 0);
    
    // Check if there are unsaved changes
    if (name !== initialName || pendingRemovals.size > 0) {
      console.log('Setting showDiscardModal to true');
      setShowDiscardModal(true);
    } else {
      console.log('No changes, closing directly');
      setName(initialName);
      setPendingRemovals(new Set());
      onClose();
    }
  };

  const handleDiscardChanges = () => {
    console.log('=== DISCARD CHANGES ===');
    setName(initialName);
    setPendingRemovals(new Set());
    setShowDiscardModal(false);
    onClose();
  };

  const handleRemoveFavorite = (favorite: any) => {
    console.log('=== REMOVE FAVORITE ===');
    console.log('Removing favorite:', favorite.placeId);
    console.log('Current pending removals before:', Array.from(pendingRemovals));
    
    // Only add to pending removals, don't call API yet
    setPendingRemovals(prev => {
      const newSet = new Set(prev);
      newSet.add(favorite.placeId);
      console.log('New pending removals:', Array.from(newSet));
      return newSet;
    });
  };

  const handlePlaceClick = (favorite: any) => {
    const place = favorite.place || favorite;
    navigate(`/location/${place.id}`, { state: { locationData: place } });
  };

  // Filter out favorites that are pending removal
  const displayedFavorites = favorites.filter(favorite => 
    !pendingRemovals.has(favorite.placeId)
  );

  console.log('=== EDIT MODAL RENDER ===');
  console.log('showDiscardModal:', showDiscardModal);
  console.log('Current pendingRemovals:', Array.from(pendingRemovals));
  console.log('Name changed:', name !== initialName);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-white z-50 flex flex-col">
        {/* Header */}
        <div className="relative flex items-center p-4 border-b border-gray-100">
          <button
            onClick={handleClose}
            className="absolute left-4 p-2 -ml-2 hover:bg-gray-100 rounded-full"
          >
            <img src={ArrowLeft} alt="Back" className="w-8 h-8" />
          </button>
          
          <h1 className="flex-1 text-center text-lg font-medium text-gray-900">Edit the list</h1>
          
          <button
            onClick={handleSubmit}
            disabled={!name.trim()}
            className={`absolute px-4 py-2 font-medium transition-colors ${
              name.trim()
                ? 'cursor-pointer'
                : 'cursor-not-allowed'
            }`}
            style={{
              right: '0',
              color: name.trim() 
                ? 'transparent'
                : '#B5B5B5',
              background: name.trim() 
                ? 'linear-gradient(180deg, #FFC61B 0%, #FF9500 100%)'
                : 'transparent',
              WebkitBackgroundClip: name.trim() ? 'text' : 'initial',
              backgroundClip: name.trim() ? 'text' : 'initial',
            }}
          >
            Save
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* List Title Input */}
          <div className="relative mb-8">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Give this list a title"
              className="w-full bg-[#F8F9FB] border border-gray-300 rounded-lg px-4 h-[56px] text-base focus:outline-none focus:ring-0 focus:border-gray-300 placeholder:text-gray-400"
              style={{ outline: 'none', boxShadow: 'none' }}
              autoFocus
            />
            <span className="absolute -top-[10px] left-[18px] px-1 text-sm text-gray-600 bg-[#F8F9FB]">
              List Title
            </span>
          </div>

          {/* Added Places Section */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Added places</h3>
            
            {isLoadingFavorites ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              </div>
            ) : displayedFavorites.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {favorites.length === 0 ? "No places in this list yet" : "All places have been removed"}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                {displayedFavorites.map((favorite) => {
                  const place = favorite.place || favorite;
                  return (
                    <div key={favorite.id} className="relative">
                      <PlaceCard
                        image={place.photos?.[0]?.url || place.photos?.[0] || place.image}
                        name={place.name}
                        address={place.address || place.city}
                        distance={place.distance}
                        rating={place.rating || 0}
                        reviews={place.ratingCount || place.reviews || 0}
                        views={place.viewCount || place.views}
                        onClick={() => handlePlaceClick(favorite)}
                        rightSection={
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveFavorite(favorite);
                            }}
                            className="p-2 hover:bg-gray-100 rounded-full"
                            title="Remove from list"
                          >
                            <img src={RemoveIcon} alt="Remove" className="w-5 h-5" />
                          </button>
                        }
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Discard Changes Modal - Always render with conditional display */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 ${showDiscardModal ? 'block' : 'hidden'}`}
        style={{ zIndex: 9999 }}
      >
        <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-xl">
          <h3 className="text-lg font-medium text-gray-900 mb-4 text-left">Discard changes ?</h3>
          <p className="text-gray-600 text-left mb-6 leading-relaxed text-sm">
            Do you want to discard changes you have done to this list ?
          </p>
          <div className="flex gap-3 justify-end">
            <button
              onClick={() => {
                console.log('Go back clicked');
                setShowDiscardModal(false);
              }}
              className="px-4 py-2 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors rounded"
            >
              Go back
            </button>
            <button
              onClick={handleDiscardChanges}
              className="px-4 py-2 text-orange-600 text-sm font-medium hover:bg-orange-50 transition-colors rounded"
            >
              Yes, Discard
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

interface FolderItemProps {
  folder: any;
  onMenuClick: (folder: any) => void;
  onClick: (folder: any) => void;
}

function FolderItem({ folder, onMenuClick, onClick }: FolderItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = itemRef.current?.getBoundingClientRect();
    if (rect) {
      onMenuClick({
        ...folder,
        menuPosition: {
          top: rect.top + window.scrollY,
        }
      });
    }
  };

  return (
    <div 
      ref={itemRef}
      className="flex items-center py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100"
      onClick={() => onClick(folder)}
    >
      <div className="w-[60px] h-[60px] rounded-lg overflow-hidden mr-3 flex items-center justify-center bg-gray-100">
        {folder.isDefault ? (
          <img src={Favourite} alt="Favourite" className="w-8 h-8" />
        ) : (
          folder.latestPhoto ? (
            <img 
              src={folder.latestPhoto}
              alt={folder.name}
              className="w-full h-full object-cover"
            />
        ) : (
          <img 
            src={HotelRoom}
            alt={folder.name}
            className="w-full h-full object-cover"
          />
          )
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-[17px] text-gray-900 truncate leading-tight">{folder.name}</h3>
        <p className="text-[15px] text-gray-500 mt-1">{folder.itemCount || 0} places</p>
      </div>
      <button
        onClick={handleMenuClick}
        className="p-2 -mr-2 hover:bg-gray-100 rounded-full"
      >
        <img src={ThreeDots} alt="Menu" className="w-5 h-5" />
      </button>
    </div>
  );
}

interface FolderMenuProps {
  folder: any;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function FolderMenu({ folder, isOpen, onClose, onEdit, onDelete }: FolderMenuProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50"
      onClick={onClose}
    >
      <div 
        className="absolute bg-white rounded-lg shadow-lg py-2 w-[140px]"
        style={{
          top: folder.menuPosition?.top || '0',
          right: '16px', // Matches the px-4 container padding
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            onEdit();
            onClose();
          }}
          className="w-full text-left px-4 py-3 text-gray-900 text-[15px] hover:bg-gray-50"
        >
          Edit list
        </button>
        {!folder.isDefault && (
          <button
            onClick={() => {
              console.log('=== FOLDER MENU DELETE CLICK ===');
              console.log('folder:', folder);
              console.log('folder.id:', folder.id);
              console.log('folder.isDefault:', folder.isDefault);
              onDelete();
              onClose();
            }}
            className="w-full text-left px-4 py-3 text-red-600 text-[15px] hover:bg-gray-50"
          >
            Delete list
          </button>
        )}
      </div>
    </div>
  );
}

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  folderName: string;
}

function DeleteConfirmModal({ isOpen, onClose, onConfirm, folderName }: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm mx-4 shadow-xl">
        <h3 className="text-lg font-medium text-gray-900 mb-4 text-left">Delete list ?</h3>
        <p className="text-gray-600 text-left mb-6 leading-relaxed text-sm">
          Are you sure you want to Delete the selected list permanently ? This action cannot be undone.
        </p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors rounded"
          >
            Go back
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-red-600 text-sm font-medium hover:bg-red-50 transition-colors rounded"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

interface DeleteWithContentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  folderName: string;
  itemCount: number;
}

function DeleteWithContentsModal({ isOpen, onClose, onConfirm, folderName, itemCount }: DeleteWithContentsModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm mx-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Delete list and contents ?</h3>
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          This list contains {itemCount} saved place{itemCount !== 1 ? 's' : ''}. Do you want to delete the list &ldquo;{folderName}&rdquo; and all its saved places permanently?
        </p>
        <p className="text-red-600 text-center mb-8 text-sm font-medium">
          This action cannot be undone.
        </p>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 text-gray-600 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Keep list
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 text-white bg-red-500 rounded-xl font-medium hover:bg-red-600 transition-colors"
          >
            Delete all
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookmarksPage() {
  const { 
    folders, 
    bookmarkedItems,
    isLoading, 
    error, 
    createFolder, 
    updateFolder,
    deleteFolder,
    refreshBookmarks 
  } = useBookmarks();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();
  const [activeTab, setActiveTab] = useState('favourites');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showDeleteWithContents, setShowDeleteWithContents] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [showFolderMenu, setShowFolderMenu] = useState(false);
  const [foldersWithPhotos, setFoldersWithPhotos] = useState<any[]>([]);

  // Check if user is truly authenticated (has both auth state and token)
  const isReallyAuthenticated = isAuthenticated && user && localStorage.getItem('token');

  // Use ref to track if we've already loaded bookmarks for this auth session
  const hasLoadedForAuthSession = useRef(false);
  const lastAuthState = useRef(isReallyAuthenticated);

  // Refresh bookmarks when user logs in (only once per auth change)
  useEffect(() => {
    // If auth state changed from false to true
    if (isReallyAuthenticated && !lastAuthState.current) {
      console.log('User authenticated, refreshing bookmarks...');
      refreshBookmarks();
      hasLoadedForAuthSession.current = true;
    }
    // If auth state changed from true to false
    else if (!isReallyAuthenticated && lastAuthState.current) {
      hasLoadedForAuthSession.current = false;
    }
    
    // Update the last auth state
    lastAuthState.current = isReallyAuthenticated;
  }, [isReallyAuthenticated]); // Only depend on the authentication state

  // Fetch latest photos for each folder
  useEffect(() => {
    const fetchFolderPhotos = async () => {
      if (!folders || folders.length === 0) return;

      const enhancedFolders = await Promise.all(
        folders.map(async (folder) => {
          try {
            // Get the latest favorite from this folder
            const response = await favoritesService.getFavoritesByFolder(folder.id, 1, 1);
            const latestFavorite = response.data?.[0];
            const latestPhoto = latestFavorite?.place?.photos?.[0];
            
            return {
              ...folder,
              latestPhoto: latestPhoto || null
            };
          } catch (error) {
            console.error(`Failed to fetch photo for folder ${folder.id}:`, error);
            return {
              ...folder,
              latestPhoto: null
            };
          }
        })
      );

      setFoldersWithPhotos(enhancedFolders);
    };

    fetchFolderPhotos();
  }, [folders]);

  // Effect to open edit modal when navigating from folder detail page
  useEffect(() => {
    if (location.state?.openEditModal && location.state?.editFolder) {
      setSelectedFolder(location.state.editFolder);
      setShowEditModal(true);
      // Clear the state to prevent the modal from opening again on re-renders
      navigate('/bookmarks', { replace: true, state: {} });
    }
  }, [location.state, navigate]);

  const handleCreateFolder = async (name: string) => {
    try {
      await createFolder(name);
    } catch (error) {
      console.error('Failed to create folder:', error);
    }
  };

  const handleEditFolder = async (name: string) => {
    if (selectedFolder && selectedFolder.id !== 'default') {
      try {
        await updateFolder(selectedFolder.id, name);
      } catch (error) {
        console.error('Failed to update folder:', error);
      }
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    console.log('=== DELETE FOLDER DEBUG ===');
    console.log('handleDeleteFolder called with folderId:', folderId);
    console.log('selectedFolder:', selectedFolder);
    console.log('selectedFolder.id:', selectedFolder?.id);
    console.log('selectedFolder.isDefault:', selectedFolder?.isDefault);
    
    // Prevent deleting default folder
    if (folderId === 'default' || selectedFolder?.isDefault) {
      console.log('Attempted to delete default folder - blocking');
      alert('Cannot delete the default Favourites folder');
      setShowDeleteConfirm(false);
      return;
    }
    
    try {
      console.log('Calling deleteFolder API with id:', folderId);
      await deleteFolder(folderId);
      console.log('Folder deleted successfully');
      setShowDeleteConfirm(false);
      setSelectedFolder(null);
      // Refresh the folders list
      await refreshBookmarks();
      // Show success message
      alert('List deleted successfully!');
    } catch (error: any) {
      console.error('Failed to delete folder:', error);
      
      // Handle specific error: folder contains favorites
      if (error.code === 9005 || error.message?.includes('contains favorites')) {
        setShowDeleteConfirm(false);
        // Show the delete with contents modal
        setShowDeleteWithContents(true);
      } else {
        // Close the modal and show error
        setShowDeleteConfirm(false);
        alert(`Failed to delete folder: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const handleDeleteFolderWithContents = async (folderId: string) => {
    console.log('=== DELETE FOLDER WITH CONTENTS ===');
    console.log('folderId:', folderId);
    
    try {
      // First, remove all favorites from the folder
      const response = await favoritesService.getFavoritesByFolder(folderId, 1, 100);
      const favorites = response.data || [];
      
      console.log(`Removing ${favorites.length} favorites from folder before deletion`);
      
      // Remove each favorite
      for (const favorite of favorites) {
        try {
          await favoritesService.removeFavorite(favorite.placeId);
        } catch (favError) {
          console.warn(`Failed to remove favorite ${favorite.placeId}:`, favError);
        }
      }
      
      // Now try to delete the empty folder
      await deleteFolder(folderId);
      console.log('Folder and contents deleted successfully');
      setShowDeleteWithContents(false);
      setSelectedFolder(null);
      await refreshBookmarks();
      alert('List and all its contents have been deleted successfully.');
    } catch (error: any) {
      console.error('Failed to delete folder contents:', error);
      setShowDeleteWithContents(false);
      setSelectedFolder(null);
      alert(`Failed to delete the list: ${error.message || 'Please try again.'}`);
    }
  };

  const handleFolderClick = (folder: any) => {
    navigate(`/bookmarks/folder/${folder.id}`, { state: { folder } });
  };

  const handleMenuClick = (folder: any) => {
    console.log('=== MENU CLICK DEBUG ===');
    console.log('Clicked folder:', folder);
    console.log('Folder id:', folder.id);
    console.log('Folder isDefault:', folder.isDefault);
    console.log('Folder name:', folder.name);
    setSelectedFolder(folder);
    setShowFolderMenu(true);
  };

  const handleRefresh = () => {
    refreshBookmarks();
  };

  // Get the latest photo from bookmarked items for the default folder
  const getDefaultFolderPhoto = () => {
    if (!bookmarkedItems || bookmarkedItems.length === 0) return null;
    const latestBookmark = bookmarkedItems[0]; // Most recent bookmark
    return latestBookmark?.place?.photos?.[0] || null;
  };

  // Filter folders to remove any unwanted entries and add default favorites folder at the end
  const userFolders = (foldersWithPhotos || []).filter(folder => 
    folder.name !== 'My Favorite Places' && 
    folder.name !== 'Favourites' && 
    folder.id !== 'default'
  );

  const allFolders = [
    ...userFolders,
    {
      id: 'default',
      name: 'Favourites',
      isDefault: true,
      itemCount: bookmarkedItems ? bookmarkedItems.length : 0,
      latestPhoto: getDefaultFolderPhoto()
    }
  ];

  console.log('=== FOLDERS DEBUG ===');
  console.log('Original folders from API:', folders);
  console.log('foldersWithPhotos:', foldersWithPhotos);
  console.log('userFolders (filtered):', userFolders);
  console.log('allFolders (final):', allFolders);

  // Show loading state while checking authentication
  if (authLoading) {
    return (
      <div className="dvh-fallback flex justify-center bg-white">
        <div className="w-full max-w-[480px] flex flex-col h-screen">
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        </div>
      </div>
    );
  }

  // Always show no logged in state if user is not truly authenticated
  if (!isReallyAuthenticated) {
    return (
      <div className="dvh-fallback flex justify-center bg-white">
        <div className="w-full max-w-[480px] flex flex-col h-screen">
          <div className="flex-1 overflow-y-auto">
            {/* Tabs */}
            <div className="flex items-center justify-center pt-6 pb-4 bg-white sticky top-0 z-20">
              <div className="flex gap-8">
                <button
                  className={`flex flex-col items-center text-lg font-medium px-4 pb-0 transition-colors ${
                    activeTab === 'favourites' 
                      ? 'text-gray-900 font-bold' 
                      : 'text-gray-500 font-normal'
                  }`}
                  onClick={() => setActiveTab('favourites')}
                >
                  <span>Favourites</span>
                  {activeTab === 'favourites' && (
                    <div className="mt-1">
                      <img src={HighlightBar} alt="highlight" className="w-10 h-1" />
                    </div>
                  )}
                </button>
                <button
                  className={`flex flex-col items-center text-lg font-medium px-4 pb-0 transition-colors ${
                    activeTab === 'notification' 
                      ? 'text-gray-900 font-bold' 
                      : 'text-gray-500 font-normal'
                  }`}
                  onClick={() => setActiveTab('notification')}
                >
                  <span>Notification</span>
                  {activeTab === 'notification' && (
                    <div className="mt-1">
                      <img src={HighlightBar} alt="highlight" className="w-10 h-1" />
                    </div>
                  )}
                </button>
              </div>
            </div>

            {/* Always show no logged in content when not authenticated */}
            <div className="flex flex-col items-center justify-center flex-1 px-4 pt-16">
              <div className="flex flex-col items-center max-w-[320px] w-full text-center">
                {/* Icon */}
                <div className="mb-8">
                  <img src={LoginIcon} alt="Save Your Favorite Places" className="w-[166px] h-[141px]" />
                </div>
                
                {/* Title */}
                <h2 className="text-[24px] font-semibold text-gray-900 mb-4">
                  Save Your Favorite Places
                </h2>
                
                {/* Subtitle */}
                <p className="text-gray-500 text-[16px] leading-relaxed mb-12">
                  Log in to access your saved spots and trips anytime
                </p>
                
                {/* Sign In Button */}
                <button
                  onClick={() => navigate('/login', { state: { background: location } })}
                  className="w-full py-3.5 px-6 text-white text-[16px] font-semibold rounded-full transition-all duration-200 hover:opacity-90"
                  style={{
                    background: 'linear-gradient(180deg, #FFC61B 0%, #FF9500 100%)',
                  }}
                >
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dvh-fallback flex justify-center bg-white">
      <div className="w-full max-w-[480px] flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto">
          {/* Tabs */}
          <div className="flex items-center justify-center pt-6 pb-4 bg-white sticky top-0 z-20">
            <div className="flex gap-8">
              <button
                className={`flex flex-col items-center text-lg font-medium px-4 pb-0 transition-colors ${
                  activeTab === 'favourites' 
                    ? 'text-gray-900 font-bold' 
                    : 'text-gray-500 font-normal'
                }`}
                onClick={() => setActiveTab('favourites')}
              >
                <span>Favourites</span>
                {activeTab === 'favourites' && (
                  <div className="mt-1">
                    <img src={HighlightBar} alt="highlight" className="w-10 h-1" />
                  </div>
                )}
              </button>
              <button
                className={`flex flex-col items-center text-lg font-medium px-4 pb-0 transition-colors ${
                  activeTab === 'notification' 
                    ? 'text-gray-900 font-bold' 
                    : 'text-gray-500 font-normal'
                }`}
                onClick={() => setActiveTab('notification')}
              >
                <span>Notification</span>
                {activeTab === 'notification' && (
                  <div className="mt-1">
                    <img src={HighlightBar} alt="highlight" className="w-10 h-1" />
                  </div>
                )}
              </button>
            </div>
          </div>

          {activeTab === 'favourites' && (
            <div className="px-4">
              {/* List collections header */}
              <h2 className="text-[18px] text-gray-900 mb-3">List collections</h2>
              
              {/* Add New List Button */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full flex items-center justify-center py-[12px] bg-gray-50 rounded-xl mb-4 hover:bg-gray-100 transition-colors"
              >
                <img src={ToAdd} alt="Add" className="w-5 h-5 mr-2 opacity-80" />
                <span className="text-[15px] text-gray-900 font-medium">Add New List</span>
              </button>

              {/* Loading state */}
              {isLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                  <p className="text-gray-500 mt-2">Loading...</p>
              </div>
              )}

              {/* Error state */}
              {error && (
                <div className="text-center py-8">
                  <p className="text-red-500 mb-4">{error}</p>
                  <button 
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
                  >
                    Retry
                  </button>
                  </div>
              )}

              {/* Folders List */}
              {!isLoading && !error && (
                <>
                  {allFolders.map((folder) => (
                    <FolderItem
                      key={folder.id}
                      folder={folder}
                      onMenuClick={handleMenuClick}
                      onClick={handleFolderClick}
                    />
                  ))}
                </>
              )}

              {/* Empty state */}
              {!isLoading && !error && allFolders.length === 0 && (
                <div className="text-center py-12">
                  <img src={Favourite} alt="No Lists" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-gray-500 mb-2">No collections yet</p>
                  <p className="text-gray-400 text-sm">Create your first list to organize your favorite places</p>
                </div>
              )}
              </div>
          )}

          {activeTab === 'notification' && (
            <div className="flex flex-col items-center justify-center flex-1 pt-32">
              <img src={NoNoti} alt="No Notifications" className="w-[120px] h-[102px] mb-4" />
              <div className="flex flex-col items-center mb-2">
                <span className="text-gray-900 text-lg font-semibold text-center">
                  You&apos;ve caught up with everything
                </span>
                <span className="text-gray-500 text-base font-normal text-center mt-1">
                  No notification at this time
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Create Folder Modal */}
        <CreateFolderModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onConfirm={handleCreateFolder}
        />

        {/* Edit Folder Modal */}
        <EditFolderModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onConfirm={handleEditFolder}
          initialName={selectedFolder?.name || ''}
          folderId={selectedFolder?.id || ''}
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={() => {
            console.log('=== DELETE CONFIRM MODAL ON CONFIRM ===');
            console.log('selectedFolder in modal onConfirm:', selectedFolder);
            if (selectedFolder) {
              console.log('=== DELETE CONFIRM MODAL CONFIRM CLICK ===');
              console.log('folderName:', selectedFolder.name);
              console.log('About to call handleDeleteFolder with id:', selectedFolder.id);
              handleDeleteFolder(selectedFolder.id);
            } else {
              console.log('No selectedFolder to delete');
            }
          }}
          folderName={selectedFolder?.name || ''}
        />

        {/* Folder Menu Modal */}
        <FolderMenu
          folder={selectedFolder}
          isOpen={showFolderMenu}
          onClose={() => setShowFolderMenu(false)}
          onEdit={() => {
            setShowFolderMenu(false);
            setShowEditModal(true);
          }}
          onDelete={() => {
            console.log('=== FOLDER MENU ON DELETE ===');
            console.log('selectedFolder in onDelete:', selectedFolder);
            console.log('selectedFolder.id:', selectedFolder?.id);
            console.log('selectedFolder.isDefault:', selectedFolder?.isDefault);
            if (selectedFolder && selectedFolder.id !== 'default') {
              console.log('Setting showDeleteConfirm to true');
              setShowFolderMenu(false);
              setShowDeleteConfirm(true);
            } else {
              console.log('Blocked deletion - folder is default or null');
            }
          }}
        />

        {/* Delete With Contents Modal */}
        <DeleteWithContentsModal
          isOpen={showDeleteWithContents}
          onClose={() => setShowDeleteWithContents(false)}
          onConfirm={() => {
            console.log('=== DELETE WITH CONTENTS MODAL ON CONFIRM ===');
            console.log('selectedFolder in modal onConfirm:', selectedFolder);
            if (selectedFolder) {
              console.log('=== DELETE WITH CONTENTS MODAL CONFIRM CLICK ===');
              console.log('folderName:', selectedFolder.name);
              console.log('itemCount:', selectedFolder.itemCount);
              console.log('About to call handleDeleteFolderWithContents with id:', selectedFolder.id);
              handleDeleteFolderWithContents(selectedFolder.id);
            } else {
              console.log('No selectedFolder to delete');
            }
          }}
          folderName={selectedFolder?.name || ''}
          itemCount={selectedFolder?.itemCount || 0}
        />
      </div>
    </div>
  );
}