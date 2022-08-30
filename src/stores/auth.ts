import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
import { Auth } from "aws-amplify";

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
      const response = await Auth.signIn({
        username: payload.email,
        password: payload.password,
      });

      return {
        success: true,
        message: "Successfully logged in!",
        data: response.attributes,
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
      const response = await Auth.currentSession();
      if (!response.isValid) throw new Error("Current session is invalid!");

      const token = response.getAccessToken().getJwtToken();

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
