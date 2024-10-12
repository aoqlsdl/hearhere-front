import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface Props {
    music: {
        readonly asmrTitle: string;
        readonly musicURL: string;
        readonly soundUrls: string[];
    };
}

// todo: api 연결 후 webaudio api, audiocontext를 사용하여 음악 스트리밍 구현하기
const StreamingBar = ({ music }: Props) => {
    const musicInfo = music;
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [audioDuration, setAudioDuration] = useState<number | null>(0);
    const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);

    // 오디오 객체를 한 번만 생성하고 유지
    const audioRefs = useRef([
        new Audio(musicInfo.musicURL),
        ...musicInfo.soundUrls.map((url) => new Audio(url)),
    ]);

    // 무작위 시간에 오디오 재생 함수
    const playAtRandomTime = (audio: HTMLAudioElement) => {
        const randomTime = Math.random() * audio.duration; // 무작위 시간 설정
        audio.currentTime = randomTime;
        audio.play();
    };

    // 재생/일시정지 토글
    const togglePlayPause = () => {
        if (isPlaying) {
            audioRefs.current.forEach((audio) => audio.pause());
        } else {
            audioRefs.current[0].play(); // 기본 음악 재생
            audioRefs.current.slice(1).forEach((audio) => {
                playAtRandomTime(audio); // 다른 오디오들은 무작위로 재생
            });
        }
        setIsPlaying(!isPlaying);
    };

    // 재생 시간 업데이트
    const handleTimeUpdate = () => {
        const currentTime = audioRefs.current[0].currentTime;
        setAudioCurrentTime(currentTime);
        const duration = audioRefs.current[0].duration;
        setProgress(audioCurrentTime / duration);
    };

    // 10초 앞으로 이동
    const handleForward = () => {
        audioRefs.current[0].currentTime -= 10;
    };

    // 10초 뒤로 이동
    const handleBackward = () => {
        audioRefs.current[0].currentTime += 10;
    };

    // 클릭한 위치로 재생 시간 변경
    // fix: 위치 계산 오류 수정
    const handleProgressBar = (e: React.MouseEvent<HTMLDivElement>) => {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const newTime = (clickX / rect.width) * audioRefs.current[0].duration;
        audioRefs.current[0].currentTime = newTime;
        console.log(
            `Clicked position: ${clickX}, Progress bar width: ${rect.width}, New time: ${newTime}`
        );
    };

    useEffect(() => {
        const audio = audioRefs.current[0];
        audio.addEventListener("loadedmetadata", () => {
            setAudioDuration(audio.duration);
        });

        // 각 오디오에 'ended' 이벤트 리스너 추가
        audio?.addEventListener("timeupdate", handleTimeUpdate);
        audio?.addEventListener("ended", () => {
            if (audio) {
                playAtRandomTime(audio); // 재생 종료 시 무작위 시간대에서 다시 재생
            }
        });

        return () => {
            audioRefs.current.forEach((audio) => {
                if (audio) {
                    audio.removeEventListener("timeupdate", handleTimeUpdate);
                    audio.removeEventListener("ended", () => playAtRandomTime(audio));
                }
            });
        };
    }, []);

    // 경로가 변경될 때 모든 오디오를 일시 중지
    const location = useLocation();
    useEffect(() => {
        return () => {
            audioRefs.current.forEach((audio) => audio.pause());
            setIsPlaying(false);
        };
    }, [location]);

    // 현재 재생 시간과 총 재생 시간을 00:00 형식으로 표시
    const currentMin = Math.floor(audioRefs.current[0].currentTime / 60);
    const currentSec = Math.floor(audioRefs.current[0].currentTime % 60);
    const formattedCurrentMin = currentMin < 10 ? `0${currentMin}` : currentMin;
    const formattedCurrentSec = currentSec < 10 ? `0${currentSec}` : currentSec;
    const currentTime = `${formattedCurrentMin} : ${formattedCurrentSec}`;

    // audioDuration 값이 null이 아닐 때만 계산
    const durationMin = audioDuration ? Math.floor(audioDuration / 60) : 0;
    const durationSec = audioDuration ? Math.floor(audioDuration % 60) : 0;
    const formattedDurationMin = durationMin < 10 ? `0${durationMin}` : durationMin;
    const formattedDurationSec = durationSec < 10 ? `0${durationSec}` : durationSec;
    const duration = `${formattedDurationMin} : ${formattedDurationSec}`;

    return (
        <div>
            {/* progress bar + time */}
            <div className="flex flex-row w-full justify-center items-center mt-[2.48rem]">
                <span className="text-[1.25rem] font-light mr-[0.94rem]">{currentTime}</span>
                <div className="w-[29.44rem] h-1 bg-primary-BLACK300" onClick={handleProgressBar}>
                    <div
                        className="bg-primary-BLACK300 h-full relative flex items-center"
                        style={{ width: `${progress * 100}%` }}
                    >
                        <div
                            className="w-[1.44rem] h-[1.44rem] rounded-full bg-primary-PINK absolute"
                            style={{ left: `calc(${progress * 100}% - 0.72rem)` }}
                        />
                    </div>
                </div>
                <span className="text-[1.25rem] font-light ml-[0.94rem]">{duration}</span>
            </div>
            <div className="mt-6 flex flex-row w-[13.39rem] justify-between m-auto mb-[3.25rem]">
                <button
                    onClick={handleForward}
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
                    onClick={handleBackward}
                    className="bg-backward bg-cover bg-no-repeat w-6 h-6"
                />
            </div>
        </div>
    );
};

export default StreamingBar;
