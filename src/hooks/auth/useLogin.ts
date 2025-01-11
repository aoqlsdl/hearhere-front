import { userState } from "../../recoil/user/atom";
import { useRecoilState } from "recoil";
import { useNavigate, useSearchParams } from "react-router-dom";
import { isOnState } from "../../recoil/turntable/atom";
import { useEffect } from "react";
import { login } from "../../api/services/authServices";
import { asmrSave } from "../../api/services/asmrServices";

interface SoundDetail {
    soundId: number;
    url: string;
    length: string; // length는 "0:04"와 같은 형식으로 문자열
}

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
                setIsOn(true);

                // 세션스토리지에 저장된 데이터가 없을 때만 홈으로 리다이렉트
                const asmrData = sessionStorage.getItem("savedData");
                if (asmrData === null) {
                    navigate("/");
                }
            }
        };
        handleLogin();
    }, [searchParams, setUser, setIsOn, navigate]);
};

// session에 저장된 ASMR이 있으면 저장
export const useLoginSave = () => {
    const navigate = useNavigate();

    const saveAsmr = async () => {
        const savedData = sessionStorage.getItem("savedData");
        if (savedData) {
            try {
                const asmrData = JSON.parse(savedData);

                const soundUrls = asmrData.soundDetails.map((detail: SoundDetail) => detail.url);
                const soundVolumns = new Array(soundUrls.length).fill(1);
                const soundPositions = soundUrls.map(() => [0]);

                const response = await asmrSave(
                    asmrData.asmrId,
                    asmrData.title,
                    asmrData.musicUrl,
                    1,
                    soundUrls,
                    soundVolumns,
                    soundPositions
                );

                if ("asmrId" in response) {
                    // 성공적으로 저장했을 경우 세션스토리지에 저장되어 있는 데이터를 삭제
                    sessionStorage.removeItem("savedData");
                    alert("Successfully saved");
                    navigate("/library");
                } else {
                    alert("Failed to save ASMR");
                    console.log(response);
                }
            } catch (error) {
                console.error("Error parsing or saving ASMR data:", error);
            }
        }
    };

    return saveAsmr; // 함수 반환
};
