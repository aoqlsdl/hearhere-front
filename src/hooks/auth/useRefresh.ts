import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user/atom";

export const useRefresh = async (): Promise<void> => {
    const [user, setUser] = useRecoilState(userState);

    if (!user.refreshToken) {
        console.error("리프레쉬 토큰이 없습니다.");
        return;
    }

    try {
        const response = await fetch(
            import.meta.env.VITE_REACT_APP_BASE_URL + "reissue/access-token",
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${user.refreshToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        const data = await response.json();

        if (data.isSuccess) {
            setUser({
                ...user,
                accessToken: data.payload.access_token,
            });
            console.log("액세스 토큰이 성공적으로 재발행되었습니다.");
        } else {
            console.error("토큰 재발행에 실패했습니다:", data.message);
        }
    } catch (error) {
        console.error("토큰 재발행 중 오류 발생:", error);
    }
};
