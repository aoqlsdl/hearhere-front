import { userState } from "../../recoil/user/atom";
import { useRecoilState } from "recoil";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isOnState } from "../../recoil/turntable/atom";
import { useEffect } from "react";
import { login } from "../../api/services/authServices";

// 로그인 성공 시 토큰을 recoil에 저장하고 메인 페이지로 이동
export const useLogin = (): void => {
    const [searchParams] = useSearchParams();
    const [user, setUser] = useRecoilState(userState);
    const [, setIsOn] = useRecoilState(isOnState);
    const navigate = useNavigate();

    useEffect(() => {
        const access_token = searchParams.get("access_token");
        const refresh_token = searchParams.get("refresh_token");
        const username = searchParams.get("name") || "default-username";

        const handleLogin = async () => {
            if (access_token && refresh_token && username) {
                // 로그인 API 호출
                const loginResponse = await login(access_token, refresh_token, username);

                // 상태 업데이트
                setUser({
                    ...user,
                    accessToken: loginResponse.accessToken,
                    refreshToken: loginResponse.refreshToken,
                    username: loginResponse.username,
                });

                // 로컬 스토리지에 토큰 저장
                localStorage.setItem("username", loginResponse.username);
                localStorage.setItem("accessToken", loginResponse.accessToken);
                localStorage.setItem("refreshToken", loginResponse.refreshToken);

                // 리다이렉트시 턴테이블 나오지 않도록 설정
                // setIsOn(true);

                // 상태 설정 후 리다이렉트
                if (sessionStorage.getItem("savedData") === null) {
                    navigate("/");
                }
                // else {
                //     const asmrData = JSON.parse(sessionStorage.getItem("savedData"));
                //     // 저장된 asmr 데이터를
                //     navigate(`/player/${asmrData.asmrId}`);
                // }
            }
        };

        handleLogin();
    }, [searchParams, setUser, setIsOn, navigate]);
};
