import axiosInstance from "../../axios";

/**
 *
 */
export async function getDeepSearchFundersList(options: IGetFundersListOptions) {
  const queryParams = new URLSearchParams();
  queryParams.append("q", options.keywords.join(","));
  queryParams.append("year", options.year.toString());
  queryParams.append("limit", options.limit.toString());
  queryParams.append("offset", options.offset.toString());

  const response = await axiosInstance.get<IDeepSearchFundersListResponse>(
    `/api/v1/ds-api/deepsearch/funding-search/?${queryParams.toString()}`,
  );

  return response.data.data;
}

interface IGetFundersListOptions {
  keywords: string[];
  year: number;
  limit: number;
  offset: number;
}
//
interface IDeepSearchFundersListResponse {
  data: {
    data: IDeepSearchFunderListItem[];
  };
}

export interface IDeepSearchFunderListItem {
  _id: string;
  title: string;
  abstract: string;
  funding: number;
  funding_type: string;
  award_date: string;
}
