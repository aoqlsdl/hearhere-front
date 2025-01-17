import SlidingText from "../SlidingText";
import StreamingBar from "../StreamingBar/index";
import { useRedirect } from "../../hooks/useRedirect";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useOpenModal } from "../../hooks/useModal";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user/atom";
import { asmrSave, asmrCustom } from "../../api/services/asmrServices";

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
    setIsLoginOn: React.Dispatch<React.SetStateAction<boolean>>;
}

const MusicPlayer = ({ asmrData, setIsLoginOn }: Props) => {
    const redirect = useRedirect();
    const path = useLocation().pathname;

    // 페이지 전환시 asmrData 전달
    const navigate = useNavigate();
    const handleCustomize = () => {
        navigate(`/customization/${asmrData.asmrId}`, { state: { asmrData } });
    };

    const [_, setErrorMessage] = useState<string | null>(null);

    const musicInfo = {
        ...asmrData,
        soundDetails: asmrData.soundDetails.map((detail) => detail.url), // string[] -> { url: string }[]
    };

    // 로그인 여부 확인
    const user = useRecoilValue(userState);

    const handleSave = async () => {
        if (user.accessToken === null) {
            // asmrData를 세션스토리지에 임시 저장
            sessionStorage.setItem("savedData", JSON.stringify(asmrData));
            // 로그인 모달 오픈
            setIsLoginOn(true);
            useOpenModal(setIsLoginOn);
        } else if (path === "/result") {
            try {
                // POST 요청 수행
                const soundUrls = asmrData.soundDetails.map((detail) => detail.url);
                const soundVolumns = new Array(soundUrls.length).fill(1);
                const soundPositions = soundUrls.map(() => [0]);

                const response = await asmrSave(
                    asmrData.asmrId,
                    asmrData.title,
                    asmrData.musicUrl,
                    1,
                    soundUrls,
                    soundVolumns,
                    soundPositions
                );

                if ("asmrId" in response) {
                    // 저장 성공
                    alert("Successfully saved");
                    redirect("/library");
                } else {
                    // 저장 실패
                    alert(`Failed to save ASMR`);
                }
            } catch (error) {
                console.error("Error during saving ASMR:", error);
            }
        } else if (path === "/customization") {
            // UPDATE 요청 수행
            try {
                const soundUrls = asmrData.soundDetails.map((detail) => detail.url);
                const soundVolumns = new Array(soundUrls.length).fill(1); // 기본 볼륨 설정
                const soundPositions = soundUrls.map(() => [0]); // 기본 위치 설정

                const response = await asmrCustom(
                    asmrData.asmrId,
                    asmrData.title,
                    asmrData.musicUrl,
                    1,
                    soundUrls,
                    soundVolumns,
                    soundPositions
                );

                if (response === true) {
                    // 업데이트 성공
                    alert("Successfully Saved!");
                } else {
                    // 실패 처리
                    setErrorMessage(false || "Update failed");
                    console.error(`Error updating ASMR`);
                }
            } catch (error) {
                setErrorMessage("Request failed during update");
                console.error("Error during API call:", error);
            }
        }
    };

    return (
        <div className="w-[47.31rem] h-[42.25rem] mt-[0.56rem] rounded-t-[2rem] bg-primary-GRAY600 drop-shadow-[5px_10px_4px_rgba(0,0,0,0.25)] flex flex-col items-center relative 1440:rounded-b-[2rem]">
            {/* top */}
            <div className="w-full flex flex-col text-center items-center mt-[3.55rem]">
                {path === "/result" ? (
                    <div className="flex flex-row w-[3.5rem] absolute top-5 right-6 justify-between items-center">
                        <button
                            type="button"
                            className="bg-tune bg-cover w-[1.4rem] h-[1.4rem]"
                            onClick={handleCustomize}
                        />
                        <button
                            type="button"
                            className="bg-save bg-cover w-[1.4rem] h-[1.4rem]"
                            onClick={handleSave}
                        />
                    </div>
                ) : (
                    <>
                        <button
                            type="button"
                            className="bg-tune bg-cover w-[1.4rem] h-[1.4rem] absolute top-5 right-6"
                            onClick={handleCustomize}
                        />
                    </>
                )}
                <span className="text-2xl font-extralight text-primary-GRAY700">Here is</span>
                <SlidingText title={musicInfo.title} />
            </div>
            {/* middle */}
            <div className="rounded-full w-[16rem] h-[16rem] bg-primary-BLACK300 flex justify-center items-center mt-[0.8rem]">
                <div className="font-Luxurious w-[7rem] h-[7rem] rounded-full bg-white flex justify-center items-center text-center max-w-[7rem] whitespace-pre-line cursor-default">
                    <span className="text-[clamp(0.5rem, 1.69rem, 2.5rem)] ">
                        {musicInfo.title}
                    </span>
                </div>
            </div>
            {/* bottom */}
            <StreamingBar asmrData={asmrData} />
        </div>
    );
};

export default MusicPlayer;
