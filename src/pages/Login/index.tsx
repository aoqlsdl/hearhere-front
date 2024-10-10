import LoginLeft from "../../components/Login/left";
import LoginRight from "../../components/Login/right";

const Login = () => {
    return (
        <div className="w-screen h-screen flex flex-row">
            <LoginLeft />
            <LoginRight />
        </div>
    );
};

export default Login;
