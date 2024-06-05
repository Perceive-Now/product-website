import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const BASE_URL = "https://pn-chatbot.azurewebsites.net";

interface UploadAttachmentsState {
  currentPageId: number;
  currentStep: number;
  currentQuestionId: number;
  additionalQuestionIds: number[];
  answers: IAnswerObj[];
  isUploading: boolean;
  isUploadAttachmentsError: boolean;
  isUploadAttachmentsSuccess: boolean;
  isUploadAnswersToAddtionalQuestionsError: boolean;
  isUploadAnswersToAddtionalQuestionsSuccess: boolean;
  message: string;
}

const initialState: UploadAttachmentsState = {
  currentPageId: 0,
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

    const dataObj = {
      category_id: request.categoryId ?? "",
      session_id: request.sessionId ?? "",
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
      const user_id = request.userId;
      const session_id = request.sessionId;
      const category_id = request.categoryId;

      const answersObj = request.answers.map((answer) => {
        return {
          category_id: category_id,
          session_id: session_id,
          user_id: user_id,
          question_id: String(answer.questionId),
          answer: answer.answer,
        };
      });

      return await axios.post(BASE_URL + "/attachment-answers/", { answers: answersObj });
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
    setCurrentPageId: (state, action: PayloadAction<number>) => {
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
    getUploadAttachmentsState: (state) => state,

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
      state.currentQuestionId = 0;
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
      state.additionalQuestionIds = [];
      state.currentQuestionId = 0;
      state.answers = [];
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
  getUploadAttachmentsState,
} = UploadAttachmentsSlice.actions;

export default UploadAttachmentsSlice.reducer;

interface IUploadAttachmentsRequest {
  categoryId: string;
  sessionId: string;
  userId: string;
  attachments: File[];
}

interface IUploadAttachmentsResponse {
  resError: string;
  data: number[];
  status: number;
  statusText: string;
}

interface IUploadAnswersToAddtionalQuestionsRequest {
  categoryId: string;
  sessionId: string;
  userId: string;
  answers: IAnswerObj[];
}

interface IUploadAnswersToAddtionalQuestionsResponse {
  resError: string;
  data: number[];
  status: number;
  statusText: string;
}

interface IResponseError {
  resError: string;
  message: string;
}

export interface IAnswerObj {
  questionId: number;
  answer: string;
}
