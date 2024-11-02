import { useRecoilState } from "recoil";
import { userState } from "../../recoil/user/atom";
import { useNavigate } from "react-router-dom";
import { logout as apiLogout } from "../../api/services/authServices";
import { isOnState } from "../../recoil/turntable/atom";

const useLogout = () => {
    const [user, setUser] = useRecoilState(userState);
    const [isOn, setIsOn] = useRecoilState(isOnState);
    const navigate = useNavigate();

    console.log(isOn);

    const handleLogout = async () => {
        try {
            // API 로그아웃 요청 보내기
            if (user.refreshToken) {
                await apiLogout(user.refreshToken);
            }

            // 상태 초기화 및 로컬 스토리지 정리
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("username");

            setUser({
                accessToken: null,
                refreshToken: null,
                username: null,
            });

            // 홈 페이지로 리다이렉트
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return handleLogout;
};

export default useLogout;
