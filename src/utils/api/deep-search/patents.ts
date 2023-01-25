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

  const response = await axiosInstance.get<IDeepSearchPatentListResponse>(
    `/api/v1/ds-api/deepsearch/patent-deep-search/?${queryParams.toString()}`,
  );

  return response.data.data;
}

//
interface IGetPatentListOptions {
  keywords: string[];
  year: number;
  limit: number;
  offset: number;
}

export interface IDeepSearchPatentListItem {
  title: string;
  date: string;
  company: string;
  inventor: string;
}

interface IDeepSearchPatentListResponse {
  data: IDeepSearchPatentListItem[];
}
