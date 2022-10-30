import axiosInstance from "../axios";

/**
 *
 */
export async function getPublications(keywords: string[]) {
  const response = await axiosInstance.get<IPublicationResponse>(
    `/advanced_search/publications?q=${keywords.join(",")}`
  );

  return response.data;
}

export async function getSinglePublication(doi: string) {
  const response = await axiosInstance.get<ISinglePublicationResponse>(
    `/advanced_search/publications/individual?doi=${doi}`
  );

  return response.data;
}

export async function getPatents(keywords: string[]) {
  const response = await axiosInstance.get<IPatentsResponse>(
    `/advanced_search/patents?q=${keywords.join(",")}`
  );

  return response.data;
}

export async function getSinglePatent(patentNumber: string) {
  const response = await axiosInstance.get<ISinglePatentResponse>(
    `/advanced_search/patents/${patentNumber}`
  );

  return response.data;
}

export async function getExperts(keywords: string[]) {
  const response = await axiosInstance.get<IExpertsResponse>(
    `/advanced_search/experts?q=${keywords.join(",")}`
  );

  return response.data;
}

export async function getSingleExpert(orcidId: string) {
  const response = await axiosInstance.get<ISingleExpertResponse>(
    `/advanced_search/experts/${orcidId}`
  );

  return response.data;
}

/**
 * Interfaces
 */
export interface IPublicationItem {
  abstract: string;
  doi: string;
  title: string[];
}

interface IPublicationResponse {
  data: {
    resultsList: IPublicationItem[];
  };
}

interface ISinglePublicationResponse {
  // TODO
}

export interface IPatentItem {
  inventorName?: string;
  organizationName: string;
  title: string;
  abstract: string;
  date: string;
  patentNumber: string;
}

interface IPatentsResponse {
  data: {
    resultsList: IPatentItem[];
  };
}

interface ISinglePatentResponse {
  // TODO
}

export interface IExpertItem {
  affiliationName: string;
  expertName: string;
  location: string;
  orcidId: string;
  patentsCount: number;
  publicationsCount: number;
}

interface IExpertsResponse {
  data: {
    resultsList: IExpertItem[];
  };
}

interface ISingleExpertResponse {
  // TODO
}
