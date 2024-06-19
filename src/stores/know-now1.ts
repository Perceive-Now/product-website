import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//
import { IResponse } from "src/@types/IResponse";
import {
  IChats,
  IKnowIP,
  IKnowIPGetChat,
  IKnowNowIPConversation,
  IKnowNowIPConversations,
} from "src/@types/entities/IKnow";

//
import { AppConfig } from "src/config/app.config";

//
interface IChat {
  message_id: string;
  query: string;
  answer: string;
  response_time?: string;
  error?: string;
  liked?: boolean;
}

interface IGetMarket {
  user_id: number;
  thread_id: number;
}

interface IKnowNow {
  chats: IChat[];
  knownow_id?: string;
  chatIds: IChats[];
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

// -------------------------------------------------------------------------------------------------------

// Market
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

// -------------------------------------------------------------------------------------------------------

//Market KnowNow
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

// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------------------

// IP KNowNow
export const saveIPChat = createAsyncThunk(
  "saveIPChat",
  async (payload: IKnowNowIPConversation[]) => {
    try {
      await axios.post(`${AppConfig.KNOW_NOW_IP_API}/conversation/add`, payload);
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

// -------------------------------------------------------------------------------------------------------
//
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

// -------------------------------------------------------------------------------------------------------

export const getIPChatById = createAsyncThunk(
  "getIPChatById",
  async (payload: IKnowIPGetChat): Promise<IResponse> => {
    try {
      const { data } = await axios.post(
        `${AppConfig.KNOW_NOW_IP_API}/conversation/get_by_id`,
        payload,
      );
      const chats = data.conversation.messages;
      const combinedData = [];

      for (let i = 0; i < chats.length; i++) {
        // && chats[i + 1] && chats[i + 1].role === 'ai'
        if (chats[i].role === "human" && chats[i + 1].role === "ai") {
          console.log(chats);
          console.log(data[i + 1].content);
          console.log(data[i + 1].message_id);

          // const nextMessage = data[i + 1] && data[i + 1].role === 'ai' ? data[i + 1].content : '';
          // const messageId = data[i + 1] && data[i + 1].role === 'ai' ? data[i + 1].message_id : '';
          combinedData.push({
            query: data[i].content,
            answer: data[i + 1].content || "",
            liked: data[i].liked,
            message_id: data[i + 1].message_id || "",
          });
          // if (nextMessage) {
          //   i++; // Skip the next message as it's already paired
          // }
        }
      }
      return {
        success: true,
        message: "Successfully fetched IP chat",
        data: combinedData,
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

    // -------------------------------------------------------------------------------------------------------

    addQuestion: (state, action: PayloadAction<string>) => {
      const query = action.payload || "";
      const newChat: IChat = { query, answer: "", message_id: "" };
      state.chats.push(newChat);
    },

    // -------------------------------------------------------------------------------------------------------

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

    // -------------------------------------------------------------------------------------------------------

    updateChatError: (state, action: PayloadAction<{ index: number; answer: string }>) => {
      const { index, answer } = action.payload;
      if (index >= 0 && index < state.chats.length) {
        state.chats[index].error = answer;
      }
    },

    // -------------------------------------------------------------------------------------------------------

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

    // -------------------------------------------------------------------------------------------------------

    generateNewId: (state, action: PayloadAction<{ id: string }>) => {
      state.knownow_id = action.payload.id;
    },

    // -------------------------------------------------------------------------------------------------------

    setChatIds: (state, action: PayloadAction<{ title: string; chat_id: string }>) => {
      state.chatIds.push(action.payload);
    },

    //
    setRemoveConversation: (state, action: PayloadAction<string>) => {
      const conversationId = action.payload;
      state.chatIds = state.chatIds.filter((c) => c.chat_id !== conversationId);
    },

    // -------------------------------------------------------------------------------------------------------

    resetChats: (state) => {
      state.chats = [];
    },

    // -------------------------------------------------------------------------------------------------------

    udateChatResponse: (state, action: PayloadAction<{ message_id: string; liked: boolean }>) => {
      const { message_id, liked } = action.payload;
      state.chats = state.chats.map((c) => (c.message_id === message_id ? { ...c, liked } : c));
    },
  },

  // -------------------------------------------------------------------------------------------------------

  extraReducers(builder) {
    builder.addCase(getIPChat.fulfilled, (state, action) => {
      state.chatIds = action.payload.data as any;
    });

    // -------------------------------------------------------------------------------------------------------

    builder.addCase(getIPChatById.fulfilled, (state, action) => {
      state.chats = action.payload.data as any;
    });
  },
});

// ------------------------------------------------------------------------------------------------------------

export default KnownowSlice1.reducer;
export const {
  setKnowNowChats,
  updateChatError,
  addQuestion,
  updateChatAnswer,
  generateNewId,
  setChatIds,
  resetChats,
  setRemoveConversation,
  editQueryAndUpdateAnswer,
  udateChatResponse,
} = KnownowSlice1.actions;
