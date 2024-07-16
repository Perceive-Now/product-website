import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import jsCookie from "js-cookie";
import { AppConfig } from "src/config/app.config";
import { RootState } from 'src/store';

const BASE_PN_REPORT_URL = AppConfig.REPORT_API_URL;

interface IResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

interface IQuestionAnswerResponse {
  question: string;
  questionID: number;
  sessionID: number;
  status: string;
  userID: string;
}

interface IAnswerQuestionsRequestAPI {
  QuestionID: number;
  requirement_gathering_id: number;
  userID: string;
  answer: string;
  user_case_id: string;
}

interface IAnswerQuestionsResponseAPI {
  data: {
    question: string;
    questionID: number;
    sessionID: number;
    status: string;
    userID: string;
  };
}

interface IAnswerQuestionsRequest {
  userId: string;
  requirementGatheringId: number;
  answer: string;
  useCaseId: string;
  questionId: number;
}

interface IResponseError {
  resError: string;
  message: string;
}

interface IQuestionAnswer {
  questionId: number;
  useCaseId: number;
  question: string;
  usecase: string;
  answer: string;
  exampleAnswer: string;
}

export interface IQAState {
  currentPageId: IQAPage;
  currentStep: number;
  currentQuestionId: number;
  message: string;
  generateAnswerSuccess: boolean;
  generateAnswerError: boolean;
  answerResponse: IQuestionAnswerResponse;
  questionsList: {
    questionId: number;
    useCaseId: number;
    question: string;
    usecase: string;
    answer: string;
    exampleAnswer: string;
  }[];
  skippedQuestionList: {
    questionId: number;
    useCaseId: number;
    question: string;
    usecase: string;
    answer: string;
    exampleAnswer: string;
  }[];
  updatedQAList: IAnswers[];
  requirementGatheringId: number;
  userId: string;
}

export interface IAnswers {
  question_id: string | number;
  requirement_gathering_id: string;
  user_id: string;
  answer: string;
}

export const QAPages = {
  QA: 1,
  Review: 2,
  edit: 3,
} as const;

export type IQAPage = (typeof QAPages)[keyof typeof QAPages];

export const initialState: IQAState = {
  currentPageId: QAPages.QA,
  currentStep: 0,
  currentQuestionId: 1,
  message: "",
  answerResponse: {
    question: "",
    questionID: 0,
    sessionID: 0,
    status: "",
    userID: "",
  },
  questionsList: [],
  skippedQuestionList: [],
  generateAnswerError: false,
  generateAnswerSuccess: false,
  updatedQAList: [],
  requirementGatheringId: 0, // Initialize with default value
  userId: jsCookie.get("user_id") || "", // Initialize with value from cookies
};

export const generateQuestionAnswer = createAsyncThunk<
  IAnswerQuestionsResponseAPI,
  IAnswerQuestionsRequest,
  {
    rejectValue: IResponseError;
  }
>("generateQuestionAnswer", async (request: IAnswerQuestionsRequest, thunkAPI) => {
  try {
    const answersObj: IAnswerQuestionsRequestAPI = {
      user_case_id: request.useCaseId,
      requirement_gathering_id: request.requirementGatheringId,
      userID: request.userId,
      QuestionID: Number(request.questionId),
      answer: request.answer,
    };
    return await axios.post(
      `${BASE_PN_REPORT_URL}/generate/?answer=${encodeURIComponent(answersObj.answer)}&userID=${
        answersObj.userID
      }&QuestionID=${Number(answersObj.QuestionID)}&requirement_gathering_id=${
        answersObj.requirement_gathering_id
      }&user_case_id=${answersObj.user_case_id}`,
    );
  } catch (error) {
    const errorObj = {
      resError: String(error),
      message: "Failed to generate answer",
    };
    return thunkAPI.rejectWithValue(errorObj);
  }
});

// async thunk to save the draft
export const saveDraft = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
    rejectValue: IResponseError;
  }
>("q&a/saveDraft", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const { QA, usecases } = state;

  try {
    await axios.post(`${BASE_PN_REPORT_URL}/draft/`, {
      requirement_gathering_id: usecases.requirementGatheringId, // Get it from usecases state
      user_id: QA.userId,
      current_page: "/q&a", 
      other_data: QA,
      date: new Date().toISOString(),
      report_name: "User's Report", 
    });
  } catch (error) {
    const errorObj = {
      resError: String(error),
      message: "Failed to save draft",
    };
    return thunkAPI.rejectWithValue(errorObj);
  }
});

export const getUpdatedAnswer = createAsyncThunk(
  "getUpdatedAnswer",
  async (): Promise<IResponse> => {
    const user_id = jsCookie.get("user_id") ?? "";
    const requirementGatheringId = jsCookie.get("requirement_gathering_id");
    try {
      const response = await axios.get<IAnswers[]>(
        `${BASE_PN_REPORT_URL}/get-answers/?userID=${user_id}&requirement_gathering_id=${requirementGatheringId}`,
      );
      return {
        success: true,
        message: "Successfully fetched Q&A",
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to fetch Q&A",
      };
    }
  },
);

