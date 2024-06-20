import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { quickPromptContent } from "../pages/product/quick-prompt/quick-prompt-content";

const BASE_URL = "https://pn-chatbot.azurewebsites.net";

export const EQuickPromptPages = {
  QuickPrompt: 0,
  GoToReport: 1,
};

export type TQuickPromptPages = (typeof EQuickPromptPages)[keyof typeof EQuickPromptPages];

export interface IUploadQuickPromptsState {
  isUploading: boolean;
  currentPageId: TQuickPromptPages;
  paragraphIds: number[];
  currentStep: number;
  quickPrompts: TPromptArray;
  quickPromptsUploadState: {
    isSuccess: boolean;
    isError: boolean;
    message: string;
  };
}

export const initialState: IUploadQuickPromptsState = {
  isUploading: false,
  currentStep: 0,
  currentPageId: EQuickPromptPages.QuickPrompt,
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
    const dataObj: IuploadQuickPromptsRequestAPI = {
      requirement_gathering_id: request.requirementGatheringId,
      content: request.content,
      user_id: request.userId ?? "",
      prompt_data: request.promptData ?? "",
    };

    return await axios.post(BASE_URL + "/quick-prompt/", dataObj);
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
    setQuickPrompts: (state, action: PayloadAction<{ prompts: { [key: string]: string } }>) => {
      const { prompts } = action.payload;
      const index = state.quickPrompts.findIndex((content) => content.id === 0);
      if (index >= 0) state.quickPrompts[index] = { id: 0, prompts };
      else state.quickPrompts.push({ id: 0, prompts });
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
    setCurrentPageId: (state, action: PayloadAction<TQuickPromptPages>) => {
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
    setQuickPromtsStateFromDraft: (state, action: PayloadAction<IUploadQuickPromptsState>) => {
      state = action.payload;
    },

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
  setQuickPrompts,
  setQuickPromptsUploadState,
  decrementStep,
  incrementStep,
  setCurrentPageId,
  setQuickPromtsStateFromDraft,
} = quickPromptsSlice.actions;

export default quickPromptsSlice.reducer;

interface IuploadQuickPromptsRequest {
  requirementGatheringId: number;
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

interface IuploadQuickPromptsRequestAPI {
  requirement_gathering_id: number;
  user_id: string;
  content: string;
  prompt_data: {
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
interface IPrompt {
  id: number;
  prompts: { [key: string]: string };
}

type TPromptArray = IPrompt[];
