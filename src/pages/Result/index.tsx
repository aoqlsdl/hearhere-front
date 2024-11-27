import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../../components/Loading";
import MusicPlayer from "../../components/MusicPlayer";
import { fetchAsmrGenerate, AsmrGenerateResponse } from "../../api/services/asmrServices";
import LoginModal from "../../components/LoginModal";

const Result = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [asmrData, setAsmrData] = useState<AsmrGenerateResponse>({
        asmrId: 0,
        title: "",
        musicUrl: "",
        soundDetails: [],
    }); // 초기값 설정
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // 에러 메시지 상태 추가

    const [isLoginOn, setIsLoginOn] = useState(false);

    const location = useLocation(); // useLocation 훅으로 데이터 받기
    const userPrompt = location.state?.userPrompt; // 전달된 userPrompt 값 가져오기

    useEffect(() => {
        const loadData = async () => {
            if (userPrompt) {
                const data = await fetchAsmrGenerate(userPrompt);
                if ("error" in data) {
                    // GenerateErrorResponse인지 확인
                    setErrorMessage(data.message); // 에러 메시지 설정
                    console.log(errorMessage);
                } else {
                    setAsmrData(data); // 성공적으로 데이터 설정
                }
                setIsLoading(false); // 로딩 종료
            }
        };

        loadData();
    }, [userPrompt]);

    return (
        <div className="w-screen h-[calc(100vh - 2.58rem)] flex justify-center relative">
            {isLoading ? (
                <Loading />
            ) : (
                <MusicPlayer asmrData={asmrData} setIsLoginOn={setIsLoginOn} />
            )}
            {isLoginOn && (
                <LoginModal title="Want to enjoy this ASMR again?" setIsLoginOn={setIsLoginOn} />
            )}
        </div>
    );
};

export default Result;
