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

// Cognitor Auth functions
export const loginUser = createAsyncThunk(
  "login",
  async (payload: ILoginParams): Promise<IResponse> => {
    try {
      const { data } = await axios.post(`${API_URL}/api/v1/user/login/`, {
        email: payload.email,
        password: payload.password,
      });

      //
      jsCookie.set("pn_refresh", data.refresh);
      sessionStorage.setItem("pn_access", data.access);

      //
      return {
        success: true,
        message: "Successfully logged in!",
        data: { token: data.access },
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
    const [userResponse] = await Promise.all([axiosInstance.get("/api/v1/user/me/")]);
    return {
      success: true,
      message: "Successfully fetched user details",
      data: {
        email: userResponse.data.email,
        username: userResponse.data.username,
        name: userResponse.data.username,
        image: undefined,
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
  username: string;
  name: string;
  image?: string;
}

//
interface AuthState {
  user?: IAuthuser;
  token?: string;
}

//
interface ILoginParams {
  email: string;
  password: string;
}

//
interface IRefreshResponse {
  access: string;
  refresh: string;
}
