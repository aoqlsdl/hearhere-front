import { useRedirect } from "../../../hooks/useRedirect";

const LoginRight = () => {
    return (
        <div className="w-[59.58%] bg-white h-screen">
            <div className="h-screen relative flex flex-col text-center items-center -mt-20 1440:-mt-0">
                <h2 className="text-[3rem] font-bold text-primary-BLACK300 1440:text-[50px] mt-[16.19rem]">
                    Login to Your Account
                </h2>
                <p className="text-[1.3rem] mt-[2.13rem] mb-[4.44rem] 1440:text-[1.88rem] leading-10">
                    Welcome Back!
                </p>
                <div className="w-[19.38rem] h-[14.13rem] flex flex-col justify-between items-center">
                    <button
                        type="button"
                        onClick={() =>
                            useRedirect("http://localhost:8080/oauth2/authorization/google")
                        }
                        className="transition ease-in-out rounded-full w-[18rem] 1440:w-[20.94rem] h-[4rem] 1440:h-[5rem] bg-white  text-black text-[1.13rem] border-2 hover:border-primary-PINK flex flex-row justify-center items-center"
                    >
                        <img
                            src="/assets/icons/google.svg"
                            className="w-[1.69rem] h-[1.69rem] mr-4"
                        />
                        Log in with Google
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            useRedirect("http://localhost:8080/oauth2/authorization/google")
                        }
                        className="transition ease-in-out rounded-full w-[18rem] 1440:w-[20.94rem] h-[4rem] 1440:h-[5rem] bg-white  text-black text-[1.13rem] border-2 hover:border-primary-PINK flex flex-row justify-center items-center"
                    >
                        <img
                            src="/assets/icons/facebook.svg"
                            className="w-[1.69rem] h-[1.69rem] mr-4"
                        />
                        Log in with Facebook
                    </button>
                    <button
                        type="button"
                        onClick={() =>
                            useRedirect("http://localhost:8080/oauth2/authorization/google")
                        }
                        className="transition ease-in-out rounded-full w-[18rem] 1440:w-[20.94rem] h-[4rem] 1440:h-[5rem] bg-white  text-black text-[1.13rem] border-2 hover:border-primary-PINK flex flex-row justify-center items-center"
                    >
                        <img
                            src="/assets/icons/naver.svg"
                            className="w-[1.69rem] h-[1.69rem] mr-4"
                        />
                        Log in with Naver
                    </button>
                </div>
                <span
                    onClick={() => useRedirect("/")}
                    className="text-primary-GRAY100 underline text-4 1440:text-[1.19rem] mt-[3.75rem] cursor-pointer"
                >
                    Stay logged out
                </span>
            </div>
        </div>
    );
};

export default LoginRight;
