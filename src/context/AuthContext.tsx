import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { fetchProfile } from '../services/ProfileService';

interface User {
  id: string;
  email: string;
  name: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: User, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing auth token and validate it
    const checkAuth = async () => {
      try {
        const token = authService.getToken();
        if (token) {
          try {
            // Try to fetch real user data from the API
            const profileData = await fetchProfile();
            if (profileData && profileData.data) {
              const userData: User = {
                id: profileData.data.id || profileData.data.userId || 'current-user',
                email: profileData.data.email || 'user@example.com',
                name: profileData.data.name || profileData.data.nickname || profileData.data.username || 'Current User',
                picture: profileData.data.avatar || profileData.data.picture,
              };
              setUser(userData);
            } else {
              // If API call succeeds but no data, set minimal user
              const userData: User = {
                id: 'current-user',
                email: 'user@example.com',
                name: 'Current User',
              };
              setUser(userData);
            }
          } catch (apiError) {
            console.warn('Failed to fetch user profile, but token exists:', apiError);
            // If API call fails but token exists, still consider user authenticated
            // This handles cases where the API might be temporarily unavailable
            const userData: User = {
              id: 'current-user',
              email: 'user@example.com',
              name: 'Current User',
            };
            setUser(userData);
          }
        } else {
          setUser(null);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (userData: User, token: string) => {
    // Use the same token key that's used throughout the app
    localStorage.setItem('token', token);
    setUser(userData);
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 