// tokenUtils.ts
export interface TokenData {
  accessToken: string;
  accessTokenExpiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
}

export const storeTokens = (tokenData: TokenData) => {
  localStorage.setItem("token", tokenData.accessToken);
  localStorage.setItem("refreshToken", tokenData.refreshToken);
  localStorage.setItem(
    "tokenExpiry",
    tokenData.accessTokenExpiresIn.toString()
  );
};

export const clearTokens = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("tokenExpiry");
  localStorage.removeItem("preferredMapVendor");
};

export const getAccessToken = (): string | null => {
  return localStorage.getItem("token");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refreshToken");
};

export const isTokenExpired = (): boolean => {
  const expiry = localStorage.getItem("tokenExpiry");
  if (!expiry) return true;
  return Date.now() >= parseInt(expiry) * 1000;
};
