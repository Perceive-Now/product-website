import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { questionList } from "src/pages/product/report-q&a/_question";
import { AppConfig } from "src/config/app.config";
import { RootState } from 'src/store';

const BASE_PN_REPORT_URL = AppConfig.REPORT_API_URL;

export const EUploadAttachmentsPages = {
  UploadAttachments: 0,
  WebsiteLinks: 1,
  GoToReport: 2,
  AdditionalQuestions: 3,
  AllSet: 4,
} as const;

export type TUploadAttachmentsPages =
  (typeof EUploadAttachmentsPages)[keyof typeof EUploadAttachmentsPages];

interface IQuestionAnswer {
  questionId: number;
  useCaseId: number;
  question: string;
  usecase: string;
  answer: string;
}
interface IAdditionalQuestionId {
  question_id: number
}

export interface IUploadAttachmentsState {
  currentPageId: TUploadAttachmentsPages;
  currentStep: number;
  currentQuestionId: number;
  filesToUpload: File[];
  websiteLinks: string[];
  additionalQuestionIds: { question_id: number }[];
  answers: IAnswerObj[];
  isUploading: boolean;
  isUploadAttachmentsError: boolean;
  isUploadAttachmentsSuccess: boolean;
  isUploadAnswerToAddtionalQuestionsError: boolean;
  isUploadAnswerToAddtionalQuestionsSuccess: boolean;
  message: string;
  answerResponse: IuploadAnswerToAddtionalQuestionsResponse;
  questionsList: {
    questionId: number;
    useCaseId: number;
    question: string;
    usecase: string;
    answer: string;
  }[];
  requirementSummary: TSingleRequirementSummary[];
  fetchRequirementSummaryState: {
    isSuccess: boolean;
    isError: boolean;
    isLoading: boolean;
    message: string;
  };
  requirementPercentage: number;
  fetchRequirementPercentageState: {
    isSuccess: boolean;
    isError: boolean;
    isLoading: boolean;
    message: string;
  };
}

export const initialState: IUploadAttachmentsState = {
  currentPageId: EUploadAttachmentsPages.UploadAttachments,
  currentStep: 0,
  currentQuestionId: 0,
  filesToUpload: [],
  websiteLinks: [],
  additionalQuestionIds: [],
  answers: [],
  isUploading: false,
  isUploadAttachmentsError: false,
  isUploadAttachmentsSuccess: false,
  isUploadAnswerToAddtionalQuestionsError: false,
  isUploadAnswerToAddtionalQuestionsSuccess: false,
  message: "",
  answerResponse: {
    question: "",
    questionID: 0,
    sessionID: 0,
    status: "",
    userID: "",
  },
  questionsList: questionList,
  requirementSummary: [],
  fetchRequirementSummaryState: {
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
  },
  requirementPercentage: 0,
  fetchRequirementPercentageState: {
    isSuccess: false,
    isError: false,
    isLoading: false,
    message: "",
  },
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
    const attachmentsArr = request.attachments.map((attachment, index) => {
      return {
        file: base64Files[index] ?? "",
        fileType: attachment.type,
        fileName: attachment.name,
      };
    });

    const dataObj: IUploadAttachmentsRequestAPI = {
      user_cases_ids: request.user_case_ids ?? "",
      requirement_gathering_id: request.requirementGatheringId ?? "",
      user_id: request.userId ?? "",
      attachments: attachmentsArr ?? [],
      web_urls: request.webUrls ?? [],
    };

    return await axios.post(BASE_PN_REPORT_URL + "/attachment/", dataObj);
  } catch (error) {
    let message = "Unable to upload attachments";

    if (
      error &&
      typeof error === "object" &&
      "response" in error &&
      typeof error.response === "object" &&
      error.response &&
      "data" in error.response &&
      typeof error.response.data === "object" &&
      error.response.data &&
      "detail" in error.response.data &&
      typeof error.response.data.detail === "string"
    ) {
      message = error.response?.data?.detail;
    }

    const errorObj = {
      resError: String(error),
      message,
    };
    return thunkAPI.rejectWithValue(errorObj);
  }
});

