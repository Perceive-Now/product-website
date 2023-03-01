import { ICompanyDetailProfile } from "../../components/@signup-complete/companyDetails";
import { IUserProfile } from "../../components/@signup-complete/userProfile";
import axiosInstance from "../axios";

/**
 *
 */
export async function getUserProfile() {
  const response = await axiosInstance.get<IUserProfileResponse>(`/api/v1/profile/profiles/me/`);

  return response.data;
}

interface IUserProfileResponse {
  username: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  id: number;
  pkid: string;
  phone_number: null | number;
  profile_photo: string;
  about_me: string;
  user_location: string;
  is_customer: boolean;
  user_company: null | string;
  job_position: null | string;
}

export async function patchUserProfile({ body }: IPatchUserProfileProps) {
  const response = await axiosInstance.patch(`api/v1/profile/profiles/me/`, body);

  return response.data;
}

export async function patchCompanyDetailProfile({ body }: IPatchCompanyDetailProfileProps) {
  const response = await axiosInstance.patch(`api/v1/profile/profiles/me/`, body);

  return response.data;
}

export async function inviteEmail(body: IEmailProps) {
  const response = await axiosInstance.post(`api/v1/invitations/create-and-send/`, body);

  return response.data;
}

interface IPatchUserProfileProps {
  body: IUserProfile;
}
interface IPatchCompanyDetailProfileProps {
  body: ICompanyDetailProfile;
}
interface IEmailProps {
  email: string;
}
export async function createIpPortfolioProfile({ body }: IIpPortfolioProps) {
  const response = await axiosInstance.patch(`api/v1/profile/profiles/me/`, body);

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
