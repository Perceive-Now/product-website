import axiosInstance from "../../axios";

/**
 *
 */
export async function getDeepSearchPublicationList(options: IGetPublicationListOptions) {
  const queryParams = new URLSearchParams();
  queryParams.append("q", options.keywords.join(","));
  queryParams.append("year", options.year.toString());
  queryParams.append("limit", options.limit.toString());
  queryParams.append("offset", options.offset.toString());
  if (options.classification === "Open") {
    queryParams.append("source", "open");
  } else {
    queryParams.append("source", "closed");
    queryParams.append("classification", options.classification);
  }

  const response = await axiosInstance.get<IDeepSearchPublicationListResponse>(
    `/api/v1/ds-api/deepsearch/publication-search/?${queryParams.toString()}`,
  );

  return response.data.data;
}

//
interface IGetPublicationListOptions {
  keywords: string[];
  year: number;
  limit: number;
  offset: number;
  classification: "Academic" | "Industry" | "Open";
}

export interface IDeepSearchPublicationListItem {
  title: string;
  doi_url: string;
  _id: string;
  abstract?: string;
}

interface IDeepSearchPublicationListResponse {
  data: {
    count: number;
    data: IDeepSearchPublicationListItem[];
  };
}
