import axiosInstance from "../axios";
import { errorMessageHandler } from "../helpers";

export async function forgotPassword(email: string) {
  try {
    await axiosInstance.post(`/api/v1/user/reset_password/`, {
      email: email,
    });
    return true;
  } catch (err) {
    return false;
  }
}

export async function passwordResetConfirm(passwordResetBody: IPasswordResetBody) {
  try {
    await axiosInstance.post(`/api/v1/user/reset_password_confirm/`, passwordResetBody);
    return {
      success: true,
      message: "Password reset successfully!",
    };
  } catch (error: any) {
    const errorData = error?.response?.data;
    const message = "Something went wrong!";
    errorMessageHandler(errorData);

    return {
      success: false,
      message: message,
    };
  }
}

interface IPasswordResetBody {
  uid: string;
  token: string;
  new_password: string;
  re_new_password: string;
}

export async function activateUser(activateUserBody: IActivateUserBody) {
  try {
    await axiosInstance.post(`/api/v1/user/activation/`, activateUserBody);
    return {
      success: true,
      message: "User activated successfully!",
    };
  } catch (error: any) {
    // const errorData = error?.response?.data;
    const message = "Something went wrong!";
    return {
      success: false,
      message: message,
    };
  }
}
interface IActivateUserBody {
  uid: string;
  token: string;
}
