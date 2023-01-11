import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
import { Auth } from "aws-amplify";
import axios from "axios";
import Cookie from 'js-cookie';

const baseURL = process.env.REACT_APP_API_URL;
const axiosConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
}
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
      const response = await axios.post<ILoginResponse>(`${baseURL}/api/v1/user/login/`, {
        email: payload.email,
        password: payload.password,
      }, axiosConfig);
      console.log(response, 'response')
      // const { data } = response;
      // const {access_token, refresh_token} = data;
      // sessionStorage.setItem('pn_access', data.access_token);
      // Cookie.set('pn_refresh', refresh_token)

      return {
        success: true,
        message: "Successfully logged in!",
        data: {},
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
      await Auth.signOut();
      // api remaining

      //Cookie.remove('pn_refresh');
      // sessionStorage.removeItem('pn_access');

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
    try {
      let token = '';
      let accessToken = sessionStorage.getItem('pn_access');

      if (accessToken) {
        token = accessToken;
      }
      else {
        let refreshToken = Cookie.get('pn_refresh');
        if (refreshToken) {

          try {
            const response = await axios.post<IRefreshResponse>(`${baseURL}/user/refresh-token/`, {
              refresh_token: refreshToken
            }, axiosConfig);
            console.log(response, 'response')
            // const { access_token } = response;
            // token = access_token;
            // if (!token) {
            //   return {
            //     success: false,
            //     message: 'Session is expired'
            //   }
            // }
            // sessionStorage.setItem('pn_access', access_token);
          }
          catch (error) {
            //   return {
            //     success: false,
            //     message: 'Session is expired'
            //   }
          }
        }
        else {
          return {
            success: false,
            message: 'Current session is terminated!'
          }
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

      state.user = {
        email: payloadAttributes?.email,
        firstName: payloadAttributes?.firstName ?? "",
        lastName: payloadAttributes?.lastName ?? "",
      };
    });

    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = undefined;
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
  firstName: string;
  lastName: string;
  email: string;
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
type TLoginData = {
  access_token: string;
  refresh_token: string;
}

//
interface ILoginResponse {
  status: string;
  message: string;
  data: TLoginData,
  errors: string;
}

interface IRefreshResponse {
  status: string;
  message: string;
  access_token: string,
  errors: string;
}