import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
//
import { IResponse } from "src/@types/IResponse";
import { IKnowNowIPConversation, IKnowNowIPConversations } from "src/@types/entities/IKnow";
//
import { AppConfig } from "src/config/app.config";
//
interface IKnowIP {
  user_id: string;
  service_name: string;
}

interface IChats {
  chat_id: string;
  title: string;
}

interface IChat {
  query: string;
  answer: string;
  response_time?: string;
  error?: string;
}

interface IKnowNow {
  chats: IChat[];
  knownow_id?: string;
  chatIds: IChats[];
}

const initialState: IKnowNow = {
  chats: [],
  knownow_id: undefined,
  chatIds: [],
};

export const saveIPChat = createAsyncThunk(
  "saveIPChat",
  async (payload: IKnowNowIPConversation[]) => {
    try {
      await axios.post(`${AppConfig.KNOW_NOW_IP_API}/add`, payload);
      return {
        success: true,
        message: "Saved Successfully",
      };
    } catch (error: any) {
      return {
        success: false,
        message: "Chat not saved",
      };
    }
  },
);

export const getIPChat = createAsyncThunk(
  "getIPChat",
  async (payload: IKnowIP[]): Promise<IResponse<IKnowNowIPConversations>> => {
    try {
      const response = await axios.post(`${AppConfig.KNOW_NOW_IP_API}/conversation/get`, payload);
      return {
        success: true,
        message: "Successfully fetched IP chat",
        data: response.data.conversations.map((c: any) => ({
          chat_id: c.conversation_id,
          title: c.title,
        })),
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to get IP chat",
      };
    }
  },
);
/**
 *
 */
export const KnownowIPSlice = createSlice({
  name: "knonow-ip",
  initialState,
  reducers: {
    setKnowNowChats: (state, action: PayloadAction<IChat>) => {
      const newChat = action.payload;
      // Update the answer of the last chat object in the array if it exists
      if (state.chats.length > 0) {
        state.chats[state.chats.length - 1].answer = newChat.answer;
      }
      // Push the new chat object into the array
      state.chats.push(newChat);
    },
    addQuestion: (state, action: PayloadAction<string>) => {
      const query = action.payload;
      const newChat: IChat = { query, answer: "" };
      state.chats.push(newChat);
    },
    updateChatAnswer: (
      state,
      action: PayloadAction<{ index: number; answer: string; responseTime?: string }>,
    ) => {
      const { index, answer, responseTime } = action.payload;
      if (index >= 0 && index < state.chats.length) {
        state.chats[index].response_time = responseTime;
        state.chats[index].answer = answer;
      }
    },
    updateChatError: (state, action: PayloadAction<{ index: number; answer: string }>) => {
      const { index, answer } = action.payload;
      if (index >= 0 && index < state.chats.length) {
        state.chats[index].error = answer;
      }
    },
    editQueryAndUpdateAnswer: (
      state,
      action: PayloadAction<{
        index: number;
        newQuery: string;
        newAnswer: string;
        responseTime?: string;
      }>,
    ) => {
      const { index, newQuery, newAnswer, responseTime } = action.payload;
      if (index >= 0 && index < state.chats.length) {
        state.chats[index].response_time = responseTime;
        state.chats[index].answer = newAnswer;
        state.chats[index].query = newQuery;

        // Remove subsequent chat objects
        state.chats = state.chats.slice(0, index + 1);
      }
    },
    generateNewId: (state, action: PayloadAction<{ id: string }>) => {
      state.knownow_id = action.payload.id;
    },
    setChatIds: (state, action: PayloadAction<{ title: string; chat_id: string }>) => {
      state.chatIds.push(action.payload);
    },
    resetChats: (state) => {
      state.chats = [];
    },
  },
  extraReducers(builder) {
    builder.addCase(getIPChat.fulfilled, (state, action) => {
      state.chatIds = action.payload.data as any;
    });
  },
});

export default KnownowIPSlice.reducer;
export const {
  setKnowNowChats,
  updateChatError,
  addQuestion,
  updateChatAnswer,
  generateNewId,
  setChatIds,
  resetChats,
  editQueryAndUpdateAnswer,
} = KnownowIPSlice.actions;
