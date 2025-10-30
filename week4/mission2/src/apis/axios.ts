import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { InternalAxiosRequestConfig } from "axios";

interface CustomInternalAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean; 
}


let refreshPromise: Promise<string> | null = null;

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
    withCredentials:true,
});


axiosInstance.interceptors.request.use(
    (config) => {
        const { getItem } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
        const accessToken = getItem();

        if (accessToken) {
            config.headers = config.headers || {};
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 응답 인터셉터 - 401 발생 시 Refresh Token으로 토큰 갱신 시도
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest: CustomInternalAxiosRequestConfig = error.config;

        // 401 + 재시도한 적 없는 요청만 처리
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            // Refresh API 자체가 401이면 강제 로그아웃
            if (originalRequest.url === "/v1/auth/refresh") {
                const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

                removeAccessToken();
                removeRefreshToken();
                window.location.href = "/login";
                return Promise.reject(error);
            }

            originalRequest._retry = true; // 재시도 플래그

            // 이미 refresh 요청이 진행 중인 경우 → 그 요청 완료를 기다린 뒤 재시도
            if (!refreshPromise) {
                refreshPromise = (async () => {
                    const { getItem: getRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);
                    const refreshToken = getRefreshToken();

                    const { data } = await axiosInstance.post("/v1/auth/refresh", {
                        refresh: refreshToken,
                    });

                    const { setItem: setAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                    const { setItem: setRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

                    setAccessToken(data.data.accessToken);
                    setRefreshToken(data.data.refreshToken);

                    return data.data.accessToken;
                })()
                    .catch(() => {
                        const { removeItem: removeAccessToken } = useLocalStorage(LOCAL_STORAGE_KEY.accessToken);
                        const { removeItem: removeRefreshToken } = useLocalStorage(LOCAL_STORAGE_KEY.refreshToken);

                        removeAccessToken();
                        removeRefreshToken();
                    })
                    .finally(() => {
                        refreshPromise = null;
                    });
            }

            // refresh 요청 완료 후 원래 요청 재시도
            return refreshPromise.then((newAccessToken) => {
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return axiosInstance(originalRequest);
            });
        }

        return Promise.reject(error);
    }
);