export const QuestionAnswerSlice = createSlice({
  name: "q&a",
  initialState,
  reducers: {
    setCurrentPageId: (state, action: PayloadAction<IQAPage>) => {
      state.currentPageId = action.payload;
    },
    incrementStep: (state) => {
      state.currentStep += 1;
    },
    decrementStep: (state) => {
      state.currentStep -= 1;
    },
    setGenerateAnswerError: (state, action: PayloadAction<boolean>) => {
      state.generateAnswerError = action.payload;
    },
    setGenerateAnswerSuccess: (state, action: PayloadAction<boolean>) => {
      state.generateAnswerSuccess = action.payload;
    },
    setCurrentQuestionId: (state, action: PayloadAction<number>) => {
      state.currentQuestionId = action.payload;
    },
    setSkippedQuestions: (state, action: PayloadAction<IQuestionAnswer[]>) => {
      action.payload.forEach((skippedQuestion) => {
        state.questionsList = state.questionsList.filter(
          (question) => question.questionId !== skippedQuestion.questionId,
        );
      });
      state.skippedQuestionList = action.payload;
    },
    updateQuestionAnswer: (
      state,
      action: PayloadAction<{ questionId: number; answer: string }>,
    ) => {
      state.questionsList = state.questionsList.map((question) => {
        if (question.questionId === action.payload.questionId) {
          question.answer = action.payload.answer;
        }
        return question;
      });
    },
    updateQuestionList: (
      state,
      action: PayloadAction<{ questionId: number; question: string }>,
    ) => {
      state.questionsList = state.questionsList.map((question) => {
        if (question.questionId === action.payload.questionId) {
          question.question = action.payload.question;
        }
        return question;
      });
    },
    questionWithUseCases: (state, action: PayloadAction<IQuestionAnswer[]>) => {
      state.questionsList = action.payload;
    },
    addToSkippedQuestionList: (state, action: PayloadAction<IQuestionAnswer>) => {
      state.questionsList = state.questionsList.filter(
        (question) => question.questionId !== action.payload.questionId,
      );
      state.skippedQuestionList = [...state.skippedQuestionList, action.payload];
    },
    removeFromSkippedQuestionList: (state, action: PayloadAction<IQuestionAnswer>) => {
      // Remove the question from skippedQuestionList
      state.skippedQuestionList = state.skippedQuestionList.filter(
        (question) => question.questionId !== action.payload.questionId,
      );

      // Check if the question is already in questionsList
      const questionIndex = state.questionsList.findIndex(
        (q) => q.questionId === action.payload.questionId,
      );

      if (questionIndex === -1) {
        // If not found, add the question to questionsList
        const emptyAnswerIndex = state.questionsList.findIndex((q) => q.answer === "");

        if (emptyAnswerIndex !== -1) {
          state.questionsList.splice(emptyAnswerIndex, 0, action.payload);
        } else {
          state.questionsList.push(action.payload);
        }
      }
    },
    updateNewQuestionList: (state, action: PayloadAction<IUpdateQuestionPayload>) => {
      const { questionAnswer, currentId } = action.payload;
      const questionIndex = state.questionsList.findIndex((q) => q.questionId === currentId);

      if (questionIndex !== -1) {
        state.questionsList[questionIndex] = questionAnswer;
      } else {
        state.questionsList.push(action.payload.questionAnswer);
      }
    },
    reset: () => initialState,
    setRequirementGatheringId: (state, action: PayloadAction<number>) => {
      state.requirementGatheringId = action.payload;
    },
    
  },
  extraReducers(builder) {
    builder.addCase(generateQuestionAnswer.pending, (state) => {
      state.generateAnswerError = false;
      state.generateAnswerSuccess = false;
    });
    builder.addCase(generateQuestionAnswer.fulfilled, (state, action) => {
      state.generateAnswerError = false;
      state.generateAnswerSuccess = true;
      state.answerResponse = action.payload.data;
    });
    builder.addCase(generateQuestionAnswer.rejected, (state, action) => {
      state.generateAnswerError = true;
      state.generateAnswerSuccess = false;
      state.message = "Unable to generate answers" ?? action.error.message;
    });
    builder.addCase(getUpdatedAnswer.fulfilled, (state, action) => {
      const payloadData = action.payload.data;
      state.updatedQAList = payloadData;
    });
    builder.addCase(saveDraft.fulfilled, (state) => {
      state.message = "Draft saved successfully";
    });
    builder.addCase(saveDraft.rejected, (state, action) => {
      state.message = "Failed to save draft" ?? action.error.message;
    });
  },
});

interface IUpdateQuestionPayload {
  questionAnswer: IQuestionAnswer;
  currentId: number;
}

export const {
  reset,
  setCurrentPageId,
  incrementStep,
  decrementStep,
  setCurrentQuestionId,
  updateQuestionList,
  addToSkippedQuestionList,
  removeFromSkippedQuestionList,
  updateNewQuestionList,
  setGenerateAnswerError,
  setGenerateAnswerSuccess,
  questionWithUseCases,
  updateQuestionAnswer,
  setRequirementGatheringId,
  setSkippedQuestions,
} = QuestionAnswerSlice.actions;

export default QuestionAnswerSlice.reducer;
