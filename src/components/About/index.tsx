import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const About = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.2, // 요소가 20% 이상 보일 때 트리거
    });

    return (
        <div
            ref={ref}
            className="bg-lps bg-cover bg-bottom w-[calc(100vw - 10px)] overflow-x-hidden h-[58.5rem] flex flex-col items-center relative"
        >
            <motion.h1
                className="text-[105px] text-white font-medium absolute top-9 select-none"
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }} // 뷰포트에 들어오면 색이 채워지고 제자리로
                transition={{ duration: 0.1, ease: "linear" }} // 애니메이션 설정
            >
                Hear Here
            </motion.h1>
            <motion.p
                className="text-subtitle text-primary-S_BLACK font-extralight select-none absolute top-[11.5rem]"
                initial={{ opacity: 0, y: 0 }} // 초기 상태: 투명하고 약간 위에 위치
                animate={inView ? { opacity: 1, y: 0 } : {}} // 뷰포트에 들어오면 색이 채워지고 제자리로
                transition={{ duration: 1, ease: "linear" }} // 지연 시간 추가
            >
                Whatever You Want, Hear Here.
            </motion.p>
            <motion.p className="text-center text-white absolute top-[22rem] text-[1.88rem] w-[28.13rem] select-none">
                You don’t have to go
                <br />
                anywhere.
                <br />
                Right <span className="font-extrabold">Here</span> is enough.
                <br />
                Make this place your own,
                <br />
                and <span className="font-extrabold">Hear Here.</span>
            </motion.p>
        </div>
    );
};

export default About;
