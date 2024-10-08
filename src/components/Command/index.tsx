import { motion } from "framer-motion";
import { useState } from "react";

const Command = () => {
    const [inputValue, setInputValue] = useState("");

    const handleButtonClick = (text: string) => {
        setInputValue(text); // 버튼 클릭 시 입력 필드에 텍스트 삽입
    };
    return (
        <motion.div
            className="flex flex-col w-[55.42%] items-center mt-8 space-y-4 absolute top-[6.38rem] right-[3%]"
            initial={{ opacity: 0, y: 20 }} // 초기 상태: 투명하고 아래쪽으로 약간 이동
            animate={{ opacity: 1, y: 0 }} // 애니메이션: 완전히 불투명해지고 원래 위치로 이동
            transition={{ delay: 1, duration: 1, ease: "easeInOut" }} // 애니메이션 지속 시간 설정
        >
            <motion.div className="w-full h-[12.06rem] bg-primary-BEIGE100 relative">
                {/* todo: onSubmit={} 추가 */}
                <form className="w-full h-[12.06rem] bg-transparent relative">
                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Imagine yourself 'Here', where you most desire to be."
                        className="border-none w-full p-7 mb-0 bg-primary-BEIGE100 text-[1.63rem] lg:text-base 1440:text-[26px]"
                    />
                    <button
                        type="submit"
                        className="bg-primary-PINK w-[8.38rem] p-0 text-white absolute bottom-[1.81rem] right-[1.81rem] lg:h-10 lg:text-base lg:rounded-md 1440:rounded-[15px] 1440:h-16 1440:text-[1.62rem] "
                    >
                        Hear
                    </button>
                </form>
            </motion.div>
            <button
                type="button"
                onClick={() =>
                    handleButtonClick("Dense forest, birds chirping, waterfall cascading down")
                }
                className="w-full p-4 bg-primary-BEIGE200 text-primary-BEIGE300 drop-shadow-lg rounded-lg text-left lg:text-base 1440:text-[26px]"
            >
                ♪ Dense forest, birds chirping, waterfall cascading down
            </button>
            <button
                type="button"
                onClick={() =>
                    handleButtonClick("Summer Hawaii wave, dolphin calls, people giggling")
                }
                className="w-full p-4 bg-primary-BEIGE200 text-primary-BEIGE300 drop-shadow-lg rounded-lg text-left lg:text-base 1440:text-[26px]"
            >
                ♪ Summer Hawaii wave, dolphin calls, people giggling
            </button>
            <button
                type="button"
                onClick={() =>
                    handleButtonClick("City drive at midnight, radio sound, car driving")
                }
                className="w-full p-4 bg-primary-BEIGE200 text-primary-BEIGE300 drop-shadow-lg rounded-lg text-left lg:text-base 1440:text-[26px]"
            >
                ♪ City drive at midnight, radio sound, car driving
            </button>
        </motion.div>
    );
};

export default Command;
