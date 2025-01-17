import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";

interface WaveformProps {
    audioUrl: string;
    isPlaying: boolean;
    onReady: (waveSurfer: WaveSurfer) => void;
    onProgressUpdate: () => void;
    onVolumeChange: (volume: number) => void;
    length: number;
    initialVolume: number;
}

const Waveform = ({
    audioUrl,
    isPlaying,
    onReady,
    onProgressUpdate,
    onVolumeChange,
    length,
    initialVolume,
}: WaveformProps) => {
    const waveformRef = useRef<HTMLDivElement>(null);
    const waveSurferInstance = useRef<WaveSurfer | null>(null);
    const volumeRef = useRef<number>(initialVolume);

    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        if (!waveformRef.current) return;

        // 각 초당 픽셀 비율 설정
        const pixelsPerSecond = 15;
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

        waveSurferInstance.current.on("audioprocess", onProgressUpdate);
        waveSurferInstance.current.on("ready", () => {
            waveSurferInstance.current?.setVolume(volumeRef.current);
            onReady(waveSurferInstance.current!);
        });

        return () => {
            waveSurferInstance.current?.destroy();
            waveSurferInstance.current = null;
        };
    }, [audioUrl, length]);

    // 볼륨 업데이트
    useEffect(() => {
        volumeRef.current = initialVolume;
        if (waveSurferInstance.current) {
            waveSurferInstance.current.setVolume(initialVolume);
        }
    }, [initialVolume]);

    // 볼륨 슬라이더 조작
    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        volumeRef.current = newVolume;
        onVolumeChange(newVolume);

        if (waveSurferInstance.current) {
            waveSurferInstance.current.setVolume(newVolume);
        }
    };

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
            <div
                className={`relative h-[3.75rem] bg-white drop-shadow-sm rounded-md cursor-pointer ${
                    isSelected ? "border-[3px] border-[#4AA2FF]" : "border border-gray-300"
                }`}
                style={{ width: length * 15 }}
                onClick={() => setIsSelected((prev) => !prev)}
            >
                <div ref={waveformRef} />
                {/* 볼륨 조절 슬라이더 */}
                {isSelected && (
                    <div className="absolute left-[-2.5rem] top-1/2 transform -translate-y-1/2 flex flex-col items-center">
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            onChange={handleVolumeChange}
                            className="w-12 h-14 rotate-[-90deg] cursor-pointer"
                            defaultValue={volumeRef.current}
                            value={volumeRef.current}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default Waveform;
