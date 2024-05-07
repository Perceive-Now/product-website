import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// import type { IKeywordOption } from "../components/reusable/search";

//
const initialState: IDetail = {
  chat: {
    question: undefined,
    answer: undefined,
    question_id: undefined,
    exampleAnswer: undefined,
  },
  question: {
    question: undefined,
  },
};

/**
 *
 */
export const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChat: (state, action: PayloadAction<IChat>) => {
      state.chat = action.payload;
    },
    setQuestion: (state, action: PayloadAction<IQuestion>) => {
      state.question.question = action.payload.question;
    },
  },
});

//
export const { setChat } = ChatSlice.actions;
export default ChatSlice.reducer;

//
interface IDetail {
  question: IQuestion;
  chat: IChat;
}
interface IQuestion {
  question: string | undefined;
}

interface IChat {
  question?: string;
  question_id?: string;
  session_id?: string;
  answer?: string;
  exampleAnswer?: string;
}
