// apis/axios.ts

import axios from "axios";
import { LOCAL_STORAGE_KEY } from "../constants/key";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_SERVER_API_URL,
});

// Axios 요청 인터셉터 추가
axiosInstance.interceptors.request.use(
    (config) => {
        // 로컬 스토리지에서 토큰을 가져옵니다.
        const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
        
        // useLocalStorage 훅은 값을 JSON 문자열로 저장하므로, parse 해줍니다.
        const token = storedToken ? JSON.parse(storedToken) : null;

        // 토큰이 있으면 Authorization 헤더를 설정합니다.
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        // 요청 에러 처리
        return Promise.reject(error);
    }
);