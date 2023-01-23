import axiosInstance from "../axios";

/**
 *
 */
export async function getScholaryPublications(keywords: string[]) {
  const response = await axiosInstance.get<IScholaryPublicationResponse>(
    `/api/v1/ds-api/dashboard/scholarly-publications/?q=${keywords.join(",")}`
  );

  return response.data.data;
}

export async function getPatentsPieChart(keywords: string[]) {
  const response = await axiosInstance.get<IPatent[]>(
    `/api/v1/ds-api/dashboard/patent-yearly-count/?q=${keywords.join(",")}`
  );

  return response.data;
}

/**
 *
 */
export async function getExpertsCountGraph(keywords: string[]) {
  const response = await axiosInstance.get<IExpertCountResponse>(
    `/api/v1/ds-api/dashboard/experts-trend/?q=${keywords.join(",")}`
  );

  return response.data.data;
}

export async function getAcademicResearchFundingChart(keywords: string[]) {
  const response = await axiosInstance.get<IUniversityResearchFundingResponse>(
    `/api/v1/ds-api/dashboard/uni-state-landscape/?q=${keywords.join(",")}`
  );

  return response.data.data;
}

export async function getAcademicResearchTrends(keywords: string[]) {
  const response = await axiosInstance.get<IUniversityResearchTrendResponse>(
    `/api/v1/ds-api/dashboard/uni-research-trend/?q=${keywords.join(",")}`
  );

  return response.data.data;
}

/**
 *
 */
export async function getTopFundingChart(keywords: string[]) {
  const response = await axiosInstance.get<ITopFundingChartResponse>(
    `/api/v1/ds-api/dashboard/funding-trend/?q=${keywords.join(",")}`
  );

  return response.data.data;
}

/**
 *
 */
interface IScholaryPublication {
  year: number;
  open_source: number;
  closed_source: number;
}

interface IScholaryPublicationResponse {
  data: IScholaryPublication[];
}

export interface IPatent {
  year: string;
  count: string;
}

export interface IExpertCountItem {
  year: number;
  count: number;
}

export interface IExpertCountData {
  patent: IExpertCountItem[];
  publication: IExpertCountItem[];
}

interface IExpertCountResponse {
  data: IExpertCountData;
}

export interface IUniversityResearchFunding {
  key: string;
  value: number;
}

interface IUniversityResearchFundingResponse {
  data: IUniversityResearchFunding[];
  captionText?: {
    fundingAmount: number;
    numberOfYears: number;
  };
}

export interface IUniverityItem {
  year: number;
  open_source: number;
  closed_source: number;
  patent: number;
}
export interface IUniversityResearchTrendResponse {
  data: IUniverityItem[];
}

//
export interface ITopFundingItem {
  year: number;
  amount: number;
}

interface ITopFundingChartResponse {
  data: ITopFundingItem[];
}
