import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AppConfig } from "../utils/app.config";
import axiosInstance from "../utils/axios";

interface IResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

interface ISessionData {
  common_question_id?: number;
  question_id?: number;
  step_id?: number;
  plans?: string | number[];
  use_cases?: string[];
}

interface ISession {
  session_id?: number;
  user_id?: number;
  session_data?: ISessionData;
}

interface SessionState {
  session?: ISession;
}

const initialState: SessionState = {
  session: undefined,
};

export const getSessionDetails = createAsyncThunk(
  "getSessionDetails",
  async (): Promise<IResponse> => {
    try {
      const response = await axiosInstance.get(
        `/api/get_session?code=${AppConfig.Auth_CODE}&clientId=default `,
      );
      return {
        success: true,
        message: "Successfully fetched session details",
        data: {
          session_id: response.data.session.session_id,
          user_id: response.data.session.user_id,
          session_data: {
            question_id: response.data.session.session_data.question_id,
            step_id: response.data.session.session_data.step_id,
            plans: response.data.session.session_data.plans,
            common_question_id: response.data.session.session_data.common_question_id,
            use_cases: response.data.session.session_data?.use_cases,
          },
        },
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to fetch session details",
      };
    }
  },
);

const updateSession = async (payload: ISession) => {
  try {
    // Make the API request to update the session
    const response = await axiosInstance.post(`/api/update_session?code=${AppConfig.Auth_CODE}`, {
      session_id: payload.session_id,
      user_id: payload.session_data,
      session_data: {
        question_id: payload.session_data?.question_id,
        user_id: payload.session_data?.step_id,
        plans: payload.session_data?.plans,
        common_question_id: payload.session_data?.common_question_id,
        step_id: payload.session_data?.step_id,
        use_cases: payload.session_data?.use_cases,
      },
    });
    return response.data; // Return the updated session data
  } catch (error) {
    throw new Error("Failed to update session"); // Handle errors
  }
};

export const SessionSlice = createSlice({
  name: "Session",
  initialState,
  reducers: {
    setSession: (state, action: PayloadAction<ISession>) => {
      state.session = {
        ...state.session, // Keep the properties from the previous session
        ...action.payload, // Overwrite or add properties from the new payload
      };
      const sessionData = state.session;
      console.log(sessionData);
      updateSession(sessionData)
        .then((sessionData) => {
          // Optionally handle the updated session data from the server
          console.log("Session updated on server:", sessionData);
        })
        .catch((error) => {
          // Handle errors from updating session on the server
          console.error("Error updating session on server:", error);
        });
    },
  },
  extraReducers(builder) {
    builder.addCase(getSessionDetails.fulfilled, (state, action) => {
      const payloadData = action.payload.data;
      state.session = payloadData;
    });
  },
});

export const { setSession } = SessionSlice.actions;
export default SessionSlice.reducer;
