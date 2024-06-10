import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { AppConfig } from "../utils/app.config";
import axiosInstance from "../utils/axios";
import jsCookie from "js-cookie";

interface IResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

interface ISessionData {
  question_id?: number;
  step_id?: number;
  plans?: number[];
  use_cases?: string[];
  last_session_id?: number;
  user_chat?: IUserChat;
  client_secret?: string;
  active_index?: number;
  skipped_question?: number[];
}

interface IUserChat {
  question_id?: number;
  question?: string;
  answer?: string;
  example_answer?: string;
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
            skipped_question: response.data.session.session_data?.skipped_question,
            question_id: response.data.session.session_data?.question_id,
            step_id: response.data.session.session_data?.step_id,
            plans: response.data.session.session_data?.plans,
            use_cases: response.data.session.session_data?.use_cases,
            last_session_id: response.data.session.session_data?.last_session_id,
            user_chat: response.data.session.session_data?.user_chat,
            client_secret: response.data.session.session_data?.client_secret,
            active_index: response.data.session.session_data?.active_index,
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
    const sessionID = jsCookie.get("session_id");
    const userId = jsCookie.get("user_id");

    const values = {
      session_id: sessionID || payload.session_id,
      user_id: userId || payload.user_id,
      session_data: {
        question_id: payload.session_data?.question_id,
        user_id: payload.session_data?.step_id,
        plans: payload.session_data?.plans,
        step_id: payload.session_data?.step_id,
        use_cases: payload.session_data?.use_cases,
        last_session_id: payload.session_data?.last_session_id,
        client_secret: payload.session_data?.client_secret,
        active_index: payload.session_data?.active_index,
        skipped_question: payload.session_data?.skipped_question,
        user_chat: {
          question_id: payload.session_data?.user_chat?.question_id,
          question: payload.session_data?.user_chat?.question,
          answer: payload.session_data?.user_chat?.answer,
          example_answer: payload.session_data?.user_chat?.example_answer,
        },
      },
    };
    // Make the API request to update the session
    const response = await axiosInstance.post(
      `/api/update_session?code=${AppConfig.Auth_CODE}`,
      values,
    );
    return response.data; // Return the updated session data
  } catch (error) {
    throw new Error("Failed to update session"); // Handle errors
  }
};

// const restoreSession = async (payload: ISession) => {
//   try {
//     const sessionID = jsCookie.get("session_id");
//     const userId = jsCookie.get("user_id");

//     const values = {
//       session_id: sessionID || payload.session_id,
//       user_id: userId || payload.user_id,
//       session_data: {
//         question_id: payload.session_data?.question_id,
//         user_id: payload.session_data?.step_id,
//         plans: payload.session_data?.plans,
//         common_question_id: payload.session_data?.common_question_id,
//         step_id: payload.session_data?.step_id,
//         use_cases: payload.session_data?.use_cases,
//         last_session_id: payload.session_data?.last_session_id
//       }
//     }
//     // Make the API request to update the session
//     const response = await axiosInstance.post(`/api/restore_session?code=${AppConfig.Auth_CODE}`, values
//     );
//     return response.data; // Return the updated session data
//   } catch (error) {
//     throw new Error("Failed to restore session"); // Handle errors
//   }
// };

export const SessionSlice = createSlice({
  name: "Session",
  initialState,
  reducers: {
    // -----------------------------------------------------------------------
    setSession: (state, action: PayloadAction<ISession>) => {
      state.session = {
        ...state.session, // Keep the properties from the previous session
        ...action.payload, // Overwrite or add properties from the new payload
      };
      const sessionData = state.session;
      updateSession(sessionData)
        .then((sessionData) => {
          // console.log("Session updated on server");
          return {
            message: "Session updated on server",
            sessionData,
          };
        })
        .catch(() => {
          // console.log("Error updating session on server");
          return {
            errror: "Error updating session on server",
          };
        });
    },

    // -----------------------------------------------------------------------
    getSessionSliceState: (state) => state,

    // -----------------------------------------------------------------------
    setSessionFromDraft: (state, action: PayloadAction<ISession>) => {
      state.session = {
        ...action.payload,
      };
    },

    // -----------------------------------------------------------------------
    reset: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(getSessionDetails.fulfilled, (state, action) => {
      const payloadData = action.payload.data;
      state.session = payloadData;
    });
  },
});

export const { setSession, getSessionSliceState, reset, setSessionFromDraft } =
  SessionSlice.actions;
export default SessionSlice.reducer;
