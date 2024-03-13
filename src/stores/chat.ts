import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
const initialState: IChat = {
  first: {
    answer: undefined,
    question: undefined,
  },
  second: {
    answer: undefined,
    question: undefined,
  },
  thrid: {
    answer: undefined,
    question: undefined,
  },
  fourth: {
    answer: undefined,
    question: undefined,
  },
  fifth: {
    answer: undefined,
    question: undefined,
  },
  sixth: {
    answer: undefined,
    question: undefined,
  },
  seventh: {
    answer: undefined,
    question: undefined,
  },
  eight: {
    answer: undefined,
    question: undefined,
  },
  ninth: {
    answer: undefined,
    question: undefined,
  },
  tenth: {
    answer: undefined,
    question: undefined,
  },
  eleventh: {
    answer: undefined,
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
    setFirstChat: (state, action: PayloadAction<IChatValue>) => {
      state.first.answer = action.payload.answer;
      state.first.question = action.payload.question;
    },
    setSecondChat: (state, action: PayloadAction<IChatValue>) => {
      state.second.answer = action.payload.answer;
      state.second.question = action.payload.question;
    },
    setThirdChat: (state, action: PayloadAction<IChatValue>) => {
      state.thrid.answer = action.payload.answer;
      state.thrid.question = action.payload.question;
    },
    setFourthChat: (state, action: PayloadAction<IChatValue>) => {
      state.fourth.answer = action.payload.answer;
      state.fourth.question = action.payload.question;
    },
    setFifthChat: (state, action: PayloadAction<IChatValue>) => {
      state.fifth.answer = action.payload.answer;
      state.fifth.question = action.payload.question;
    },
    setSixthChat: (state, action: PayloadAction<IChatValue>) => {
      state.sixth.answer = action.payload.answer;
      state.sixth.question = action.payload.question;
    },
    setSeventhChat: (state, action: PayloadAction<IChatValue>) => {
      state.seventh.answer = action.payload.answer;
      state.seventh.question = action.payload.question;
    },
    setEightChat: (state, action: PayloadAction<IChatValue>) => {
      state.eight.answer = action.payload.answer;
      state.eight.question = action.payload.question;
    },
    setNinthChat: (state, action: PayloadAction<IChatValue>) => {
      state.ninth.answer = action.payload.answer;
      state.ninth.question = action.payload.question;
    },
    setTenthChat: (state, action: PayloadAction<IChatValue>) => {
      state.tenth.answer = action.payload.answer;
      state.tenth.question = action.payload.question;
    },
    setEleventhChat: (state, action: PayloadAction<IChatValue>) => {
      state.eleventh.answer = action.payload.answer;
      state.eleventh.question = action.payload.question;
    },
  },
});

//
export const {
  setFirstChat,
  setSecondChat,
  setThirdChat,
  setFourthChat,
  setFifthChat,
  setSixthChat,
  setSeventhChat,
  setEightChat,
  setNinthChat,
  setTenthChat,
  setEleventhChat,
} = ChatSlice.actions;

export default ChatSlice.reducer;

interface IChat {
  first: IChatValue;
  second: IChatValue;
  thrid: IChatValue;
  fourth: IChatValue;
  fifth: IChatValue;
  sixth: IChatValue;
  seventh: IChatValue;
  eight: IChatValue;
  ninth: IChatValue;
  tenth: IChatValue;
  eleventh: IChatValue;
}

interface IChatValue {
  answer: string | undefined;
  question: string | undefined;
}
