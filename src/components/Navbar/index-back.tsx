import { NavLink } from "react-router-dom";

const BackNavbar = () => {
    return (
        <nav className="flex justify-between top-0 w-screen h-[4.25rem] fixed z-50">
            <NavLink
                to="/library"
                className="h-[4.25rem] leading-[4.25rem] font-light 1440:text-[1.44rem] ml-9"
            >
                <span className="font-extrabold">←</span> Go back to My Library
            </NavLink>
            <div className="flex flex-row space-x-4 items-center mr-9">
                <NavLink to="/login" className="lg:font-extralight 1440:text-[1.44rem]">
                    Login/Sign in
                </NavLink>
                <NavLink to="/" className="lg:font-extralight 1440:text-[1.44rem]">
                    Home
                </NavLink>
                <NavLink to="/library" className="lg:font-extralight 1440:text-[1.44rem]">
                    My Library
                </NavLink>
            </div>
        </nav>
    );
};

export default BackNavbar;
