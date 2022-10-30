import axiosInstance from "../axios";

/**
 *
 */
export async function getPublicationsAndPatentsMap(keywords: string[]) {
  const response = await axiosInstance.get<IPublicationAndPatensMapResponse>(
    `/dashboard/publications_and_patents_map?q=${keywords.join(",")}`
  );

  return response.data.data;
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
      doiLinksMaxCountry: string[];
      sortedCount: {
        [x: string]: number;
      };
    };
  };
}
