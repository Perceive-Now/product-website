import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const BASE_URL = "https://pn-chatbot.azurewebsites.net";

export const EUploadAttachmentsPages = {
  UploadAttachments: 0,
  GoToReport: 1,
  NeedAdditionalAnswers: 2,
  AdditionalQuestions: 3,
  AllSet: 4,
} as const;

export type TUploadAttachmentsPages =
  (typeof EUploadAttachmentsPages)[keyof typeof EUploadAttachmentsPages];

export interface IUploadAttachmentsState {
  currentPageId: TUploadAttachmentsPages;
  currentStep: number;
  currentQuestionId: number;
  additionalQuestionIds: { question_id: number }[];
  answers: IAnswerObj[];
  isUploading: boolean;
  isUploadAttachmentsError: boolean;
  isUploadAttachmentsSuccess: boolean;
  isUploadAnswersToAddtionalQuestionsError: boolean;
  isUploadAnswersToAddtionalQuestionsSuccess: boolean;
  message: string;
}

export const initialState: IUploadAttachmentsState = {
  currentPageId: EUploadAttachmentsPages.UploadAttachments,
  currentStep: 0,
  currentQuestionId: 0,
  additionalQuestionIds: [],
  answers: [],
  isUploading: false,
  isUploadAttachmentsError: false,
  isUploadAttachmentsSuccess: false,
  isUploadAnswersToAddtionalQuestionsError: false,
  isUploadAnswersToAddtionalQuestionsSuccess: false,
  message: "",
};

// -----------------------------------------------------------------------
export const uploadAttachments = createAsyncThunk<
  IUploadAttachmentsResponse,
  IUploadAttachmentsRequest,
  {
    rejectValue: IResponseError;
  }
>("uploadAttachments", async (request: IUploadAttachmentsRequest, thunkAPI) => {
  const convertToBase64 = (file: File): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        const result = fileReader.result as string;
        resolve(result.split(",")[1]);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  try {
    const base64Files = await Promise.all(request.attachments.map(convertToBase64));

    const dataObj: IUploadAttachmentsRequestAPI = {
      user_cases_ids: request.user_case_ids ?? "",
      requirement_gathering_id: request.requirementGatheringId ?? "",
      user_id: request.userId ?? "",
      attachment: base64Files[0] ?? "",
    };

    return await axios.post(BASE_URL + "/attachment/", dataObj);
  } catch (error) {
    const errorObj = {
      resError: String(error),
      message: "Unable to upload attachments",
    };
    return thunkAPI.rejectWithValue(errorObj);
  }
});

// -----------------------------------------------------------------------
export const uploadAnswersToAddtionalQuestions = createAsyncThunk<
  IUploadAnswersToAddtionalQuestionsResponse,
  IUploadAnswersToAddtionalQuestionsRequest,
  {
    rejectValue: IResponseError;
  }
>(
  "uploadAnswersToAddtionalQuestions",
  async (request: IUploadAnswersToAddtionalQuestionsRequest, thunkAPI) => {
    try {
      const answersObj: IUploadAnswersToAddtionalQuestionsRequestAPI = {
        user_case_id: request.user_case_id,
        requirement_gathering_id: request.requirementGatheringId,
        userID: request.userId,
        QuestionID: String(request.answer.questionId),
        answer: request.answer.answer,
      };

      return await axios.post(BASE_URL + "/attachment-answers/", answersObj);
    } catch (error) {
      const errorObj = {
        resError: String(error),
        message: "Unable to upload answers to additional questions",
      };
      return thunkAPI.rejectWithValue(errorObj);
    }
  },
);

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

