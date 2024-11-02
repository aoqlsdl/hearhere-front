import { Navigate, Outlet, useLocation } from "react-router-dom";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import BackNavbar from "../components/Navbar/index-back";

type Props = {
    username: string | null;
};

const ProtectedLayout = ({ username }: Props) => {
    // 로그인이 되어 있지 않으면 로그인 페이지로 이동

    if (!username) {
        return <Navigate to="/login" />;
    }

    const location = useLocation().pathname;

    return (
        <>
            <div className="w-screen">
                {location.includes("player") ? <BackNavbar /> : <Navbar />}
                <Banner />
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default ProtectedLayout;
