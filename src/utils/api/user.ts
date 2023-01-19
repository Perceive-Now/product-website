import axiosInstance from "../axios";
import { setAuth, setUser } from "../../stores/auth";

export const getUserDetails = () => async (dispatch: any) => {
    try {
        const response = await axiosInstance.get(
            `/api/v1/user/me/`
        );
        const responseData = response.data;

        const user: any = {
            email: responseData.email,
        };

        //
        dispatch(setUser(user));
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};

export const setAuthToken = (token: string) => (dispatch: any) => {
    try {
        dispatch(setAuth(token));
    } catch (error: any) {
        return {
            success: false,
            message: error.message,
        };
    }
};