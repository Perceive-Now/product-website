import axiosInstance from "../axios";

/**
 *
 */
export async function getPatentsCount(keywords: string[]) {
  const response = await axiosInstance.get<IPatentsCountResponse>(
    `/dashboard/patents/count?q=${keywords.join(",")}`
  );

  return response.data.data;
}

export async function getPublicationsCount(keywords: string[]) {
  const response = await axiosInstance.get<IPublicationCountResponse>(
    `/dashboard/publications/count?q=${keywords.join(",")}`
  );

  return response.data.data;
}

export async function getTopUniversities(keywords: string[]) {
  const response = await axiosInstance.get<ITopUniversityResponse>(
    `/dashboard/academic/universities_top_3?q=${keywords.join(",")}`
  );

  return response.data.data;
}

export async function getExpertsCount(keywords: string[]) {
  const response = await axiosInstance.get<IExpertCountResponse>(
    `/dashboard/experts/count?q=${keywords.join(",")}`
  );

  return response.data.data;
}

export async function getRelatedKeywords(keywords: string[]) {
  const response = await axiosInstance.get<IRelatedKeywordsResponse>(
    `/api/v1/ds-api/dashboard/related-keywords/?q=${keywords.join(",")}`
  );

  return response.data.data.related_keywords;
}

export async function getTodaysHighlight(keywords: string[]) {
  const response = await axiosInstance.get<IHighlightResponse>(
    `/api/v1/ds-api/dashboard/global-tech-trends/?q=${keywords.join(",")}`
  );
  return response.data.data;
}

export async function getCompetitors(keywords: string[]) {
  const response = await axiosInstance.get<ICompetitorResponse>(
    `/api/v1/ds-api/dashboard/companywise-patent/?q=${keywords.join(",")}`
  );

  return response.data.data;
}

export async function getTop5Funders(keywords: string[]) {
  let query = keywords.join(",").replace(" ", "");
  const response = await axiosInstance.get<ITopFunderResponse>(
    `/dashboard/top_5_funders?q=${query}`
  );

  return response.data.data.map((data, index) => ({
    ...data,
    rank: index + 1,
  }));
}

export async function getExpertsTable(keywords: string[]) {
  const response = await axiosInstance.get<IExpertResponse>(
    `/dashboard/experts_network_patents?q=${keywords.join(",")}`
  );

  return response.data;
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
interface ITopUniversity {
  universityName: string;
  locationText: string;
  publications: number;
  patents: number;
  fundingReceived: number;
}

interface ITopUniversityResponse {
  data: ITopUniversity[];
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
interface ITopFunder {
  rank: number;
  name: string;
  fundingAmount: number;
  date: string;
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
  patents?: IExpert[];
  publications?: IExpert[];
}

interface IExpertResponse {
  academic: IExpertModeItem;
  industry: IExpertModeItem;
  federal: IExpertModeItem;
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
}
