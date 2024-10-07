import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import { IUser } from "../domain/entities/User";
import { useState } from "react";
import Turntable from "../components/Turntable";

type Props = {
    user: IUser | null;
};

// todo: const Layout = ({ user }: Props) => {
const Layout = () => {
    const [isOn, setIsOn] = useState(false);
    return (
        <>
            {!isOn ? ( // isOn이 false일 때는 Banner와 Turntable만 보여줌
                <>
                    <Banner />
                    <Turntable setIsOn={setIsOn} /> {/* Turntable에 상태 변경 함수 전달 */}
                </>
            ) : (
                // isOn이 true일 때는 Navbar, Banner, 그리고 main을 보여줌
                <>
                    <Navbar />
                    <Banner />
                    <main>
                        <Outlet />
                    </main>
                </>
            )}
        </>
    );
};

export default Layout;
