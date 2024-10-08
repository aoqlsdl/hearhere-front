import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { isOnState } from "../../recoil/turntable/atom";

const Banner = () => {
    const [isOn] = useRecoilState(isOnState);
    return (
        <motion.div
            className="w-screen flex flex-col justify-center text-center select-none"
            initial={{ y: 0 }} // 초기 위치 설정
            animate={isOn ? { y: "4.25rem" } : { y: 0 }} // isOn이 true일 때 아래로 이동
            transition={{ duration: 1, ease: "easeInOut" }} // 애니메이션 지속 시간과 전환 설정
        >
            <h1 className="text-title text-primary-L_BLACK font-medium">Hear Here</h1>
            <p className="text-subtitle text-primary-S_BLACK font-extralight">
                Whatever You Want, Hear Here.
            </p>
        </motion.div>
    );
};

export default Banner;
