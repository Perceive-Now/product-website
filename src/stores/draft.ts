import axios from "axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  IUploadAttachmentsState,
  initialState as initialStateUploadAttachments,
} from "./upload-attachments";
import {
  IUploadQuickPromptsState,
  initialState as initialStateUploadQuickPrompt,
} from "./upload-quick-prompt";
import { IUseCase, initialState as initialStateUseCase } from "./use-case";

const BASE_URL = "https://pn-chatbot.azurewebsites.net";

export const EReportSectionPageIDs = {
  UseCases: "new-report",
  InteractionMethod: "interaction-method",
  UploadAttachments: "upload-attachments",
  UploadQuickPrompts: "quick-prompt",
  QA: "q&a",
  Payment: "payment",
};

export type TReportSectionPageIDs =
  (typeof EReportSectionPageIDs)[keyof typeof EReportSectionPageIDs];

interface draftState {
  isUploading: boolean;
  currentPageId: TReportSectionPageIDs;
  draftUploadState: {
    isSuccess: boolean;
    isError: boolean;
    message: string;
  };
  draftsArray: TDraftArray;
}

const initialState: draftState = {
  isUploading: false,
  currentPageId: EReportSectionPageIDs.UseCases as TReportSectionPageIDs,
  draftUploadState: {
    isSuccess: false,
    isError: false,
    message: "",
  },
  draftsArray: [],
};

// -----------------------------------------------------------------------
export const uploadDraft = createAsyncThunk<
  IuploadDraftResponse,
  IuploadDraftRequest,
  {
    rejectValue: IResponseError;
  }
>("uploadDraft", async (request: IuploadDraftRequest, thunkAPI) => {
  try {
    const dataObj = {
      requirement_gathering_id: request.requirementGatheringId,
      user_id: request.userId ?? "",
      current_page: request.current_page ?? "",
      other_data: request.other_data ?? {},
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
export const fetchDraftByIds = createAsyncThunk<
  IuploadDraftResponse,
  IuploadDraftRequest,
  {
    rejectValue: IResponseError;
  }
>("uploadDraft", async (request: IuploadDraftRequest, thunkAPI) => {
  try {
    const dataObj = {
      requirement_gathering_id: request.requirementGatheringId,
      user_id: request.userId ?? "",
      current_page: request.current_page ?? "",
      other_data: request.other_data ?? [],
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
export const fetchDraftsByUserId = createAsyncThunk<
  IuploadDraftResponse,
  IuploadDraftRequest,
  {
    rejectValue: IResponseError;
  }
>("uploadDraft", async (request: { userId: string }, thunkAPI) => {
  try {
    return await axios.post(BASE_URL + "/quick-prompt/", request.userId); // TODO change endpoint
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

export const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    // -----------------------------------------------------------------------
    setDraftsArray: (state, action: PayloadAction<IDraft>) => {
      state.draftsArray = [...state.draftsArray, action.payload];
    },

    // -----------------------------------------------------------------------
    updateDraftsArray: (state, action: PayloadAction<IDraftOptional>) => {
      const index = state.draftsArray.findIndex(
        (draft) => draft.requirement_gathering_id === action.payload.requirement_gathering_id,
      );

      if (index < 0) {
        const draftObj = {
          requirement_gathering_id: action.payload.requirement_gathering_id,
          user_id: action.payload.user_id,
          current_page: action.payload.current_page,
          other_data: {
            uploadAttachmentsSliceState:
              action.payload.other_data?.uploadAttachmentsSliceState ??
              initialStateUploadAttachments,
            uploadQuickPromptsSliceState:
              action.payload.other_data?.uploadQuickPromptsSliceState ??
              initialStateUploadQuickPrompt,
            useCasesSliceState:
              action.payload.other_data?.useCasesSliceState ?? initialStateUseCase,
          },
        };

        state.draftsArray.push(draftObj);
      } else {
        const draftObj = {
          requirement_gathering_id: action.payload.requirement_gathering_id,
          user_id: action.payload.user_id,
          current_page: action.payload.current_page,
          other_data: {
            uploadAttachmentsSliceState:
              action.payload.other_data?.uploadAttachmentsSliceState ??
              state.draftsArray[index].other_data.uploadAttachmentsSliceState,
            uploadQuickPromptsSliceState:
              action.payload.other_data?.uploadQuickPromptsSliceState ??
              state.draftsArray[index].other_data.uploadQuickPromptsSliceState,
            useCasesSliceState:
              action.payload.other_data?.useCasesSliceState ??
              state.draftsArray[index].other_data.useCasesSliceState,
          },
        };

        state.draftsArray[index] = draftObj;
      }
    },

    // -----------------------------------------------------------------------
    setCurrentPageId: (state, action: PayloadAction<TReportSectionPageIDs>) => {
      state.currentPageId = action.payload;
    },

    // -----------------------------------------------------------------------
    setDraftUploadState: (
      state,
      action: PayloadAction<{ isSuccess: boolean; isError: boolean; message: string }>,
    ) => {
      state.draftUploadState = action.payload;
    },

    // -----------------------------------------------------------------------
    getDraftSliceState: (state) => state,

    // -----------------------------------------------------------------------
    reset: () => initialState,
  },
  extraReducers(builder) {
    // -----------------------------------------------------------------------
    builder.addCase(uploadDraft.pending, (state) => {
      state.isUploading = true;
      state.draftUploadState = {
        isError: false,
        isSuccess: false,
        message: "",
      };
    });
    builder.addCase(uploadDraft.fulfilled, (state) => {
      state.isUploading = false;
      state.draftUploadState = {
        isError: false,
        isSuccess: true,
        message: "",
      };
    });
    builder.addCase(uploadDraft.rejected, (state, action) => {
      state.isUploading = false;
      state.draftUploadState = {
        isError: true,
        isSuccess: true,
        message: action.error.message ?? "Unable to sync with server",
      };
    });
  },
});

export const { reset, getDraftSliceState, setDraftsArray, setCurrentPageId, setDraftUploadState } =
  draftSlice.actions;

export default draftSlice.reducer;

interface IuploadDraftRequest {
  requirementGatheringId: string;
  userId: string;
  current_page: string;
  other_data: IOtherData;
}

interface IuploadDraftResponse {
  resError: string;
  data: number[];
  status: number;
  statusText: string;
}

interface IResponseError {
  resError: string;
  message: string;
}

interface IOtherData {
  uploadAttachmentsSliceState: IUploadAttachmentsState;
  uploadQuickPromptsSliceState: IUploadQuickPromptsState;
  useCasesSliceState: IUseCase;
  [key: string]: any;
}

export interface IDraft {
  requirement_gathering_id: string;
  user_id: string;
  current_page: string;
  other_data: IOtherData;
}

type TDraftArray = IDraft[];

interface IOtherDataOptional {
  uploadAttachmentsSliceState?: IUploadAttachmentsState;
  uploadQuickPromptsSliceState?: IUploadQuickPromptsState;
  useCasesSliceState?: IUseCase;
  [key: string]: any;
}

interface IDraftOptional {
  requirement_gathering_id: string;
  user_id: string;
  current_page: string;
  other_data: IOtherDataOptional;
}
