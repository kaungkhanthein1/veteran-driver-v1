import { gatewayRequest } from "./gateway";
import { apiBaseUrl } from "../config/env";

export interface UploadUrlResponse {
  uploadUrl: string;
  key: string;
  accessLink?: string;
}

export interface MediaUploadResult {
  success: boolean;
  key?: string;
  accessLink?: string;
  error?: string;
}

export interface MediaUploadOptions {
  file: File;
  contentType?: string;
  onProgress?: (progress: number) => void;
}

/**
 * Media Upload Service
 * Handles media file uploads using the upload-url API
 */
export class MediaService {
  private static instance: MediaService;

  private constructor() {}

  public static getInstance(): MediaService {
    if (!MediaService.instance) {
      MediaService.instance = new MediaService();
    }
    return MediaService.instance;
  }

  /**
   * Get upload URL from the API
   * @param contentType - MIME type of the file
   * @returns Promise with upload URL and key
   */
  async getUploadUrl(contentType: string): Promise<UploadUrlResponse> {
    try {
      const response = await gatewayRequest({
        method: "GET",
        url: `${apiBaseUrl}/media/upload-url`,
        params: {
          contentType,
        },
      });

      return {
        uploadUrl: response.data.uploadUrl,
        key: response.data.key,
        accessLink: response.data.accessLink,
      };
    } catch (error: any) {
      throw new Error(
        `Failed to get upload URL: ${error.message || "Unknown error"}`
      );
    }
  }

  /**
   * Upload file to the provided upload URL
   * @param uploadUrl - URL to upload the file to
   * @param file - File to upload
   * @param onProgress - Progress callback
   * @returns Promise with upload result
   */
  async uploadFile(
    uploadUrl: string,
    file: File,
    onProgress?: (progress: number) => void
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      // Progress tracking
      if (onProgress) {
        xhr.upload.addEventListener("progress", (event) => {
          if (event.lengthComputable) {
            const progress = (event.loaded / event.total) * 100;
            onProgress(progress);
          }
        });
      }

      // Success handler
      xhr.addEventListener("load", () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve();
        } else {
          reject(new Error(`Upload failed with status: ${xhr.status}`));
        }
      });

      // Error handler
      xhr.addEventListener("error", () => {
        reject(new Error("Upload failed due to network error"));
      });

      // Abort handler
      xhr.addEventListener("abort", () => {
        reject(new Error("Upload was aborted"));
      });

      // Open and send request
      xhr.open("PUT", uploadUrl);
      xhr.setRequestHeader("Content-Type", file.type);
      xhr.send(file);
    });
  }

  /**
   * Complete media upload process
   * @param options - Upload options including file and progress callback
   * @returns Promise with upload result containing key
   */
  async uploadMedia(options: MediaUploadOptions): Promise<MediaUploadResult> {
    try {
      const { file, onProgress } = options;

      // Step 1: Get upload URL
      const uploadUrlResponse = await this.getUploadUrl(file.type);

      // Step 2: Upload file using PUT request
      await this.uploadFile(uploadUrlResponse.uploadUrl, file, onProgress);

      // Step 3: Return the key (not the access link) as required
      return {
        success: true,
        key: uploadUrlResponse.key,
        accessLink: uploadUrlResponse.accessLink,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Upload failed",
      };
    }
  }

  /**
   * Upload multiple files
   * @param files - Array of files to upload
   * @param onProgress - Progress callback for each file
   * @returns Promise with array of upload results
   */
  async uploadMultipleMedia(
    files: File[],
    onProgress?: (fileIndex: number, progress: number) => void
  ): Promise<MediaUploadResult[]> {
    const results: MediaUploadResult[] = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const result = await this.uploadMedia({
        file,
        onProgress: onProgress
          ? (progress) => onProgress(i, progress)
          : undefined,
      });
      results.push(result);
    }

    return results;
  }

  /**
   * Validate file before upload
   * @param file - File to validate
   * @returns Validation result
   */
  validateFile(file: File): { valid: boolean; error?: string } {
    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return {
        valid: false,
        error: "File size must be less than 10MB",
      };
    }

    // Check file type
    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "video/mp4",
      "video/avi",
      "video/mov",
      "video/wmv",
    ];

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: "File type not supported. Please upload image or video files.",
      };
    }

    return { valid: true };
  }

  /**
   * Get file preview URL
   * @param file - File to get preview for
   * @returns Promise with preview URL
   */
  getFilePreview(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsDataURL(file);
    });
  }
}

// Export singleton instance
export const mediaService = MediaService.getInstance();

// Export convenience functions
export const uploadMedia = (options: MediaUploadOptions) =>
  mediaService.uploadMedia(options);
export const uploadMultipleMedia = (
  files: File[],
  onProgress?: (fileIndex: number, progress: number) => void
) => mediaService.uploadMultipleMedia(files, onProgress);
export const validateFile = (file: File) => mediaService.validateFile(file);
export const getFilePreview = (file: File) => mediaService.getFilePreview(file);
