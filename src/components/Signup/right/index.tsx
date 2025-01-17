import { useRedirect } from "../../../hooks/useRedirect";
import { useLogin } from "../../../hooks/auth/useLogin";

const SignupRight = () => {
    const redirect = useRedirect();
    // 세션에 저장된 asmrData가 있는지 확인
    const asmrData = sessionStorage.getItem("savedData");

    // 쿼리스트링 설정
    const mode = asmrData !== null ? "save" : "basic";
    const env = import.meta.env.PROD ? 1 : 0;

    useLogin();
    return (
        <div className="w-[59.58%] bg-white h-screen">
            <div className="h-screen relative flex flex-col text-center items-center -mt-20 1440:-mt-0">
                <h2 className="text-[3rem] font-bold text-primary-BLACK300 1440:text-[50px] mt-[16.19rem]">
                    Make Your Own Account
                </h2>
                <p className="text-[1.3rem] mt-[2.13rem] mb-[4.44rem] 1440:text-[1.88rem] leading-10">
                    Welcome to Hear Here!
                </p>
                <div className="w-[19.38rem] h-[14.13rem] flex flex-col justify-between items-center">
                    <button
                        type="button"
                        onClick={() =>
                            redirect(
                                import.meta.env.VITE_REACT_APP_BASE_URL +
                                    `oauth2/authorization/google?env=${env}&action=${mode}`
                            )
                        }
                        className="flex flex-row items-center transition ease-in-out rounded-full w-[18rem] h-[4rem] bg-white text-left text-black text-[1.13rem] border-2 hover:border-primary-PINK"
                    >
                        <img
                            src="/assets/icons/google.svg"
                            className="w-[1.5rem] h-[1.5rem] ml-[2rem] mr-[1rem]"
                        />
                        <span className="left-[4rem] top-[1.125rem]">Sign up with Google</span>
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            redirect(
                                import.meta.env.VITE_REACT_APP_BASE_URL +
                                    `oauth2/authorization/kakao?env=${env}&action=${mode}`
                            )
                        }
                        className="flex flex-row items-center transition ease-in-out rounded-full w-[18rem] h-[4rem] bg-white text-left text-black text-[1.13rem] border-2 hover:border-primary-PINK"
                    >
                        <img
                            src="/assets/icons/kakao.svg"
                            className="w-[1.5rem] h-[1.5rem] ml-[2rem] mr-[1rem]"
                        />
                        <span>Sign up with Kakao</span>
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            redirect(
                                import.meta.env.VITE_REACT_APP_BASE_URL +
                                    `oauth2/authorization/naver?env=${env}&action=${mode}`
                            )
                        }
                        className="flex flex-row items-center transition ease-in-out rounded-full w-[18rem] h-[4rem] bg-white text-left text-black text-[1.13rem] border-2 hover:border-primary-PINK"
                    >
                        <img
                            src="/assets/icons/naver.svg"
                            className="w-[1.5rem] h-[1.5rem] ml-[2rem] mr-[1rem]"
                        />
                        <span>Sign up with Naver</span>
                    </button>
                </div>
                <span
                    onClick={() => redirect("/")}
                    className="text-primary-GRAY100 underline text-4 1440:text-[1.19rem] mt-[3.75rem] cursor-pointer"
                >
                    Stay logged out
                </span>
            </div>
        </div>
    );
};

export default SignupRight;
