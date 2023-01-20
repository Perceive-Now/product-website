import axiosInstance from "../axios";
import { DEFAULT_TIME_PERIOD_START_YEAR } from "../constants";

/**
 *
 */
export async function getScholaryPublications(keywords: string[]) {
  const response = await axiosInstance.get<IScholaryPublicationResponse>(
    `/dashboard/scholarly_publications?q=${keywords.join(",")}`,
  );

  return response.data.data.chart.sort((a, b) => a.year - b.year);
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

export async function getTopFundingChart(keywords: string[]) {
  const query = keywords.join(",").replace(" ", "");

  const response = await axiosInstance.get<ITopFundingChartResponse>(
    `/dashboard/total_amount_of_funding_over_time?q=${query}`,
  );

  let results = response.data.data;
  results = results.sort((a, b) => (a.year < b.year ? -1 : 1));

  const startYear = +(results.at(0)?.year ?? DEFAULT_TIME_PERIOD_START_YEAR);
  return {
    fundings: results,
    startYear: startYear,
  };
}

/**
 *
 */
interface IScholaryPublication {
  year: number;
  openArticles: number;
  closedArticles: number;
}

interface IScholaryPublicationResponse {
  data: {
    chart: IScholaryPublication[];
  };
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

interface IExpertCountResponse {
  data: {
    patent: IExpertCountItem[];
    publication: IExpertCountItem[];
  };
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

export interface ITopFundingChart {
  amount: number;
  year: number;
}

interface ITopFundingChartResponse {
  data: ITopFundingChart[];
}
