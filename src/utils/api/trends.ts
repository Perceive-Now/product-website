import axiosInstance from "../axios";

/**
 *
 */
export async function getTechnologyTrends() {
    const response = await axiosInstance.get<ITrendResponse>(
        "/trends/results"
    );

    return response.data;
}

/**
 * Interfaces
 */
interface ITrendItem {
    uuid: string;
    name: string;
    description: string;
}

interface ITrendData {
    respText: string;
}

interface ITrendResponse {
    data: ITrendData;
    trendsList: ITrendItem[];
}