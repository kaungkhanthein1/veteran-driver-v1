import { gatewayRequest } from "./gateway";
import { mediaApiUrl, gatewayUrl } from "../config/env";

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
 * Media Proxy Service
 * Handles media file uploads with fallback mechanisms
 */
export class MediaProxyService {
  private static instance: MediaProxyService;

  private constructor() {}

  static getInstance(): MediaProxyService {
    if (!MediaProxyService.instance) {
      MediaProxyService.instance = new MediaProxyService();
    }
    return MediaProxyService.instance;
  }

  /**
   * Get upload URL through gateway proxy
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

      // Try gateway first (recommended)
      try {
        const response = await gatewayRequest({
          method: "GET",
          url: `${gatewayUrl}/media/upload-url`,
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

      // Fallback: Try direct API
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
        } else if (xhr.status === 403) {
          reject(new Error("Upload URL expired or invalid"));
        } else if (xhr.status === 413) {
          reject(new Error("File size too large for upload"));
        } else if (xhr.status === 400) {
          reject(new Error("Invalid file or upload request"));
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
        expiresIn: uploadUrlResponse.expiresIn,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || "Upload failed",
      };
    }
  }
}

// Export singleton instance
export const mediaProxyService = MediaProxyService.getInstance();

// Export convenience functions
export const getUploadUrl = (options: {
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
}) => mediaProxyService.getUploadUrl(options);
export const uploadMedia = (options: MediaUploadOptions) =>
  mediaProxyService.uploadMedia(options);
