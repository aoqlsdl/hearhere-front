import { useEffect, useRef } from "react";
import WaveSurfer from "wavesurfer.js";
// import { BeatLoader } from "react-spinners";

interface WaveformProps {
    audioUrl: string;
    isPlaying: boolean;
    onReady: (waveSurfer: WaveSurfer) => void;
    onProgressUpdate: () => void;
    length: number;
}

const Waveform = ({ audioUrl, isPlaying, onReady, onProgressUpdate, length }: WaveformProps) => {
    const waveformRef = useRef<HTMLDivElement>(null);
    const waveSurferInstance = useRef<WaveSurfer | null>(null);

    // const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!waveformRef.current) return;

        // 각 초당 픽셀 비율 설정
        const pixelsPerSecond = 50; // 50px per second
        const calculatedWidth = length * pixelsPerSecond;

        waveSurferInstance.current = WaveSurfer.create({
            container: waveformRef.current,
            waveColor: "#E24848",
            progressColor: "#E24848",
            cursorColor: "rgba(0,0,0,0)",
            width: calculatedWidth,
            height: 60,
            barWidth: 4,
            barGap: 4,
            barRadius: 10,
        });

        // 컨테이너의 동적 너비 설정
        waveformRef.current.style.width = `${calculatedWidth}px`;

        // 오디오 로드
        waveSurferInstance.current.load(audioUrl);
        // setIsLoading(true);
        // console.log(isLoading);

        waveSurferInstance.current.on("audioprocess", onProgressUpdate);
        waveSurferInstance.current.on("ready", () => {
            onReady(waveSurferInstance.current!);
        });

        return () => {
            waveSurferInstance.current?.destroy();
            waveSurferInstance.current = null;
        };
    }, [audioUrl, length]);

    // 재생/정지 상태를 동기화
    useEffect(() => {
        if (waveSurferInstance.current) {
            if (isPlaying) {
                waveSurferInstance.current.play();
            } else {
                waveSurferInstance.current.pause();
            }
        }
    }, [isPlaying]);

    return (
        <>
            {/* {isLoading ? (
                <div className="w-full flex justify-center">
                    <BeatLoader
                        loading={isLoading}
                        area-label="Loading Spinner"
                        data-testid="loader"
                        color="#E24848"
                    />
                </div>
            ) : ( */}
            <div className="bg-white drop-shadow-sm rounded-md" style={{ width: length * 50 }}>
                <div ref={waveformRef} />
            </div>
            {/* )} */}
        </>
    );
};

export default Waveform;
