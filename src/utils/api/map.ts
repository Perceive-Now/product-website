import axiosInstance from "../axios";

/**
 *
 */
export async function getPublicationsAndPatentsMap() {
  const response = await axiosInstance.get<IPublicationAndPatensMapResponse>(
    "/dashboard/publications_and_patents_map"
  );

  return response.data.data;
}

/**
 *
 */
interface IPublicationAndPatensMapResponse {
  data: {
    country: string;
    patents: number;
    publications: number;
  }[];
}
