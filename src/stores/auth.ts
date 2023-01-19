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

      const data = response.data;

      //
      sessionStorage.setItem("pn_access", data.access);
      Cookie.set("pn_refresh", data.refresh);

      //
      return {
        success: true,
        message: "Successfully logged in!",
        data: { token: data.access },
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

export const getCurrentSession = createAsyncThunk(
  "getCurrentSession",
  async (): Promise<IResponse> => {
    let accessToken = sessionStorage.getItem("pn_access");
    if (accessToken) return {
      success: true,
      message: "Current session obtained",
    }

    let refreshToken = Cookie.get('pn_refresh');
    if (!refreshToken) return {
      success: false,
      message: "Current session is terminated!"
    }

    try {
      const response = await axios.post(`${baseURL}/api/v1/user/refresh-token/`, {
        refresh: refreshToken
      }, axiosConfig);
      const data: IRefreshResponse = response.data;
      const { access } = data;

      return {
        success: true,
        message: "Current session obtained",
        data: { token: access },
      };
    }
    catch (error) {
      return {
        success: false,
        message: 'Current session expired',
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
    setUser: (state, action: PayloadAction<IAuthuser>) => {
      state.user = action.payload;
    },
    setAuth: (state, action: PayloadAction<string>) => {
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

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = undefined;
      state.token = undefined;
    });

    builder.addCase(getCurrentSession.fulfilled, (state, action) => {
      if (action.payload.data?.token) {
        state.token = action.payload.data?.token;
      }
    });
  },
});

/**
 * Action creators are generated for each case reducer function
 */
export const { setUser, setAuth, removeUser } = AuthSlice.actions;
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

interface IRefreshResponse {
  status: string;
  message: string;
  access: string;
  errors: string;
}
