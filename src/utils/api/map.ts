import axiosInstance from "../axios";

/**
 *
 */
export async function getPatentHeatmap(keywords: string[]) {
  const response = await axiosInstance.get<IPublicationAndPatensMapResponse>(
    `/api/v1/ds-api/dashboard/patent-heatmap/?q=${keywords.join(",")}`,
  );

  return response.data;
}

/**
 *
 */
export async function getCompetitorMapInfo(keywords: string[]) {
  const response = await axiosInstance.get<ICompetitorMapResponse>(
    `/dashboard/geo_footprint_patents?q=${keywords.join(",")}`,
  );

  return response.data;
}

/**
 *
 */
export async function getExpertsMapInfo(keywords: string[]) {
  const response = await axiosInstance.get<IExpertMapResponse>(
    `/dashboard/geo_footprint_experts?q=${keywords.join(",")}`,
  );

  return response.data;
}

/**
 *
 */
interface IPatentListItem {
  abstract: string;
  location: string;
  title: string;
}

interface IPatentMapItem {
  company: string;
  coordinates: [number, number];
  count: number;
  location: string;
}

interface ICompetitorMapResponse {
  patentsList: IPatentListItem[];
  patentsMap: IPatentMapItem[];
}

/**
 *
 */
interface IExpertMapItem {
  coordinates: [number, number];
  employment: string;
  location: string;
  name: string;
  patentcount: number;
}

interface IExpertMapResponse {
  academicExpertMap: IExpertMapItem[];
  federalExpertMap: IExpertMapItem[];
  industryExpertMap: IExpertMapItem[];
}

/**
 *
 */
interface IPatentHeatmapCountryCount {
  country: string;
  count: number;
}

interface IPatentStateTitle {
  state: string;
  patent_title: string;
}

interface IPublicationAndPatensMapResponse {
  Industries: {
    count: IPatentHeatmapCountryCount[];
    titles: IPatentStateTitle[];
  };
  Universities: {
    count: IPatentHeatmapCountryCount[];
    titles: IPatentStateTitle[];
  };
}
