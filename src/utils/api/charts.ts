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

export async function getExamincationTrend(keywords: string[]) {
  const response = await axiosInstance.get<IExaminationTrend>(
    `/api/patent_grant_trend?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
  );
  return response.data.response;
}

export async function getPatentInventorColab(keywords: string[]) {
  const response = await axiosInstance.get<IPatentInventorOverTime>(
    `/api/patent_inventor_colab_over_time?keywords=${keywords.join(
      "|",
    )}&code=${authCode}&clientId=default`,
  );
  return response.data.response;
}

export async function getPatent(keywords: string[]) {
  const response = await axiosInstance.get<IExaminationTrend>(
    `/api/patent_grant_trend?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
  );
  return response.data.response;
}

export async function getPatentLegalStatus(keywords: string[]) {
  const res = await axiosInstance.get<IPatentLegalStatus>(
    `/api/patent_types?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getPatentFamilySize(keywords: string[]) {
  const res = await axiosInstance.get<IPatentFamilySize>(
    `/api/patent_family_size?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
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
    `/api/patent_family_loc?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getPatentClassificationCPC(keywords: string[]) {
  const res = await axiosInstance.get<IPatentClassification>(
    `/api/patent_classification_cpc_class?keywords=${keywords.join(
      "|",
    )}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getPatentIPC(keywords: string[]) {
  const res = await axiosInstance.get<IPatentClassificationIPC>(
    `/api/patent_classification_ipc_class?keywords=${keywords.join(
      "|",
    )}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getPCTApplication(keywords: string[]) {
  const res = await axiosInstance.get<IPCTApplication>(
    `/api/patent_pct102_over_time?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getGeographicDistributionApplicant(keywords: string[]) {
  const res = await axiosInstance.get<IGeoApplicant>(
    `/api/geo_applicants?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getGeographicalDistributionAssignment(keywords: string[]) {
  const res = await axiosInstance.get<IGeoAssignment>(
    `/api/patent_assignee_country?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getGeographicalDistributionInventors(keywords: string[]) {
  const res = await axiosInstance.get<IGeoInventor>(
    `/api/patent_inventor_country?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getPatentApplicantType(keywords: string[]) {
  const res = await axiosInstance.get<IPatentApplicantType>(
    `/api/patent_applicant_type?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getPatentExaminerWorkload(keywords: string[]) {
  const res = await axiosInstance.get<IExaminerWorkload>(
    `/api/patent_examiner_workload?keywords=${keywords.join(
      "|",
    )}&code=${authCode}&clientId=default`,
  );
  return res.data.response;
}

export async function getWIPOSector(keywords: string[]) {
  const res = await axiosInstance.get<IWipoSector>(
    `/api/patent_wipo_sectors?keywords=${keywords.join("|")}&code=${authCode}&clientId=default`,
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
    year: number;
    count: number;
  }[];
}

export interface IExaminationTrend {
  response: {
    years: number;
    grant_days: number;
  }[];
}
export interface IPatentInventorOverTime {
  response: {
    year: number;
    count: number;
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
    title: string;
    count: number;
  }[];
}

export interface IPatentFamilySize {
  response: {
    family_size: number;
    year: number;
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
    count: number;
    country: string;
  }[];
}
export interface IGeoApplicant {
  response: {
    location_id: string;
    count: number;
    country: string;
    city: string;
    year: number;
  }[];
}
export interface IGeoInventor {
  response: {
    count: number;
    country: string;
    year: number;
  }[];
}
export interface IGeoAssignment {
  response: {
    count: number;
    country: string;
    year: number;
  }[];
}
export interface IPatentClassification {
  response: {
    cpc_class: string;
    count: number;
  }[];
}
export interface IPatentClassificationIPC {
  response: {
    ipc_class: string;
    count: number;
  }[];
}

export interface IPCTApplication {
  response: {
    year: number;
    count: number;
  }[];
}
export interface IWipoSector {
  response: {
    title: string;
    count: number;
  }[];
}

export interface IPatentApplicantType {
  response: {
    applicant_type: string;
    count: number;
  }[];
}
export interface IEmergingTechnologyTrend {
  response: {
    wipo_field_title: string;
    count: number;
    year: number;
  }[];
}

export interface IExaminerWorkload {
  response: {
    examiner: string;
    count: number;
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
    year: number;
    count: number;
  }[];
}

export interface ICompetitorActivity {
  response: {
    year: number;
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

// [
//   {
//     "name": "a",
//     "year": 2000
//   },
//   {
//     "name": "b",
//     "year": 1999
//   },
//   {
//     name:'a',
//     year:2012
//   },
//   {
//     name:'b',
//     year:2013
//   }
// ]
// [
//   {
//     a
//   }
// ]
