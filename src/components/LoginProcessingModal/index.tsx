import { useBackgroundClick } from "../../hooks/useModal";
import { useScrollBlock } from "../../hooks/useScrollBlock";
import { useLoginSave } from "../../hooks/auth/useLogin";
import { useRedirect } from "../../hooks/useRedirect";

interface Props {
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginProcessingModal = ({ setIsModalOpen }: Props) => {
    useScrollBlock();
    const redirect = useRedirect();
    const saveAsmr = useLoginSave();

    return (
        <div
            onClick={(e) => useBackgroundClick(e, setIsModalOpen)}
            className="w-screen h-screen flex justify-center items-center bg-[rgba(0,0,0,0.75)] backdrop-blur-[2px] fixed top-0 left-0"
        >
            <div className="w-[32.63rem] h-[32.44rem] rounded-[49px] bg-white flex flex-col text-center justify-center items-center animate-fadein">
                <div className="flex flex-col">
                    <p className="whitespace-pre-line w-fit m-auto text-[1.75rem] 1440:text-[2rem] font-pre_800 font-bold">
                        Successfully login!
                    </p>
                    <p className="text-lg text-primary-PINK 1440:text-[1.88rem] font-light leading-[3.44rem]">
                        Want to save Generated ASMR?
                    </p>
                </div>
                <div className="flex flex-col w-[23.56rem] h-[6rem] 1440:h-[8.94rem] justify-between items-center mt-[2rem] mb-[3rem]">
                    <button
                        type="button"
                        onClick={saveAsmr}
                        className="w-full h-[3.5rem] 1440:h-[3.81rem] bg-white hover:bg-primary-PINK border-[1.5px] border-primary-PINK text-primary-PINK hover:text-white font-light text-[1.15rem] 1440:text-[1.38rem] rounded-[15px] animate-fadein"
                    >
                        Save the ASMR
                    </button>
                    <span
                        onClick={() => redirect("/")}
                        className="w-fit h-fit bg-white hover:underline hover:border-none text-primary-GRAY100 font-light text-sm 1440:text-lg animate-fadein cursor-pointer"
                    >
                        No, thanks.
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoginProcessingModal;
