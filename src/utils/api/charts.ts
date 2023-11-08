import axiosInstance from "../axios";

/**
 *
 */
const authCode = "kETFs1RXmwbP8nbptBg1dnXXwISsjAecJq4aRhIKaJ4VAzFucUcn3Q==";

export async function getPatentsYearly(keywords: string[]) {
  const response = await axiosInstance.get<IPatent>(
    `/api/patent_yearwise_publications?keywords=${keywords.join(
      "|",
    )}&code=${authCode}&clientId=default`,
  );
  return response.data.response;
}

export async function getPatentLegalStatus(keywords: string[]) {
  const res = await axiosInstance.get<IPatentLegalStatus>(
    `/api/patent_legal_status?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getPatentCitationsReference(keywords: string[]) {
  const res = await axiosInstance.get<IPatentCitation>(
    `/api/patent_citations_references?keywords=${keywords.join(
      "|",
    )}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getInventorAssigneeAnalysis(keywords: string[]) {
  const res = await axiosInstance.get<IInventorAnalysis>(
    `/api/inventor_assignee_analysis?keywords=${keywords.join(
      "|",
    )}&code=${authCode}&clientId=default`,
  );
  return res.data.results;
}

export async function getGeoFiling(keywords: string[]) {
  const res = await axiosInstance.get<IGeoFiling>(
    `/api/patent_heatmap?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getPatentClassificationCPC(keywords: string[]) {
  const res = await axiosInstance.get<IGeoFiling>(
    `/api/patent_classification_cpc?keywords=${keywords.join(
      "|",
    )}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getWIPOAnalysis(keywords: string[]) {
  const res = await axiosInstance.get<IWipoAnalysis>(
    `/api/wipo_analysis?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getEmergingTechnologyTrend(keywords: string[]) {
  const res = await axiosInstance.get<IEmergingTechnologyTrend>(
    `/api/emerging_trends_wipo?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getPatentCompetitorPortfolio(keywords: string[]) {
  const res = await axiosInstance.get<IPatentCompetitorPortfolio>(
    `/api/competitor_portfolios?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getTechnlogyLifeCycleAnalysis(keywords: string[]) {
  const res = await axiosInstance.get<ITechnologyAnalysis>(
    `/api/lifecycle_analysis?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
  );
  return res.data.results;
}

export async function getCompetitorPatentingActivity(keywords: string[]) {
  const res = await axiosInstance.get<ICompetitorActivity>(
    `/api/competitor_activity?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getPatentActivityClass(keywords: string[]) {
  const res = await axiosInstance.get<IPatentActivityClass>(
    `/api/competitor_activity_subclass?keywords=${keywords.join(
      "|",
    )}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

/**
 *
 */
export async function getScholaryPublications(keywords: string[]) {
  const response = await axiosInstance.get<IScholaryPublicationResponse>(
    `/api/v1/ds-api/dashboard/scholarly-publications/?q=${keywords.join(",")}`,
  );

  return response.data.data;
}

export async function getExpertsCountGraph(keywords: string[]) {
  const response = await axiosInstance.get<IExpertCountResponse>(
    `/api/v1/ds-api/dashboard/experts-trend/?q=${keywords.join(",")}`,
  );

  return response.data.data;
}

export async function getAcademicResearchFundingChart(keywords: string[]) {
  const response = await axiosInstance.get<IUniversityResearchFundingResponse>(
    `/api/v1/ds-api/dashboard/university-state-patent-landscape/?q=${keywords.join(",")}`,
  );

  return response.data.data;
}

export async function getAcademicResearchTrends(keywords: string[]) {
  const response = await axiosInstance.get<IUniversityResearchTrendResponse>(
    `/api/v1/ds-api/dashboard/university-research-trend/?q=${keywords.join(",")}`,
  );

  return response.data.data;
}

/**
 *
 */
export async function getTopFundingChart(keywords: string[]) {
  const response = await axiosInstance.get<ITopFundingChartResponse>(
    `/api/v1/ds-api/dashboard/funding-trends/?q=${keywords.join(",")}`,
  );

  return response.data.data;
}

/**
 *
 */

export interface IPatent {
  response: {
    year: string;
    count: string;
  }[];
}
export interface IPatentCitation {
  response: {
    patent_id: string;
    count: string;
  }[];
}

export interface IPatentLegalStatus {
  response: {
    withdrawn: string;
    count: number;
  }[];
}

export interface IInventorAnalysis {
  results: {
    filed_country: string;
    count: number;
  }[];
}
export interface IGeoFiling {
  response: {
    state: string;
    cout: number;
  }[];
}
export interface IPatentClassification {
  response: {
    cpc_subclas: string;
    count: number;
  }[];
}
export interface IWipoAnalysis {
  response: {
    title: string;
    count: number;
  }[];
}
export interface IEmergingTechnologyTrend {
  response: {
    wipo_field_title: string;
    count: number;
    year: string;
  }[];
}

export interface IPatentCompetitorPortfolio {
  response: {
    org: string;
    count: number;
  }[];
}
export interface ITechnologyAnalysis {
  results: {
    date: string;
    count: number;
  }[];
}

export interface ICompetitorActivity {
  response: {
    year: string;
    org: string;
    count: number;
  }[];
}

export interface IPatentActivityClass {
  response: {
    uspc_subclass_title: string;
    org: string;
    count: number;
  }[];
}

//

interface IScholaryPublication {
  year: number;
  open_source: number;
  closed_source: number;
}

interface IScholaryPublicationResponse {
  data: IScholaryPublication[];
}

export interface IExpertCountItem {
  year: number;
  count: number;
}

export interface IExpertCountData {
  patent: IExpertCountItem[];
  publication: IExpertCountItem[];
}

interface IExpertCountResponse {
  data: IExpertCountData;
}

export interface IUniversityResearchFunding {
  key: string;
  value: number;
}

interface IUniversityResearchFundingResponse {
  data: IUniversityResearchFunding[];
  captionText?: {
    fundingAmount: number;
    numberOfYears: number;
  };
}

export interface IUniverityItem {
  year: number;
  open_source: number;
  closed_source: number;
  patent: number;
}
export interface IUniversityResearchTrendResponse {
  data: IUniverityItem[];
}

//
export interface ITopFundingItem {
  year: number;
  amount: number;
}

interface ITopFundingChartResponse {
  data: ITopFundingItem[];
}
