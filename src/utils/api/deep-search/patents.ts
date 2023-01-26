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

/**
 *
 */
export async function getDeepSearchPatentItemDetail(id: string) {
  const response = await axiosInstance.get<IDeepSearchItemDetailResponse>(
    `/api/v1/ds-api/deepsearch/single-patent-search/?id=${id}`,
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

export interface IDeepSearchPatentDetailItem {
  id: string;
  title: string;
  date: string;
  company: string;
  org_type: string;
  abstract: string;
  type: string;
  wipo_kind: string;
  num_claims: number;
  withdrawn: number;
  inventor: {
    name: string;
    id: string;
  }[];
  attorney: {
    attorney_organization: string;
    id: string;
  }[];
  examiner: {
    first_name: string;
    last_name: string;
    examiner_role: string;
    art_group: string;
  }[];
  foreign_citation: {
    country: string;
    citation_date: string;
    citation_category: string;
    citation_application_id: string;
    citation_sequence: string;
  }[];
  cpc: {
    class: string;
    class_title: string;
    subclass: string;
    subclass_title: string;
    group: string;
    group_title: string;
    cpc_sequence: string;
    cpc_section: string;
    cpc_type: string;
    cpc_symbol_position: string;
  }[];
  assignee: {
    assignee_organization: string;
    assignee_id: string;
    location_id: string;
    assignee_type: string;
    assignee_location_id: string;
    disambig_city: string;
    disambig_state: string;
    disambig_country: string;
    latitude: string;
    longitude: string;
  }[];
  applicant: {
    applicant_sequence: string;
    raw_applicant_organization: string;
    applicant_type: string;
    applicant_designation: string;
    applicant_location_id: string;
    city: string;
    state: string;
    country: string;
  }[];
  wipo: {
    wipo_field_sequence: string;
    wipo_field_id: string;
    wipo_sector_title: string;
    wipo_field_title: string;
  }[];
  pct: [];
  us_patent_citation: {
    citation_sequence: string;
    citation_patent_id: string;
    citation_date: string;
    citation_category: string;
    wipo_kind: string;
    record_name: string;
  }[];
}

//
interface IDeepSearchItemDetailResponse {
  data: IDeepSearchPatentDetailItem;
}
