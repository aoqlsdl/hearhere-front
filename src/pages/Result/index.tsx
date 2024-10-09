import { useState } from "react";
import Loading from "../../components/Loading";

const Result = () => {
    const [isLoading] = useState(true);
    return (
        <div className="w-screen h-[calc(100vh - 2.58rem)]">{isLoading ? <Loading /> : <></>}</div>
    );
};

export default Result;
