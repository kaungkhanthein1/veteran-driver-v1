# Media Upload Implementation Guide

This guide explains how to implement media uploads using the upload-url API as specified in the requirements.

## Overview

The media upload system follows this flow:

1. **Call upload-url API** to get upload URL and key
2. **Upload file** using PUT request to the provided URL
3. **Use the key** (not access link) when saving data
4. **Validate** that media is uploaded before saving

## API Endpoints

### Get Upload URL

```
GET /api/v1/media/upload-url?contentType={mime_type}
```

**Response:**

```json
{
  "uploadUrl": "https://storage.example.com/upload/presigned-url",
  "key": "media/2024/01/15/filename.jpg",
  "accessLink": "https://storage.example.com/media/2024/01/15/filename.jpg"
}
```

### Upload File

```
PUT {uploadUrl}
Content-Type: {file_mime_type}
Body: {file_binary_data}
```

## Implementation Components

### 1. Media Service (`src/services/mediaService.ts`)

The core service that handles:

- Getting upload URLs from the API
- Uploading files using PUT requests
- File validation
- Progress tracking

```typescript
import { mediaService } from "../services/mediaService";

// Upload a single file
const result = await mediaService.uploadMedia({
  file: selectedFile,
  onProgress: (progress) => console.log(`${progress}%`),
});

if (result.success) {
  console.log("Media key:", result.key); // Use this key when saving
}
```

### 2. Media Upload Hook (`src/hooks/useMediaUpload.ts`)

React hook that provides:

- Upload state management
- Progress tracking
- Error handling
- File validation

```typescript
import { useMediaUpload } from "../hooks/useMediaUpload";

const { uploadMedia, isUploading, uploadProgress, error } = useMediaUpload();

const handleUpload = async (file: File) => {
  const result = await uploadMedia(file);
  if (result.success) {
    // Use result.key when saving to database
    saveProfile({ avatar: result.key });
  }
};
```

### 3. Media Upload Component (`src/components/common/MediaUpload.tsx`)

Reusable component for file uploads with:

- Drag & drop support
- Preview functionality
- Progress indicators
- Error handling

```typescript
import MediaUpload from "../components/common/MediaUpload";

<MediaUpload
  onUploadComplete={(result) => {
    // result.key contains the media key to save
    setAvatarKey(result.key);
  }}
  onUploadError={(error) => alert(error)}
  accept="image/*"
  maxSize={5} // 5MB
/>;
```

## Usage Examples

### 1. Profile Avatar Upload

```typescript
import { useMediaUpload } from "../hooks/useMediaUpload";

function EditProfilePage() {
  const { uploadMedia, isUploading } = useMediaUpload();
  const [avatarKey, setAvatarKey] = useState("");

  const handleAvatarUpload = async (file: File) => {
    const result = await uploadMedia(file);
    if (result.success) {
      setAvatarKey(result.key); // Store the key, not access link
    }
  };

  const handleSave = () => {
    if (!avatarKey) {
      alert("Please upload a profile picture before saving");
      return;
    }

    // Send avatarKey to API
    saveProfile({ avatar: avatarKey });
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => handleAvatarUpload(e.target.files[0])}
        disabled={isUploading}
      />
      {isUploading && <div>Uploading... {uploadProgress}%</div>}
      <button onClick={handleSave} disabled={!avatarKey}>
        Save Profile
      </button>
    </div>
  );
}
```

### 2. Multiple Media Upload

