import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import MusicPlayer from "../../components/MusicPlayer";
// import { useOpenModal } from "../../hooks/useModal";
import LoginModal from "../../components/LoginModal";

const Result = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }, []);

    // 로그인 구현되면 다시 수정
    // todo: 이후에 로그인 기능이 추가되면 hook 사용
    // const [isLogin] = useState(false);
    const [isLoginOn, setIsLoginOn] = useState(false);

    return (
        <div className="w-screen h-[calc(100vh - 2.58rem)] flex justify-center relative">
            {isLoading ? <Loading /> : <MusicPlayer />}
            {isLoginOn && (
                <LoginModal title="Want to enjoy this ASMR again? " setIsLoginOn={setIsLoginOn} />
            )}
        </div>
    );
};

export default Result;
