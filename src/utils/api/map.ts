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
    `/api/v1/ds-api/dashboard/geo-footprint-patents/?q=${keywords.join(",")}`,
  );

  return response.data;
}

/**
 *
 */
export async function getExpertsMapInfo(keywords: string[]) {
  const response = await axiosInstance.get<IExpertMapResponse>(
    `/api/v1/ds-api/dashboard/experts-footprint/?q=${keywords.join(",")}`,
  );

  return response.data.data;
}

/**
 *
 */
interface IPatentMapItem {
  company: string;
  coordiantes: [string, string];
  count: number;
  location: string;
}

interface ICompetitorMapResponse {
  patentInfo: IPatentMapItem[];
  publicationInfo: IPatentMapItem[];
}

/**
 *
 */
interface IExpertMapItem {
  name: string;
  org: string;
  lat: string;
  lon: string;
  city: string;
  state: string;
  count: number;
}

interface IExpertMapResponse {
  data: {
    Academic_patent_experts: IExpertMapItem[];
    Industry_patent_experts: IExpertMapItem[];
  };
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
