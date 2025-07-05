# Avatar Upload and Display Guide

## ✅ Upload Success!

Your avatar upload is now working correctly. The API returned:

```json
{
  "code": 200,
  "message": "success",
  "data": {
    "key": "uploads/image/1751703756668_i_zmqEWe8R",
    "uploadUrl": "https://vtt-dev-media.s3.ap-southeast-1.amazonaws.com/...",
    "expiresIn": 600,
    "accessUrl": "https://d1rzp152lm97vw.cloudfront.net/uploads/image/1751703756668_i_zmqEWe8R?..."
  }
}
```

## 📸 How to Display the Avatar

### 1. **Use the `accessUrl` for Display**

The `accessUrl` is the CDN URL that should be used to display the image:

```typescript
const avatarUrl = response.data.accessUrl;
// Use this URL in your <img> tag
<img src={avatarUrl} alt="Profile Avatar" />;
```

### 2. **Use the `key` for API Calls**

The `key` should be sent to your backend when updating the profile:

```typescript
const profileData = {
  name: "User Name",
  bio: "User Bio",
  avatar: response.data.key, // Use the key, not the accessUrl
};
```

## 🔄 Updated Profile Flow

### 1. **Upload Avatar**

- User selects an image file
- File is uploaded using `uploadMedia()` with `type: "avatar"` and `usage: "profile"`
- Upload returns `key` and `accessUrl`

### 2. **Display Avatar**

- Use `accessUrl` to show the image immediately
- Store `key` for later API calls

### 3. **Save Profile**

- Send profile data including the `key` to `/profile/update` API
- Backend stores the `key` and can generate the `accessUrl` when needed

## 🎯 Key Points

- **`accessUrl`**: For displaying images (CDN URL with expiration)
- **`key`**: For storing in database and API calls
- **Signature Fix**: FormData uploads now use empty string for signature body
- **Profile Update**: New API endpoint `/profile/update` for saving profile data

## 🚀 Next Steps

1. **Test the complete flow**: Upload → Display → Save Profile
2. **Verify profile update API**: Ensure `/profile/update` endpoint works
3. **Check profile display**: Verify avatar shows correctly in profile page
4. **Handle errors**: Add proper error handling for failed uploads/saves

## 📝 Code Example

```typescript
// Upload avatar
const result = await uploadMedia({
  file: selectedFile,
  type: "avatar",
  usage: "profile",
});

if (result.success) {
  // Display the image
  setAvatarUrl(result.accessUrl);

  // Save profile with key
  await updateProfile({
    name: "User Name",
    avatar: result.key,
  });
}
```

The avatar upload is now working correctly! 🎉
