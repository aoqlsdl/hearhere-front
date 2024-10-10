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

const Routes = () => {
    // 로그인 여부에 따라 레이아웃 변경
    const user = null;

    return (
        <Router>
            {user ? (
                <Route element={<ProtectedLayout user={user} />}>
                    <Route path="library/*" element={<Library />} />
                    <Route path="player/*" element={<Player />} />
                </Route>
            ) : (
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    {/* <Route path="login" element={<Login />} /> */}
                    <Route path="result" element={<Result />} />
                    <Route path="customization" element={<Customize />} />
                </Route>
            )}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Route>
        </Router>
    );
};

export default Routes;
