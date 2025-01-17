import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { titleSave } from "../../api/services/asmrServices";

const CustomBanner = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.8,
    });

    const [title, setTitle] = useState<string>("");
    const [asmrData, setAsmrData] = useState<any>(null);

    // localStorage에서 asmrData를 가져와 title 설정
    useEffect(() => {
        const storedAsmrData = localStorage.getItem("asmrData");
        if (storedAsmrData) {
            const parsedData = JSON.parse(storedAsmrData);
            setAsmrData(parsedData);
            setTitle(parsedData.title || "");
        }
    }, []);

    const handleTitleUpdate = async () => {
        try {
            const response = await titleSave(asmrData.asmrId, title);

            if (response) {
                alert("Successfully updated title!");
                // setIsMessageAppear(true);
                // setTimeout(() => {
                //     setIsMessageAppear(false);
                // }, 2000);
            }
        } catch (error) {
            console.log(error);
            alert("Failed to update title.");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newTitle = e.target.value;
        setTitle(newTitle); // 입력 값 변경 시 상태 업데이트
        if (asmrData) {
            setAsmrData({ ...asmrData, title: newTitle }); // asmrData.title 동기화
        }
    };

    const saveTitle = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleTitleUpdate();
        }
    };

    return (
        <div
            ref={ref}
            className="w-screen h-[12.56rem] flex flex-col justify-center text-center select-none mt-[4.25rem]"
        >
            <motion.h1
                className="text-[5rem] text-primary-BLACK100 font-pre_500 font-medium leading-[5rem]"
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
                transition={{ duration: 0.1, ease: "linear" }} // 애니메이션 설정
            >
                Customize here
            </motion.h1>
            <motion.p
                className="text-[1.81rem] text-primary-PINK font-pre_100 font-extralight"
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 0 }}
                transition={{ duration: 0.1, ease: "linear" }}
            >
                <input
                    value={title}
                    className="bg-transparent border-none w-[40rem] text-center"
                    onChange={handleInputChange}
                    onKeyDown={saveTitle}
                />
            </motion.p>
        </div>
    );
};

export default CustomBanner;
