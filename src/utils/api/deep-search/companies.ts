import axiosInstance from "../../axios";

/**
 *
 */
export async function getDeepSearchCompaniesPatentList(options: IGetDeepSearchOptions) {
  const queryParams = new URLSearchParams();
  if (options.limit) queryParams.append("limit", options.limit.toString());
  if (options.offset) queryParams.append("offset", options.offset.toString());

  queryParams.append("q", options.keywords.join(","));

  const response = await axiosInstance.get<IDeepSearchCompanyPatentListResponse>(
    `/api/v1/ds-api/deepsearch/patent-companywise-aggregations/?${queryParams.toString()}`,
  );

  return response.data.data.body;
}

/**
 *
 */
export async function getDeepSearchComapniesPatentItem(
  options: IGetDeepSearchCompanyPatentOptions,
) {
  const queryParams = new URLSearchParams();
  if (options.limit) queryParams.append("limit", options.limit.toString());
  if (options.offset) queryParams.append("offset", options.offset.toString());

  queryParams.append("q", options.keywords.join(","));
  queryParams.append("name", options.name);

  const response = await axiosInstance.get<IDeepSearchCompanyPatentItemListResponse>(
    `/api/v1/ds-api/deepsearch/company-patent-list/?${queryParams.toString()}`,
  );

  return response.data.data;
}

//
interface IGetDeepSearchOptions {
  limit?: number;
  offset?: number;
  keywords: string[];
}

interface IGetDeepSearchCompanyPatentOptions {
  limit?: number;
  offset?: number;
  keywords: string[];
  name: string;
}

export interface IDeepSearchCompanyPatentItem {
  key: string;
  count: number;
  inv_count: number;
  claim_sum: number;
}

interface IDeepSearchCompanyPatentListResponse {
  data: {
    statusCode: number;
    body: IDeepSearchCompanyPatentItem[];
  };
}

//
export interface IDeepSearchCompanyPatentSingleItem {
  _id: string;
  title: string;
  abstract: string;
  date: string;
  company: string;
}

interface IDeepSearchCompanyPatentItemListResponse {
  data: {
    count: number;
    data: IDeepSearchCompanyPatentSingleItem[];
  };
}
