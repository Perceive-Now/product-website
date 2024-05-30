import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IChat {
  query: string;
  answer: string;
  response_time?: string;
  error?: string;
}

interface IKnowNow {
  chats: IChat[];
}

const initialState: IKnowNow = {
  chats: [],
};

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
    updateChatAnswer: (state, action: PayloadAction<{ index: number; answer: string }>) => {
      const { index, answer } = action.payload;
      if (index >= 0 && index < state.chats.length) {
        state.chats[index].answer = answer;
      }
    },
    editQueryAndUpdateAnswer: (
      state,
      action: PayloadAction<{ index: number; newQuery: string; newAnswer: string }>,
    ) => {
      const { index, newQuery, newAnswer } = action.payload;
      if (index >= 0 && index < state.chats.length) {
        state.chats[index].query = newQuery;
        state.chats[index].answer = newAnswer;
        // Remove subsequent chat objects
        state.chats = state.chats.slice(0, index + 1);
      }
    },
  },
});

export default KnownowSlice1.reducer;
export const { setKnowNowChats, addQuestion, updateChatAnswer, editQueryAndUpdateAnswer } =
  KnownowSlice1.actions;
