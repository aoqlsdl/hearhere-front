import { useEffect, useState } from "react";
import { AsmrResponse, getAsmrList } from "../../api/services/asmrServices";

export const useAsmrList = () => {
    const [data, setData] = useState<AsmrResponse[] | null>(null);
    // const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAsmrList = async () => {
            try {
                // setLoading(true);
                const asmrList = await getAsmrList();
                setData(asmrList);
                setError(null);
            } catch (err: any) {
                if (err.response?.status === 401) {
                    setError("Invalid Token: 유효하지 않은 토큰입니다.");
                } else {
                    setError("An error occurred while fetching ASMR list.");
                }
            }
        };

        fetchAsmrList();
    }, []);

    return { data, error };
};
