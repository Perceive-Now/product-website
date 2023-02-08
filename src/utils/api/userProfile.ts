import { IUserProfileForm } from "../../components/@signup-complete/userProfile";
import axiosInstance from "../axios";

/**
 *
 */
export async function getUserProfile(pkId: string) {
  const response = await axiosInstance.get<IUserProfileResponse>(
    `/api/v1/profile/profiles/${pkId}/`,
  );

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

export async function patchUserProfile({ pkId, body }: IPatchUserProfileProps) {
  const response = await axiosInstance.patch(`/api/v1/profile/user-detail/${pkId}/`, body);

  return response.data;
}

interface IPatchUserProfileProps {
  pkId: string;
  body: IUserProfileForm;
}
