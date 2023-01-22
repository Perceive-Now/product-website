import axiosInstance from "../axios";

//
export async function activateUser(activateUserBody: IActivateUserBody) {
  try {
    await axiosInstance.post(`/api/v1/user/activation/`, activateUserBody);
    return {
      success: true,
      message: "User activated successfully!",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