export const saveDraft = createAsyncThunk<
  void,
  void,
  {
    state: RootState;
    rejectValue: IResponseError;
  }
>("uploadAttachments/saveDraft", async (_, thunkAPI) => {
  const state = thunkAPI.getState();
  const { QA, uploadAttachments, usecases } = state;

  try {
    await axios.post(`${BASE_PN_REPORT_URL}/draft/`, {
      requirement_gathering_id: usecases.requirementGatheringId, // Get it from usecases state
      user_id: QA.userId,
      current_page: "/upload-attachments", 
      other_data: uploadAttachments,
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

// -----------------------------------------------------------------------
export const fetchRequirementSummary = createAsyncThunk<
  TSummaryResponseAPI,
  ISummaryRequest,
  {
    rejectValue: IResponseError;
  }
>("requirementSummary", async (request, thunkAPI) => {
  try {
    const dataObj: ISummaryRequestAPI = {
      use_case_ids: request.useCaseIds ?? [],
      requirement_gathering_id: request.requirement_gathering_id ?? "",
    };

    return await axios.post(BASE_PN_REPORT_URL + "/summary", dataObj);
  } catch (error) {
    const errorObj = {
      resError: String(error),
      message: "Unable to fetch summary",
    };
    return thunkAPI.rejectWithValue(errorObj);
  }
});

// -----------------------------------------------------------------------
export const fetchRequirementPercentage = createAsyncThunk<
  IRequirementPercentageResponseAPI,
  IRequirementPercentageRequestAPI,
  {
    rejectValue: IResponseError;
  }
>("fetchRequirementPercentage", async (request, thunkAPI) => {
  try {
    return await axios.get(
      `${BASE_PN_REPORT_URL}/completion-precentage?requirement_gathering_id=${encodeURIComponent(
        request.requirement_gathering_id,
      )}`,
    );
  } catch (error) {
    const errorObj = {
      resError: String(error),
      message: "Unable to fetch completion percentage",
    };
    return thunkAPI.rejectWithValue(errorObj);
  }
});

// -----------------------------------------------------------------------
export const uploadAnswerToAddtionalQuestions = createAsyncThunk<
  IuploadAnswerToAddtionalQuestionsResponseAPI,
  IuploadAnswerToAddtionalQuestionsRequest,
  {
    rejectValue: IResponseError;
  }
>(
  "uploadAnswerToAddtionalQuestions",
  async (request: IuploadAnswerToAddtionalQuestionsRequest, thunkAPI) => {
    try {
      const answersObj: IUploadAnswerToAddtionalQuestionsRequestAPI = {
        user_case_id: request.useCaseId,
        requirement_gathering_id: request.requirementGatheringId,
        userID: request.userId,
        QuestionID: Number(request.questionId),
        answer: request.answer.answer,
      };

      return await axios.post(
        `${BASE_PN_REPORT_URL}/attachment-answer/?answer=${encodeURIComponent(
          answersObj.answer,
        )}&userID=${answersObj.userID}&QuestionID=${Number(
          answersObj.QuestionID,
        )}&requirement_gathering_id=${answersObj.requirement_gathering_id}&user_case_id=${
          answersObj.user_case_id
        }`,
      );
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
    setFilesToUpload: (state, action: PayloadAction<File[]>) => {
      state.filesToUpload = action.payload;
    },

    // -----------------------------------------------------------------------
    setWebsiteLinks: (state, action: PayloadAction<string[]>) => {
      state.websiteLinks = action.payload;
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
    setisUploadAnswerToAddtionalQuestionsSuccess: (state, action: PayloadAction<boolean>) => {
      state.isUploadAnswerToAddtionalQuestionsSuccess = action.payload;
    },

    // -----------------------------------------------------------------------
    setisUploadAnswerToAddtionalQuestionsError: (state, action: PayloadAction<boolean>) => {
      state.isUploadAnswerToAddtionalQuestionsError = action.payload;
    },

    setRequirementPercentage: (state, action: PayloadAction<number>) => {
      state.requirementPercentage = action.payload;
    },
    setRequirementSummary: (state, action: PayloadAction <TSingleRequirementSummary[]>) => {
      state.requirementSummary = action.payload;
    },
    setQuestionsList: (state, action: PayloadAction <IQuestionAnswer[]>) => {
      state.questionsList = action.payload;
    },
    setAddtionalQuestionIds: (state, action: PayloadAction <IAdditionalQuestionId[]>) => {
      state.additionalQuestionIds = action.payload;
    },

    // -----------------------------------------------------------------------
    resetFetchRequirementSummaryState: (state) => {
      state.fetchRequirementSummaryState = {
        isSuccess: false,
        isError: false,
        isLoading: false,
        message: "",
      };
    },

    // -----------------------------------------------------------------------
    resetFetchRequirementPercentageState: (state) => {
      state.fetchRequirementPercentageState = {
        isSuccess: false,
        isError: false,
        isLoading: false,
        message: "",
      };
    },

    // -----------------------------------------------------------------------
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

      const checkedData = action.payload.data ?? [];
      const uniqueQuestionIdsSet = new Set<number>(checkedData.map((item) => item.question_id));
      const uniqueQuestionIdsArray = Array.from(uniqueQuestionIdsSet);
      state.additionalQuestionIds = uniqueQuestionIdsArray.map((questionId) => ({
        question_id: questionId,
      }));

      state.currentQuestionId =
        state.additionalQuestionIds.length > 0 ? state.additionalQuestionIds[0].question_id : 0;
      state.answers = [];
    });
    builder.addCase(uploadAttachments.rejected, (state, action) => {
      state.isUploading = false;
      state.isUploadAttachmentsError = true;
      state.isUploadAttachmentsSuccess = false;
      state.message = action.payload?.message ?? "Unable to upload attachments";
    });

    // -----------------------------------------------------------------------
    builder.addCase(uploadAnswerToAddtionalQuestions.pending, (state) => {
      state.isUploading = true;
      state.isUploadAnswerToAddtionalQuestionsError = false;
      state.isUploadAnswerToAddtionalQuestionsSuccess = false;
    });
    builder.addCase(uploadAnswerToAddtionalQuestions.fulfilled, (state, action) => {
      state.isUploading = false;
      state.isUploadAnswerToAddtionalQuestionsError = false;
      state.isUploadAnswerToAddtionalQuestionsSuccess = true;
      state.answerResponse = action.payload.data;
    });
    builder.addCase(uploadAnswerToAddtionalQuestions.rejected, (state, action) => {
      state.isUploading = false;
      state.isUploadAnswerToAddtionalQuestionsError = true;
      state.isUploadAnswerToAddtionalQuestionsSuccess = false;
      state.message = "Unable to upload answers" ?? action.error.message;
    });

    // -----------------------------------------------------------------------
    builder.addCase(fetchRequirementSummary.pending, (state) => {
      state.isUploading = true;
      state.fetchRequirementSummaryState = {
        isError: false,
        isSuccess: false,
        isLoading: true,
        message: "",
      };
    });
    builder.addCase(fetchRequirementSummary.fulfilled, (state, action) => {
      state.isUploading = false;
      state.fetchRequirementSummaryState = {
        isError: false,
        isSuccess: true,
        isLoading: true,
        message: "",
      };

      const useCaseSummaries = action.payload.data
        .map((summaryItem) => {
          if ("summary" in summaryItem) {
            return {
              summary: summaryItem.summary,
              useCaseId: summaryItem.use_case_id,
            };
          } else {
            return null;
          }
        })
        .filter((f) => f !== null);

      const contentSummary = action.payload.data
        .map((summaryItem) => {
          if ("content_summary" in summaryItem) {
            return {
              contentSummary: summaryItem.content_summary,
            };
          } else {
            return null;
          }
        })
        .filter((f) => f !== null);

      state.requirementSummary = [...useCaseSummaries, ...contentSummary].reverse();
    });
    builder.addCase(fetchRequirementSummary.rejected, (state, action) => {
      state.isUploading = false;
      state.fetchRequirementSummaryState = {
        isError: true,
        isSuccess: false,
        isLoading: true,
        message: action.payload?.message ?? "Unable to fetch summary",
      };
    });

    // -----------------------------------------------------------------------
    builder.addCase(fetchRequirementPercentage.pending, (state) => {
      state.isUploading = true;
      state.fetchRequirementPercentageState = {
        isError: false,
        isSuccess: false,
        isLoading: true,
        message: "",
      };
    });
    builder.addCase(fetchRequirementPercentage.fulfilled, (state, action) => {
      state.isUploading = false;
      state.fetchRequirementPercentageState = {
        isError: false,
        isSuccess: true,
        isLoading: false,
        message: "",
      };
      state.requirementPercentage = action.payload.data.completion_percentage;
    });
    builder.addCase(fetchRequirementPercentage.rejected, (state, action) => {
      state.isUploading = false;
      state.fetchRequirementPercentageState = {
        isError: true,
        isSuccess: false,
        isLoading: true,
        message: action.payload?.message ?? "Unable to fetch summary",
      };
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
  setisUploadAnswerToAddtionalQuestionsError,
  setisUploadAnswerToAddtionalQuestionsSuccess,
  setIsUploadAttachmentsError,
  setIsUploadAttachmentsSuccess,
  getUploadAttachmentsSliceState,
  setUploadAttachmentsStateFromDraft,
  updateQuestionList,
  setFilesToUpload,
  resetFetchRequirementSummaryState,
  setWebsiteLinks,
  setRequirementPercentage,
  resetFetchRequirementPercentageState,
  setRequirementSummary,
  setQuestionsList,
  setAddtionalQuestionIds
} = UploadAttachmentsSlice.actions;

export default UploadAttachmentsSlice.reducer;

interface IUploadAttachmentsRequest {
  user_case_ids: string[];
  requirementGatheringId: number;
  userId: string;
  attachments: File[];
  webUrls: string[];
}

interface IUploadAttachmentsRequestAPI {
  user_cases_ids: string[];
  requirement_gathering_id: number;
  user_id: string;
  attachments: {
    file: string;
    fileType: string;
    fileName: string;
  }[];
  web_urls: string[];
}

interface IUploadAttachmentsResponse {
  resError: string;
  data: { question_id: number }[];
  status: number;
  statusText: string;
}

interface IuploadAnswerToAddtionalQuestionsRequest {
  userId: string;
  requirementGatheringId: number;
  answer: IAnswerObj;
  useCaseId: string;
  questionId: number;
}

interface IUploadAnswerToAddtionalQuestionsRequestAPI {
  QuestionID: number;
  requirement_gathering_id: number;
  userID: string;
  answer: string;
  user_case_id: string;
}

interface IuploadAnswerToAddtionalQuestionsResponse {
  question: string;
  questionID: number;
  sessionID: number;
  status: string;
  userID: string;
}

interface IuploadAnswerToAddtionalQuestionsResponseAPI {
  data: {
    question: string;
    questionID: number;
    sessionID: number;
    status: string;
    userID: string;
  };
}

interface IResponseError {
  resError: string;
  message: string;
}

export interface IAnswerObj {
  questionId: number;
  answer: string;
}

interface ISingleRequirementSummaryUseCase {
  useCaseId: string;
  summary: string;
}

interface ISingleRequirementSummaryContent {
  contentSummary: string;
}

type TSingleRequirementSummary =
  | ISingleRequirementSummaryContent
  | ISingleRequirementSummaryUseCase
  | null;

interface ISummaryUseCaseSummary {
  use_case_id: string;
  summary: string;
}

interface ISummaryContentSummary {
  content_summary: string;
}

type TSingleSummaryResponse = ISummaryContentSummary | ISummaryUseCaseSummary;

type TSummaryResponseAPI = {
  data: TSingleSummaryResponse[];
};

interface ISummaryRequestAPI {
  requirement_gathering_id: string;
  use_case_ids: string[];
}

interface ISummaryRequest {
  useCaseIds: string[];
  requirement_gathering_id: string;
}

interface IRequirementPercentageResponseAPI {
  data: {
    completion_percentage: number;
  };
}

interface IRequirementPercentageRequestAPI {
  requirement_gathering_id: number;
}
