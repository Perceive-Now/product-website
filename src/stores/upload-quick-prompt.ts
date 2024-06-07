import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { quickPromptContent } from "../pages/product/quick-prompt/quick-prompt-content";

const BASE_URL = "https://pn-chatbot.azurewebsites.net";

interface uploadQuickPromptsState {
  isUploading: boolean;
  currentParagraphId: number;
  currentPageId: number;
  paragraphIds: number[];
  currentStep: number;
  quickPrompts: string[];
  quickPromptsUploadState: {
    isSuccess: boolean;
    isError: boolean;
    message: string;
  };
}

const initialState: uploadQuickPromptsState = {
  isUploading: false,
  currentParagraphId: 0,
  currentStep: 0,
  currentPageId: 0,
  paragraphIds: quickPromptContent.map((content) => {
    return content.id;
  }),
  quickPrompts: [],
  quickPromptsUploadState: {
    isSuccess: false,
    isError: false,
    message: "",
  },
};

// -----------------------------------------------------------------------
export const uploadQuickPrompts = createAsyncThunk<
  IuploadQuickPromptsResponse,
  IuploadQuickPromptsRequest,
  {
    rejectValue: IResponseError;
  }
>("uploadQuickPrompts", async (request: IuploadQuickPromptsRequest, thunkAPI) => {
  try {
    const dataObj = {
      report_id: request.reportId,
      content: request.content,
      user_id: request.userId ?? "",
      prompt_data: request.promptData ?? "",
    };

    return await axios.post(BASE_URL + "/quick-prompt/", dataObj); // TODO change endpoint
  } catch (error) {
    const errorObj = {
      resError: String(error),
      message: "Unable to upload quick prompts",
    };
    return thunkAPI.rejectWithValue(errorObj);
  }
});

// -----------------------------------------------------------------------
// -----------------------------------------------------------------------
// -----------------------------------------------------------------------

export const quickPromptsSlice = createSlice({
  name: "quick-prompts",
  initialState,
  reducers: {
    // -----------------------------------------------------------------------
    setQuickPrompts: (state, action: PayloadAction<string[]>) => {
      state.quickPrompts = action.payload;
    },

    // -----------------------------------------------------------------------
    setCurrentParagraphId: (state, action: PayloadAction<number>) => {
      state.currentParagraphId = action.payload;
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
    setCurrentPageId: (state, action: PayloadAction<number>) => {
      state.currentPageId = action.payload;
    },

    // -----------------------------------------------------------------------
    setQuickPromptsUploadState: (
      state,
      action: PayloadAction<{ isSuccess: boolean; isError: boolean; message: string }>,
    ) => {
      state.quickPromptsUploadState = action.payload;
    },

    // -----------------------------------------------------------------------
    getQuickPromptsSliceState: (state) => state,

    // -----------------------------------------------------------------------
    reset: () => initialState,
  },
  extraReducers(builder) {
    // -----------------------------------------------------------------------
    builder.addCase(uploadQuickPrompts.pending, (state) => {
      state.isUploading = true;
      state.quickPromptsUploadState = {
        isError: false,
        isSuccess: false,
        message: "",
      };
    });
    builder.addCase(uploadQuickPrompts.fulfilled, (state) => {
      state.isUploading = false;
      state.quickPromptsUploadState = {
        isError: false,
        isSuccess: true,
        message: "",
      };
      state.currentPageId = 1;
      state.currentStep += 1;
    });
    builder.addCase(uploadQuickPrompts.rejected, (state, action) => {
      state.isUploading = false;
      state.quickPromptsUploadState = {
        isError: true,
        isSuccess: true,
        message: action.error.message ?? "Unable to upload attachments",
      };
    });
  },
});

export const {
  reset,
  getQuickPromptsSliceState,
  setCurrentParagraphId,
  setQuickPrompts,
  setQuickPromptsUploadState,
  decrementStep,
  incrementStep,
  setCurrentPageId,
} = quickPromptsSlice.actions;

export default quickPromptsSlice.reducer;

interface IuploadQuickPromptsRequest {
  reportId: string;
  userId: string;
  content: string;
  promptData: {
    id: number;
    contentList: (
      | {
          contentType: string;
          content: string;
          keyword?: undefined;
          placeholder?: undefined;
        }
      | {
          contentType: string;
          keyword: string;
          placeholder: string;
          content?: undefined;
        }
    )[];
  }[];
}

interface IuploadQuickPromptsResponse {
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
