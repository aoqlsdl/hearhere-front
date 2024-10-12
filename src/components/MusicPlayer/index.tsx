import music from "../../_mock/sound.json";
import SlidingText from "../SlidingText";
import StreamingBar from "../StreamingBar";

const MusicPlayer = () => {
    const musicInfo = music;

    return (
        <div className="w-[47.31rem] rounded-t-[2rem] bg-primary-GRAY600 drop-shadow-[5px_10px_4px_rgba(0,0,0,0.25)] flex flex-col items-center relative 1440:rounded-b-[2rem]">
            {/* top */}
            <div className="w-full flex flex-col text-center items-center mt-[3.55rem]">
                <button
                    type="button"
                    className="bg-tune bg-cover w-[1.4rem] h-[1.4rem] absolute top-5 right-6"
                />
                <span className="text-2xl font-extralight text-primary-GRAY700">Here is</span>
                <SlidingText title={musicInfo.asmrTitle} />
            </div>
            {/* middle */}
            <div className="rounded-full w-[16rem] h-[16rem] bg-primary-BLACK300 flex justify-center items-center mt-[0.8rem]">
                <div className="font-Luxurious w-[7rem] h-[7rem] rounded-full bg-white flex justify-center items-center text-center max-w-[7rem] whitespace-pre-line">
                    <span className="text-[clamp(0.5rem, 1.69rem, 2.5rem)] ">
                        {musicInfo.asmrTitle}
                    </span>
                </div>
            </div>
            {/* bottom */}
            <StreamingBar music={musicInfo} />
        </div>
    );
};

export default MusicPlayer;
