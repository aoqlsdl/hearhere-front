import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import { useRecoilState } from "recoil";
import { isOnState } from "../recoil/turntable/atom";

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
