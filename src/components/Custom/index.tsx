import { useState, useRef, useEffect } from "react";
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
    // 재생 상태 관리하기
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0); // 현재 재생 시간
    const [duration, setDuration] = useState(0); // 전체 재생 시간
    const [maxWidth, setMaxWidth] = useState<number>(0); // 최대 너비

    const waveSurferInstances = useRef<any[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    // 가장 긴 음원의 너비값 구하기
    useEffect(() => {
        if (containerRef.current) {
            // 모든 child 요소의 너비를 계산
            const children = containerRef.current.querySelectorAll(".child");
            let maxChildWidth = 0;

            children.forEach((child) => {
                const childWidth = child.scrollWidth; // 콘텐츠의 너비 계산
                if (childWidth > maxChildWidth) {
                    maxChildWidth = childWidth;
                }
            });

            setMaxWidth(maxChildWidth); // 가장 큰 너비를 상태로 저장
        }
    }, [asmrData]);

    // 가장 긴 음원의 길이를 계산
    useEffect(() => {
        const calculateLongestDuration = async () => {
            const durations = asmrData.soundDetails.map((detail) => {
                const [minutes, seconds] = detail.length.split(":").map(Number);
                return minutes * 60 + seconds; // 초 단위로 변환
            });

            const longestDuration = Math.max(...durations);
            setDuration(longestDuration);
        };

        calculateLongestDuration();
    }, [asmrData]);

    // 시간 포맷팅 함수 (초 -> MM:SS)
    // const formatTime = (time: number): string => {
    //     const minutes = Math.floor(time / 60);
    //     const seconds = Math.floor(time % 60);
    //     return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    // };

    // 모든 트랙의 재생 위치 동기화
    const syncTracks = (currentTime: number) => {
        waveSurferInstances.current.forEach((waveSurfer) => {
            if (waveSurfer) {
                waveSurfer.seekTo(currentTime / waveSurfer.getDuration());
            }
        });
    };

    const handlePlayPause = () => {
        const firstTrack = waveSurferInstances.current[0];
        if (firstTrack) {
            const currentTime = firstTrack.getCurrentTime(); // 첫 번째 트랙의 현재 위치를
            syncTracks(currentTime); // 모든 트랙에 동기화
        }
        setIsPlaying((prev) => !prev); // 상태를 토글
    };

    // 현재 재생 시간 업데이트
    const updateCurrentTime = () => {
        const firstTrack = waveSurferInstances.current[0];
        if (firstTrack) {
            const currentTime = firstTrack.getCurrentTime(); // 초 단위 시간 가져오기
            setCurrentTime(currentTime); // 상태에 업데이트
        }
    };

    // Progress bar 클릭 이벤트
    const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left; // 클릭 위치
        const newTime = (clickX / rect.width) * duration; // 클릭된 위치의 시간 계산
        setCurrentTime(newTime);
        syncTracks(newTime); // 모든 트랙 동기화
    };

    const parseLengthToSeconds = (length: string) => {
        const [minutes, seconds] = length.split(":").map(Number);
        return minutes * 60 + seconds;
    };

    const formatTime = (timeInSeconds: number): string => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);

        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="flex flex-col">
            {/* play/pause 버튼 */}
            <button
                type="button"
                className="w-16 h-8 1440:w-[4.94rem] 1440:h-[1.81rem] font-light flex flex-row items-center justify-center ml-[2.06rem]"
                onClick={handlePlayPause}
            >
                {isPlaying ? (
                    <>
                        <img
                            src="/assets/icons/pause.svg"
                            className="w-4 h-8 1440:w-16 1440:h-[2.81rem]"
                        />{" "}
                        <span className="ml-[0.44rem] text-base 1440:text-[1.44rem]">Pause</span>
                    </>
                ) : (
                    <>
                        <img
                            src="/assets/icons/play.svg"
                            className="w-4 h-8 1440:w-16 1440:h-[2.81rem]"
                        />{" "}
                        <span className="ml-[0.44rem] text-base 1440:text-[1.44rem]">Play</span>
                    </>
                )}
            </button>

            <div className="w-screen flex flex-col overflow-scroll">
                {/* 재생 시간 표시 */}
                <div
                    className="relative h-[3.63rem] mt-[1.56rem] mx-[1.88rem] bg-white cursor-pointer border-t border-b border-[#CECACA]"
                    style={{ width: maxWidth > 0 ? `${maxWidth}px` : "auto" }}
                    onClick={handleProgressClick}
                >
                    {/* 눈금 표시 */}
                    {[...Array(Math.ceil(duration / 10))].map((_, index) => {
                        const time = index * 10; // 10초 간격
                        const leftPercentage = (time / duration) * 100; // 위치 비율 계산
                        return (
                            <div
                                key={index}
                                className="absolute bottom-0 h-fit z-50"
                                style={{
                                    left: `${leftPercentage}%`,
                                    transform: "translateX(-50%)",
                                }}
                            >
                                {/* 시간 */}
                                <span className="text-sm text-gray-500 block text-right mt-1 ml-12">
                                    {formatTime(time)}
                                </span>
                                {/* 눈금 */}
                                <div className="w-[1px] h-[17px] bg-gray-500 m-auto"></div>
                            </div>
                        );
                    })}

                    {/* 진행 바 */}
                    <div
                        className="absolute top-0 left-0 h-full bg-[#E8DFDF]"
                        style={{ width: `${(currentTime / duration) * 100}%` }}
                    />
                </div>

                <div ref={containerRef}>
                    {/* waveform 컴포넌트 */}
                    {asmrData.soundDetails.map((detail, index) => (
                        <div
                            key={detail.soundId}
                            className="child bg-slate-50 border-b-2 h-[7.44rem] flex flex-col justify-center pl-[1.88rem]"
                            style={{ width: maxWidth > 0 ? `${maxWidth}px` : "auto" }}
                        >
                            <h3 className="mb-2">Track {detail.soundId}</h3>
                            <Waveform
                                audioUrl={detail.url}
                                isPlaying={isPlaying}
                                onReady={(waveSurfer) => {
                                    waveSurferInstances.current[index] = waveSurfer;
                                }}
                                onProgressUpdate={updateCurrentTime}
                                length={parseLengthToSeconds(detail.length)}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Custom;
