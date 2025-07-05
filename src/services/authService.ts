import { gatewayRequest } from "./gateway";
import { gatewayUrl } from "../config/env";

export interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    email: string;
    name: string;
    picture?: string;
  };
  token?: string;
  error?: string;
}

export interface GoogleAuthResponse {
  code: string;
  scope: string;
}

export const authService = {
  // Handle Google OAuth login
  handleGoogleLogin: async (
    response: GoogleAuthResponse
  ): Promise<AuthResponse> => {
    try {
      const { data } = await gatewayRequest({
        url: `${gatewayUrl}/auth/google`,
        method: "POST",
        data: {
          code: response.code,
        },
      });

      // Store the token in localStorage or your preferred storage method
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      return data;
    } catch (error) {
      console.error("Google auth error:", error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem("token");
    return !!token;
  },

  // Get the current auth token
  getToken: (): string | null => {
    return localStorage.getItem("token");
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem("token");
  },

  // Set up axios interceptor for authentication
  setupAxiosInterceptors: () => {
    // Note: This is now handled by the gateway automatically
    // The gateway will automatically add the Authorization header
    // when a token is present in localStorage
    console.log("Auth interceptors are now handled by the gateway");
  },
};
