import axiosInstance from "../axios";

/**
 *
 */
export async function getPatentsCount(keywords: string[]) {
  const response = await axiosInstance.get<IPatentsCountResponse>(
    `/dashboard/patents/count?q=${keywords.join(",")}`
  );

  return response.data.data;
}

export async function getPublicationsCount(keywords: string[]) {
  const response = await axiosInstance.get<IPublicationCountResponse>(
    `/dashboard/publications/count?${keywords.join(",")}`
  );

  return response.data.data;
}

export async function getTop3Universities(keywords: string[]) {
  const response = await axiosInstance.get<ITopUniversityResponse>(
    `/dashboard/academic/universities_top_3?q=${keywords.join(",")}`
  );

  return response.data.data;
}

export async function getExpertsCount(keywords: string[]) {
  const response = await axiosInstance.get<IExpertCountResponse>(
    `/dashboard/experts/count?q=${keywords.join(",")}`
  );

  return response.data.data;
}

export async function getRelatedKeywords(keywords: string[]) {
  const response = await axiosInstance.get<IRelatedKeywordsResponse>(
    `/dashboard/related_keywords_list?q=${keywords.join(",")}`
  );

  return response.data.data;
}

export async function getTodaysHighlight(keywords: string[]) {
  const response = await axiosInstance.get<IHighlightResponse>(
    `/dashboard/highlights?q=${keywords.join(",")}`
  );

  return response.data.data;
}

export async function getCompetitors(keywords: string[]) {
  /* API is not provided yet.
   const response = await axiosInstance.get<ICompetitorResponse>(
     `?q=${keywords.join(',')}`
   )

   return response.data.data;
  */

  return [];
}

export async function getTop5Funders(keywords: string[]) {
  const response = await axiosInstance.get<ITopFunderResponse>(
    `/dashboard/funding/top_5?q=${keywords.join(",")}`
  );

  return response.data.data;
}

export async function getExpertsTable(keywords: string[]) {
  const response = await axiosInstance.get<IExpertResponse>(
    `/dashboard/experts_feature?q=${keywords.join(",")}`
  );

  return response.data.data;
}

/**
 * Interfaces
 */
interface IpatentsCount {
  patentCount: number;
  yearsElapsed: number;
  startDate: string;
  endDate: string;
}

interface IPatentsCountResponse {
  data: IpatentsCount;
}

//
interface IPublicationCount {
  totalPublicationsCount: number;
  openPublicationsCount: number;
  closedPublicationsCount: number;
  yearsElapsed: number;
  startDate: string;
  endDate: string;
}

interface IPublicationCountResponse {
  data: IPublicationCount;
}

//
interface ITopUniversity {
  universityName: string;
  locationText: string;
  publications: number;
  patents: number;
  fundingReceived: number;
}

interface ITopUniversityResponse {
  data: ITopUniversity[];
}

//
interface IExpertsCount {
  expertsCount: number;
  yearsElapsed: number;
  startDate: string;
  endDate: string;
}

interface IExpertCountResponse {
  data: IExpertsCount;
}

//
interface IRelatedKeywordsResponse {
  data: string[];
}

interface IHighlight {
  id: string;
  name: string;
  value: number;
}

interface IHighlightResponse {
  data: IHighlight[];
}

//
interface ITopFunder {
  rank: number;
  name: string;
  fundingAmount: number;
  date: string;
}

interface ITopFunderResponse {
  data: ITopFunder[];
}

//
export interface IExpert {
  rank: number;
  firstName: string;
  lastName: string;
  companyName: string;
  locationText: string;
  patentsCount: number;
  pulicationsCount: number;
  score: number;
  coordinates: [number, number];
}

interface IExpertResponse {
  data: {
    academic: IExpert[];
    industry: IExpert[];
  };
}

//
export interface ICompetitor {
  rank: number;
  name: string;
  description: string;
  locationText: string;
  score: number;
  coordinate: [number, number];
}
