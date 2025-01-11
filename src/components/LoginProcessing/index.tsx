import { useState } from "react";
import LoginProcessingModal from "../LoginProcessingModal";

const LoginProcessing = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    return <>{isModalOpen && <LoginProcessingModal setIsModalOpen={setIsModalOpen} />}</>;
};

export default LoginProcessing;
