/* eslint-disable @typescript-eslint/no-explicit-any */

const authCode = process.env.REACT_APP_AUTH_CODE;

import { ICompanyDetailProfile } from "../../components/@signup-complete/companyDetails";
import axiosInstance from "../axios";

/**
 *
 */

interface IData {
  companies: ICompany[];
}

interface ICompany {
  id: number;
  name: string;
  industry: string;
  size: string;
}

export interface IUserProfile {
  username: string;
  first_name: string;
  last_name: string;
  full_name?: string;
  email?: string;
  id: number;
  phone_number: null | string;
  profile_photo: string;
  about_me: string;
  country: string;
  is_customer: boolean;
  company_name: null | string;
  company_id?: number;
  job_position: null | string;
  topics_of_interest: string;
  registration_completed: boolean;
}

export async function updateUserProfile(value: any) {
  const response = await axiosInstance.put<IUserProfile>(
    `/api/update_user_profile?code=${authCode}&clientId=default`,
    value,
  );
  return response;
}

export async function getUserProfile() {
  const response = await axiosInstance.get<IUserProfile>(
    `/api/user_profile?code=${authCode}&clientId=default`,
  );
  return response.data;
}

export async function getCompanies() {
  const response = await axiosInstance.get<IData>(
    `/api/get_company_list?code=${authCode}&clientId=default`,
  );
  return response.data.companies;
}
export async function patchUserProfile({ body }: any) {
  const response = await axiosInstance.patch(``, body);

  return response.data;
}

export async function patchCompanyDetailProfile({ body }: IPatchCompanyDetailProfileProps) {
  const response = await axiosInstance.patch(``, body);

  return response.data;
}

export async function inviteEmail(body: IEmailProps) {
  const response = await axiosInstance.post(``, body);

  return response.data;
}

interface IPatchCompanyDetailProfileProps {
  body: ICompanyDetailProfile;
}
interface IEmailProps {
  email: string;
}
export async function createIpPortfolioProfile({ body }: IIpPortfolioProps) {
  const response = await axiosInstance.patch(``, body);

  return response.data;
}

interface IIpPortfolioProps {
  body: {
    user_company: {
      ip_portfolio: IIpPortfolio;
    };
  };
}

interface IIpPortfolio {
  patents: {
    patent_name: string;
  }[];
  publications: {
    publication_name: string;
  }[];
  scholarly_profile: string;
  orcid_id: string;
}
