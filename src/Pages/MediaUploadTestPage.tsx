import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/common/BackButton";
import { useMediaUpload } from "../hooks/useMediaUpload";
import MediaUpload from "../components/common/MediaUpload";

export default function MediaUploadTestPage() {
  const navigate = useNavigate();
  const {
    uploadMedia,
    uploadMultipleMedia,
    isUploading,
    uploadProgress,
    error,
    clearError,
  } = useMediaUpload();
  const [uploadedKeys, setUploadedKeys] = useState<string[]>([]);
  const [singleUploadKey, setSingleUploadKey] = useState<string>("");

  const handleSingleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const result = await uploadMedia(file);
      if (result.success && result.key) {
        setSingleUploadKey(result.key);
        alert(`Single upload successful! Key: ${result.key}`);
      } else {
        alert(`Upload failed: ${result.error}`);
      }
    }
  };

  const handleMultipleUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      const results = await uploadMultipleMedia(files);
      const keys = results
        .filter((result) => result.success)
        .map((result) => result.key!);

      setUploadedKeys(keys);
      alert(`Multiple upload successful! Keys: ${keys.join(", ")}`);
    }
  };

  const handleComponentUpload = (result: {
    key: string;
    accessLink?: string;
  }) => {
    setUploadedKeys((prev) => [...prev, result.key]);
    alert(`Component upload successful! Key: ${result.key}`);
  };

  return (
    <div className="dvh-fallback bg-theme-background">
      <div className="max-w-[480px] mx-auto">
        {/* Header */}
        <div className="flex items-center px-4 py-4">
          <BackButton />
          <h1 className="flex-1 text-center text-xl font-normal text-theme-text">
            Media Upload Test
          </h1>
          <div className="w-6"></div>
        </div>

        <div className="px-4 space-y-6">
          {/* Progress and Error Display */}
          {isUploading && (
            <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">
              <div className="flex items-center justify-between">
                <span>Uploading...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              <div className="flex justify-between items-center">
                <span>Error: {error}</span>
                <button
                  onClick={clearError}
                  className="text-red-700 hover:text-red-900"
                >
                  ×
                </button>
              </div>
            </div>
          )}

          {/* Test 1: Single File Upload */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-3">
              Test 1: Single File Upload
            </h2>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleSingleUpload}
              disabled={isUploading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {singleUploadKey && (
              <div className="mt-2 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
                <strong>Uploaded Key:</strong> {singleUploadKey}
              </div>
            )}
          </div>

          {/* Test 2: Multiple File Upload */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-3">
              Test 2: Multiple File Upload
            </h2>
            <input
              type="file"
              accept="image/*,video/*"
              multiple
              onChange={handleMultipleUpload}
              disabled={isUploading}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {uploadedKeys.length > 0 && (
              <div className="mt-2 p-2 bg-green-100 border border-green-400 text-green-700 rounded">
                <strong>Uploaded Keys:</strong>
                <ul className="mt-1 list-disc list-inside">
                  {uploadedKeys.map((key, index) => (
                    <li key={index}>{key}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Test 3: MediaUpload Component */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-3">
              Test 3: MediaUpload Component
            </h2>
            <MediaUpload
              onUploadComplete={handleComponentUpload}
              onUploadError={(error) => alert(`Component error: ${error}`)}
              multiple={true}
              maxFiles={3}
              accept="image/*"
              maxSize={5}
              showPreview={true}
            />
          </div>

          {/* Test 4: Profile Avatar Upload */}
          <div className="bg-white rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold mb-3">
              Test 4: Profile Avatar Upload
            </h2>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                  {singleUploadKey ? (
                    <div className="text-green-600 text-xs text-center p-2">
                      ✓ Uploaded
                      <br />
                      Key: {singleUploadKey.slice(0, 10)}...
                    </div>
                  ) : (
                    <span className="text-gray-400">No Avatar</span>
                  )}
                </div>
                <label className="absolute bottom-0 right-0 w-6 h-6 bg-[#FDC51B] rounded-full flex items-center justify-center cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSingleUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                  </svg>
                </label>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600">
                  Click the yellow button to upload a profile picture. The media
                  key will be stored for use in profile data.
                </p>
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => navigate("/profile/edit")}
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Go to Edit Profile Page
            </button>
            <button
              onClick={() => navigate("/social/upload")}
              className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Go to Social Upload Page
            </button>
            <button
              onClick={() => navigate("/profile")}
              className="w-full bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
            >
              Back to Profile
            </button>
          </div>

          {/* Instructions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">
              Testing Instructions:
            </h3>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Try uploading different file types (images, videos)</li>
              <li>• Test with files larger than 10MB to see validation</li>
              <li>• Try uploading multiple files at once</li>
              <li>
                • Check that the media keys are returned (not access links)
              </li>
              <li>• Verify progress indicators work during upload</li>
              <li>• Test error handling with invalid files</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
