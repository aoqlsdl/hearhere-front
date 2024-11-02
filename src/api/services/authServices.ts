import { http } from "../http";

// 로그인 요청
interface LoginResponse {
    accessToken: string;
    refreshToken: string;
    username: string;
}

export const login = async (
    access_token: string,
    refresh_token: string,
    username: string
): Promise<LoginResponse> => {
    // 토큰과 사용자 정보를 반환
    return { accessToken: access_token, refreshToken: refresh_token, username };
};

// refresh token 요청
export const refreshAccessToken = async (refreshToken: string): Promise<string> => {
    const response = await http.post(
        "/reissue/access-token",
        {},
        {
            headers: {
                Authorization: `Bearer ${refreshToken}`,
            },
        }
    );
    return response.data.accessToken; // 새로운 access token 반환
};

// 로그아웃 요청
export const logout = async (accessToken: string): Promise<void> => {
    await http.post(
        "/logout",
        {},
        {
            headers: {
                Authorization: `Bearer ${accessToken}`, // Authorization 헤더에 accessToken 포함
            },
        }
    );
};
