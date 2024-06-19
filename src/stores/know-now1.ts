import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { IResponse } from "src/@types/IResponse";
import { AppConfig } from "src/config/app.config";

interface IChat {
  query: string;
  answer: string;
  response_time?: string;
  error?: string;
}

interface IGetMarket {
  user_id: number;
  thread_id: number;
}

interface IKnowNow {
  chats: IChat[];
  knownow_id?: string;
  chatIds: string[];
}

interface IMarketChatSave {
  user_id: "string";
  thread_id: "string";
  content: "string";
}

const initialState: IKnowNow = {
  chats: [],
  knownow_id: undefined,
  chatIds: [],
};

export const saveMarketChat = createAsyncThunk("saveMarketChat", async (payload: any) => {
  try {
    await axios.post(`${AppConfig.KNOW_NOW_MARKET_API}/save`, payload);
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
});
//
export const getMarketChatById = createAsyncThunk(
  "getMarketChatById",
  async (payload: IGetMarket): Promise<IResponse> => {
    try {
      const response = await axios.get(
        `${AppConfig.KNOW_NOW_MARKET_API}/retrieve/?user_id=${payload.user_id}&thread_id=${payload.thread_id}`,
      );
      return {
        success: true,
        message: "Successfully fetched market chat",
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to fetch session details",
      };
    }
  },
);

export const KnownowSlice1 = createSlice({
  name: "know-now1",
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
        state.chats[index].answer = answer;
        state.chats[index].response_time = responseTime;
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
        state.chats[index].query = newQuery;
        state.chats[index].answer = newAnswer;
        state.chats[index].response_time = responseTime;

        // Remove subsequent chat objects
        state.chats = state.chats.slice(0, index + 1);
      }
    },
    generateNewId: (state, action: PayloadAction<{ id: string }>) => {
      state.knownow_id = action.payload.id;
    },
    setChatIds: (state, action: PayloadAction<string>) => {
      state.chatIds.push(action.payload);
    },
  },
});

export default KnownowSlice1.reducer;
export const {
  setKnowNowChats,
  updateChatError,
  addQuestion,
  updateChatAnswer,
  generateNewId,
  setChatIds,
  editQueryAndUpdateAnswer,
} = KnownowSlice1.actions;
