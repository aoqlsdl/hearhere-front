import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Command from "../Command";
import { useRecoilState } from "recoil";
import { isOnState, countState } from "../../recoil/turntable/atom";

const Turntable = () => {
    const [isOn, setIsOn] = useRecoilState(isOnState);
    const [count, setCount] = useRecoilState(countState);
    const [isDragging, setIsDragging] = useState(false);
    const [angle, setAngle] = useState(0); // 톤암의 회전 각도 상태
    const tonearmRef = useRef<HTMLDivElement>(null);

    // 마우스 버튼이 눌리면 드래그 시작
    const handleMouseDown = () => {
        setIsDragging(true);
    };

    // 드래그 중일 때 톤암의 위치 업데이트
    const handleMouseMove = (e: React.MouseEvent) => {
        if (tonearmRef.current !== null && isDragging) {
            // fmi: getBoundingClientRect() 메서드는 요소의 크기와 뷰포트에 상대적인 위치 정보를 제공하는 DOMRect 객체를 반환한다.
            const rect = tonearmRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2; // 톤암 중심의 X 좌표
            const centerY = rect.top + rect.height / 2; // 톤암 중심의 Y 좌표

            // 마우스 위치와 톤암 중심점 간의 각도를 계산
            // fmi: atan2() 메서드는 지정된 x 및 y 좌표에 대한 역탄젠트 값을 반환한다.
            // atan2(y, x) 형식으로 작성해야 하므로 y좌표를 먼저 작성해야 한다.
            const radian = Math.atan2(e.clientY - centerY, e.clientX - centerX);
            let degree = radian * (180 / Math.PI);

            // 각도 범위를 제한하여 톤암이 지나치게 회전하지 않도록 함 (-60도 ~ +60도)
            if (degree < -60) degree = -60;
            if (degree > 60) degree = 60;

            setAngle(degree); // 각도를 상태에 저장
        }
    };

    // 마우스 버튼을 떼면 드래그 종료
    const handleMouseUp = () => {
        if (angle >= 40 && angle <= 50) {
            if (count === 0) {
                setCount(count + 1);
            }
            setIsOn(true);
        } else if (count === 0) {
            setIsOn(false);
        }
    };

    return (
        <motion.div
            className="flex flex-col w-[calc(100vw - 10px)] overflow-x-hidden h-screen relative items-center select-none"
            initial={{ y: 0 }} // 초기 위치 설정
            animate={isOn ? { y: "4.25rem" } : { y: 0 }} // isOn이 true일 때 아래로 이동
            transition={{ duration: 1, ease: "linear" }} // 애니메이션 지속 시간과 전환 설정
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
        >
            <motion.div
                className="relative mt-8 bg-primary-SAND w-[707px] h-[479px] flex items-center"
                animate={isOn ? { width: "100vw", height: "39.38rem" } : {}}
                transition={{ duration: 1, ease: "linear" }}
            >
                <motion.div
                    className="bg-black w-turntable h-turntable rounded-full flex justify-center items-center relative left-9 overflow-hidden"
                    animate={isOn ? { x: "-5.69rem", width: "36.38rem", height: "36.38rem" } : {}}
                    transition={{ duration: 1, ease: "linear" }}
                >
                    <motion.div
                        className="bg-primary-PINK w-m_turntable h-m_turntable rounded-full flex justify-center items-center text-white"
                        animate={isOn ? { width: "16.06rem", height: "16.06rem" } : {}}
                        transition={{ duration: 1, ease: "linear" }}
                    />
                    <motion.span
                        className="text-white font-extrabold bg-transparent absolute bottom-[5.938rem] right-[2.938rem] text-point cursor-default"
                        initial={{ opacity: 1 }} // 초기 상태는 불투명
                        animate={isOn ? { opacity: 0 } : { opacity: 1 }} // isOn이 true일 때 서서히 투명해짐
                        transition={{ duration: 1 }} // 애니메이션 지속 시간 설정
                    >
                        Here!
                    </motion.span>
                </motion.div>
                <AnimatePresence>
                    {!isOn && (
                        <motion.div
                            ref={tonearmRef}
                            className="absolute top-4 right-10 bg-transparent w-[20px] h-[479px] cursor-pointer"
                            style={{
                                transform: `rotate(${angle}deg)`, // 각도에 따라 톤암 회전
                                transformOrigin: "top", // 회전 중심점: 톤암의 상단
                            }}
                            onMouseDown={handleMouseDown}
                        >
                            <motion.div
                                className="absolute top-1 w-[20px] h-[437px] bg-white"
                                initial={{ opacity: 1 }} // 초기 상태: 불투명
                                animate={isOn ? { opacity: 0 } : { opacity: 1 }} // isOn이 true일 때 투명하게 변경
                                transition={{ duration: 0.5 }}
                            />
                            <motion.div
                                className="absolute bottom-6 w-[40px] h-[89px] bg-white -right-[10px]"
                                initial={{ opacity: 1 }} // 초기 상태: 불투명
                                animate={isOn ? { opacity: 0 } : { opacity: 1 }} // isOn이 true일 때 투명하게 변경
                                transition={{ duration: 0.5 }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
            {isOn && <Command />}
        </motion.div>
    );
};

export default Turntable;
