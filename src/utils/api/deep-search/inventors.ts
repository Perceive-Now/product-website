import axiosInstance from "../../axios";

/**
 *
 */
export async function getDeepSearchInventorsPatentList(options: IGetDeepSearchOptions) {
  const queryParams = new URLSearchParams();
  if (options.limit) queryParams.append("limit", options.limit.toString());
  if (options.offset) queryParams.append("offset", options.offset.toString());

  queryParams.append("q", options.keywords.join(","));

  const response = await axiosInstance.get<IDeepSearchInventorsPatentListResponse>(
    `/api/v1/ds-api/deepsearch/patent-inventor-list/?${queryParams.toString()}`,
  );

  return response.data.data;
}

//
interface IGetDeepSearchOptions {
  limit?: number;
  offset?: number;
  keywords: string[];
}

interface IDeepSearchInventorsPatentListResponse {
  data: IDeepSearchInventorsPatentItem[];
}

export interface IDeepSearchInventorsPatentItem {
  first_name: string;
  last_name: string;
  patent_count: number;
  claim_sum: number;
  company_name: string;
}

/**
 *
 */
export async function getDeepSearchInventorPatent(options: IGetDeepSearchInventorOptions) {
  const queryParams = new URLSearchParams();
  if (options.firstName) queryParams.append("first_name", options.firstName);
  if (options.lastName) queryParams.append("last_name", options.lastName);

  queryParams.append("q", options.keywords.join(","));

  const response = await axiosInstance.get<IDeepSearchInventorsPatentListResponse>(
    `/api/v1/ds-api/deepsearch/patent-inventor-list/?${queryParams.toString()}`,
  );

  return response.data.data;
}

//
interface IGetDeepSearchInventorOptions {
  firstName: string;
  lastName?: string;
  keywords: string[];
}

interface IDeepSearchInventorsPatentListResponse {
  count: number;
  data: IDeepSearchInventorsPatentItem[];
}

export interface IDeepSearchInventorsPatentItem {
  _id: string;
  title: string;
  abstract: string;
  date: string;
  company: string;
  inventor: number;
}
