import { NavLink, useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../recoil/user/atom";
import useLogout from "../../hooks/auth/useLogout";

const Navbar = () => {
    const user = useRecoilValue(userState);
    const location = useLocation();
    const logout = useLogout();

    return (
        <nav className="flex justify-between top-0 w-screen h-[4.25rem] fixed z-50">
            <div className="flex justify-center items-center ml-9">
                {user.accessToken === null ? (
                    <></>
                ) : (
                    <div className="1440:text-[23px]">
                        Hi, <span className="font-bold">{user.username}</span>
                    </div>
                )}
            </div>
            <div className="flex flex-row space-x-4 items-center mr-9">
                {user.accessToken === null ? (
                    <NavLink to="/login" className="lg:font-extralight 1440:text-[23px]">
                        Login/Sign in
                    </NavLink>
                ) : (
                    <button
                        onClick={logout}
                        type="submit"
                        className="lg:font-extralight 1440:text-[23px]"
                    >
                        Logout
                    </button>
                )}

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
