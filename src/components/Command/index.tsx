import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Command = () => {
    const [inputValue, setInputValue] = useState("");
    const navigate = useNavigate();

    const handleButtonClick = (text: string) => {
        setInputValue(text); // 버튼 클릭 시 입력 필드에 텍스트 삽입
    };

    const handleSubmit = () => {
        navigate("/result", { state: { userPrompt: inputValue } });
    };
    return (
        <motion.div
            className="flex flex-col w-[55.42%] items-center mt-8 space-y-4 absolute top-[6.38rem] right-[3%]"
            initial={{ opacity: 0, y: 20 }} // 초기 상태: 투명하고 아래쪽으로 약간 이동
            animate={{ opacity: 1, y: 0 }} // 애니메이션: 완전히 불투명해지고 원래 위치로 이동
            transition={{ delay: 1, duration: 1, ease: "linear" }} // 애니메이션 지속 시간 설정
        >
            <motion.div className="w-[55.42vw] h-[12.06rem] bg-primary-BEIGE100 relative">
                {/* todo: onSubmit={} 추가 */}
                <form className="w-full h-[12.06rem] bg-transparent relative">
                    <textarea
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Imagine yourself 'Here', where you most desire to be."
                        className="border-none w-full p-7 mb-0 bg-primary-BEIGE100 lg:text-base 1440:text-[26px] resize-none scrollbar-hide"
                    />
                    <button
                        type="button"
                        className="bg-white hover:bg-primary-PINK w-[6.88rem] h-10 rounded-[15px] p-0 text-primary-PINK hover:text-white absolute bottom-[1.81rem] right-[1.81rem] lg:h-10 lg:text-base 1440:h-16 1440:text-[1.62rem] drop-shadow-[0_2px_1px_rgba(0,0,0,0.25)]"
                        onClick={handleSubmit}
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
                className="w-[55.42vw] p-4 bg-primary-BEIGE200 text-primary-BEIGE300 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-lg text-left lg:text-base 1440:text-[26px] hover:bg-primary-BEIGE100 hover:text-primary-GRAY300"
            >
                ♪ Dense forest, birds chirping, waterfall cascading down
            </button>
            <button
                type="button"
                onClick={() =>
                    handleButtonClick("Summer Hawaii wave, dolphin calls, people giggling")
                }
                className="w-[55.42vw] p-4 bg-primary-BEIGE200 text-primary-BEIGE300 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-lg text-left lg:text-base 1440:text-[26px] hover:bg-primary-BEIGE100 hover:text-primary-GRAY300"
            >
                ♪ Summer Hawaii wave, dolphin calls, people giggling
            </button>
            <button
                type="button"
                onClick={() =>
                    handleButtonClick("City drive at midnight, radio sound, car driving")
                }
                className="w-[55.42vw] p-4 bg-primary-BEIGE200 text-primary-BEIGE300 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-lg text-left lg:text-base 1440:text-[26px] hover:bg-primary-BEIGE100 hover:text-primary-GRAY300"
            >
                ♪ City drive at midnight, radio sound, car driving
            </button>
        </motion.div>
    );
};

export default Command;
