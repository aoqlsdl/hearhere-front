import { NavLink } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useRecoilState } from "recoil";
// import { isOnState } from "../../recoil/turntable/atom";
// import { IUser } from "../../domain/entities/User";

// type Props = {
//     user: IUser | null;
// };

// todo: const Navbar = ({ user }: Props) => {
const Navbar = () => {
    // const isOn = useRecoilState(isOnState);

    return (
        <nav
            className="flex justify-between top-0 w-screen h-[4.25rem] fixed z-50"
            // initial={{ opacity: 0, y: 0 }} // 초기 상태: 투명하고 위로 이동
            // animate={isOn ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }} // isOn에 따라 나타남/사라짐
            // transition={{ duration: 1, ease: "linear" }} // 애니메이션 지속 시간과 전환 설정
        >
            <div>{/* {user && <div>Hi, {user.name}</div>} */}</div>
            <div className="flex flex-row space-x-4 items-center mr-9">
                <NavLink to="/login" className="lg:font-extralight 1440:text-[23px]">
                    Login/Sign in
                </NavLink>
                <NavLink to="/" className="lg:font-extralight 1440:text-[23px]">
                    Home
                </NavLink>
                <NavLink to="/library" className="lg:font-extralight 1440:text-[23px]">
                    My Library
                </NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
