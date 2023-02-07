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
  data: {
    academic: IDeepSearchAcademicsPatentItem[];
    total: number;
  };
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
export async function getDeepSearchPatentAcademic(options: IGetDeepSearchUniversityOptions) {
  const queryParams = new URLSearchParams();
  if (options.name) queryParams.append("name", options.name);
  queryParams.append("limit", options.limit.toString());
  queryParams.append("offset", options.offset.toString());

  queryParams.append("q", options.keywords.join(","));

  const response = await axiosInstance.get<IDeepSearchAcademicPatentResponse>(
    `/api/v1/ds-api/deepsearch/academic-data/?${queryParams.toString()}`,
  );
  return response.data;
}

//
interface IGetDeepSearchUniversityOptions {
  name?: string;
  keywords: string[];
  limit: number;
  offset: number;
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
