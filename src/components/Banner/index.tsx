import { motion } from "framer-motion";
// import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useLocation } from "react-router-dom";

const Banner = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.8,
    });

    const path = useLocation().pathname;
    const title = path === "/library" ? "My Library" : "Hear Here";

    // useEffect(() => {
    //     chooseText();
    // }, []);

    return (
        <div
            ref={ref}
            className="w-screen h-[12.56rem] flex flex-col justify-center text-center select-none mt-[4.25rem]"
        >
            <motion.h1
                className="text-[5rem] text-primary-BLACK100 font-[medium] leading-[5rem]"
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
                transition={{ duration: 0.1, ease: "linear" }} // 애니메이션 설정
            >
                {title}
            </motion.h1>
            <motion.p
                className="text-[1.81rem] text-primary-BLACK200 font-extralight"
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
