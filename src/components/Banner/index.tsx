import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
// import { useRecoilState } from "recoil";
// import { isOnState } from "../../recoil/turntable/atom";

const Banner = () => {
    // const [isOn] = useRecoilState(isOnState);
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.9,
    });

    return (
        <div
            ref={ref}
            className="w-screen h-full flex flex-col justify-center text-center select-none"
            // initial={{ y: 0 }} // 초기 위치 설정
            // animate={isOn ? { y: "4.25rem" } : { y: 0 }} // isOn이 true일 때 아래로 이동
            // transition={{ duration: 1, ease: "linear" }} // 애니메이션 지속 시간과 전환 설정
        >
            <motion.h1
                className="text-title text-primary-BLACK100 font-medium"
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
                transition={{ duration: 0.1, ease: "linear" }} // 애니메이션 설정
            >
                Hear Here
            </motion.h1>
            <motion.p
                className="text-subtitle text-primary-BLACK200 font-extralight"
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
                transition={{ duration: 0.1, ease: "linear" }}
            >
                Whatever You Want, Hear Here.
            </motion.p>
        </div>
    );
};

export default Banner;
