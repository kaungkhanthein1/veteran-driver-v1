import { useBookmarks } from '../../hooks/useBookmarks';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import NoNoti from '../../icons/NoNoti.svg';
import HighlightBar from '../../icons/Highlight.png';
import ToAdd from '../../icons/BookmarksUpdate/ToAdd.svg';
import ThreeDots from '../../icons/BookmarksUpdate/ThreeDots.svg';
import Favourite from '../../icons/BookmarksUpdate/Favourite.png';
import ArrowBack from '../../icons/ArrowBack.svg';

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
          <img src={ArrowBack} alt="Back" className="w-6 h-6" />
        </button>
        
        <h1 className="flex-1 text-center text-lg font-medium text-gray-900">Add New List</h1>
        
        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className={`absolute right-4 px-4 py-2 font-medium transition-colors ${
            name.trim()
              ? 'cursor-pointer'
              : 'cursor-not-allowed'
          }`}
          style={{
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

interface FolderItemProps {
  folder: any;
  onMenuClick: (folder: any) => void;
  onClick: (folder: any) => void;
}

function FolderItem({ folder, onMenuClick, onClick }: FolderItemProps) {
  return (
    <div 
      className="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
      onClick={() => onClick(folder)}
    >
      <div className="w-12 h-12 rounded-lg overflow-hidden mr-3 bg-gray-200 flex items-center justify-center">
        {folder.isDefault ? (
          <img src={Favourite} alt="Favourite" className="w-6 h-6" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-400 to-orange-600"></div>
        )}
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-gray-900">{folder.name}</h3>
        <p className="text-sm text-gray-500">{folder.itemCount || 0} places</p>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onMenuClick(folder);
        }}
        className="p-2 hover:bg-gray-100 rounded-full"
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
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-4 w-full max-w-xs">
        <h3 className="font-medium text-gray-900 mb-4">{folder.name}</h3>
        <div className="space-y-2">
          <button
            onClick={() => {
              onEdit();
              onClose();
            }}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
          >
            Edit List
          </button>
          {!folder.isDefault && (
            <button
              onClick={() => {
                onDelete();
                onClose();
              }}
              className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md text-red-600"
            >
              Delete List
            </button>
          )}
          <button
            onClick={onClose}
            className="w-full text-left px-3 py-2 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BookmarksPage() {
  const { 
    folders, 
    isLoading, 
    error, 
    createFolder, 
    deleteFolder,
    refreshBookmarks 
  } = useBookmarks();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('favourites');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [showFolderMenu, setShowFolderMenu] = useState(false);

  const handleCreateFolder = async (name: string) => {
    try {
      await createFolder(name);
    } catch (error) {
      console.error('Failed to create folder:', error);
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    try {
      await deleteFolder(folderId);
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

  // Add default favorites folder if not exists
  const allFolders = [
    {
      id: 'default',
      name: 'Favourites',
      isDefault: true,
      itemCount: folders.reduce((total, folder) => total + (folder.itemCount || 0), 0)
    },
    ...folders
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
              {/* List collections header */}
              <h2 className="text-lg font-medium text-gray-700 mb-4">List collections</h2>
              
              {/* Add New List Button */}
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full flex items-center justify-center p-4 bg-gray-100 rounded-lg mb-4 hover:bg-gray-200 transition-colors"
              >
                <img src={ToAdd} alt="Add" className="w-5 h-5 mr-2" />
                <span className="text-gray-700 font-medium">Add New List</span>
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
                <div className="space-y-1">
                  {allFolders.map((folder) => (
                    <FolderItem
                      key={folder.id}
                      folder={folder}
                      onMenuClick={handleMenuClick}
                      onClick={handleFolderClick}
                    />
                  ))}
                </div>
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
            <div className="flex flex-col items-center justify-center flex-1 pt-8">
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

        {/* Folder Menu Modal */}
        <FolderMenu
          folder={selectedFolder}
          isOpen={showFolderMenu}
          onClose={() => setShowFolderMenu(false)}
          onEdit={() => {
            // Handle edit - could open edit modal
            console.log('Edit folder:', selectedFolder);
          }}
          onDelete={() => {
            if (selectedFolder && selectedFolder.id !== 'default') {
              handleDeleteFolder(selectedFolder.id);
            }
          }}
        />
      </div>
    </div>
  );
}