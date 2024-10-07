import { useRef, useState } from "react";

type Props = {
    setIsOn: (isOn: boolean) => void;
};

const Turntable = ({ setIsOn }: Props) => {
    const [isDragging, setIsDragging] = useState(false);
    const [angle, setAngle] = useState(0); // 톤암의 회전 각도 상태
    const tonearmRef = useRef<HTMLDivElement>(null);

    // 마우스 버튼이 눌리면 드래그 시작
    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
    };

    // 드래그 중일 때 톤암의 위치 업데이트
    const handleMouseMove = (e: React.MouseEvent) => {
        if (tonearmRef.current !== null && isDragging) {
            const rect = tonearmRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2; // 톤암 중심의 X 좌표
            const centerY = rect.top + rect.height / 2; // 톤암 중심의 Y 좌표

            // 마우스 위치와 톤암 중심점 간의 각도를 계산
            const radian = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            const degree = radian * (180 / Math.PI);

            setAngle(degree); // 각도를 상태에 저장
        }
    };

    // 마우스 버튼을 떼면 드래그 종료
    const handleMouseUp = () => {
        setIsDragging(false);

        // isOn 상태를 설정
        if (angle > 45) {
            // 각도가 45도 이상일 때
            setIsOn(true);
        } else {
            setIsOn(false);
        }
    };

    return (
        <div
            className="flex flex-col h-screen relative items-center select-none"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <div className="relative mt-8 bg-primary-SAND w-707px h-479px flex items-center">
                <div className="bg-black w-turntable h-turntable rounded-full flex justify-center items-center relative left-9">
                    <div className="bg-primary-PINK w-m_turntable h-m_turntable rounded-full flex justify-center items-center text-white" />
                    <span className="text-white font-extrabold bg-transparent absolute bottom-5.938rem right-2.938rem text-point cursor-default">
                        Here!
                    </span>
                </div>
                <div
                    ref={tonearmRef}
                    className="absolute top-4 right-10 bg-transparent w-20px h-479px cursor-pointer"
                    style={{
                        transform: `rotate(${angle}deg)`, // 각도에 따라 톤암 회전
                        transformOrigin: "top", // 회전 중심을 톤암의 하단으로 설정
                    }}
                    onMouseDown={handleMouseDown}
                >
                    <div className="relative w-full h-full flex justify-center">
                        <div className="absolute top-1 bg-white w-20px h-437px"></div>
                        <div className="absolute bottom-6 bg-white w-40px h-89px" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Turntable;
