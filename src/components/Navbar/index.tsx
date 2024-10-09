import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { isOnState } from "../../recoil/turntable/atom";
// import { IUser } from "../../domain/entities/User";

// type Props = {
//     user: IUser | null;
// };

// todo: const Navbar = ({ user }: Props) => {
const Navbar = () => {
    const isOn = useRecoilState(isOnState);

    return (
        <motion.nav
            className="flex justify-between top-0 w-[calc(100vw - 10px)] overflow-x-hidden h-[4.25rem]"
            initial={{ opacity: 0, y: 0 }} // 초기 상태: 투명하고 위로 이동
            animate={isOn ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }} // isOn에 따라 나타남/사라짐
            transition={{ duration: 1, ease: "easeInOut" }} // 애니메이션 지속 시간과 전환 설정
        >
            <div>{/* {user && <div>Hi, {user.name}</div>} */}</div>
            <div className="flex flex-row space-x-4 items-center mr-9">
                <NavLink to="/" className="lg:font-extralight 1440:text-[23px]">
                    Home
                </NavLink>
                <NavLink to="/login" className="lg:font-extralight 1440:text-[23px]">
                    Login/Sign in
                </NavLink>
                <NavLink to="/library" className="lg:font-extralight 1440:text-[23px]">
                    My Library
                </NavLink>
            </div>
        </motion.nav>
    );
};

export default Navbar;
