// Environment Configuration
// This module centralizes all environment variables and provides type-safe access

interface EnvironmentConfig {
  // API Configuration
  apiBaseUrl: string;
  gatewayUrl: string;
  mediaApiUrl: string;

  // Security Configuration
  signatureSecret: string;
  aesKeyHex: string;

  // App Configuration
  appName: string;
  appVersion: string;

  // Feature Flags
  enableEncryption: boolean;
  enableSignature: boolean;

  // Environment
  isDevelopment: boolean;
  isProduction: boolean;
}

// Helper function to get environment variable with fallback
function getEnvVar(key: string, fallback: string = ""): string {
  return import.meta.env[key] || fallback;
}

// Helper function to get boolean environment variable
function getBoolEnvVar(key: string, fallback: boolean = false): boolean {
  const value = getEnvVar(key);
  if (value === "") return fallback;
  return value.toLowerCase() === "true";
}

// Environment configuration
export const env: EnvironmentConfig = {
  // API Configuration
  apiBaseUrl: getEnvVar(
    "VITE_API_BASE_URL",
    "https://vtt_dev.movie06.com/api/v1"
  ),
  gatewayUrl: getEnvVar(
    "VITE_GATEWAY_URL",
    "http://ec2-13-229-71-69.ap-southeast-1.compute.amazonaws.com:8080/api/v1"
  ),
  mediaApiUrl: getEnvVar(
    "VITE_MEDIA_API_URL",
    "http://ec2-13-229-71-69.ap-southeast-1.compute.amazonaws.com:3004"
  ),

  // Security Configuration
  signatureSecret: getEnvVar("VITE_SIGNATURE_SECRET", "123456"),
  aesKeyHex: getEnvVar(
    "VITE_AES_KEY_HEX",
    "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef"
  ),

  // App Configuration
  appName: getEnvVar("VITE_APP_NAME", "Veteran Driver"),
  appVersion: getEnvVar("VITE_APP_VERSION", "1.0.0"),

  // Feature Flags
  enableEncryption: getBoolEnvVar("VITE_ENABLE_ENCRYPTION", true),
  enableSignature: getBoolEnvVar("VITE_ENABLE_SIGNATURE", true),

  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Validation function to ensure required environment variables are set
export function validateEnvironment(): void {
  const requiredVars = [
    "apiBaseUrl",
    "gatewayUrl",
    "mediaApiUrl",
    "signatureSecret",
    "aesKeyHex",
  ];

  const missingVars = requiredVars.filter(
    (key) => !env[key as keyof EnvironmentConfig]
  );

  if (missingVars.length > 0) {
    console.warn("Missing required environment variables:", missingVars);
  }
}

// Export individual values for convenience
export const {
  apiBaseUrl,
  gatewayUrl,
  mediaApiUrl,
  signatureSecret,
  aesKeyHex,
  appName,
  appVersion,
  enableEncryption,
  enableSignature,
  isDevelopment,
  isProduction,
} = env;

export default env;
