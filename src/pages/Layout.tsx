import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import { useRecoilState } from "recoil";
import { isOnState } from "../recoil/turntable/atom";
// import { IUser } from "../domain/entities/User";

// type Props = {
//     user: IUser | null;
// };

// todo: const Layout = ({ user }: Props) => {

const Layout = () => {
    const [isOn] = useRecoilState(isOnState);
    return (
        <>
            {isOn && <Navbar />}
            <Banner />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default Layout;
