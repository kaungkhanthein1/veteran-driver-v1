# API Gateway Fixes

## Issues Fixed

### 1. **Wrong Body Handling at Gateway Level**

**Problem**: The gateway was processing and modifying request bodies when it should be transparent.

**Fix**:

- Removed automatic body transformation in the gateway
- Let request bodies pass through as-is
- Only set Content-Type if not already set
- Gateway now acts as a transparent proxy for request data

### 2. **Data Transformation at Gateway Level**

**Problem**: The gateway was handling business logic and data parsing when it should only handle authentication and security.

**Fix**:

- Moved business error handling from gateway to `gatewayBaseQuery`
- Removed automatic error transformation in gateway interceptors
- Gateway now only handles authentication headers and security signatures
- Business logic is now properly handled at the service layer

### 3. **Incorrect Response Type**

**Problem**: Using `arraybuffer` as default response type for all requests.

**Fix**:

- Changed default response type from `arraybuffer` to `json`
- Only use `arraybuffer` temporarily when decryption is needed
- Restore original response type after decryption

### 4. **Direct Axios Usage Bypassing Gateway**

**Problem**: `authService.ts` and `recaptchaService.ts` were using direct axios calls instead of going through the gateway.

**Fix**:

- Updated `authService.ts` to use `gatewayRequest` instead of direct axios
- Updated `recaptchaService.ts` to use `gatewayRequest` for internal API calls
- Kept direct axios only for external API calls (Google reCAPTCHA)
- Ensured consistent authentication and security headers across all API calls

## Key Changes Made

### `src/services/gateway.ts`

- Changed default `responseType` from `"arraybuffer"` to `"json"`
- Removed business error handling from response interceptors
- Improved encryption handling to only use `arraybuffer` when needed
- Made body handling more transparent
- Removed automatic Content-Type overwriting

### `src/services/gatewayBaseQuery.ts`

- Added proper business error handling at service level
- Improved error categorization (network, server, unknown)
- Better error message formatting
- Moved business logic from gateway to service layer

### `src/services/authService.ts`

- Replaced direct axios with `gatewayRequest`
- Updated token storage key from `'auth_token'` to `'token'` for consistency
- Removed manual axios interceptors (now handled by gateway)
- Uses gateway URL from environment config

### `src/services/recaptchaService.ts`

- Replaced direct axios with `gatewayRequest` for internal API calls
- Kept direct axios only for external Google API calls
- Uses gateway URL from environment config
- Improved error handling

## Benefits

1. **Proper Separation of Concerns**: Gateway handles only authentication and security, services handle business logic
2. **Consistent API Flow**: All internal API calls now go through the gateway
3. **Better Error Handling**: Proper error categorization and handling at appropriate layers
4. **Improved Performance**: Default JSON response type instead of arraybuffer
5. **Maintainability**: Centralized authentication and security logic in gateway

## Testing Recommendations

1. Test authentication flows to ensure tokens are properly handled
2. Test API calls to verify they go through the gateway
3. Test error scenarios to ensure proper error handling
4. Test encrypted responses to ensure decryption still works
5. Test external API calls (Google reCAPTCHA) to ensure they still work

## Notes

- The gateway now acts as a proper transparent proxy
- Business logic is handled at the service layer where it belongs
- All internal API calls consistently use the gateway
- External API calls still use direct axios as appropriate
