import LoginProcessing from "../../components/LoginProcessing";
import { useLogin } from "../../hooks/auth/useLogin";

const LoginProcess = () => {
    // 로그인 진행 후 asmr을 저장할지 묻는 모달 띄우기
    useLogin();
    return (
        <>
            <LoginProcessing />
        </>
    );
};

export default LoginProcess;
