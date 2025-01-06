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
    const subtitle = "Whatever You Want, Hear Here.";

    return (
        <div
            ref={ref}
            className="w-screen h-[12.56rem] flex flex-col justify-center text-center select-none mt-[4.25rem]"
        >
            <motion.h1
                className="text-[5rem] text-primary-BLACK100 font-pre_500 font-medium leading-[5rem]"
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
                transition={{ duration: 0.1, ease: "linear" }} // 애니메이션 설정
            >
                {title}
            </motion.h1>
            {/* {path.includes("/customization") ? (
                <motion.p
                    className="text-[1.81rem] text-primary-PINK font-extralight"
                    initial={{ opacity: 0, y: -20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
                    transition={{ duration: 0.1, ease: "linear" }}
                >
                    {subtitle}
                </motion.p>
            ) : ( */}
            <motion.p
                className="font-pre_100 font-extralight text-[1.81rem] text-primary-BLACK200 "
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
                transition={{ duration: 0.1, ease: "linear" }}
            >
                {subtitle}
            </motion.p>
            {/* )} */}
        </div>
    );
};

export default Banner;
