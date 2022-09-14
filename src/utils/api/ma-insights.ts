import axiosInstance from "../axios";

/**
 *
 */
export async function getMAInsights() {
    const response = await axiosInstance.get<IMAInsightsResponse>(
        "/ma/results"
    );

    return response.data.data;
}

/**
 * Interfaces
 */
interface IRankItem {
    rank: number;
    uuid: string;
    name: string;
    description: string;
    score: number;
}

interface IInsight {
    respText: string;
    rankedList: IRankItem[];
}

interface IMAInsights {
    patentsTop5: IInsight;
    companiesTop5: IInsight;
    universitiesTop5: IInsight;
}

interface IMAInsightsResponse {
    data: IMAInsights;
}
