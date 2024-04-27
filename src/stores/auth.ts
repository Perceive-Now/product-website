import axios from "axios";
import jsCookie from "js-cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//
import type { PayloadAction } from "@reduxjs/toolkit";

//
import axiosInstance from "../utils/axios";
import { IUserProfile } from "../utils/api/userProfile";

/**
 *
 */
const initialState: AuthState = {
  token: undefined,
  user: undefined,
};

//
const API_URL = process.env.REACT_APP_API_URL;

const authCode = "kETFs1RXmwbP8nbptBg1dnXXwISsjAecJq4aRhIKaJ4VAzFucUcn3Q==";

export const signUpUser = createAsyncThunk(
  "login",
  async (payload: ISignupParams): Promise<IResponse> => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/register?code=${authCode}`,
        payload,
        //  {
        //   email: payload.email,
        //   password: payload.password,
        // }
      );

      //
      jsCookie.set("pn_refresh", data.token);
      jsCookie.set("session_id", data.session_id);
      // sessionStorage.setItem("pn_access", data.token);

      //
      return {
        success: true,
        message: "Successfull",
        data: { token: data.token },
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.response?.data?.error ?? error.message;

      return {
        success: false,
        message: errorMessage,
      };
    }
  },
);

// Cognitor Auth functions
export const loginUser = createAsyncThunk(
  "login",
  async (payload: ILoginParams): Promise<IResponse> => {
    try {
      const { data } = await axios.post(`${API_URL}/api/login?code=${authCode}`, {
        username: payload.username,
        password: payload.password,
      });
      //
      jsCookie.set("pn_refresh", data.token);
      sessionStorage.setItem("pn_access", data.token);
      jsCookie.set("session_id", data.session_id);
      jsCookie.set("user_id", data.user.id);

      //
      return {
        success: true,
        message: "Successfully logged in!",
        data: { token: data.token },
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.response?.data?.error ?? error.message;

      return {
        success: false,
        message: errorMessage,
      };
    }
  },
);

export const logoutUser = createAsyncThunk("logout", async (): Promise<IResponse> => {
  try {
    jsCookie.remove("pn_refresh");
    sessionStorage.removeItem("pn_access");

    return {
      success: true,
      message: "Successfully logged out!",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
});

export const getCurrentSession = createAsyncThunk(
  "getCurrentSession",
  async (): Promise<IResponse> => {
    const accessToken = sessionStorage.getItem("pn_access");
    if (accessToken && accessToken !== "undefined")
      return {
        success: true,
        message: "Current session obtained",
        data: { token: accessToken },
      };

    //
    const refreshToken = jsCookie.get("pn_refresh");
    if (!refreshToken || refreshToken === "undefined") {
      return {
        success: false,
        message: "Current session is terminated!",
      };
    }

    //
    try {
      // api/v1/user/refresh-token/
      const response = await axios.post<IRefreshResponse>(
        `${API_URL}/
      `,
        {
          refresh: refreshToken,
        },
      );

      jsCookie.set("pn_refresh", response.data.refresh);
      sessionStorage.setItem("pn_access", response.data.access);

      return {
        success: true,
        message: "Current session obtained",
        data: { token: response.data.access },
      };
    } catch (error) {
      return {
        success: false,
        message: "Current session expired",
      };
    }
  },
);

export const getUserDetails = createAsyncThunk("getUserDetails", async (): Promise<IResponse> => {
  try {
    // TODO:: Make an API call to get user profile
    // After that add user's name and image to the response object
    const [
      // userResponse,
      userProfileResponse,
      // subscriptionResponse
    ] = await Promise.all([
      axiosInstance.get(`/api/user_profile?code=${authCode}&clientId=default `),
      // axiosInstance.get(""),
      // axiosInstance.get(""),
    ]);
    // const subscriptionData = subscriptionResponse?.data ?? {};
    return {
      success: true,
      message: "Successfully fetched user details",
      data: {
        // name: `${ userProfileResponse.data.first_name } ${ userProfileResponse.data.last_name } `,
        first_name: userProfileResponse.data.first_name,
        last_name: userProfileResponse.data.last_name,
        phone_number: userProfileResponse.data.phone_number,
        about_me: userProfileResponse.data.about_me,
        topics_of_interest: userProfileResponse.data.topics_of_interest,
        country: userProfileResponse.data.country,
        job_position: userProfileResponse.data.job_position,
        profile_photo: userProfileResponse.data.profile_photo,
        username: userProfileResponse.data.username,
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Unable to fetch user details",
    };
  }
});

/**
 *
 */
export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<IUserProfile>) => {
      state.user = action.payload;
    },
    setAuthToken: (state, action: PayloadAction<string | undefined>) => {
      state.token = action.payload;
    },
    removeUser: (state) => {
      state.user = undefined;
    },
    // setUserEmail: (state, action: PayloadAction<ISignupParams>) => {
    //   state.user?.email = action.payload;
    //   // console.log(state);
    // },
  },

  /**
   * All auth related reducers
   */
  extraReducers(builder) {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      const payloadAttributes = action.payload.data;

      state.token = payloadAttributes?.token;
    });

    //
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = undefined;
      state.token = undefined;
    });

    //
    builder.addCase(getCurrentSession.fulfilled, (state, action) => {
      if (!state.token && action.payload.success && action.payload.data) {
        state.token = action.payload.data.token;
      }
    });
    //
    builder.addCase(getCurrentSession.rejected, (state) => {
      state.token = undefined;
    });

    //
    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      const payloadAttributes = action.payload.data;

      state.user = payloadAttributes;
    });
  },
});

/**
 * Action creators are generated for each case reducer function
 */
export const { setUser, setAuthToken, removeUser } = AuthSlice.actions;
export default AuthSlice.reducer;

/**
 * Interfaces
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

//
// interface IAuthuser {
//   email: string;
//   pkId: string;
//   username: string;
//   name: string;
//   image?: string;
//   firstName: string;
//   lastName: string;
//   phoneNumber: number | null;
//   aboutMe: string;
//   userLocation: string;
//   userCompany: {
//     companyName: string | null;
//     companyLocation?: string;
//     techSector?: string;
//     teamNumber?: string;
//   };
//   jobPosition: string | null;
//   preferredKeywords: {
//     name: string;
//   }[];
//   preferredJournals: {
//     name: string;
//   }[];
//   strategicGoals: string[];
//   subscription: {
//     has_subscription: boolean;
//     message: string;
//     data: {
//       subscription: string;
//       subscription_status: "unpaid" | "paid";
//       checkout_session_id: string;
//       products: {
//         name: string;
//       }[];
//     };
//   };
//   ipPortfolio: {
//     orcidId: string;
//     patents: { patent_name: string }[];
//     publications: { publication_name: string }[];
//     scholarlyProfile: string;
//   };
//   isProfileDetailCompleted?: boolean;
//   isCompanyDetailCompleted?: boolean;
//   isIpPortfolioCompleted: boolean;
// }

//
interface AuthState {
  user?: IUserProfile;
  token?: string;
}

//
interface ILoginParams {
  username: string;
  password: string;
}

interface ISignupParams {
  email: string;
  password: string;
}

//
interface IRefreshResponse {
  access: string;
  refresh: string;
}
