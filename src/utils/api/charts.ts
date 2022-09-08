import axiosInstance from "../axios";

/**
 *
 */
export async function getScholaryPublications() {
  const response = await axiosInstance.get<IScholaryPublicationResponse>(
    "/dashboard/scholarly_publications"
  );

  return response.data.data.chart;
}

export async function getPatentsPieChart() {
  const response = await axiosInstance.get<IPatentsPieResponse>(
    "/dashboard/patents_pie_chart"
  );

  return response.data.data.chart;
}

export async function getExpertsCountGraph() {
  const response = await axiosInstance.get<IExpertCountResponse>(
    "/dashboard/experts_count_graph"
  );

  return response.data.data.chart;
}

export async function getAcademicResearchFundingChart() {
  const response = await axiosInstance.get<IAcademicResearchFundingResponse>(
    "/dashboard/academic/funding_chart"
  );

  return response.data.data;
}

export async function getAcademicResearchTrends() {
  const response = await axiosInstance.get<IAcademicResearchTrendResponse>(
    "/dashboard/academic/usa_research_trends"
  );

  return response.data.data;
}

export async function getTopFundingChart() {
  const response = await axiosInstance.get<ITopFundingChartResponse>(
    "/dashboard/funding/chart"
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
  year: string
}

interface ITopFundingChartResponse {
  data: {
    chart: ITopFundingChart[]
  }
}