import { http } from "../http";

// asmr 리스트 불러오기
export interface AsmrResponse {
    asmrId: number;
    title: string;
    musicUrl: string;
    musicVolumn: number;
    soundUrls: String[];
    soundVolumns: number[];
    soundPositions: number[][];
}

export const getAsmrList = async (): Promise<AsmrResponse[]> => {
    const response = await http.get("/asmr/my-asmr");
    return response.data;
};

// asmr 생성 및 저장
interface SoundDetail {
    soundId: number;
    url: string;
    length: string;
}

export interface AsmrGenerateResponse {
    asmrId: number;
    title: string;
    musicUrl: string;
    soundDetails: SoundDetail[];
}

export interface GenerateErrorResponse {
    error: string;
    message: string;
}

export interface AsmrSaveResponse {
    asmrId: number;
}

export interface SaveErrorResponse {
    code?: number;
    message: string;
    isSuccess: boolean;
}

// ASMR 생성 API 요청
export const fetchAsmrGenerate = async (
    userPrompt: string,
    isMusicIncluded: boolean = true // 기본값 true
): Promise<AsmrGenerateResponse | GenerateErrorResponse> => {
    try {
        const response = await http.post<AsmrGenerateResponse>(
            `/asmr/generate`,
            {
                userPrompt,
                isMusicIncluded: isMusicIncluded ? "1" : "0",
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        // 요청 성공 시 응답 데이터 반환
        return response.data;
    } catch (error: any) {
        // 서버 또는 네트워크 오류 처리
        if (error.response) {
            // 서버 응답에 따른 에러 처리
            return {
                error: error.response.data.error || "Unknown Error",
                message: error.response.data.message || "서버 오류가 발생했습니다.",
            };
        }

        // 네트워크 오류 처리
        return {
            error: "Network Error",
            message: "서버와의 통신 중 오류가 발생했습니다.",
        };
    }
};

export const asmrSave = async (
    asmrId: number,
    title: string,
    musicUrl: string,
    musicVolumn: number,
    soundUrls: string[],
    soundVolumns: number[],
    soundPositions: number[][]
): Promise<AsmrSaveResponse | SaveErrorResponse> => {
    try {
        const token = localStorage.getItem("accessToken"); // localhost에서 토큰 가져오기
        if (!token) {
            throw new Error("Authentication token is missing");
        }

        const requestData = {
            asmrId,
            title,
            musicUrl,
            musicVolumn: Math.floor(musicVolumn), // Ensure Integer
            soundUrls,
            soundVolumns: soundVolumns.map(Math.floor), // Ensure Integer
            soundPositions: soundPositions.map((arr) => arr.map(Math.floor)), // Ensure Nested Integer Array
        };

        // PATCH 요청
        const response = await http.patch<AsmrSaveResponse>(`/asmr/save`, requestData, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        // 요청 성공 시 응답 데이터 반환
        return response.data;
    } catch (message: any) {
        // 서버 또는 네트워크 오류 처리
        if (message.response) {
            // 서버 응답에 따른 에러 처리
            return {
                code: message.response.data.code || "",
                message: message.response.data.message || "서버 오류가 발생했습니다.",
                isSuccess: message.response.data.isSuccess,
            };
        }

        // 네트워크 오류 처리
        return {
            message: "서버와의 통신 중 오류가 발생했습니다.",
            isSuccess: false,
        };
    }
};
