import { useBookmarks } from "../hooks/useBookmarks";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import ToAdd from "../icons/BookmarksUpdate/ToAdd.svg";

import Favourite from "../icons/BookmarksUpdate/Favorite.svg";
import ArrowLeft from "../icons/BookmarksUpdate/ArrowLeft.svg";
import HotelRoom from "../assets/HarrierRoom.png";

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string) => void;
}

function CreateFolderModal({
  isOpen,
  onClose,
  onConfirm,
}: CreateFolderModalProps) {
  const [name, setName] = useState("");

  const handleSubmit = () => {
    if (name.trim()) {
      onConfirm(name.trim());
      setName("");
      onClose();
    }
  };

  const handleClose = () => {
    setName("");
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

        <h1 className="flex-1 text-center text-lg font-medium text-gray-900">
          Add New List
        </h1>

        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className={`absolute px-4 py-2 font-medium transition-colors ${
            name.trim() ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          style={{
            right: "0",
            color: name.trim() ? "transparent" : "#B5B5B5",
            background: name.trim()
              ? "linear-gradient(180deg, #FFC61B 0%, #FF9500 100%)"
              : "transparent",
            WebkitBackgroundClip: name.trim() ? "text" : "initial",
            backgroundClip: name.trim() ? "text" : "initial",
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
            style={{ outline: "none", boxShadow: "none" }}
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

function EditFolderModal({
  isOpen,
  onClose,
  onConfirm,
  initialName,
}: EditFolderModalProps) {
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

        <h1 className="flex-1 text-center text-lg font-medium text-gray-900">
          Edit List
        </h1>

        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className={`absolute px-4 py-2 font-medium transition-colors ${
            name.trim() ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          style={{
            right: "0",
            color: name.trim() ? "transparent" : "#B5B5B5",
            background: name.trim()
              ? "linear-gradient(180deg, #FFC61B 0%, #FF9500 100%)"
              : "transparent",
            WebkitBackgroundClip: name.trim() ? "text" : "initial",
            backgroundClip: name.trim() ? "text" : "initial",
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
            style={{ outline: "none", boxShadow: "none" }}
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

// Updated FolderItem component
function FolderItem({ folder, onClick, isSelected, onSelect }: any) {
  return (
    <div
      className={`flex items-center px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 ${
        isSelected ? "bg-gray-50" : ""
      }`}
      onClick={() => onSelect(folder)}
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
        <h3 className="font-medium text-[17px] text-gray-900 truncate leading-tight">
          {folder.name}
        </h3>
        <p className="text-[15px] text-gray-500 mt-1">
          {folder.itemCount || 0} places
        </p>
      </div>

      {/* Radio button for selection */}
      {isSelected ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.11 21 21 20.1 21 19V5C21 3.9 20.11 3 19 3ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"
            fill="url(#paint0_linear_4220_5352)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_4220_5352"
              x1="12"
              y1="3"
              x2="12"
              y2="21"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFC61B" />
              <stop offset="1" stopColor="#FF9500" />
            </linearGradient>
          </defs>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M19 5V19H5V5H19ZM19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3Z"
            fill="#B5B5B5"
          />
        </svg>
      )}
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

function FolderMenu({
  folder,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}: FolderMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div
        className="absolute bg-white rounded-lg shadow-lg py-2 w-[140px]"
        style={{
          top: folder.menuPosition?.top || "0",
          right: "16px", // Matches the parent container's padding
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

function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  folderName,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-sm mx-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Delete list ?</h3>
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          Are you sure you want to Delete the selected list permanently ? This action cannot be undone.
        </p>
        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 text-gray-600 bg-gray-100 rounded-xl font-medium hover:bg-gray-200 transition-colors"
          >
            Go back
          </button>
          <button
            onClick={() => {
              console.log('Delete button clicked in Favorite.tsx');
              onConfirm();
            }}
            className="flex-1 px-6 py-3 text-white bg-red-500 rounded-xl font-medium hover:bg-red-600 transition-colors"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Favorite() {
  const {
    folders,
    isLoading,
    error,
    addToFolder,
    createFolder,
    updateFolder,
    deleteFolder,
    refreshBookmarks,
  } = useBookmarks();

  const { id } = useParams();
  const navigate = useNavigate();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<any>(null);
  const [showFolderMenu, setShowFolderMenu] = useState(false);

  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  const handleSelectFolder = (folder: any) => {
    setSelectedFolderId(folder.id === selectedFolderId ? null : folder.id);
  };

  const handleDone = () => {
    if (selectedFolderId && id) {
      handleAddFavorite(id, selectedFolderId);
    }
  };

  const handleAddFavorite = async (id: any, folderId: any) => {
    try {
      await addToFolder({ id }, folderId);
      navigate(-1);
    } catch (error) {
      console.error("Failed to create folder:", error);
    }
  };

  const handleCreateFolder = async (name: string) => {
    try {
      await createFolder(name);
    } catch (error) {
      console.error("Failed to create folder:", error);
    }
  };

  const handleEditFolder = async (name: string) => {
    if (selectedFolder && selectedFolder.id !== "default") {
      try {
        await updateFolder(selectedFolder.id, name);
      } catch (error) {
        console.error("Failed to update folder:", error);
      }
    }
  };

  const handleDeleteFolder = async (folderId: string) => {
    console.log('handleDeleteFolder called in Favorite.tsx with folderId:', folderId);
    console.log('selectedFolder:', selectedFolder);
    
    try {
      await deleteFolder(folderId);
      console.log('Folder deleted successfully in Favorite.tsx');
      setShowDeleteConfirm(false);
      setSelectedFolder(null);
      // Refresh the folders list
      await refreshBookmarks();
    } catch (error) {
      console.error('Failed to delete folder in Favorite.tsx:', error);
      // Show error to user - you can add a toast or alert here
      alert('Failed to delete folder. Please try again.');
    }
  };

  const handleFolderClick = (folder: any) => {
    navigate(`/bookmarks/folder/${folder.id}`, { state: { folder } });
  };

  const handleRefresh = () => {
    refreshBookmarks();
  };

  // Add default favorites folder if not exists
  const allFolders = [
    {
      id: "default",
      name: "Favourites",
      isDefault: true,
      itemCount: folders.reduce(
        (total, folder) => total + (folder.itemCount || 0),
        0
      ),
    },
    ...folders,
  ];

  return (
    <div className="dvh-fallback flex justify-center bg-white">
      <div className="w-full max-w-[480px] flex flex-col h-screen">
        <div className="flex-1 overflow-y-auto">
          {/* Tabs */}
          <div className="relative flex items-center p-4 border-b border-gray-100">
            <button
              onClick={() => navigate(-1)}
              className="absolute left-4 p-2 -ml-2 hover:bg-gray-100 rounded-full"
            >
              <img src={ArrowLeft} alt="Back" className="w-8 h-8" />
            </button>

            <h1 className="flex-1 text-center text-lg font-medium text-gray-900">
              Save to list
            </h1>

            <button
              onClick={handleDone}
              disabled={!selectedFolderId}
              className={`absolute px-4 py-2 font-medium transition-colors ${
                selectedFolderId ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              style={{
                right: "0",
                color: selectedFolderId ? "transparent" : "#B5B5B5",
                background: selectedFolderId
                  ? "linear-gradient(180deg, #FFC61B 0%, #FF9500 100%)"
                  : "transparent",
                WebkitBackgroundClip: selectedFolderId ? "text" : "initial",
                backgroundClip: selectedFolderId ? "text" : "initial",
              }}
            >
              Done
            </button>
          </div>

          <div className="px-4 mt-3">
            {/* List collections header */}

            {/* Add New List Button */}
            <button
              onClick={() => setShowCreateModal(true)}
              className="w-full flex items-center justify-center py-[14px] bg-gray-50 rounded-xl mb-4 hover:bg-gray-100 transition-colors"
            >
              <img src={ToAdd} alt="Add" className="w-5 h-5 mr-2 opacity-80" />
              <span className="text-[15px] text-gray-900 font-medium">
                Add New List
              </span>
            </button>

            {/* Loading state */}
            {isLoading && (
              <div className="text-center flex justify-center py-20">
                <div className="spiner"></div>
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
              <div className="divide-y divide-gray-100">
                {allFolders.map((folder) => (
                  <FolderItem
                    key={folder.id}
                    folder={folder}
                    onClick={handleFolderClick}
                    isSelected={folder.id === selectedFolderId}
                    onSelect={handleSelectFolder}
                  />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!isLoading && !error && folders.length === 0 && (
              <div className="text-center py-12">
                <img
                  src={Favourite}
                  alt="No Lists"
                  className="w-16 h-16 mx-auto mb-4 opacity-50"
                />
                <p className="text-gray-500 mb-2">No collections yet</p>
                <p className="text-gray-400 text-sm">
                  Create your first list to organize your favorite places
                </p>
              </div>
            )}
          </div>
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
          initialName={selectedFolder?.name || ""}
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
          folderName={selectedFolder?.name || ""}
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
            if (selectedFolder && selectedFolder.id !== "default") {
              setShowFolderMenu(false);
              setShowDeleteConfirm(true);
            }
          }}
        />
      </div>
    </div>
  );
}
