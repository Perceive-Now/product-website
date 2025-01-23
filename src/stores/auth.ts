import axios from "axios";
import jsCookie from "js-cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

//
import type { PayloadAction } from "@reduxjs/toolkit";

//
import axiosInstance from "../utils/axios";
import { IUserProfile } from "../utils/api/userProfile";
import { AppConfig } from "../config/app.config";
import { NEW_BACKEND_URL } from "src/pages/authentication/signup/env";

/**
 * Interfaces
 */
interface IResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  detail?: string;
}

interface AuthState {
  user?: IUserProfile;
  token?: string;
  invitedUser?: { token?: string }; // Added invitedUser state
  team?: string[];
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
  token: string;
  session_id: string;
}

/**
 *
 */
const initialState: AuthState = {
  token: undefined,
  user: undefined,
  invitedUser: {
    token: localStorage.getItem("invitedUserToken") || undefined, // Load from localStorage
  },
  team: [],
};

//
const API_URL = AppConfig.API_URL;
const authCode = AppConfig.Auth_CODE;

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
      sessionStorage.setItem("pn_access", data.token);
      jsCookie.set("user_id", data.user.id);
      // sessionStorage.setItem("pn_access", data.token);

      //
      return {
        success: true,
        message: "Successfull",
        data: { token: data.token },
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.error ?? error.message;

      return {
        success: false,
        message: errorMessage,
      };
    }
  },
);

export const newSignupUser = createAsyncThunk(
  "signupUser",
  async (payload: ISignupParams): Promise<IResponse> => {
    try {
      const { data } = await axios.post(`${NEW_BACKEND_URL}/register`, payload);

      if (data?.value?.token) {
        //
        jsCookie.set("pn_refresh", data?.value?.token);
        jsCookie.set("session_id", data?.value?.session_id);
        sessionStorage.setItem("pn_access", data?.value?.token);
        jsCookie.set("user_id", data?.value?.user?.id);
        // sessionStorage.setItem("pn_access", data.token);

        //
        return {
          success: true,
          message: "Successfull",
          data: { token: data?.value?.token },
        };
      }

      return {
        success: true,
        message: "Successfull",
        data: {
          message: data?.value?.message,
        },
      };
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || error.message;
      return {
        success: false,
        message: errorMessage,
      };
    }
  },
);

// Auth functions
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
  // const dispatch = useAppDispatch();
  try {
    jsCookie.remove("pn_refresh");
    sessionStorage.removeItem("pn_access");
    // dispatch(setSession({ session_data: {} }))

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

export const getCurrentSession = createAsyncThunk("getCurrentSession", async (): Promise<any> => {
  const accessToken = jsCookie.get("pn_refresh");
  const currentTimestamp = Math.floor(Date.now() / 1000);
  if (accessToken) {
    try {
      const decodeToken = jwtDecode(accessToken || "");
      const expTimestamp = decodeToken.exp;

      if (expTimestamp) {
        if (currentTimestamp >= expTimestamp) {
          jsCookie.set("pn_refresh", String(undefined));
          return {
            success: false,
            message: "Current session is expired",
            data: { token: accessToken },
          };
        } else {
          return {
            success: true,
            message: "Current session obtained",
            data: { token: accessToken },
          };
        }
      }
    } catch (error) {
      return {
        success: false,
        message: "Session is expired",
      };
    }
  } else {
    return {
      success: false,
      message: "Current session is expired",
    };
  }
});

export const getNewSession = createAsyncThunk("getNewSession", async (): Promise<IResponse> => {
  try {
    const response = await axiosInstance.get<IRefreshResponse>(
      `/api/new_session?code=${authCode}&clientId=default`,
    );

    jsCookie.set("pn_refresh", response.data.token);
    sessionStorage.setItem("pn_access", response.data.token);
    jsCookie.set("session_id", response.data.session_id);

    return {
      success: true,
      message: "New session obtained",
      data: { token: response.data.token },
    };
  } catch (error) {
    return {
      success: false,
      message: "Session failed",
    };
  }
});

export const getUserDetails = createAsyncThunk("getUserDetails", async (): Promise<IResponse> => {
  try {
    // TODO:: Make an API call to get user profile
    // After that add user's name and image to the response object
    const [
      // userResponse,
      userProfileResponse,
      companyList,
    ] = await Promise.all([
      axiosInstance.get(`/api/user_profile?code=${authCode}&clientId=default `),
      axiosInstance.get(`/api/get_company_list?code=${authCode}&clientId=default `),
      // axiosInstance.get(""),
    ]);

    const company = companyList.data.companies.find(
      (c: any) => c.id === userProfileResponse.data.company_id,
    );

    const companyName = company ? company : "N/A";

    return {
      success: true,
      message: "Successfully fetched user details",
      data: {
        full_name: `${userProfileResponse.data.first_name} ${userProfileResponse.data.last_name} `,
        first_name: userProfileResponse.data.first_name,
        last_name: userProfileResponse.data.last_name,
        phone_number: userProfileResponse.data.phone_number,
        about_me: userProfileResponse.data.about_me,
        topics_of_interest: userProfileResponse.data.topics_of_interest,
        country: userProfileResponse.data.country,
        job_position: userProfileResponse.data.job_position,
        profile_photo: userProfileResponse.data.profile_photo,
        username: userProfileResponse.data.username,
        company_name: companyName.name || userProfileResponse.data.company_name,
        email: userProfileResponse.data.email,
        registration_completed: userProfileResponse.data.registration_completed || false,

        //
      },
    };
  } catch (error) {
    return {
      success: false,
      message: "Unable to fetch user details",
    };
  }
});

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
    setInvitedUserToken: (state, action: PayloadAction<string | undefined>) => {
      if (!state.invitedUser) {
        state.invitedUser = {};
      }
      state.invitedUser.token = action.payload; // Set invitedUser's token

      // Persist the token in localStorage
      if (action.payload) {
        localStorage.setItem("invitedUserToken", action.payload);
      } else {
        localStorage.removeItem("invitedUserToken");
      }
    },
    removeInvitedUser: (state) => {
      state.invitedUser = undefined; // Clear invitedUser state

      // Remove the token from localStorage
      localStorage.removeItem("invitedUserToken");
    },

    // Add a team member
    addTeamMember: (state, action: PayloadAction<string>) => {
      if (!state.team) {
        state.team = [];
      }
      if (!state.team.includes(action.payload)) {
        state.team.push(action.payload); // Add the new team member
      }
    },

    // Remove a team member
    removeTeamMember: (state, action: PayloadAction<string>) => {
      if (state.team) {
        state.team = state.team.filter((member) => member !== action.payload); // Remove the specified member
      }
    },
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

export const {
  setUser,
  setAuthToken,
  removeUser,
  setInvitedUserToken,
  removeInvitedUser,
  addTeamMember,
  removeTeamMember,
} = AuthSlice.actions;
export default AuthSlice.reducer;
