import axiosInstance from "../../axios";

/**
 *
 */
export async function getDeepSearchPatentAcademicList(options: IGetDeepSearchOptions) {
  const queryParams = new URLSearchParams();
  if (options.limit) queryParams.append("limit", options.limit.toString());
  if (options.offset) queryParams.append("offset", options.offset.toString());

  queryParams.append("q", options.keywords.join(","));

  const response = await axiosInstance.get<IDeepSearchInventorsPatentListResponse>(
    `/api/v1/ds-api/deepsearch/patent-academic-list/?${queryParams.toString()}`,
  );

  return response.data.data;
}

//
interface IGetDeepSearchOptions {
  limit?: number;
  offset?: number;
  year: number;
  keywords: string[];
}

interface IDeepSearchInventorsPatentListResponse {
  data: IDeepSearchAcademicsPatentItem[];
}

export interface IDeepSearchAcademicsPatentItem {
  key: string;
  count: number;
  inv_count: number;
  claim_sum: number;
}

/**
 *
 */
export async function getDeepSearchPatentAcademic(options: IGetDeepSearchInventorOptions) {
  const queryParams = new URLSearchParams();
  if (options.name) queryParams.append("name", options.name);

  queryParams.append("q", options.keywords.join(","));

  const response = await axiosInstance.get<IDeepSearchAcademicPatentResponse>(
    `/api/v1/ds-api/deepsearch/academic-data/?${queryParams.toString()}`,
  );
  return response.data;
}

//
interface IGetDeepSearchInventorOptions {
  name?: string;
  keywords: string[];
}

interface IDeepSearchInventorPatentResponseData {
  count: number;
  data: IDeepSearchInventorPatentItem[];
}
interface IDeepSearchAcademicPatentResponse {
  data: IDeepSearchInventorPatentResponseData;
}

export interface IDeepSearchInventorPatentItem {
  _id: string;
  title: string;
  abstract: string;
  date: string;
  company: string;
}
