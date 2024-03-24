import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
const initialState: IChat = {
  questionId: undefined,

  first: {
    answer: undefined,
    question: undefined,
    questionId: undefined,
  },
  second: {
    answer: undefined,
    question: undefined,
    questionId: undefined,
  },
  thrid: {
    answer: undefined,
    question: undefined,
    questionId: undefined,
  },
  fourth: {
    answer: undefined,
    question: undefined,
    questionId: undefined,
  },
  fifth: {
    answer: undefined,
    question: undefined,
    questionId: undefined,
  },
  sixth: {
    answer: undefined,
    question: undefined,
    questionId: undefined,
  },
  seventh: {
    answer: undefined,
    question: undefined,
    questionId: undefined,
  },
  eight: {
    answer: undefined,
    question: undefined,
    questionId: undefined,
  },
  ninth: {
    answer: undefined,
    question: undefined,
    questionId: undefined,
  },
  tenth: {
    answer: undefined,
    question: undefined,
    questionId: undefined,
  },
  eleventh: {
    answer: undefined,
    question: undefined,
    questionId: undefined,
  },
};

/**
 *
 */
export const ChatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setQuestionId: (state, action: PayloadAction<IQuestion>) => {
      state.questionId === action.payload.questionId;
    },
    setFirstChat: (state, action: PayloadAction<IChatValue>) => {
      state.first.answer = action.payload.answer;
      state.first.question = action.payload.question;
      state.first.questionId = action.payload.questionId;
    },
    setSecondChat: (state, action: PayloadAction<IChatValue>) => {
      state.second.answer = action.payload.answer;
      state.second.question = action.payload.question;
      state.second.questionId = action.payload.questionId;
    },
    setThirdChat: (state, action: PayloadAction<IChatValue>) => {
      state.thrid.answer = action.payload.answer;
      state.thrid.question = action.payload.question;
      state.thrid.questionId = action.payload.questionId;
    },
    setFourthChat: (state, action: PayloadAction<IChatValue>) => {
      state.fourth.answer = action.payload.answer;
      state.fourth.question = action.payload.question;
      state.fourth.questionId = action.payload.questionId;
    },
    setFifthChat: (state, action: PayloadAction<IChatValue>) => {
      state.fifth.answer = action.payload.answer;
      state.fifth.question = action.payload.question;
      state.fifth.questionId = action.payload.questionId;
    },
    setSixthChat: (state, action: PayloadAction<IChatValue>) => {
      state.sixth.answer = action.payload.answer;
      state.sixth.question = action.payload.question;
      state.sixth.questionId = action.payload.questionId;
    },
    setSeventhChat: (state, action: PayloadAction<IChatValue>) => {
      state.seventh.answer = action.payload.answer;
      state.seventh.question = action.payload.question;
      state.seventh.questionId = action.payload.questionId;
    },
    setEightChat: (state, action: PayloadAction<IChatValue>) => {
      state.eight.answer = action.payload.answer;
      state.eight.question = action.payload.question;
      state.eight.questionId = action.payload.questionId;
    },
    setNinthChat: (state, action: PayloadAction<IChatValue>) => {
      state.ninth.answer = action.payload.answer;
      state.ninth.question = action.payload.question;
      state.ninth.questionId = action.payload.questionId;
    },
    setTenthChat: (state, action: PayloadAction<IChatValue>) => {
      state.tenth.answer = action.payload.answer;
      state.tenth.question = action.payload.question;
      state.tenth.questionId = action.payload.questionId;
    },
    setEleventhChat: (state, action: PayloadAction<IChatValue>) => {
      state.eleventh.answer = action.payload.answer;
      state.eleventh.question = action.payload.question;
      state.eleventh.questionId = action.payload.questionId;
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
  setQuestionId,
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
  questionId?: number;
}

interface IChatValue {
  answer: string | undefined;
  question: string | undefined;
  questionId: number | undefined;
}

interface IQuestion {
  questionId: number | undefined;
}
