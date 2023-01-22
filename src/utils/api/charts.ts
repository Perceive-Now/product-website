import axiosInstance from "../axios";

/**
 *
 */
export async function getScholaryPublications(keywords: string[]) {
  const response = await axiosInstance.get<IScholaryPublicationResponse>(
    `/api/v1/ds-api/dashboard/scholarly-publications/?q=${keywords.join(",")}`,
  );

  return response.data.data;
}

export async function getPatentsPieChart(keywords: string[]) {
  const response = await axiosInstance.get<IPatentsPieResponse>(
    `/dashboard/patents_pie_chart?q=${keywords.join(",")}`,
  );

  let results = response.data.data.chart;
  results = results.sort((a, b) => (a.name < b.name ? -1 : 1));

  const startYear = results.at(0)?.name;

  return {
    patents: results,
    startYear: startYear,
  };
}

/**
 *
 */
export async function getExpertsCountGraph(keywords: string[]) {
  const response = await axiosInstance.get<IExpertCountResponse>(
    `/api/v1/ds-api/dashboard/experts-trend/?q=${keywords.join(",")}`,
  );

  return response.data.data;
}

export async function getAcademicResearchFundingChart(keywords: string[]) {
  const response = await axiosInstance.get<IAcademicResearchFundingResponse>(
    `/dashboard/academic/funding_chart?q=${keywords.join(",")}`,
  );

  return response.data.data;
}

export async function getAcademicResearchTrends(keywords: string[]) {
  const response = await axiosInstance.get<IAcademicResearchTrendResponse>(
    `/dashboard/academic/usa_research_trends?q=${keywords.join(",")}`,
  );

  return response.data.data;
}

/**
 *
 */
export async function getTopFundingChart(keywords: string[]) {
  const response = await axiosInstance.get<ITopFundingChartResponse>(
    `/api/v1/ds-api/dashboard/funding-trend/?q=${keywords.join(",")}`,
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
  name: number;
  value: number;
  percentage: number;
}

interface IPatentsPieResponse {
  data: {
    chart: IPatent[];
  };
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

interface IAcademicResearchFunding {
  name: string;
  percentage: number;
}

interface IAcademicResearchFundingResponse {
  data: {
    chart: IAcademicResearchFunding[];
    captionText: {
      fundingAmount: number;
      numberOfYears: number;
    };
  };
}

interface IAcademicResearchTrend {
  locationName: string;
  patentsCount: number;
  openArticlesCount: number;
  closedArticlesCount: number;
}

interface IAcademicResearchTrendResponse {
  data: {
    chart: IAcademicResearchTrend[];
  };
}

//
export interface ITopFundingItem {
  year: number;
  amount: number;
}

interface ITopFundingChartResponse {
  data: ITopFundingItem[];
}
