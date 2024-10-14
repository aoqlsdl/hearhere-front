import { useEffect } from "react";

export const useScrollBlock = () => {
    useEffect(() => {
        // 모달이 열릴 때 스크롤을 막기 위해 body에 overflow-hidden 클래스를 추가
        document.body.classList.add("overflow-hidden");

        // 모달이 닫힐 때 overflow-hidden 클래스를 제거
        return () => {
            document.body.classList.remove("overflow-hidden");
        };
    }, []);
};
