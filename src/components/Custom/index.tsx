import { useState } from "react";
import Waveform from "../Waveform";

interface SoundDetail {
    soundId: number;
    url: string;
    length: string;
}

interface CustomProps {
    asmrData: {
        asmrId: number;
        title: string;
        musicUrl: string | null;
        soundDetails: SoundDetail[];
    };
}

const Custom = ({ asmrData }: CustomProps) => {
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
            {/* <div className=""> */}
            {asmrData.soundDetails.map((detail) => (
                <div
                    key={detail.soundId}
                    className="bg-slate-50 border-b-2 h-[7.44rem] flex flex-col justify-center p-[1.88rem]"
                >
                    <h3 className="mb-2">Track {detail.soundId}</h3>
                    <Waveform audioUrl={detail.url} />

                    {/* <p>Length: {detail.length}</p> */}
                </div>
            ))}
            {/* </div> */}
            <progress></progress>
        </div>
    );
};

export default Custom;