```typescript
import { useMediaUpload } from "../hooks/useMediaUpload";

function SocialUploadPage() {
  const { uploadMultipleMedia, isUploading } = useMediaUpload();
  const [mediaKeys, setMediaKeys] = useState<string[]>([]);

  const handleMultipleUpload = async (files: File[]) => {
    const results = await uploadMultipleMedia(files);
    const keys = results
      .filter((result) => result.success)
      .map((result) => result.key!);

    setMediaKeys(keys);
  };

  const handlePost = () => {
    if (mediaKeys.length === 0) {
      alert("Please upload at least one media file");
      return;
    }

    // Send mediaKeys array to API
    createPost({ media: mediaKeys });
  };

  return (
    <div>
      <input
        type="file"
        multiple
        accept="image/*,video/*"
        onChange={(e) => handleMultipleUpload(Array.from(e.target.files))}
        disabled={isUploading}
      />
      <button onClick={handlePost} disabled={mediaKeys.length === 0}>
        Post
      </button>
    </div>
  );
}
```

### 3. Using the MediaUpload Component

```typescript
import MediaUpload from "../components/common/MediaUpload";

function LocationUploadPage() {
  const [photoKeys, setPhotoKeys] = useState<string[]>([]);

  const handleUploadComplete = (result: { key: string }) => {
    setPhotoKeys((prev) => [...prev, result.key]);
  };

  return (
    <div>
      <h3>Upload Location Photos</h3>
      <MediaUpload
        onUploadComplete={handleUploadComplete}
        onUploadError={(error) => alert(error)}
        multiple={true}
        maxFiles={10}
        accept="image/*"
        maxSize={5}
        showPreview={true}
      />

      <button
        onClick={() => saveLocation({ photos: photoKeys })}
        disabled={photoKeys.length === 0}
      >
        Save Location
      </button>
    </div>
  );
}
```

## File Validation

The system includes built-in validation for:

- **File size**: Maximum 10MB (configurable)
- **File types**: Images (JPEG, PNG, GIF, WebP) and videos (MP4, AVI, MOV, WMV)
- **Number of files**: Configurable limits

```typescript
import { validateFile } from "../services/mediaService";

const validation = validateFile(file);
if (!validation.valid) {
  console.error(validation.error);
  return;
}
```

## Error Handling

The system provides comprehensive error handling:

```typescript
const { uploadMedia, error, clearError } = useMediaUpload();

// Handle upload errors
if (error) {
  console.error("Upload failed:", error);
  // Show error message to user
}

// Clear errors
clearError();
```

## Progress Tracking

Track upload progress in real-time:

```typescript
const { uploadMedia, uploadProgress } = useMediaUpload();

const handleUpload = async (file: File) => {
  await uploadMedia(file, (progress) => {
    console.log(`Upload progress: ${progress}%`);
    // Update UI with progress
  });
};
```

## Best Practices

1. **Always use the key, not the access link** when saving to database
2. **Validate files** before uploading
3. **Show progress indicators** during upload
4. **Handle errors gracefully** with user-friendly messages
5. **Disable save buttons** until media is uploaded
6. **Show previews** of uploaded media
7. **Clear file inputs** after successful upload

## API Integration

When saving data that includes media, send the media keys:

```typescript
// ✅ Correct - Send the key
const profileData = {
  name: "John Doe",
  avatar: "media/2024/01/15/avatar.jpg", // Media key
};

// ❌ Wrong - Don't send the access link
const profileData = {
  name: "John Doe",
  avatar: "https://storage.example.com/media/2024/01/15/avatar.jpg", // Access link
};
```

## Testing

Test the upload functionality with:

1. **Valid files**: Images and videos within size limits
2. **Invalid files**: Files too large or wrong type
3. **Network errors**: Disconnect during upload
4. **Multiple files**: Upload several files at once
5. **Save validation**: Try to save without uploading media

## Troubleshooting

### Common Issues

1. **Upload fails**: Check network connection and file size
2. **Key not saved**: Ensure you're using `result.key`, not `result.accessLink`
3. **Progress not showing**: Verify the `onProgress` callback is working
4. **Validation errors**: Check file type and size limits

### Debug Tips

```typescript
// Enable detailed logging
const result = await uploadMedia(file);
console.log("Upload result:", result);

// Check file validation
const validation = validateFile(file);
console.log("File validation:", validation);
```
