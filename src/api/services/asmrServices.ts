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
