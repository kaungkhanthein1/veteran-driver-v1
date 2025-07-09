import { useBookmarks } from '../../hooks/useBookmarks';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import NoNoti from '../../icons/NoNoti.svg';
import HighlightBar from '../../icons/Highlight.png';
import ToAdd from '../../icons/BookmarksUpdate/ToAdd.svg';
import ThreeDots from '../../icons/BookmarksUpdate/ThreeDots.svg';
import Favourite from '../../icons/BookmarksUpdate/Favorite.svg';
import ArrowLeft from '../../icons/BookmarksUpdate/ArrowLeft.svg';
import HotelRoom from '../../assets/HarrierRoom.png';

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
}

function EditFolderModal({ isOpen, onClose, onConfirm, initialName }: EditFolderModalProps) {
  const [name, setName] = useState(initialName);

  useEffect(() => {
    setName(initialName);
  }, [initialName]);

  const handleSubmit = () => {
    if (name.trim()) {
      onConfirm(name.trim());
      onClose();
  }
  };

  const handleClose = () => {
    setName(initialName);
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
        
        <h1 className="flex-1 text-center text-lg font-medium text-gray-900">Edit List</h1>
        
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
          Update
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
      <div className="w-[60px] h-[60px] rounded-lg overflow-hidden mr-3 flex items-center justify-center">
        {folder.isDefault ? (
          <img src={Favourite} alt="Favourite" className="w-7 h-7" />
        ) : (
          <img 
            src={HotelRoom}
            alt={folder.name}
            className="w-full h-full object-cover"
          />
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
      <div className="bg-white rounded-lg p-6 w-full max-w-sm">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Delete List</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete &ldquo;{folderName}&rdquo;? This action cannot be undone.
        </p>
        <div className="flex space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
          >
            Delete
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
  const [activeTab, setActiveTab] = useState('favourites');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [showFolderMenu, setShowFolderMenu] = useState(false);

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
    try {
      await deleteFolder(folderId);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Failed to delete folder:', error);
    }
  };

  const handleFolderClick = (folder: any) => {
    navigate(`/bookmarks/folder/${folder.id}`, { state: { folder } });
  };

  const handleMenuClick = (folder: any) => {
    setSelectedFolder(folder);
    setShowFolderMenu(true);
  };

  const handleRefresh = () => {
    refreshBookmarks();
  };

  // Filter folders to remove any unwanted entries and add default favorites folder at the end
  const userFolders = (folders || []).filter(folder => 
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
      itemCount: bookmarkedItems ? bookmarkedItems.length : 0
    }
  ];

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
              {/* List collections header - removed font-semibold */}
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

              {/* Folders List - removed extra div wrapper for better padding control */}
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
              {!isLoading && !error && folders.length === 0 && (
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
        />

        {/* Delete Confirmation Modal */}
        <DeleteConfirmModal
          isOpen={showDeleteConfirm}
          onClose={() => setShowDeleteConfirm(false)}
          onConfirm={() => {
            if (selectedFolder) {
              handleDeleteFolder(selectedFolder.id);
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
            if (selectedFolder && selectedFolder.id !== 'default') {
              setShowFolderMenu(false);
              setShowDeleteConfirm(true);
            }
          }}
        />
      </div>
    </div>
  );
}