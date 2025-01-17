import { useState, useEffect, useRef } from "react";
import { ScaleLoader } from "react-spinners";

interface SoundDetail {
    soundId: number;
    url: string;
    length: string;
}

interface Props {
    asmrData: {
        asmrId: number;
        title: string;
        musicUrl: string;
        soundDetails: SoundDetail[];
    };
}

const StreamingBar = ({ asmrData }: Props) => {
    // 오디오 관련
    const audioContext = useRef<AudioContext | null>(null);
    const audioBuffers = useRef<AudioBuffer[]>([]);
    const audioSources = useRef<AudioBufferSourceNode[]>([]);
    const gainNodes = useRef<GainNode[]>([]);

    // 로딩 상태 관리
    const [isLoading, setIsLoading] = useState(true);
    // 재생 상태 관리
    const [isPlaying, setIsPlaying] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    // 재생 시간 관리
    const [startTime, setStartTime] = useState(0);
    const [pauseTime, setPauseTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState("00:00");
    const [duration, setDuration] = useState("00:00");

    useEffect(() => {
        if (!audioContext.current) {
            audioContext.current = new AudioContext();
        }

        const fetchAudioBuffer = async (url: string): Promise<AudioBuffer | null> => {
            try {
                const response = await fetch(url);
                const arrayBuffer = await response.arrayBuffer();
                return await audioContext.current!.decodeAudioData(arrayBuffer);
            } catch (error) {
                console.error(`Failed to fetch audio file: ${url}`, error);
                return null;
            }
        };

        const loadSoundFiles = async () => {
            setIsLoading(true);
            try {
                // const musicBuffer = await fetchAudioBuffer(asmrData.musicUrl);
                const soundBuffers = await Promise.all(
                    asmrData.soundDetails.map((soundDetail) => fetchAudioBuffer(soundDetail.url))
                );

                if (soundBuffers.every((buffer) => buffer !== null)) {
                    audioBuffers.current = [...soundBuffers];

                    gainNodes.current = audioBuffers.current.map(() =>
                        audioContext.current!.createGain()
                    );

                    function findLongestDuration(
                        ref: React.MutableRefObject<AudioBuffer[]>
                    ): number {
                        return ref.current.reduce(
                            (max, current) => Math.max(max, current.duration),
                            0
                        );
                    }

                    // soundBuffer 요소 중 재생 시간이 가장 긴 요소를 기준으로 전체 음악의 길이 설정
                    const longestDuration = findLongestDuration(audioBuffers);
                    setDuration(formatTime(longestDuration));
                    // setDuration(formatTime(musicBuffer.duration));
                } else {
                    console.error("Failed to load one or more buffers");
                }
            } catch (error) {
                console.error("Error loading audio buffers:", error);
            } finally {
                setIsLoading(false); // 로딩 완료
            }
        };

        loadSoundFiles();
    }, [asmrData]);

    // 시간 포맷팅
    const formatTime = (time: number): string => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    const playAtTime = (buffer: AudioBuffer, index: number, startOffset: number = 0) => {
        if (!audioContext.current || !buffer) return;

        const source = audioContext.current.createBufferSource();
        const gainNode = gainNodes.current[index];
        source.buffer = buffer;

        source.connect(gainNode);
        gainNode.connect(audioContext.current.destination);

        source.start(0, startOffset);
        audioSources.current.push(source);

        source.onended = () => {
            if (index === 0) {
                setIsPlaying(false);
            }
        };
    };

    // 무작위로 재생 구간 생성
    // const generateRandomIntervals = (
    //     trackDuration: number,
    //     totalDuration: number,
    //     maxOccurrences: number
    // ): number[] => {
    //     const intervals: number[] = [];
    //     while (intervals.length < maxOccurrences) {
    //         const randomTime = Math.random() * totalDuration;

    //         // 겹치지 않도록 보장
    //         if (!intervals.some((interval) => Math.abs(interval - randomTime) < trackDuration)) {
    //             intervals.push(randomTime);
    //         }
    //     }
    //     return intervals.sort((a, b) => a - b); // 정렬된 시간 반환
    // };

    const startPlayback = async (startOffset: number = 0) => {
        if (audioContext.current?.state === "suspended") {
            await audioContext.current.resume();
        }

        audioBuffers.current.forEach((buffer, index) => {
            playAtTime(buffer, index, startOffset);
        });
    };

    // 제한된 시간만큼 재생
    // const playAtTimeWithLimit = (
    //     buffer: AudioBuffer,
    //     index: number,
    //     startOffset: number,
    //     durationLimit: number
    // ) => {
    //     if (!audioContext.current || !buffer) return;

    //     const source = audioContext.current.createBufferSource();
    //     const gainNode = gainNodes.current[index];

    //     source.buffer = buffer;
    //     source.connect(gainNode);
    //     gainNode.connect(audioContext.current.destination);

    //     source.start(0, startOffset, durationLimit); // 재생 제한 시간 설정
    //     audioSources.current.push(source);

    //     source.onended = () => {
    //         if (index === 0) {
    //             setIsPlaying(false);
    //         }
    //     };
    // };

    // const startPlaybackWithRandomIntervals = async () => {
    //     if (!audioContext.current) return;

    //     // 가장 긴 재생시간을 가진 트랙 찾기
    //     const longestBuffer = audioBuffers.current.reduce((longest, buffer) =>
    //         buffer.duration > longest.duration ? buffer : longest
    //     );

    //     const longestDuration = longestBuffer.duration;

    //     // 나머지 트랙에 대해 무작위 재생 시간 설정
    //     audioBuffers.current.forEach((buffer, index) => {
    //         if (buffer === longestBuffer) {
    //             // 가장 긴 트랙은 바로 재생
    //             playAtTime(buffer, index, 0);
    //         } else {
    //             // 무작위 재생 시간 생성
    //             const randomIntervals = generateRandomIntervals(
    //                 buffer.duration,
    //                 longestDuration,
    //                 4 // 트랙당 최대 재생 횟수
    //             );

    //             randomIntervals.forEach((startTime) => {
    //                 setTimeout(() => {
    //                     const maxEndTime = Math.min(startTime + buffer.duration, longestDuration);
    //                     const playableDuration = maxEndTime - startTime;

    //                     playAtTimeWithLimit(buffer, index, 0, playableDuration);
    //                 }, startTime * 1000);
    //             });
    //         }
    //     });

    //     setIsPlaying(true);
    // };

    const stopAllSounds = () => {
        audioSources.current.forEach((source) => source.stop());
        audioSources.current = [];
    };

    const togglePlayPause = async () => {
        if (isPlaying) {
            setPauseTime(audioContext.current!.currentTime - startTime);
            stopAllSounds();
            setIsPlaying(false);
            setIsPaused(true);
        } else {
            if (isPaused) {
                // 일시정지된 상태에서 다시 재생되기 시작할 때
                startPlayback(pauseTime);
                setIsPaused(false);
            } else {
                // 처음 재생될 때
                setStartTime(audioContext.current!.currentTime);
                // startPlaybackWithRandomIntervals();
                startPlayback(0);
            }
            setIsPlaying(true);
        }
    };

    const handleProgressBar = (e: React.MouseEvent<HTMLDivElement>) => {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newProgress = (clickX / rect.width) * 100;
        const newTime = (newProgress / 100) * audioBuffers.current[0]?.duration || 0;

        setProgress(newProgress);
        setPauseTime(newTime);
        if (isPlaying) {
            stopAllSounds();
            startPlayback(newTime);
        }
    };

    useEffect(() => {
        const updateProgress = () => {
            if (isPlaying && audioBuffers.current[0]) {
                const elapsed = audioContext.current!.currentTime - startTime;
                setProgress((elapsed / audioBuffers.current[0].duration) * 100);
                setCurrentTime(formatTime(elapsed));
            }
        };

        const interval = setInterval(updateProgress, 1000);
        return () => clearInterval(interval);
    }, [isPlaying, startTime]);

    return (
        <>
            {isLoading ? (
                <div className="mt-16">
                    <ScaleLoader
                        loading={isLoading}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>
            ) : (
                <div>
                    <div className="flex flex-row w-full justify-center items-center mt-[2.48rem]">
                        {/* 현재 재생 시간 */}
                        <span className="text-[1.25rem] font-light mr-[0.94rem]">
                            {currentTime}
                        </span>
                        {/* 재생바 */}
                        <div
                            className="w-[29.44rem] h-1 bg-primary-BLACK300"
                            onClick={handleProgressBar}
                        >
                            <div
                                className="bg-primary-BLACK300 h-full relative flex items-center"
                                style={{ width: `${progress}%` }}
                            >
                                <div
                                    className="w-[1.44rem] h-[1.44rem] rounded-full bg-primary-PINK absolute left-0"
                                    style={{ left: `calc(${progress}% - 0.72rem)` }}
                                />
                            </div>
                        </div>
                        {/* 전체 시간 */}
                        <span className="text-[1.25rem] font-light ml-[0.94rem]">{duration}</span>
                    </div>

                    {/* 재생 컨트롤러 */}
                    <div className="mt-6 flex flex-row w-[13.39rem] justify-between m-auto mb-[3.25rem]">
                        <button
                            onClick={() => setPauseTime(Math.max(0, pauseTime - 10))}
                            className="bg-forward bg-cover bg-no-repeat w-6 h-6"
                        />
                        <button
                            onClick={togglePlayPause}
                            className="w-[1.81rem] h-[1.81rem] flex items-center justify-center"
                        >
                            {isPlaying ? (
                                <img src="/assets/icons/pause.svg" />
                            ) : (
                                <img src="/assets/icons/play.svg" />
                            )}
                        </button>
                        <button
                            onClick={() =>
                                setPauseTime(
                                    Math.min(audioBuffers.current[0]?.duration || 0, pauseTime + 10)
                                )
                            }
                            className="bg-backward bg-cover bg-no-repeat w-6 h-6"
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default StreamingBar;
