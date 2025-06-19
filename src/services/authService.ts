import axios from 'axios';

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

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const authService = {
  // Handle Google OAuth login
  handleGoogleLogin: async (response: GoogleAuthResponse): Promise<AuthResponse> => {
    try {
      const { data } = await axios.post(`${API_BASE_URL}/auth/google`, {
        code: response.code,
      });
      
      // Store the token in localStorage or your preferred storage method
      if (data.token) {
        localStorage.setItem('auth_token', data.token);
      }
      
      return data;
    } catch (error) {
      console.error('Google auth error:', error);
      throw error;
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    const token = localStorage.getItem('auth_token');
    return !!token;
  },

  // Get the current auth token
  getToken: (): string | null => {
    return localStorage.getItem('auth_token');
  },

  // Logout
  logout: (): void => {
    localStorage.removeItem('auth_token');
  },

  // Set up axios interceptor for authentication
  setupAxiosInterceptors: () => {
    axios.interceptors.request.use(
      (config) => {
        const token = authService.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          authService.logout();
          // You might want to redirect to login page here
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }
}; 