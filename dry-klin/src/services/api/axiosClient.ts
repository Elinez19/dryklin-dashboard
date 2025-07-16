import { decrypt } from "@/helpers/helpers.encryptDecrypt";
import { handle_tokens, Logout } from "@/services/features/auth/authService";
import Axios from "axios";

// Use proxy in development, direct URL in production
export const baseURL = import.meta.env.DEV 
  ? "/api" 
  : import.meta.env.VITE_API_BASE_URL || "https://dryklin-32408812303f.herokuapp.com";

const axios = Axios.create({
  baseURL: "https://dryklin-32408812303f.herokuapp.com",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

const axiosClient = Axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
  withCredentials: false, 
});


const getDecryptedToken = (key: string): string | null => {
  try {
    const encryptedToken = localStorage.getItem(key);
    if (!encryptedToken) {
      return null;
    }

    const decryptedToken = decrypt(encryptedToken);
    if (!decryptedToken) {
     
      localStorage.removeItem(key);
      return null;
    }

    return decryptedToken;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
};

axiosClient.interceptors.request.use((config) => {
  const accessToken = getDecryptedToken("DryKlinAccessToken");

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    
    if (error.code === 'ECONNABORTED' || error.message === 'Network Error') {
      return Promise.reject(error);
    }

    if (window.location.pathname.startsWith("/auth")) {
      return Promise.reject(error);
    }

    if (status === 401 && !originalRequest?._retry) {
      const refreshToken = getDecryptedToken("DryKlinRefreshToken");
      const accessToken = getDecryptedToken("DryKlinAccessToken");

      if (refreshToken && accessToken) {
        originalRequest._retry = true;
        try {
          const response = await axios.post("/auth/tokens/refresh", {
            refreshToken,
            accessToken,
          });

          if (response?.data?.accessToken) {
            handle_tokens(response.data);
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
          Logout();
          return Promise.reject(error);
        }
      } else {
        return Promise.reject(error);
      }
    }

    if (status === 403 && !originalRequest?._retry) {
      originalRequest._retry = true;
      const refreshToken = getDecryptedToken("DryKlinRefreshToken");
      const accessToken = getDecryptedToken("DryKlinAccessToken");
      if (refreshToken && accessToken) {
        try {
          const response = await axios.post("/auth/tokens/refresh", {
            refreshToken,
            accessToken,
          });
          if (response?.data?.accessToken) {
            handle_tokens(response.data);
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
          Logout();
          return Promise.reject(error);
        }
      } else {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export { axiosClient };
