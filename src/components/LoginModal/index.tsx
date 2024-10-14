import { useBackgroundClick, useCloseModal } from "../../hooks/useModal";
import { useRedirect } from "../../hooks/useRedirect";
import { useScrollBlock } from "../../hooks/useScrollBlock";

interface Props {
    title: string;
    setIsLoginOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({ title, setIsLoginOn }: Props) => {
    useScrollBlock();
    return (
        <div
            onClick={(e) => useBackgroundClick(e, setIsLoginOn)}
            className="w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.75)] backdrop-blur-[2px] fixed top-0 left-0"
        >
            <div className="w-[32.63rem] h-[32.44rem] rounded-[49px] bg-white flex flex-col text-center justify-center items-center animate-fadein">
                <div className="flex flex-col">
                    <p className="text-[1.5rem] 1440:text-[1.88rem] font-light leading-[3.44rem]">
                        {title}
                    </p>
                    <h2 className="text-[1.75rem] 1440:text-[2rem] font-bold">
                        Log in to <span className="text-primary-PINK">customize</span> it your own!
                    </h2>
                </div>
                <div className="flex flex-col w-[23.56rem] h-[8rem] 1440:h-[8.94rem] justify-between items-center mt-[3.75rem] mb-[3rem]">
                    <button
                        type="button"
                        onClick={() => useRedirect("/login")}
                        className="w-full h-[3.5rem] 1440:h-[3.81rem] bg-white border-black border-[1.5px] hover:bg-black hover:border-none text-black hover:text-white font-light text-[1.15rem] 1440:text-[1.38rem] rounded-[15px] animate-fadein"
                    >
                        Log in
                    </button>
                    <button
                        type="button"
                        onClick={() => useRedirect("/signup")}
                        className="w-full h-[3.5rem] 1440:h-[3.81rem] bg-white border-black border-[1.5px] hover:bg-black hover:border-none text-black hover:text-white font-light text-[1.15rem] 1440:text-[1.38rem] rounded-[15px] animate-fadein"
                    >
                        Sign up
                    </button>
                </div>
                <span
                    className="leading-[3.44rem] text-[1rem] 1440:text-[1.38rem] underline text-primary-GRAY100 cursor-pointer"
                    onClick={() => useCloseModal(setIsLoginOn)}
                >
                    Stay logged out
                </span>
            </div>
        </div>
    );
};

export default LoginModal;
