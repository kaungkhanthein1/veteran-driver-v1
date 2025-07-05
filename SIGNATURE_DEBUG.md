# Signature Debug Guide

## Issue

Upload requests are failing with "Signature invalid" error (code: 100012).

## Debugging Steps

### 1. Test Signature Generation

Open browser console and run:

```javascript
import { testUploadSignature } from "./src/services/gateway.ts";
testUploadSignature();
```

### 2. Check Environment Variables

Verify these are set correctly:

- `VITE_SIGNATURE_SECRET=123456`
- `VITE_ENABLE_SIGNATURE=true`
- `VITE_GATEWAY_URL=http://ec2-13-229-71-69.ap-southeast-1.compute.amazonaws.com:8080/api/v1`

### 3. Monitor Network Requests

1. Open browser DevTools → Network tab
2. Try to upload a file
3. Look for the request to `/media/upload-url`
4. Check the request headers for:
   - `x-timestamp`
   - `x-nonce`
   - `x-signature`
   - `x-device-id`
   - `x-lang`

### 4. Compare with Working Request

If you have a working request, compare the signature generation with the failing one.

## Common Issues

### 1. Query Parameters Not Included

The signature should include query parameters from both URL and axios `params` field.

### 2. Header Case Sensitivity

Some servers expect specific header name casing.

### 3. Timestamp Format

Ensure timestamp is Unix timestamp (seconds since epoch).

### 4. Body Format

For GET requests, body should be empty string.

## Signature Format

The signature string should be:

```
METHOD|PATH|SORTED_QUERY_PARAMS|BODY|REQUIRED_HEADERS|OPTIONAL_HEADERS|TIMESTAMP|NONCE|SECRET
```

Example for upload request:

```
GET|/api/v1/media/upload-url|mimeType=image/jpeg&type=image&usage=temp||x-device-id:demo-device-001|1701234567|abc123def456|123456
```

## Debug Output

The gateway now logs signature details to console when `enableSignature` is true. Look for:

- Request signature details
- Signature string
- Generated signature hash

## Next Steps

1. Run the test function
2. Compare signature with server expectations
3. Check if server expects different header names or format
4. Verify the signature secret is correct
