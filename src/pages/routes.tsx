import { Route, Routes as Router } from "react-router-dom";
import ProtectedLayout from "./ProtectedLayout";
import Layout from "./Layout";
import Home from "./Home";
import Library from "./Library";
import Login from "./Login";
import Player from "./Player";
import Result from "./Result";
import Customize from "./Customize";
import AuthLayout from "./AuthLayout";
import Signup from "./SignUp";
import { useRecoilState } from "recoil";
import { userState } from "../recoil/user/atom";
import LoginProcess from "./LoginProcess";

const Routes = () => {
    // 로그인 여부에 따라 레이아웃 변경
    const user = useRecoilState(userState)[0];

    return (
        <Router>
            <Route path="/login/save" element={<LoginProcess />} />
            <Route element={<ProtectedLayout username={user.username} />}>
                <Route path="player/*" element={<Player />} />
                <Route path="library/*" element={<Library />} />
            </Route>
            <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="result" element={<Result />} />
                <Route path="customization/*" element={<Customize />} />
            </Route>
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>
        </Router>
    );
};

export default Routes;
