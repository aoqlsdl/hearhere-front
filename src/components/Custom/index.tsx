import { useState } from "react";

const Custom = () => {
    const [isPlaying] = useState(false);
    return (
        <div className="flex flex-col">
            {isPlaying ? (
                <button
                    type="button"
                    className="w-16 h-8 1440:w-[4.94rem] 1440:h-[1.81rem] font-light flex flex-row items-center justify-center ml-[2.06rem]"
                >
                    <img src="/assets/icons/pause.svg" />{" "}
                    <span className="ml-[0.44rem] text-base 1440:text-[1.44rem]">Pause</span>
                </button>
            ) : (
                <button
                    type="button"
                    className="w-16 h-8 1440:w-[4.94rem] 1440:h-[1.81rem] font-light flex flex-row items-center justify-center ml-[2.06rem]"
                >
                    <img
                        src="/assets/icons/play.svg"
                        className="w-4 h-8 1440:w-16 1440:h-[2.81rem]"
                    />{" "}
                    <span className="ml-[0.44rem] text-base 1440:text-[1.44rem]">Play</span>
                </button>
            )}
            <progress></progress>
        </div>
    );
};

export default Custom;
