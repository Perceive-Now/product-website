import axios from "axios";
import Cookie from "js-cookie";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//
import type { PayloadAction } from "@reduxjs/toolkit";

const baseURL = process.env.REACT_APP_API_URL;

const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};
/**
 *
 */
const initialState: AuthState = {
  token: undefined,
  user: undefined,
};

// Cognitor Auth functions
export const loginUser = createAsyncThunk(
  "login",
  async (payload: ILoginParams): Promise<IResponse> => {
    try {
      const response = await axios.post(
        `${baseURL}/api/v1/user/login/`,
        {
          email: payload.email,
          password: payload.password,
        },
        axiosConfig
      );

      const data: ILoginResponse = response.data;

      //
      sessionStorage.setItem("pn_access", data.data.access_token);
      Cookie.set("pn_refresh", data.data.refresh_token);

      //
      return {
        success: true,
        message: "Successfully logged in!",
        data: { token: data.data.access_token },
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
);

export const logoutUser = createAsyncThunk(
  "logout",
  async (): Promise<IResponse> => {
    try {
      Cookie.remove("pn_refresh");
      sessionStorage.removeItem("pn_access");

      return {
        success: true,
        message: "Successfully logged out!",
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
);

export const getUserDetails = createAsyncThunk(
  "getUserDetails",
  async (): Promise<IResponse> => {
    try {
      const response = await axios.get(
        `${baseURL}/api/v1/user/get-user/`,
        axiosConfig
      );
      const responseData = response.data;

      const user: IAuthuser = {
        email: responseData.email,
      };

      //
      return {
        success: true,
        message: "User details",
        data: user,
      };
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
);

export const getCurrentSession = createAsyncThunk(
  "getCurrentSession",
  async (): Promise<IResponse> => {
    try {
      let token = "";
      let accessToken = sessionStorage.getItem("pn_access");

      if (accessToken) {
        token = accessToken;
      } else {
        let refreshToken = Cookie.get("pn_refresh");
        if (!refreshToken) {
          return {
            success: false,
            message: "Current session is terminated!",
          };
        }

        try {
          const response = await axios.post(
            `${baseURL}/api/v1/refresh-token/`,
            {
              refresh_token: refreshToken,
            },
            axiosConfig
          );
          const data: IRefreshResponse = response.data;

          const { access_token } = data;
          token = access_token;

          if (!token) {
            return {
              success: false,
              message: "Session is expired",
            };
          }

          sessionStorage.setItem("pn_access", access_token);
        } catch (error) {
          return {
            success: false,
            message: "Session is expired",
          };
        }
      }

      return {
        success: true,
        message: "Current session obtained",
        data: { token },
      };
    } catch (err: any) {
      return {
        success: false,
        message: err.message,
      };
    }
  }
);

/**
 *
 */
export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setuser: (state, action: PayloadAction<IAuthuser>) => {
      state.user = action.payload;
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

    builder.addCase(getUserDetails.fulfilled, (state, action) => {
      state.user = action.payload.data;
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = undefined;
      state.token = undefined;
    });

    builder.addCase(getCurrentSession.fulfilled, (state, action) => {
      state.token = action.payload.data?.token;
    });
  },
});

/**
 * Action creators are generated for each case reducer function
 */
export const { setuser, removeUser } = AuthSlice.actions;
export default AuthSlice.reducer;

/**
 * Interfaces
 */
interface IResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

interface IAuthuser {
  email: string;
  firstName?: string;
  lastName?: string;
}

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
interface ILoginData {
  access_token: string;
  refresh_token: string;
}

//
interface ILoginResponse {
  status: string;
  message: string;
  data: ILoginData;
  errors: string;
}

interface IRefreshResponse {
  status: string;
  message: string;
  access_token: string;
  errors: string;
}
