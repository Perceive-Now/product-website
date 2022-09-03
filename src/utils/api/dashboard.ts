import axiosInstance from "../axios";

/**
 *
 */
export async function getPatentsCount() {
  const response = await axiosInstance.get<IPatentsCountResponse>(
    "/dashboard/patents/count"
  );

  return response.data.data;
}

export async function getPublicationsCount() {
  const response = await axiosInstance.get<IPublicationCountResponse>(
    "/dashboard/publications/count"
  );

  return response.data.data;
}

export async function getTop3Universities() {
  const response = await axiosInstance.get<ITopUniversityResponse>(
    "/dashboard/academic/universities_top_3"
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
