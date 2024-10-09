import { useRecoilState } from "recoil";
import About from "../../components/About";
import Turntable from "../../components/Turntable";
import { isOnState } from "../../recoil/turntable/atom";

const Home = () => {
    const isOn = useRecoilState(isOnState);
    return (
        <div className="w-[calc(100vw - 10px)] overflow-x-hidden">
            <Turntable />
            {isOn && <About />}
        </div>
    );
};

export default Home;
