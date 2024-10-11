import { Navigate, Outlet } from "react-router-dom";
// import { IUser } from "../domain/entities/User";
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";

type Props = {
    // user: IUser | null;
    user: "string";
};

const ProtectedLayout = ({ user }: Props) => {
    // 로그인이 되어 있지 않으면 로그인 페이지로 이동

    if (!user) {
        return <Navigate to="/login" />;
    }
    return (
        <>
            <div className="w-screen">
                <Navbar />
                <Banner />
                <main>
                    <Outlet />
                </main>
            </div>
        </>
    );
};

export default ProtectedLayout;
