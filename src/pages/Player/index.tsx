import { useSearchParams } from "react-router-dom";
import MusicPlayer from "../../components/MusicPlayer";
import { useState, useEffect } from "react";
import { getAsmrDetail } from "../../api/services/asmrServices";
import Loading from "../../components/Loading";

interface SoundDetail {
    soundId: number;
    url: string;
    length: string;
}
interface AsmrData {
    asmrId: number;
    title: string;
    musicUrl: string;
    musicVolumn: number;
    soundDetails: SoundDetail[];
    soundVolumns: number[];
}

const Player = () => {
    const [, setIsLoginOn] = useState(false);

    // asmrData 불러오기
    const [searchParams] = useSearchParams();
    const asmrId = searchParams.get("asmrId");
    const [asmrData, setAsmrData] = useState<AsmrData | null>(null);

    useEffect(() => {
        const fetchAsmrData = async () => {
            if (asmrId !== null) {
                try {
                    const data = await getAsmrDetail(parseInt(asmrId));

                    if (
                        data &&
                        typeof data.asmrId === "number" &&
                        Array.isArray(data.soundDetails)
                    ) {
                        const parsedData: AsmrData = {
                            asmrId: data.asmrId,
                            title: data.title || "",
                            musicUrl: data.musicUrl || "",
                            musicVolumn: data.musicVolumn,
                            soundVolumns: data.soundVolumns,
                            soundDetails: data.soundDetails.map((detail: SoundDetail) => ({
                                soundId: detail.soundId,
                                url: detail.url,
                                length: detail.length,
                            })),
                        };
                        setAsmrData(parsedData);
                    } else {
                        console.error("Invalid ASMR data structure:", data);
                    }
                } catch (error) {
                    console.error("Failed to fetch ASMR data:", error);
                }
            }
        };

        fetchAsmrData();
    }, [asmrId]);

    return (
        <div className="overflow-hidden flex items-center justify-center">
            {asmrData !== null ? (
                <MusicPlayer asmrData={asmrData} setIsLoginOn={setIsLoginOn} />
            ) : (
                <Loading />
            )}
        </div>
    );
};

export default Player;
