import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
// import { IUser } from "../domain/entities/User";

// type Props = {
//     user: IUser | null;
// };

// todo: const Layout = ({ user }: Props) => {

const AuthLayout = () => {
    return (
        <>
            <Navbar />
            <main>
                <Outlet />
            </main>
        </>
    );
};

export default AuthLayout;
