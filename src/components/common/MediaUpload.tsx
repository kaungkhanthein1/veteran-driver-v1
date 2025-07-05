import React, { useState, useRef } from "react";
import { useMediaUpload } from "../../hooks/useMediaUpload";

interface MediaUploadProps {
  onUploadComplete: (result: { key: string; accessUrl?: string }) => void;
  onUploadError?: (error: string) => void;
  onProgress?: (progress: number) => void;
  accept?: string;
  multiple?: boolean;
  maxFiles?: number;
  maxSize?: number; // in MB
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  showPreview?: boolean;
  previewClassName?: string;
  type?:
    | "avatar"
    | "image"
    | "video"
    | "audio"
    | "document"
    | "place-photo"
    | "place-video"
    | "chat";
  usage?:
    | "profile"
    | "cover"
    | "message-attachment"
    | "verification"
    | "promotion"
    | "temp";
}

export const MediaUpload: React.FC<MediaUploadProps> = ({
  onUploadComplete,
  onUploadError,
  onProgress,
  accept = "image/*,video/*",
  multiple = false,
  maxFiles = 1,
  maxSize = 10, // 10MB default
  className = "",
  children,
  disabled = false,
  showPreview = true,
  previewClassName = "",
  type,
  usage,
}) => {
  const {
    uploadMedia,
    uploadMultipleMedia,
    isUploading,
    uploadProgress,
    error,
    clearError,
  } = useMediaUpload();
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [uploadedKeys, setUploadedKeys] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    // Validate number of files
    if (files.length > maxFiles) {
      onUploadError?.(`Maximum ${maxFiles} file(s) allowed`);
      return;
    }

    // Validate file sizes
    const oversizedFiles = files.filter(
      (file) => file.size > maxSize * 1024 * 1024
    );
    if (oversizedFiles.length > 0) {
      onUploadError?.(`File size must be less than ${maxSize}MB`);
      return;
    }

    try {
      // Create preview URLs
      const urls = await Promise.all(
        files.map((file) => URL.createObjectURL(file))
      );
      setPreviewUrls(urls);

      // Upload files
      if (multiple) {
        const results = await uploadMultipleMedia(files, {
          type,
          usage,
          onProgress,
        });
        const successfulUploads = results.filter((result) => result.success);
        const failedUploads = results.filter((result) => !result.success);

        if (failedUploads.length > 0) {
          onUploadError?.(`Failed to upload ${failedUploads.length} file(s)`);
        }

        if (successfulUploads.length > 0) {
          const keys = successfulUploads.map((result) => result.key!);
          setUploadedKeys(keys);

          // Call onUploadComplete for each successful upload
          successfulUploads.forEach((result) => {
            onUploadComplete({
              key: result.key!,
              accessUrl: result.accessUrl,
            });
          });
        }
      } else {
        const result = await uploadMedia(files[0], {
          type,
          usage,
          onProgress,
        });

        if (result.success && result.key) {
          setUploadedKeys([result.key]);
          onUploadComplete({
            key: result.key,
            accessUrl: result.accessUrl,
          });
        } else {
          onUploadError?.(result.error || "Upload failed");
        }
      }
    } catch (err: any) {
      onUploadError?.(err.message || "Upload failed");
    }

    // Clear the input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    if (!disabled && !isUploading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const clearPreview = () => {
    setPreviewUrls([]);
    setUploadedKeys([]);
    clearError();
  };

  return (
    <div className={className}>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || isUploading}
      />

      {/* Upload trigger */}
      <div
        onClick={handleClick}
        className={`cursor-pointer ${
          disabled || isUploading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {children || (
          <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
            {isUploading ? (
              <div className="text-center">
                <div className="text-sm text-gray-600">
                  {Math.round(uploadProgress)}%
                </div>
                <div className="text-xs text-gray-500">Uploading...</div>
              </div>
            ) : (
              <svg
                className="w-8 h-8 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Preview */}
      {showPreview && previewUrls.length > 0 && (
        <div className={`mt-2 ${previewClassName}`}>
          <div className="flex flex-wrap gap-2">
            {previewUrls.map((url, index) => (
              <div key={index} className="relative">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                {uploadedKeys[index] && (
                  <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded">
                    ✓
                  </div>
                )}
                <button
                  onClick={clearPreview}
                  className="absolute top-1 left-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error display */}
      {error && (
        <div className="mt-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error}
          <button
            onClick={clearError}
            className="float-right text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
