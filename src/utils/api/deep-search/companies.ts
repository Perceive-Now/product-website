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

//
interface IGetDeepSearchOptions {
  limit?: number;
  offset?: number;
  keywords: string[];
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
