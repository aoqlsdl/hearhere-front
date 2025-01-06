import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { titleSave } from "../../api/services/asmrServices";
// import { useParams } from "react-router-dom";

const CustomBanner = () => {
    const { ref, inView } = useInView({
        triggerOnce: false,
        threshold: 0.8,
    });

    // const asmrId = useParams(); // URL 파라미터 가져오기

    const [title, setTitle] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    // localStorage에서 asmrData를 가져와 title 설정
    let asmrData: any;
    useEffect(() => {
        const storedAsmrData = localStorage.getItem("asmrData");
        if (storedAsmrData) {
            const parsedData = JSON.parse(storedAsmrData);
            setTitle(parsedData.title || ""); // 제목 설정
        }
        asmrData = storedAsmrData;
    }, []);

    const handleTitleUpdate = async () => {
        try {
            const response = await titleSave(asmrData.asmrId, asmrData.title);

            if (response) {
                alert("Successfully saved!");
                // setIsMessageAppear(true);
                // setTimeout(() => {
                //     setIsMessageAppear(false);
                // }, 2000);
            } else {
                setErrorMessage("저장 실패");
            }
        } catch (error) {
            setErrorMessage("요청 처리 중 오류가 발생했습니다.");
            console.log(errorMessage);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value); // 입력 값 변경 시 상태 업데이트
    };

    const save = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
                    className="bg-transparent border-none"
                    onChange={handleInputChange}
                    onKeyDown={save}
                />
            </motion.p>
        </div>
    );
};

export default CustomBanner;