export const UploadAttachmentsSlice = createSlice({
  name: "upload-attachments",
  initialState,
  reducers: {
    // -----------------------------------------------------------------------
    setAnswers: (state, action: PayloadAction<IAnswerObj[]>) => {
      state.answers = action.payload;
    },

    // -----------------------------------------------------------------------
    setCurrentPageId: (state, action: PayloadAction<TUploadAttachmentsPages>) => {
      state.currentPageId = action.payload;
    },

    // -----------------------------------------------------------------------
    incrementStep: (state) => {
      state.currentStep += 1;
    },

    // -----------------------------------------------------------------------
    decrementStep: (state) => {
      state.currentStep -= 1;
    },

    // -----------------------------------------------------------------------
    setCurrentQuestionId: (state, action: PayloadAction<number>) => {
      state.currentQuestionId = action.payload;
    },

    // -----------------------------------------------------------------------
    setIsUploadAttachmentsSuccess: (state, action: PayloadAction<boolean>) => {
      state.isUploadAttachmentsSuccess = action.payload;
    },

    // -----------------------------------------------------------------------
    setIsUploadAttachmentsError: (state, action: PayloadAction<boolean>) => {
      state.isUploadAttachmentsError = action.payload;
    },

    // -----------------------------------------------------------------------
    setIsUploadAnswersToAddtionalQuestionsSuccess: (state, action: PayloadAction<boolean>) => {
      state.isUploadAnswersToAddtionalQuestionsSuccess = action.payload;
    },

    // -----------------------------------------------------------------------
    setIsUploadAnswersToAddtionalQuestionsError: (state, action: PayloadAction<boolean>) => {
      state.isUploadAnswersToAddtionalQuestionsError = action.payload;
    },

    // -----------------------------------------------------------------------
    getUploadAttachmentsSliceState: (state) => state,

    // -----------------------------------------------------------------------
    setUploadAttachmentsStateFromDraft: (state, action: PayloadAction<IUploadAttachmentsState>) => {
      state = action.payload;
    },

    // -----------------------------------------------------------------------
    reset: () => initialState,
  },
  extraReducers(builder) {
    // -----------------------------------------------------------------------
    builder.addCase(uploadAttachments.pending, (state) => {
      state.isUploading = true;
      state.isUploadAttachmentsError = false;
      state.isUploadAttachmentsError = false;
    });
    builder.addCase(uploadAttachments.fulfilled, (state, action) => {
      state.isUploading = false;
      state.isUploadAttachmentsError = false;
      state.isUploadAttachmentsSuccess = true;
      state.additionalQuestionIds = action.payload.data ?? [];
      state.currentQuestionId =
        state.additionalQuestionIds.length > 0 ? state.additionalQuestionIds[0].question_id : 0;
      state.answers = [];
    });
    builder.addCase(uploadAttachments.rejected, (state, action) => {
      state.isUploading = false;
      state.isUploadAttachmentsError = true;
      state.isUploadAttachmentsSuccess = false;
      state.message = action.error.message ?? "Unable to upload attachments";
    });

    // -----------------------------------------------------------------------
    builder.addCase(uploadAnswersToAddtionalQuestions.pending, (state) => {
      state.isUploading = true;
      state.isUploadAnswersToAddtionalQuestionsError = false;
      state.isUploadAnswersToAddtionalQuestionsSuccess = false;
    });
    builder.addCase(uploadAnswersToAddtionalQuestions.fulfilled, (state) => {
      state.isUploading = false;
      state.isUploadAnswersToAddtionalQuestionsError = false;
      state.isUploadAnswersToAddtionalQuestionsSuccess = true;
    });
    builder.addCase(uploadAnswersToAddtionalQuestions.rejected, (state, action) => {
      state.isUploading = false;
      state.isUploadAnswersToAddtionalQuestionsError = true;
      state.isUploadAnswersToAddtionalQuestionsSuccess = false;
      state.message = action.error.message ?? "Unable to upload answers to additional questions";
    });
  },
});

export const {
  setAnswers,
  reset,
  setCurrentPageId,
  incrementStep,
  decrementStep,
  setCurrentQuestionId,
  setIsUploadAnswersToAddtionalQuestionsError,
  setIsUploadAnswersToAddtionalQuestionsSuccess,
  setIsUploadAttachmentsError,
  setIsUploadAttachmentsSuccess,
  getUploadAttachmentsSliceState,
  setUploadAttachmentsStateFromDraft,
} = UploadAttachmentsSlice.actions;

export default UploadAttachmentsSlice.reducer;

interface IUploadAttachmentsRequest {
  user_case_ids: string[];
  requirementGatheringId: number;
  userId: string;
  attachments: File[];
}

interface IUploadAttachmentsRequestAPI {
  user_cases_ids: string[];
  requirement_gathering_id: number;
  user_id: string;
  attachment: string;
}

interface IUploadAttachmentsResponse {
  resError: string;
  data: { question_id: number }[];
  status: number;
  statusText: string;
}

interface IUploadAnswersToAddtionalQuestionsRequest {
  userId: string;
  requirementGatheringId: number;
  answer: IAnswerObj;
  user_case_id: string;
}

interface IUploadAnswersToAddtionalQuestionsResponse {
  resError: string;
  data: number[];
  status: number;
  statusText: string;
}

interface IUploadAnswersToAddtionalQuestionsRequestAPI {
  QuestionID: string;
  requirement_gathering_id: number;
  userID: string;
  answer: string;
  user_case_id: string;
}

interface IResponseError {
  resError: string;
  message: string;
}

export interface IAnswerObj {
  questionId: number;
  answer: string;
}
