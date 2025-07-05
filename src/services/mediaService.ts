import { gatewayRequest } from "./gateway";
import { apiBaseUrl, mediaApiUrl } from "../config/env";

export interface UploadUrlResponse {
  uploadUrl: string;
  key: string;
  accessUrl?: string;
  expiresIn?: number;
}

export interface MediaUploadResult {
  success: boolean;
  key?: string;
  accessUrl?: string;
  error?: string;
}

export interface MediaUploadOptions {
  file: File;
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
   * @param options - Upload options including type, usage, and mimeType
   * @returns Promise with upload URL and key
   */
  async getUploadUrl(options: {
    type:
      | "avatar"
      | "image"
      | "video"
      | "audio"
      | "document"
      | "place-photo"
      | "place-video"
      | "chat";
    usage:
      | "profile"
      | "cover"
      | "message-attachment"
      | "verification"
      | "promotion"
      | "temp";
    mimeType?: string;
    expiresIn?: number;
  }): Promise<UploadUrlResponse> {
    try {
      const params: any = {
        type: options.type,
        usage: options.usage,
      };

      if (options.mimeType) {
        params.mimeType = options.mimeType;
      }

      if (options.expiresIn) {
        params.expiresIn = options.expiresIn;
      }

      // Try gateway first
      try {
        const response = await gatewayRequest({
          method: "GET",
          url: `${apiBaseUrl}/media/upload-url`,
          params,
        });

        if (response.data?.data?.uploadUrl && response.data?.data?.key) {
          return {
            uploadUrl: response.data.data.uploadUrl,
            key: response.data.data.key,
            accessUrl: response.data.data.accessUrl,
            expiresIn: response.data.data.expiresIn,
          };
        }
      } catch (gatewayError) {
        console.warn(
          "Gateway media endpoint failed, trying direct API:",
          gatewayError
        );
      }

      // Fallback: Try direct media API
      const response = await fetch(
        `${mediaApiUrl}/public/media/upload-url?${new URLSearchParams(params)}`
      );

      if (!response.ok) {
        throw new Error(`API request failed with status: ${response.status}`);
      }

      const data = await response.json();

      if (data.data?.uploadUrl && data.data?.key) {
        return {
          uploadUrl: data.data.uploadUrl,
          key: data.data.key,
          accessUrl: data.data.accessUrl,
          expiresIn: data.data.expiresIn,
        };
      } else {
        throw new Error("Invalid response: missing uploadUrl or key");
      }
    } catch (error: any) {
      throw new Error(
        `Failed to get upload URL: ${error.message || "Unknown error"}`
      );
    }
  }

  /**
   * Determine media type based on file type
   * @param file - File to analyze
   * @returns Media type for API
   */
  private getMediaType(
    file: File
  ):
    | "avatar"
    | "image"
    | "video"
    | "audio"
    | "document"
    | "place-photo"
    | "place-video"
    | "chat" {
    if (file.type.startsWith("image/")) {
      return "image";
    } else if (file.type.startsWith("video/")) {
      return "video";
    } else if (file.type.startsWith("audio/")) {
      return "audio";
    } else {
      return "document";
    }
  }

  /**
   * Determine usage based on context
   * @param context - Upload context
   * @returns Usage for API
   */
  private getUsage(
    context?: string
  ):
    | "profile"
    | "cover"
    | "message-attachment"
    | "verification"
    | "promotion"
    | "temp" {
    switch (context) {
      case "profile":
        return "profile";
      case "cover":
        return "cover";
      case "message":
        return "message-attachment";
      case "verification":
        return "verification";
      case "promotion":
        return "promotion";
      default:
        return "temp";
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
      const uploadUrlResponse = await this.getUploadUrl({
        type: this.getMediaType(file),
        usage: this.getUsage(options.usage),
        mimeType: file.type,
      });

      // Step 2: Upload file using PUT request
      await this.uploadFile(uploadUrlResponse.uploadUrl, file, onProgress);

      // Step 3: Return the key (not the access link) as required
      return {
        success: true,
        key: uploadUrlResponse.key,
        accessUrl: uploadUrlResponse.accessUrl,
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
