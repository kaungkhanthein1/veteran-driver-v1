import axios from 'axios';

// You can configure this based on your backend URL
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export interface RecaptchaVerifyResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const verifyRecaptchaToken = async (token: string): Promise<RecaptchaVerifyResponse> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/verify-recaptcha`, {
      recaptchaToken: token
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        error: error.response?.data?.message || 'Verification failed',
      };
    }
    
    return {
      success: false,
      error: 'Network error occurred',
    };
  }
};

// Alternative: If you want to verify directly with Google (not recommended for production)
export const verifyRecaptchaWithGoogle = async (token: string): Promise<boolean> => {
  try {
    const response = await axios.post('https://www.google.com/recaptcha/api/siteverify', null, {
      params: {
        secret: import.meta.env.VITE_RECAPTCHA_SECRET_KEY, // This should be on your backend
        response: token,
      },
    });

    return response.data.success;
  } catch (error) {
    console.error('Google reCAPTCHA verification error:', error);
    return false;
  }
}; 