import axiosInstance from "../../axios";

/**
 *
 */
export async function getDeepSearchPatentList(options: IGetPatentListOptions) {
  const queryParams = new URLSearchParams();
  queryParams.append("q", options.keywords.join(","));
  queryParams.append("year", options.year.toString());
  queryParams.append("limit", options.limit.toString());
  queryParams.append("offset", options.offset.toString());
  queryParams.append("classification", options.classification);

  const response = await axiosInstance.get<IDeepSearchPatentListResponse>(
    `/api/v1/ds-api/deepsearch/patent-search/?${queryParams.toString()}`,
  );

  return response.data.data;
}

//
interface IGetPatentListOptions {
  keywords: string[];
  year: number;
  limit: number;
  offset: number;
  classification: "Academic" | "Industry";
}

export interface IDeepSearchPatentListItem {
  title: string;
  date: string;
  company: string;
  inventor: string;
  _id: string;
}

interface IDeepSearchPatentListResponse {
  data: {
    count: number;
    data: IDeepSearchPatentListItem[];
  };
}
