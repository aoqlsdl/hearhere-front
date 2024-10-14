import { useScrollBlock } from "../../hooks/useScrollBlock";
import { useBackgroundClick, useCloseModal } from "../../hooks/useModal";

interface Props {
    setIsHelpOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const HelpModal = ({ setIsHelpOn }: Props) => {
    useScrollBlock();

    return (
        <div
            onClick={(e) => useBackgroundClick(e, setIsHelpOn)}
            className="w-screen h-screen bg-[rgba(0,0,0,0.75)] flex justify-center items-center fixed top-0 left-0 backdrop-blur-[2px]"
        >
            <div className="w-[40.31rem] h-[38rem] rounded-[3.06rem] text-center bg-white flex flex-col justify-center items-center relative animate-fadein">
                <button
                    type="button"
                    onClick={() => useCloseModal(setIsHelpOn)}
                    className="w-[1.56rem] h-[1.56rem] absolute right-[2.5rem] top-[2.06rem]"
                >
                    <img src="/assets/icons/close.svg" className="w-[1.56rem] h-[1.56rem]" />
                </button>

                <h1 className="text-[1.75rem] font-bold">
                    Here are the things you can <span className="text-primary-PINK">modify</span>{" "}
                    here!
                </h1>
                <div className="flex flex-col mt-[2.94rem] h-[23.38rem] justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-[1.5rem] 1440:text-[1.75rem] font-bold text-primary-PINK leading-[2.44rem]">
                            1. Turn up/down the volume
                        </h2>
                        <p className="text-[1rem] 1440:text-[1.19rem] font-light leading-[2.06rem]">
                            Click and hold the black line in the center, then move it up or down.
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-[1.5rem] 1440:text-[1.75rem] font-bold text-primary-PINK leading-[2.44rem]">
                            2. Move the sound element
                        </h2>
                        <p className="text-[1rem] 1440:text-[1.19rem] font-light leading-[2.06rem]">
                            Do you want to move the sound element to the other place?
                            <br />
                            Grab the sound you want to move and drag it to your desired position.
                        </p>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-[1.5rem] 1440:text-[1.75rem] font-bold text-primary-PINK leading-[2.44rem]">
                            3. Delete sound
                        </h2>
                        <p className="text-[1rem] 1440:text-[1.19rem] font-light leading-[2.06rem]">
                            Don’t like this sound? Select the sound element and press the X button
                            <br />
                            to delete it right away!
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HelpModal;
