import axios from "axios";
import jsCookie from "js-cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//
import type { PayloadAction } from "@reduxjs/toolkit";

//
import axiosInstance from "../utils/axios";

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
      const { data } = await axios.post(`${API_URL}/api/register?code=${authCode}`, {
        email: payload.email,
        password: payload.password,
      });

      //
      jsCookie.set("pn_refresh", data.token);
      sessionStorage.setItem("pn_access", data.token);

      //
      return {
        success: true,
        message: "Successfull",
        // data: { token: data.token },
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail ?? error.message;

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

      //
      return {
        success: true,
        message: "Successfully logged in!",
        data: { token: data.token },
      };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail ?? error.message;

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
      const response = await axios.post<IRefreshResponse>(`${API_URL}/api/v1/user/refresh-token/`, {
        refresh: refreshToken,
      });

      //
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
    const [userResponse, userProfileResponse, subscriptionResponse] = await Promise.all([
      axiosInstance.get("/api/v1/user/me/"),
      axiosInstance.get("/api/v1/profile/profiles/me/"),
      axiosInstance.get("/api/v1/payment/subscription/"),
    ]);
    const subscriptionData = subscriptionResponse?.data ?? {};
    return {
      success: true,
      message: "Successfully fetched user details",
      data: {
        name: `${userProfileResponse.data.first_name} ${userProfileResponse.data.last_name} `,
        firstName: userProfileResponse.data.first_name,
        lastName: userProfileResponse.data.last_name,
        phoneNumber: userProfileResponse.data.phone_number,
        aboutMe: userProfileResponse.data.about_me,
        userLocation: userProfileResponse.data.user_location,
        userCompany: {
          companyName: userProfileResponse.data.user_company?.company_name,
          companyLocation: userProfileResponse.data.user_company?.company_location,
          techSector: userProfileResponse.data.user_company?.tech_sector,
          teamNumber: userProfileResponse.data.user_company?.team_number,
        },
        ipPortfolio: {
          orcidId: userProfileResponse.data.user_company?.ip_portfolio?.orcid_id,
          patents: userProfileResponse.data.user_company?.ip_portfolio?.patents,
          publications: userProfileResponse.data.user_company?.ip_portfolio?.publications,
          scholarlyProfile: userProfileResponse.data.user_company?.ip_portfolio?.scholarly_profile,
        },
        jobPosition: userProfileResponse.data.job_position,
        email: userResponse.data.email,
        username: userResponse.data.username,
        image: userProfileResponse.data.profile_photo,
        pkId: userProfileResponse.data.pkid,
        preferredKeywords: userProfileResponse.data.preferred_keywords,
        preferredJournals: userProfileResponse.data.preferred_journals,
        strategicGoals: userProfileResponse.data.strategic_goals,
        subscription: subscriptionData,
        isProfileDetailCompleted: userProfileResponse.data.is_profile_detail_completed,
        isCompanyDetailCompleted:
          userProfileResponse.data.user_company?.is_company_detail_completed,
        isIpPortfolioCompleted:
          userProfileResponse.data._company?.ip_portfolio?.is_ip_portfolio_completed,
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
    setUser: (state, action: PayloadAction<IAuthuser>) => {
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
interface IAuthuser {
  email: string;
  pkId: string;
  username: string;
  name: string;
  image?: string;
  firstName: string;
  lastName: string;
  phoneNumber: number | null;
  aboutMe: string;
  userLocation: string;
  userCompany: {
    companyName: string | null;
    companyLocation?: string;
    techSector?: string;
    teamNumber?: string;
  };
  jobPosition: string | null;
  preferredKeywords: {
    name: string;
  }[];
  preferredJournals: {
    name: string;
  }[];
  strategicGoals: string[];
  subscription: {
    has_subscription: boolean;
    message: string;
    data: {
      subscription: string;
      subscription_status: "unpaid" | "paid";
      checkout_session_id: string;
      products: {
        name: string;
      }[];
    };
  };
  ipPortfolio: {
    orcidId: string;
    patents: { patent_name: string }[];
    publications: { publication_name: string }[];
    scholarlyProfile: string;
  };
  isProfileDetailCompleted?: boolean;
  isCompanyDetailCompleted?: boolean;
  isIpPortfolioCompleted: boolean;
}

//
interface AuthState {
  user?: IAuthuser;
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
