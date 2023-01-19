import axiosInstance from "../axios";

/**
 *
 */
export async function getPublicationsAndPatentsMap(keywords: string[]) {
  const response = await axiosInstance.get<IPublicationAndPatensMapResponse>(
    `/dashboard/publications_and_patents_map?q=${keywords.join(",")}`,
  );

  return response.data.data;
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
interface IPublicationAndPatensMapResponse {
  data: {
    patents: {
      topStateTitle: string[];
      sortedCount: {
        [x: string]: number;
      };
    };
    publications: {
      doiLinksMaxCountry?: string[];
      sortedCount: {
        [x: string]: number;
      };
      Country_wise_titles: {
        Country: string;
        Paper_titles: string[];
      }[];
    };
  };
}
