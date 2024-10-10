import SignupLeft from "../../components/Signup/left";
import SignupRight from "../../components/Signup/right";

const Signup = () => {
    return (
        <div className="w-screen h-screen flex flex-row">
            <SignupLeft />
            <SignupRight />
        </div>
    );
};

export default Signup;
