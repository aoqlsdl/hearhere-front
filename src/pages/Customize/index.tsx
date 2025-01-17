import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Custom from "../../components/Custom";
import HelpModal from "../../components/HelpModal";
import LoginModal from "../../components/LoginModal";
import { useOpenModal } from "../../hooks/useModal";
import { asmrCustom } from "../../api/services/asmrServices";

interface SoundDetail {
    soundId: number;
    url: string;
    length: string;
}

const Customize = () => {
    const [isHelpOn, setIsHelpOn] = useState(false);
    const [isLoginOn, setIsLoginOn] = useState(false);
    const [isMessageAppear] = useState(false);
    const [_, setErrorMessage] = useState<string | null>(null);

    const location = useLocation();
    const { asmrData } = location.state || {}; // state에서 데이터 가져오기

    const [musicVolumn, setMusicVolumn] = useState<number>(asmrData?.musicVolumn || 1);
    const [soundVolumns, setSoundVolumns] = useState<number[]>(
        asmrData?.soundVolumns || asmrData?.soundDetails.map(() => 1)
    );

    // 페이지에 진입할 때 asmrData를 localStorage에 저장
    useEffect(() => {
        if (asmrData) {
            localStorage.setItem("asmrData", JSON.stringify(asmrData));
        }
    }, [asmrData]);

    const handleAsmrUpdate = async () => {
        try {
            const soundUrls = asmrData.soundDetails.map((detail: SoundDetail) => detail.url);
            const soundPositions = soundUrls.map(() => [0]); // 기본 위치 설정

            // 최신 볼륨 상태를 전달
            const response = await asmrCustom(
                asmrData.asmrId,
                asmrData.title,
                asmrData.musicUrl || "",
                musicVolumn,
                soundUrls,
                soundVolumns,
                soundPositions
            );

            if (response === true) {
                alert("Successfully Saved!");
                // setIsMessageAppear(true);
                // setTimeout(() => setIsMessageAppear(false), 3000); // 메시지 3초 후 사라짐
            } else {
                console.error("Update failed:", response);
                setErrorMessage("Update failed");
            }
        } catch (error) {
            console.error("Error during update:", error);
            setErrorMessage("Request failed during update");
        }
    };

    return (
        <div className="s-screen h-full overflow-hidden relative">
            {isMessageAppear && (
                <div className="flex flex-row w-[8rem] h-8 1440:w-[10rem] 1440:h-[2.81rem] justify-between items-center absolute top-0 right-[15rem] 1440:right-[17.25rem] animate-fadein">
                    <img
                        src="/assets/icons/check.svg"
                        className="w-[1.25rem] h-[1.25rem] 1440:w-[1.44rem] 1440:h-[1.44rem]"
                    />
                    <span className="text-base 1440:text-[1.31rem] font-light">Project saved.</span>
                </div>
            )}

            <div className="flex flex-row w-[12.5rem] h-8 1440:w-[14.75rem] 1440:h-[2.81rem] justify-between absolute right-6 top-0">
                <button
                    onClick={() => useOpenModal(setIsHelpOn)}
                    className="w-[6rem] h-8 1440:w-[6.88rem] 1440:h-[2.81rem] bg-primary-GRAY800 text-primary-PINK font-light text-base 1440:text-[1.38rem] rounded-[15px] hover:bg-primary-PINK hover:text-white hover:animate-fadein"
                >
                    Help
                </button>
                <button
                    onClick={handleAsmrUpdate}
                    className="w-[6rem] h-8 1440:w-[6.88rem] 1440:h-[2.81rem] bg-primary-GRAY800 text-primary-PINK font-light text-base 1440:text-[1.38rem] rounded-[15px] hover:bg-primary-PINK hover:text-white hover:animate-fadein"
                >
                    Save
                </button>
            </div>
            <Custom
                asmrData={{ ...asmrData, musicVolumn, soundVolumns }}
                setMusicVolumn={setMusicVolumn}
                setSoundVolumns={setSoundVolumns}
            />
            {isHelpOn && <HelpModal setIsHelpOn={setIsHelpOn} />}
            {isLoginOn && (
                <LoginModal title="Want to customize your ASMR?" setIsLoginOn={setIsLoginOn} />
            )}
        </div>
    );
};

export default Customize;
