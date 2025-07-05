import { useState, useCallback } from "react";
import {
  mediaService,
  MediaUploadResult,
  MediaUploadOptions,
} from "../services/mediaService";

export interface UseMediaUploadReturn {
  uploadMedia: (
    file: File,
    options?: {
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
      onProgress?: (progress: number) => void;
    }
  ) => Promise<MediaUploadResult>;
  uploadMultipleMedia: (
    files: File[],
    options?: {
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
      onProgress?: (fileIndex: number, progress: number) => void;
    }
  ) => Promise<MediaUploadResult[]>;
  isUploading: boolean;
  uploadProgress: number;
  error: string | null;
  clearError: () => void;
  validateFile: (file: File) => { valid: boolean; error?: string };
}

/**
 * Custom hook for media uploads
 * Provides a simple interface for uploading media files
 */
export const useMediaUpload = (): UseMediaUploadReturn => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const uploadMedia = useCallback(
    async (
      file: File,
      options?: {
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
        onProgress?: (progress: number) => void;
      }
    ): Promise<MediaUploadResult> => {
      setIsUploading(true);
      setError(null);
      setUploadProgress(0);

      try {
        // Validate file first
        const validation = mediaService.validateFile(file);
        if (!validation.valid) {
          setError(validation.error || "Invalid file");
          return { success: false, error: validation.error };
        }

        const result = await mediaService.uploadMedia({
          file,
          type: options?.type,
          usage: options?.usage,
          onProgress: (progress) => {
            setUploadProgress(progress);
            options?.onProgress?.(progress);
          },
        });

        if (!result.success) {
          setError(result.error || "Upload failed");
        }

        return result;
      } catch (err: any) {
        const errorMessage = err.message || "Upload failed";
        setError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    []
  );

  const uploadMultipleMedia = useCallback(
    async (
      files: File[],
      options?: {
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
        onProgress?: (fileIndex: number, progress: number) => void;
      }
    ): Promise<MediaUploadResult[]> => {
      setIsUploading(true);
      setError(null);
      setUploadProgress(0);

      try {
        // Validate all files first
        for (const file of files) {
          const validation = mediaService.validateFile(file);
          if (!validation.valid) {
            setError(validation.error || "Invalid file");
            return [{ success: false, error: validation.error }];
          }
        }

        const results: MediaUploadResult[] = [];
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
          const result = await mediaService.uploadMedia({
            file,
            type: options?.type,
            usage: options?.usage,
            onProgress: options?.onProgress
              ? (progress) => options.onProgress!(i, progress)
              : undefined,
          });
          results.push(result);
        }

        // Check if any upload failed
        const failedUploads = results.filter((result) => !result.success);
        if (failedUploads.length > 0) {
          setError(`Failed to upload ${failedUploads.length} file(s)`);
        }

        return results;
      } catch (err: any) {
        const errorMessage = err.message || "Upload failed";
        setError(errorMessage);
        return [{ success: false, error: errorMessage }];
      } finally {
        setIsUploading(false);
        setUploadProgress(0);
      }
    },
    []
  );

  const validateFile = useCallback((file: File) => {
    return mediaService.validateFile(file);
  }, []);

  return {
    uploadMedia,
    uploadMultipleMedia,
    isUploading,
    uploadProgress,
    error,
    clearError,
    validateFile,
  };
};
