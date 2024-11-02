import axios from "axios";
import { refreshAccessToken } from "./services/authServices";

// axios instance 생성
export const http = axios.create({
    baseURL: import.meta.env.VITE_REACT_APP_BASE_URL,
});

http.defaults.withCredentials = true; // 쿠키 전송을 위한 설정

// 요청 인터셉터 - accessToken을 Authorization 헤더에 설정
http.interceptors.request.use(
    async (config) => {
        const accessToken = localStorage.getItem("accessToken");
        if (accessToken) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터 - accessToken 만료 시 refreshToken으로 재발급
http.interceptors.response.use(
    (response) => response, // 요청 성공 시 그대로 응답
    async (error) => {
        const originalRequest = error.config;
        const refreshToken = localStorage.getItem("refreshToken");

        if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
            originalRequest._retry = true; // 무한 루프 방지
            try {
                // refresh token으로 새로운 access token 발급
                const newAccessToken = await refreshAccessToken(refreshToken);

                // 새로운 access token을 로컬 스토리지에 저장
                localStorage.setItem("accessToken", newAccessToken);

                // 새로운 access token을 Authorization 헤더에 설정 후 요청 재시도
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                return http(originalRequest);
            } catch (refreshError) {
                console.error("Token refresh failed:", refreshError);
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                // 로그아웃 로직 추가 가능
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);
