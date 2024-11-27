import MusicPlayer from "../../components/MusicPlayer";
import { useState } from "react";

const Player = () => {
    const asmrData = {
        asmrId: 0,
        title: "",
        musicUrl: "",
        soundDetails: [],
    };
    const [, setIsLoginOn] = useState(false);
    return (
        <div className="overflow-hidden flex items-center justify-center">
            <MusicPlayer asmrData={asmrData} setIsLoginOn={setIsLoginOn} />
        </div>
    );
};

export default Player;
