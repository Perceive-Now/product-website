import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//
import { IResponse } from "src/@types/IResponse";
import { IChats } from "src/@types/entities/IKnow";

//
import { AppConfig } from "src/config/app.config";

//
interface IChat {
  message_id: number;
  query: string;
  answer: string;
  response_time?: string;
  error?: string;
  liked?: boolean;
  created_at?: any; 
}

interface IGetMarket {
  user_id: string;
  thread_id: number;
}

interface IKnowNow {
  chats: IChat[];
  keywords: string[];
  knownow_id?: number;
  chatMarketIds: IChats[];
  marketChatLoading: boolean;
}

interface IMarketChatSave {
  user_id: string;
  thread_id: number;
  // conversation_data: {
  //   conversation_id: number;
    question: string;
    // ai_content: string;
    like_ai: 0 | 1;
  };


const initialState: IKnowNow = {
  chats: [],
  keywords: [],
  knownow_id: undefined,
  chatMarketIds: [],
  marketChatLoading: true,
};

// -------------------------------------------------------------------------------------------------------

// Market
export const saveMarketChat = createAsyncThunk(
  "saveMarketChat",
  async (payload: IMarketChatSave) => {
    try {
      await axios.put(`${AppConfig.KNOW_NOW_MARKET_API}/save_like_ai`, payload);
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

//Market KnowNow
export const getMarketChatById = createAsyncThunk(
  "getMarketChatById",
  async (payload: IGetMarket): Promise<IResponse> => {
    try {
      const { data } = await axios.get(
        `${AppConfig.KNOW_NOW_MARKET_API}/get_conversations?user_id=${payload.user_id}&thread_id=${payload.thread_id}`,
      );
      const chats = data;
      return {
        success: true,
        message: "Successfully fetched market chat",
        data:
          chats.map((d: any) => ({
            // message_id: d.conversation_id,
            query: d.question,
            answer: d.ai_response,
            liked: d.like_ai,
            created_at: d.created_at
          })) || [],
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to fetch market chat",
        data: [] as any,
      };
    }
  },
);

// -------------------------------------------------------------------------------------------------------

//Get Conversations
export const getMarketThread = createAsyncThunk(
  "getIPChat",
  async (payload: string): Promise<IResponse> => {
    try {
      const { data } = await axios.get(
        `${AppConfig.KNOW_NOW_MARKET_API}/get_threads_with_favorites/${payload}`,
      );
      return {
        success: true,
        message: "Successfully fetched Market chat",
        data:
          data.map((c: any) => ({
            thread_id: c.thread_id,
            user_id: c.user_id,
            favorite: c.favorite,
            title: c.title,
          })) || [],
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to get Market chat",
        data: [] as any,
      };
    }
  },
);



 export const updateMarketThread = createAsyncThunk(
  "updateMarketThread",
  async (payload: any): Promise<{ success: boolean; message: string }> => {
    try {
      await axios.put(
        `${AppConfig.KNOW_NOW_MARKET_API}/update_favorite`,
        payload
      );
      return {
        success: true,
        message: "Successfully updated",
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to get Market chat",
      };
    }
  },
);

// -------------------------------------------------------------------------------------------------------

/**
 *
 */
export const KnownowMarketSlice = createSlice({
  name: "knownow-market",
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
      const newChat: IChat = { query, answer: "", message_id: 0 };
      if (state.chats) {
        state.chats.push(newChat);
        // Initialize if undefined
      }
      // state.chats = [];
    },

    // -------------------------------------------------------------------------------------------------------

    updateChatAnswer: (
      state,
      action: PayloadAction<{ index: number; answer: string; responseTime?: string }>,
    ) => {
      const { index, answer, responseTime } = action.payload;
      if (index >= 0 && index < (state.chats && state.chats.length)) {
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

    generateNewId: (state, action: PayloadAction<{ id: number }>) => {
      state.knownow_id = action.payload.id;
    },

    // -------------------------------------------------------------------------------------------------------

    setChatMarketIds: (
      state,
      action: PayloadAction<{ title: string; thread_id: number; favorite: boolean }>,
    ) => {
      if (!state.chatMarketIds) {
        state.chatMarketIds = []; // Initialize if undefined
      }
      state.chatMarketIds.unshift(action.payload);
    },

    //
    setRemoveMarketConversation: (state, action: PayloadAction<number>) => {
      const conversationId = action.payload;
      state.chatMarketIds = state.chatMarketIds.filter((c) => c.thread_id !== conversationId);
    },
   //--------------------------------------------------------------------------------------------------------
    setPinMarketConversation: (state, action: PayloadAction<number>) => {
      const conversationId = action.payload;
      const index = state.chatMarketIds.findIndex((c) => c.thread_id === conversationId);

      if (index !== -1) {
        state.chatMarketIds[index].favorite = !state.chatMarketIds[index].favorite;
      } else {
        state.chatMarketIds[index].favorite = false;
      }
    },
   // -------------------------------------------------------------------------------------------------------
   setTitleMarketConversation: (state, action: PayloadAction<{ renameThreadId: number, newTitle: string }>) => {
    const { renameThreadId, newTitle } = action.payload;
    const index = state.chatMarketIds.findIndex((c) => c.thread_id === renameThreadId);
  
    if (index !== -1) {
      state.chatMarketIds[index].title = newTitle;
    }
  },
  

  //----------------------------------------------------------------------------------------------------------
    saveKeywordsChat: (state, action: PayloadAction<any[]>) => {
      state.keywords = action.payload;
    },

    // -------------------------------------------------------------------------------------------------------

    resetMarketChats: (state) => {
      state.chats = [];
    },

    resetMarketchatMarketIds: (state) => {
      state.chatMarketIds = [];
    },

    resetKnowNowMarket: (state) => {
      state.chats = [];
      state.chatMarketIds = [];
      state.marketChatLoading = true;
    },

    // -------------------------------------------------------------------------------------------------------

    udateChatResponse: (state, action: PayloadAction<{ message_id: number; liked: boolean }>) => {
      const { message_id, liked } = action.payload;
      state.chats = state.chats.map((c) => (c.message_id === message_id ? { ...c, liked } : c));
    },
  },

  // -------------------------------------------------------------------------------------------------------

  extraReducers: (builder) => {
    builder
      .addCase(getMarketThread.fulfilled, (state, action) => {
        state.marketChatLoading = false;
        state.chatMarketIds = action.payload.data as any;
      })
      .addCase(getMarketChatById.fulfilled, (state, action) => {
        state.chats = action.payload.data;
      });
  },
});

// ------------------------------------------------------------------------------------------------------------

export default KnownowMarketSlice.reducer;
export const {
  setKnowNowChats,
  updateChatError,
  addQuestion,
  updateChatAnswer,
  generateNewId,
  setChatMarketIds,
  resetMarketChats,
  setPinMarketConversation,
  setTitleMarketConversation,
  saveKeywordsChat,
  resetMarketchatMarketIds,
  setRemoveMarketConversation,
  editQueryAndUpdateAnswer,
  udateChatResponse,
  resetKnowNowMarket,
} = KnownowMarketSlice.actions;
