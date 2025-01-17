import { useEffect, useRef, useState } from "react";
import WaveSurfer from "wavesurfer.js";
// import { ScaleLoader } from "react-spinners";

interface SoundDetail {
    soundId: number;
    url: string;
    length: string;
}

interface Props {
    asmrData: {
        asmrId: number;
        title: string;
        musicUrl: string | null;
        soundDetails: SoundDetail[];
    };
}

// interface CustomizationData {
//     musicUrl: string | null;
//     musicVolume: number;
//     soundUrls: string[];
//     soundVolumes: number[];
//     soundPositions: number[][];
// }

const StreamingBar = ({ asmrData }: Props) => {
    const waveSurferRefs = useRef<WaveSurfer[]>([]);
    // const [isLoading, setIsLoading] = useState(true);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [totalDuration, setTotalDuration] = useState(0);
    const [progress, setProgress] = useState(0);
    // 랜덤 재생 정보 관리
    // const [randomPlayData, setRandomPlayData] = useState<CustomizationData>({
    //     musicUrl: asmrData.musicUrl,
    //     musicVolume: 1,
    //     soundUrls: asmrData.soundDetails.map((detail) => detail.url),
    //     soundVolumes: asmrData.soundDetails.map(() => 1),
    //     soundPositions: [],
    // });

    useEffect(() => {
        const waveSurfers: WaveSurfer[] = asmrData.soundDetails.map((soundDetail) => {
            const waveSurfer = WaveSurfer.create({
                container: document.createElement("div"),
                waveColor: "#E24848",
                progressColor: "#E24848",
                cursorColor: "rgba(0,0,0,0)",
            });

            waveSurfer.load(soundDetail.url);
            return waveSurfer;
        });

        waveSurferRefs.current = waveSurfers;

        // 소리 요소 Random positions 관리
        // const randomPositions: number[][] = asmrData.soundDetails.map((soundDetail) => {
        //     const soundLength = parseLengthToSeconds(soundDetail.length);
        //     return generateRandomPositions(soundLength, totalDuration, 3);
        // });

        // setRandomPlayData((prev) => ({
        //     ...prev,
        //     soundPositions: randomPositions,
        // }));

        waveSurfers.forEach((waveSurfer) => {
            waveSurfer.on("ready", () => {
                const duration = waveSurfer.getDuration();
                setTotalDuration((prev) => Math.max(prev, duration));
            });

            waveSurfer.on("audioprocess", () => {
                const currentTimes = waveSurferRefs.current.map((ws) => ws.getCurrentTime());
                const maxCurrentTime = Math.max(...currentTimes);
                setCurrentTime(maxCurrentTime);
                const newProgress = (maxCurrentTime / totalDuration) * 100;
                setProgress(newProgress);

                // 100%가 되면 isPlaying이 false가 되도록 수정
                if (newProgress >= 100) {
                    setIsPlaying(false);
                    waveSurferRefs.current.forEach((waveSurfer) => waveSurfer.pause());
                }
            });
        });

        return () => {
            waveSurferRefs.current.forEach((waveSurfer) => waveSurfer.destroy());
        };
    }, [asmrData]);

    // 랜덤 재생 실행 로직
    // const playRandomly = () => {
    //     waveSurferRefs.current.forEach((waveSurfer, index) => {
    //         const positions = randomPlayData.soundPositions[index];
    //         if (positions) {
    //             playAtPositions(waveSurfer, positions);
    //         }
    //     });
    // };

    // const playAtPositions = (waveSurfer: WaveSurfer, positions: number[]) => {
    //     const playSegment = (segmentIndex: number) => {
    //         if (segmentIndex < positions.length) {
    //             const start = positions[segmentIndex];
    //             const soundLength = parseLengthToSeconds(
    //                 asmrData.soundDetails[waveSurferRefs.current.indexOf(waveSurfer)].length
    //             );
    //             const duration = Math.min(soundLength, totalDuration - start);

    //             // 재생 위치를 찾기
    //             waveSurfer.seekTo(start / totalDuration);
    //             waveSurfer.play();

    //             // 재생이 끝나면 다음 재생으로 넘어가기
    //             setTimeout(() => {
    //                 waveSurfer.pause();
    //                 playSegment(segmentIndex + 1);
    //             }, duration * 1000);
    //         }
    //     };
    //     playSegment(0);
    // };

    // // 랜덤 위치 생성 유틸리티 함수
    // const generateRandomPositions = (
    //     soundLength: number,
    //     maxDuration: number,
    //     maxOccurrences: number
    // ): number[] => {
    //     const positions: number[] = [];
    //     while (positions.length < maxOccurrences) {
    //         const randomTime = Math.random() * maxDuration;
    //         if (
    //             !positions.some((pos) => Math.abs(pos - randomTime) < soundLength) &&
    //             randomTime + soundLength <= maxDuration
    //         ) {
    //             positions.push(Math.floor(randomTime));
    //         }
    //     }
    //     return positions.sort((a, b) => a - b);
    // };

    const togglePlayPause = async () => {
        if (isPlaying) {
            await Promise.all(waveSurferRefs.current.map((waveSurfer) => waveSurfer.pause()));
        } else {
            await Promise.all(waveSurferRefs.current.map((waveSurfer) => waveSurfer.play()));
            // playRandomly();
        }
        setIsPlaying(!isPlaying);
    };

    const seekToTime = (offset: number) => {
        const newTime = Math.min(Math.max(0, currentTime + offset), totalDuration); // 제한된 범위로 이동
        setCurrentTime(newTime);

        const newProgress = newTime / totalDuration;
        waveSurferRefs.current.forEach((waveSurfer) => waveSurfer.seekTo(newProgress));
        setProgress(newProgress * 100);
    };

    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newProgress = clickX / rect.width;

        waveSurferRefs.current.forEach((waveSurfer) => waveSurfer.seekTo(newProgress));
        setProgress(newProgress * 100);
    };

    // 시간 포맷팅
    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    // const parseLengthToSeconds = (length: string): number => {
    //     const [minutes, seconds] = length.split(":").map(Number);
    //     return minutes * 60 + seconds;
    // };

    return (
        <>
            {/* {isLoading ? (
                <div className="mt-16">
                    <ScaleLoader loading={isLoading} aria-label="Loading Spinner" />
                </div>
            ) : ( */}
            <div>
                <div className="flex flex-row w-full max-w-full overflow-hidden justify-center items-center mt-[2.48rem]">
                    {/* 현재 재생 시간 */}
                    <span className="text-[1.25rem] font-light mr-[0.94rem]">
                        {formatTime(currentTime)}
                    </span>
                    <div
                        className="relative max-w-[29.44rem] w-[29.44rem] h-1 bg-primary-BLACK300 cursor-pointer flex items-center"
                        onClick={handleProgressClick}
                    >
                        {/* Progress Bar */}
                        <div
                            className="h-1 absolute top-0 left-0 bg-primary-BLACK300"
                            style={{ width: `${progress}%` }}
                        ></div>

                        {/* Moving Circle */}
                        <div
                            className="absolute w-[1.44rem] h-[1.44rem] rounded-full bg-primary-PINK transform -translate-x-1/2"
                            style={{
                                left: `${progress}%`, // Move the circle based on progress
                            }}
                        ></div>
                    </div>
                    {/* 총 재생 시간 */}
                    <span className="text-[1.25rem] font-light ml-[0.94rem]">
                        {formatTime(totalDuration)}
                    </span>
                </div>
                {/* Play/Pause 버튼 */}
                <div className="mt-6 flex flex-row w-[13.39rem] justify-between m-auto mb-[3.25rem]">
                    <button
                        className="bg-forward bg-cover bg-no-repeat w-6 h-6"
                        onClick={() => seekToTime(-10)}
                    />
                    <button
                        onClick={() => togglePlayPause()}
                        className="w-[1.81rem] h-[1.81rem] flex items-center justify-center"
                    >
                        {isPlaying ? (
                            <img src="/assets/icons/pause.svg" alt="Pause" />
                        ) : (
                            <img src="/assets/icons/play.svg" alt="Play" />
                        )}
                    </button>
                    <button
                        className="bg-backward bg-cover bg-no-repeat w-6 h-6"
                        onClick={() => seekToTime(10)}
                    />
                </div>
            </div>
            {/* )} */}
        </>
    );
};

export default StreamingBar;
