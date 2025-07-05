# Environment Configuration Setup

This project uses environment variables for configuration management. All sensitive data and configuration values are stored in environment files.

## Environment Files

### `.env.example`

This is a template file that shows all available environment variables with example values. **Never commit actual values to this file.**

### `.env`

This is your local environment file with actual values. **This file is gitignored and should never be committed.**

## Available Environment Variables

### API Configuration

- `VITE_API_BASE_URL`: Base URL for the main API (default: `https://vtt_dev.movie06.com/api/v1`)
- `VITE_GATEWAY_URL`: Base URL for the gateway API (default: `http://ec2-13-229-71-69.ap-southeast-1.compute.amazonaws.com:8080/api/v1`)

### Security Configuration

- `VITE_SIGNATURE_SECRET`: Secret key for request signing (default: `123456`)
- `VITE_AES_KEY_HEX`: AES encryption key in hexadecimal format (default: `0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef`)

### App Configuration

- `VITE_APP_NAME`: Application name (default: `Veteran Driver`)
- `VITE_APP_VERSION`: Application version (default: `1.0.0`)

### Feature Flags

- `VITE_ENABLE_ENCRYPTION`: Enable/disable response encryption (default: `true`)
- `VITE_ENABLE_SIGNATURE`: Enable/disable request signing (default: `true`)

## Setup Instructions

1. **Copy the example file:**

   ```bash
   cp .env.example .env
   ```

2. **Edit the `.env` file:**
   Update the values according to your environment:

   ```env
   VITE_API_BASE_URL=https://your-api-domain.com/api/v1
   VITE_GATEWAY_URL=https://your-gateway-domain.com/api/v1
   VITE_SIGNATURE_SECRET=your-secret-key
   VITE_AES_KEY_HEX=your-aes-key-in-hex
   ```

3. **Restart your development server:**
   ```bash
   npm run dev
   ```

## Usage in Code

### Import Environment Configuration

```typescript
import {
  apiBaseUrl,
  gatewayUrl,
  signatureSecret,
  aesKeyHex,
} from "../config/env";
```

### Using Individual Values

```typescript
// API calls
const response = await fetch(`${apiBaseUrl}/users`);

// Gateway calls
const gatewayResponse = await gatewayRequest({
  method: "GET",
  url: `${gatewayUrl}/data`,
});
```

### Using the Full Environment Object

```typescript
import env from "../config/env";

console.log(env.appName);
console.log(env.isDevelopment);
```

## Environment Validation

The environment configuration includes validation to ensure required variables are set:

```typescript
import { validateEnvironment } from "../config/env";

// Call this early in your app initialization
validateEnvironment();
```

## Security Notes

1. **Never commit `.env` files** - They contain sensitive information
2. **Use different values for different environments** (development, staging, production)
3. **Rotate secrets regularly** - Update signature secrets and AES keys periodically
4. **Use strong, random values** for production environments

## Environment-Specific Configurations

### Development

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
VITE_ENABLE_ENCRYPTION=false
VITE_ENABLE_SIGNATURE=false
```

### Production

```env
VITE_API_BASE_URL=https://api.production.com/api/v1
VITE_ENABLE_ENCRYPTION=true
VITE_ENABLE_SIGNATURE=true
```

## Troubleshooting

### Environment Variables Not Loading

1. Make sure the variable names start with `VITE_`
2. Restart your development server after changing `.env`
3. Check that the `.env` file is in the project root

### TypeScript Errors

The environment configuration is fully typed. If you get TypeScript errors:

1. Make sure you're importing from `../config/env`
2. Check that all required environment variables are set
3. Verify the variable names match exactly

### Build Issues

For production builds:

1. Ensure all required environment variables are set
2. Check that the values are valid URLs/keys
3. Verify feature flags are set correctly for your environment
