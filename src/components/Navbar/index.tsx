import { NavLink } from "react-router-dom";
// import { IUser } from "../../domain/entities/User";

// type Props = {
//     user: IUser | null;
// };

// todo: const Navbar = ({ user }: Props) => {
const Navbar = () => {
    return (
        <nav className="flex justify-between">
            <div>{/* {user && <div>Hi, {user.name}</div>} */}</div>
            <div className="flex flex-row">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/login">Login/Sign in</NavLink>
                <NavLink to="/library">My Library</NavLink>
            </div>
        </nav>
    );
};

export default Navbar;
