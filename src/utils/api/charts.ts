import axiosInstance from "../axios";

/**
 *
 */
export async function getScholaryPublications() {
  const response = await axiosInstance.get<IScholaryPublicationResponse>(
    "/dashboard/scholarly_publications"
  );

  return response.data.data;
}

export async function getPatentsPieChart() {
  const response = await axiosInstance.get<IPatentsPieResponse>(
    "/dashboard/patents_pie_chart"
  );

  return response.data.data;
}

export async function getExpertsCountGraph() {
  const response = await axiosInstance.get<IExpertCountResponse>(
    "/dashboard/experts_count_graph"
  );

  return response.data.data;
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
  data: IScholaryPublication[];
}

interface IPatent {
  name: number;
  value: number;
  percentage: number;
}

interface IPatentsPieResponse {
  data: IPatent[];
}

interface IExpertCount {
  year: number;
  closedExpertsCount: number;
  openExpertsCount: number;
}

interface IExpertCountResponse {
  data: IExpertCount[];
}
