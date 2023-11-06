import axiosInstance from "../axios";

/**
 *
 */

export async function getRelatedKeywords(keywords: string[]) {
  const response = await axiosInstance.get<IRelatedKeywordsResponse>(
    `/api/v1/ds-api/dashboard/related-keywords/?q=${keywords.join(",")}`,
  );

  return response.data.data;
}

//
export async function getPatentsCount(keywords: string[]) {
  const response = await axiosInstance.get<IPatentsCountResponse>(
    `/dashboard/patents/count?q=${keywords.join(",")}`,
  );

  return response.data.data;
}

export async function getPublicationsCount(keywords: string[]) {
  const response = await axiosInstance.get<IPublicationCountResponse>(
    `/dashboard/publications/count?q=${keywords.join(",")}`,
  );

  return response.data.data;
}

export async function getTopUniversities(keywords: string[]) {
  const response = await axiosInstance.get<ICompetitorResponse>(
    `/api/v1/ds-api/dashboard/patent-university-ranked/?q=${keywords.join(",")}`,
  );

  return response.data.data.data;
}

export async function getExpertsCount(keywords: string[]) {
  const response = await axiosInstance.get<IExpertCountResponse>(
    `/dashboard/experts/count?q=${keywords.join(",")}`,
  );

  return response.data.data;
}

export async function getTodaysHighlight(keywords: string[]) {
  const response = await axiosInstance.get<IHighlightResponse>(
    `/api/v1/ds-api/dashboard/global-tech-trends/?q=${keywords.join(",")}`,
  );
  return response.data.data;
}

export async function getCompetitors(keywords: string[]) {
  const response = await axiosInstance.get<ICompetitorResponse>(
    `/api/v1/ds-api/dashboard/companywise-patents/?q=${keywords.join(",")}`,
  );

  return response.data.data.data;
}

export async function getTop5Funders(keywords: string[]) {
  const response = await axiosInstance.get<ITopFunderResponse>(
    `/api/v1/ds-api/dashboard/top-five-projects/?q=${keywords.join(",")}`,
  );

  return response.data.data;
}

export async function getExpertsTable(keywords: string[]) {
  const response = await axiosInstance.get<IExpertResponse>(
    `/api/v1/ds-api/dashboard/get-expert-list/?q=${keywords.join(",")}`,
  );

  return response.data.data;
}

/**
 * Interfaces
 */
interface IpatentsCount {
  patentCount: number;
  yearsElapsed: number;
  startDate: string;
  endDate: string;
}

interface IPatentsCountResponse {
  data: IpatentsCount;
}

//
interface IPublicationCount {
  totalPublicationsCount: number;
  openPublicationsCount: number;
  closedPublicationsCount: number;
  yearsElapsed: number;
  startDate: string;
  endDate: string;
}

interface IPublicationCountResponse {
  data: IPublicationCount;
}

//
interface IExpertsCount {
  expertsCount: number;
  yearsElapsed: number;
  startDate: string;
  endDate: string;
}

interface IExpertCountResponse {
  data: IExpertsCount;
}

//
interface IRelatedKeywordsResponse {
  data: {
    related_keywords: string[];
    cloud_weights: {
      [x: string]: number;
    };
  };
}

interface IHighlightResponse {
  data: {
    academicExpertsCount: number;
    academicPublicationsCount: number;
    fundingAmount: number;
    industryExpertsCount: number;
    industryPublicationsCount: number;
    patentsCount: number;
  };
}

//
export interface ITopFunder {
  project_title: string;
  award_amount: number;
  lead_investigator_given: string;
}

interface ITopFunderResponse {
  data: ITopFunder[];
}

//
export interface IExpert {
  company: string;
  name: string;
  count: number;
}

export interface IExpertModeItem {
  Academic: IExpert[];
  Industry?: IExpert[];
}

interface IExpertResponse {
  data: {
    patent: IExpertModeItem;
    publication: IExpertModeItem;
  };
}

//
export interface ICompetitor {
  rank: number;
  name: string;
  description: string;
  locationText: string;
  score: number;
  coordinate: [number, number];
}

//
interface ICompetitorResponse {
  data: {
    data: {
      patents: {
        key: string;
        doc_count: number;
      }[];
      Patent_claims: {
        company: string;
        claim_sum: number;
      }[];
      Inventors: {
        company: string;
        inventor_count: number;
      }[];
      Publications: {
        key: string;
        doc_count: number;
      }[];
    };
  };
}
