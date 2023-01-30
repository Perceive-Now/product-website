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

/**
 *
 */
export async function getDeepSearchPublicationItemDetail(source: string, id: string) {
  const response = await axiosInstance.get<IDeepSearchItemDetailResponse>(
    `/api/v1/ds-api/deepsearch/search-publication-search/?id=${id}&source=${
      source === "Open" ? "open" : "closed"
    }`,
  );
  const data = response.data.data;

  return {
    ...data,
    doi_url: data.doi_url || data.URL,
    authors: data.authors || data.author,
  };
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
  doi_url?: string;
  URL?: string;
  _id: string;
  abstract?: string;
}

interface IDeepSearchPublicationListResponse {
  data: {
    count: number;
    data: IDeepSearchPublicationListItem[];
  };
}

export interface IDeepSearchPublicationDetailItem {
  title: string;
  doi_url?: string;
  URL?: string;
  journal_name?: string;
  authors?: string[];
  author?: string[];
  published_date: string;
  abstract?: string;
}

//
interface IDeepSearchItemDetailResponse {
  data: IDeepSearchPublicationDetailItem;
}
