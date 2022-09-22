import axiosInstance from "../axios";

/**
 *
 */
export async function getScholaryPublications(keywords: string[]) {
  const response = await axiosInstance.get<IScholaryPublicationResponse>(
    `/dashboard/scholarly_publications?q=${keywords.join(",")}`
  );

  return response.data.data.chart;
}

export async function getPatentsPieChart(keywords: string[]) {
  const response = await axiosInstance.get<IPatentsPieResponse>(
    `/dashboard/patents_pie_chart?q=${keywords.join(",")}`
  );

  return response.data.data.chart;
}

export async function getExpertsCountGraph(keywords: string[]) {
  const response = await axiosInstance.get<IExpertCountResponse>(
    `/dashboard/experts_count_graph?q=${keywords.join(",")}`
  );

  return response.data.data.chart;
}

export async function getAcademicResearchFundingChart(keywords: string[]) {
  const response = await axiosInstance.get<IAcademicResearchFundingResponse>(
    `/dashboard/academic/funding_chart?q=${keywords.join(",")}`
  );

  return response.data.data;
}

export async function getAcademicResearchTrends(keywords: string[]) {
  const response = await axiosInstance.get<IAcademicResearchTrendResponse>(
    `/dashboard/academic/usa_research_trends?q=${keywords.join(",")}`
  );

  return response.data.data;
}

export async function getTopFundingChart(keywords: string[]) {
  const response = await axiosInstance.get<ITopFundingChartResponse>(
    `/dashboard/funding/chart?q=${keywords.join(",")}`
  );

  return response.data.data.chart;
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

interface IPatent {
  name: number;
  value: number;
  percentage: number;
}

interface IPatentsPieResponse {
  data: {
    chart: IPatent[];
  };
}

interface IExpertCount {
  year: number;
  closedExpertsCount: number;
  openExpertsCount: number;
}

interface IExpertCountResponse {
  data: {
    chart: IExpertCount[];
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

interface ITopFundingChart {
  value: number;
  year: string;
}

interface ITopFundingChartResponse {
  data: {
    chart: ITopFundingChart[];
  };
}
