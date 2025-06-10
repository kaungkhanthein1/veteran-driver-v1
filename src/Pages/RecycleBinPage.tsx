import { useState } from "react";
import { useTranslation } from "react-i18next";
import ExploreCard from "../components/cards/ExploreCard";
import BackButton from "../components/common/BackButton";

export default function RecycleBinPage() {
  const { t } = useTranslation();
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);

  // Temporary data structure - will be replaced with actual data later
  const deletedLocations = [
    {
      id: 1,
      name: "Golden Sovo",
      distance: "Phenom Penh ( 12km away )",
      rating: 5.0,
      reviews: 128,
      services: ["Service 1", "Service 2", "Service3"],
      price: "50 USD",
      status: "Approved"
    },
    {
      id: 2,
      name: "Soveila",
      distance: "Phenom Penh ( 12km away )",
      rating: 5.0,
      reviews: 128,
      services: ["Service 1", "Service 2", "Service3"],
      price: "50 USD",
      status: "Rejected"
    }
  ];

  const handleCardClick = (location) => {
    if (selectedLocations.find(loc => loc.name === location.name)) {
      setSelectedLocations(selectedLocations.filter(loc => loc.name !== location.name));
    } else {
      setSelectedLocations([...selectedLocations, location]);
    }
  };

  const handleDelete = () => {
    // TODO: Implement actual delete logic here
    setShowDeleteConfirm(false);
    setSelectedLocations([]);
  };

  const handleRestore = () => {
    // TODO: Implement actual restore logic here
    setShowRestoreConfirm(true);
  };

  const confirmRestore = () => {
    // TODO: Implement actual restore logic here
    setShowRestoreConfirm(false);
  };

  return (
    <div className="dvh-fallback bg-theme-primary relative">
      {/* Header */}
      <div className="relative flex items-center justify-between px-4 py-3 bg-theme-secondary pt-6">
        <BackButton className="absolute left-4"/>
        <h1 className="text-lg font-semibold text-center flex-grow">{t('recycleBinPage.title')}</h1>
        {selectedLocations.length > 0 && (
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="text-red-500"
          >
            {t('common.cancel')}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {deletedLocations.map((location) => (
          <ExploreCard
            key={location.id}
            item={location}
            status={location.status}
            selected={selectedLocations.some(loc => loc.id === location.id)}
            onClick={() => handleCardClick(location)}
            context="recycleBin"
            onRestore={() => handleRestore(location)}
          />
        ))}
      </div>

      {/* Selection Info */}
      {selectedLocations.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-theme-secondary p-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setSelectedLocations(deletedLocations)}
              className="px-4 py-2 rounded-full bg-theme-primary text-theme-secondary"
            >
              {t('recycleBinPage.selectAllButton')}
            </button>
            <span>{t('recycleBinPage.locationsSelectedText', { count: selectedLocations.length })}</span>
          </div>
          <button 
            onClick={() => setShowDeleteConfirm(true)}
            className="px-4 py-2 rounded-full bg-red-500 text-white"
          >
            {t('common.delete')}
          </button>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-theme-secondary rounded-lg p-6 max-w-sm w-full">
            <h2 className="text-xl font-semibold mb-4">{t('common.delete')}</h2>
            <p className="text-theme-primary mb-6">
              {t('recycleBinPage.deleteConfirmationText')}
            </p>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 rounded-full bg-theme-primary text-theme-secondary"
              >
                {t('common.cancel')}
              </button>
              <button 
                onClick={handleDelete}
                className="px-4 py-2 rounded-full bg-red-500 text-white"
              >
                {t('recycleBinPage.yesDeleteButton')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Restore Confirmation Modal */}
      {showRestoreConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-theme-secondary rounded-lg p-6 w-full max-w-sm">
            <h3 className="text-lg font-semibold mb-4">{t('recycleBinPage.restoreLocationTitle')}</h3>
            <p className="mb-6">{t('recycleBinPage.restoreConfirmationText')}</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                  setShowRestoreConfirm(false);
                }}
                className="px-4 py-2 rounded-lg text-theme-secondary"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={confirmRestore}
                className="px-4 py-2 rounded-lg bg-yellow-500 text-black font-medium"
              >
                {t('recycleBinPage.restoreButton')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}