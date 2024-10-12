import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

interface Props {
    music: {
        readonly asmrTitle: string;
        readonly musicURL: string;
        readonly soundUrls: string[];
    };
}

const StreamingBar = ({ music }: Props) => {
    const musicInfo = music;
    // todo: 배포 후에도 chrome에서 자동재생 안 되는지 확인
    // => 안됨... 일단 false로 설정
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [audioDuration, setAudioDuration] = useState<number | null>(0);
    const [audioCurrentTime, setAudioCurrentTime] = useState<number>(0);

    // 배열을 평탄화하고 각 요소를 Audio 객체로 변환
    const audioRefs = useRef([
        new Audio(musicInfo.musicURL),
        ...musicInfo.soundUrls.map((url) => new Audio(url)),
    ]);

    // 재생/일시정지 토글
    const togglePlayPause = () => {
        if (isPlaying) {
            audioRefs.current.forEach((audio) => audio.pause());
        } else {
            audioRefs.current.forEach((audio) => audio.play());
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

    useEffect(() => {
        // 메타데이터 로드 이벤트 리스너 추가
        const audio = audioRefs.current[0];
        audio.addEventListener("loadedmetadata", () => {
            setAudioDuration(audio.duration); // 오디오 길이를 state로 설정
        });

        // 배열의 각 audio 요소에 ontimeupdate 이벤트 리스너 추가
        audioRefs.current.forEach((audio) => {
            audio.ontimeupdate = handleTimeUpdate;
        });

        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
            audioRefs.current.forEach((audio) => {
                audio.ontimeupdate = null;
            });
        };
    }, []);

    // 경로가 변경될 때 모든 오디오를 일시 중지
    const location = useLocation();
    useEffect(() => {
        return () => {
            // 클린업 함수를 사용하여 컴포넌트가 언마운트될 때 모든 오디오를 일시 중지
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
                <div className="w-[29.44rem] h-1 bg-primary-BLACK300">
                    <div
                        className="bg-primary-BLACK300 h-full relative flex items-center"
                        style={{ width: `${progress * 100}%` }}
                    >
                        <div className="w-[1.44rem] h-[1.44rem] rounded-full bg-primary-PINK absolute right-[0.72]" />
                    </div>
                </div>
                <span className="text-[1.25rem] font-light ml-[0.94rem]">{duration}</span>
            </div>
            <div className="mt-6 flex flex-row w-[13.39rem] justify-between m-auto mb-[3.25rem]">
                <button className="bg-forward bg-cover bg-no-repeat w-6 h-6" />
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
                <button className="bg-backward bg-cover bg-no-repeat w-6 h-6" />
            </div>
        </div>
    );
};

export default StreamingBar;
