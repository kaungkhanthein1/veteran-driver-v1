import { gatewayRequest } from "./gateway";
import { gatewayUrl } from "../config/env";

// You can configure this based on your backend URL
const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3001/api";

export interface RecaptchaVerifyResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const verifyRecaptchaToken = async (
  token: string
): Promise<RecaptchaVerifyResponse> => {
  try {
    const response = await gatewayRequest({
      url: `${gatewayUrl}/auth/verify-recaptcha`,
      method: "POST",
      data: {
        recaptchaToken: token,
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("reCAPTCHA verification error:", error);

    if (error.response) {
      return {
        success: false,
        error: error.response.data?.message || "Verification failed",
      };
    }

    return {
      success: false,
      error: "Network error occurred",
    };
  }
};

// Alternative: If you want to verify directly with Google (not recommended for production)
// This should still use direct axios since it's an external API
export const verifyRecaptchaWithGoogle = async (
  token: string
): Promise<boolean> => {
  try {
    // Import axios only for external API calls
    const axios = (await import("axios")).default;

    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: import.meta.env.VITE_RECAPTCHA_SECRET_KEY, // This should be on your backend
          response: token,
        },
      }
    );

    return response.data.success;
  } catch (error) {
    console.error("Google reCAPTCHA verification error:", error);
    return false;
  }
};
