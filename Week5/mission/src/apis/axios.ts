import axios, { type InternalAxiosRequestConfig } from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let refreshPromise: Promise<string> | null = null;


const handleLogout = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
  localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);

  if (window.location.pathname !== '/login') {
    window.location.href = '/login'; 
    window.location.reload();

  }
};

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,

});


axiosInstance.interceptors.request.use(
  (config) => {
    const accessTokenStr = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    let accessToken = null;
    try {
      accessToken = accessTokenStr ? JSON.parse(accessTokenStr) : null;
    } catch {
      localStorage.removeItem(LOCAL_STORAGE_KEY.accessToken);
    }

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);



axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest: CustomInternalAxiosRequestConfig = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      
      originalRequest._retry = true;

      if (originalRequest.url === '/v1/auth/refresh') {
        handleLogout();
        return Promise.reject(error);
      }

      if (!refreshPromise) {
        refreshPromise = (async () => {
          try {
            const refreshTokenStr = localStorage.getItem(LOCAL_STORAGE_KEY.refreshToken);
            let refreshToken = null;
            try {
              refreshToken = refreshTokenStr ? JSON.parse(refreshTokenStr) : null;
            } catch {
              localStorage.removeItem(LOCAL_STORAGE_KEY.refreshToken);
              return Promise.reject(new Error('Invalid refresh token'));
            }
            
            if (!refreshToken) {
              return Promise.reject(new Error('No refresh token available'));
            }

            const response = await axiosInstance.post('/v1/auth/refresh', {
              refresh: refreshToken,
            });


            const newAccessToken = response.data.data.accessToken;
            const newRefreshToken = response.data.data.refreshToken;
            
            localStorage.setItem(
              LOCAL_STORAGE_KEY.accessToken, 
              JSON.stringify(newAccessToken)
            );
            
            localStorage.setItem(
              LOCAL_STORAGE_KEY.refreshToken,
              JSON.stringify(newRefreshToken)
            );

            return newAccessToken; 
          } catch (e) {
            handleLogout();
            return Promise.reject(e);
          } finally {
            refreshPromise = null; 
          }
        })();
      }

      try {

        const newAccessToken = await refreshPromise;


        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        

        return axiosInstance(originalRequest);
      } catch (err) {
        handleLogout();
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);