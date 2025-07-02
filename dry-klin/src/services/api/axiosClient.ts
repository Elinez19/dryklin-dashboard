import { decrypt } from "@/helpers/helpers.encryptDecrypt";
import { handle_tokens, Logout } from "@/services/features/auth/authService";
import Axios from "axios";

export const baseURL = "https://admin.nexcbit.com";

const axios = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosClient = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Safely gets and decrypts a token from localStorage
 * Returns null if token doesn't exist or decryption fails
 */
const getDecryptedToken = (key: string): string | null => {
  try {
    const encryptedToken = localStorage.getItem(key);
    if (!encryptedToken) {
      return null;
    }

    const decryptedToken = decrypt(encryptedToken);
    if (!decryptedToken) {
      // Token exists but decryption failed - remove corrupted token
      localStorage.removeItem(key);
      return null;
    }

    return decryptedToken;
  } catch {
    // Clean up corrupted token
    localStorage.removeItem(key);
    return null;
  }
};

// Request interceptor
axiosClient.interceptors.request.use((config) => {
  const accessToken = getDecryptedToken("DryKlinAccessToken");

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

// Response interceptor
axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    // Skip auth errors on login page
    if (window.location.pathname.startsWith("/auth")) {
      return Promise.reject(error);
    }

    // Handle 401 - Missing authentication info
    if (status === 401 && !originalRequest?._retry) {
      // Check if we have tokens stored
      const refreshToken = getDecryptedToken("DryKlinRefreshToken");
      const accessToken = getDecryptedToken("DryKlinAccessToken");

      if (!refreshToken || !accessToken) {
        // No valid tokens available, redirect to login
        Logout();
        return Promise.reject(error);
      }

      // We have tokens but got 401, might be a server issue
      // Try to refresh tokens once
      originalRequest._retry = true;

      try {
        const response = await axios.post("/auth/tokens/refresh", {
          refreshToken,
          accessToken,
        });

        if (response?.data?.accessToken) {
          handle_tokens(response.data);

          // Update authorization header and retry request
          const newAccessToken = response.data.accessToken;
          axiosClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosClient(originalRequest);
        } else {
          throw new Error("Invalid token refresh response");
        }
      } catch {
        // Token refresh failed, logout user
        Logout();
        return Promise.reject(error);
      }
    }

    // Handle 403 - Authentication data is invalid (expired token)
    if (status === 403 && !originalRequest?._retry) {
      originalRequest._retry = true;

      // Get tokens for refresh attempt
      const refreshToken = getDecryptedToken("DryKlinRefreshToken");
      const accessToken = getDecryptedToken("DryKlinAccessToken");

      if (!refreshToken || !accessToken) {
        // No valid tokens to refresh with, logout
        Logout();
        return Promise.reject(error);
      }

      try {
        const response = await axios.post("/auth/tokens/refresh", {
          refreshToken,
          accessToken,
        });

        if (response?.data?.accessToken) {
          handle_tokens(response.data);

          // Update authorization header and retry original request
          const newAccessToken = response.data.accessToken;
          axiosClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

          return axiosClient(originalRequest);
        } else {
          throw new Error("Invalid token refresh response");
        }
      } catch {
        // Token refresh failed, logout user
        Logout();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export { axiosClient };
