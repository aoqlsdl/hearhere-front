import { useState } from "react";
import Custom from "../../components/Custom";
import HelpModal from "../../components/HelpModal";
import LoginModal from "../../components/LoginModal";
import { useOpenModal } from "../../hooks/useModal";

const Customize = () => {
    const [isHelpOn, setIsHelpOn] = useState(false);
    const [isLoginOn, setIsLoginOn] = useState(false);
    // todo: 이후에 로그인 기능이 추가되면 hook 사용
    const [isLogin] = useState(false);
    const [isMessageAppear, setIsMessageAppear] = useState(false);

    const handleSave = () => {
        if (!isLogin) {
            useOpenModal(setIsLoginOn);
        } else {
            // alert("Saved!");
            setIsMessageAppear(true);
            setTimeout(() => {
                setIsMessageAppear(false);
            }, 2000);
        }
    };

    return (
        <div className="s-screen h-full overflow-scroll relative">
            {isMessageAppear && (
                <div className="flex flex-row w-[8rem] h-8 1440:w-[10rem] 1440:h-[2.81rem] justify-between items-center absolute top-0 right-[15rem] 1440:right-[17.25rem] animate-fadein">
                    <img
                        src="/assets/icons/check.svg"
                        className="w-[1.25rem] h-[1.25rem] 1440:w-[1.44rem] 1440:h-[1.44rem]"
                    />
                    <span className="text-base 1440:text-[1.31rem] font-light">Project saved.</span>
                </div>
            )}

            <div className="flex flex-row w-[12.5rem] h-8 1440:w-[14.75rem] 1440:h-[2.81rem] justify-between absolute right-6 top-0">
                <button
                    onClick={() => useOpenModal(setIsHelpOn)}
                    className="w-[6rem] h-8 1440:w-[6.88rem] 1440:h-[2.81rem] bg-primary-GRAY800 text-primary-PINK font-light text-base 1440:text-[1.38rem] rounded-[15px] hover:bg-primary-PINK hover:text-white hover:animate-fadein"
                >
                    Help
                </button>
                <button
                    onClick={handleSave}
                    className="w-[6rem] h-8 1440:w-[6.88rem] 1440:h-[2.81rem] bg-primary-GRAY800 text-primary-PINK font-light text-base 1440:text-[1.38rem] rounded-[15px] hover:bg-primary-PINK hover:text-white hover:animate-fadein"
                >
                    Save
                </button>
            </div>
            <Custom />
            {isHelpOn && <HelpModal setIsHelpOn={setIsHelpOn} />}
            {isLoginOn && (
                <LoginModal title="Want to customize your ASMR?" setIsLoginOn={setIsLoginOn} />
            )}
        </div>
    );
};

export default Customize;
