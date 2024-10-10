const SigninLeft = () => {
    const handleRedirect = (url: string) => {
        window.location.href = url;
    };
    return (
        <div className="w-[40.42%] h-screen bg-primary-PINK_LIGHT bg-lp_sm bg-bottom bg-no-repeat bg-[length:38.26rem_21.19rem] overflow-hidden flex flex-col">
            <div className="h-screen flex flex-col ext-center items-center -mt-20 1440:-mt-0">
                <h2 className="text-[3rem] font-bold text-primary-PINK 1440:text-[50px] mt-[16.19rem]">
                    New Here?
                </h2>
                <p className="text-[1.3rem] mt-[3.5rem] mb-[3.5rem] 1440:text-[1.88rem] leading-10 text-primary-BLACK300">
                    Make your own account and
                    <br />
                    create your own ASMR!
                </p>
                <button
                    type="button"
                    onClick={() => handleRedirect("/signup")}
                    className="rounded-full w-[18rem] 1440:w-[20.94rem] h-[4rem] 1440:h-[5rem] bg-white hover:bg-primary-PINK text-primary-PINK hover:text-white text-[1.5rem] border-2 border-primary-GRAY200"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default SigninLeft;