import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppConfig } from "src/config/app.config";
import { IUploadAttachmentsState, initialState as initialStateUploadAttachments } from "./upload-attachments";
import { IUploadQuickPromptsState, initialState as initialStateUploadQuickPrompt } from "./upload-quick-prompt";
import { IUseCase, initialState as initialStateUseCase } from "./use-case";

const BASE_PN_REPORT_URL = AppConfig.REPORT_API_URL;

export const EReportSectionPageIDs = {
  UseCases: "new-report",
  InteractionMethod: "interaction-method",
  UploadAttachments: "upload-attachments",
  UploadQuickPrompts: "quick-prompt",
  QA: "q&a",
  Payment: "payment",
};

export type TReportSectionPageIDs = (typeof EReportSectionPageIDs)[keyof typeof EReportSectionPageIDs];

interface draftState {
  isUploading: boolean;
  currentPageId: TReportSectionPageIDs;
  draftUploadState: {
    isSuccess: boolean;
    isError: boolean;
    message: string;
  };
  getDraftsByUserIdState: {
    isSuccess: boolean;
    isError: boolean;
    message: string;
    isLoading: boolean;
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
  getDraftsByUserIdState: {
    isSuccess: false,
    isError: false,
    message: "",
    isLoading: false,
  },
  draftsArray: [],
};

// Async thunks
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

    return await axios.post(BASE_PN_REPORT_URL + "/quick-prompt/", dataObj);
  } catch (error) {
    const errorObj = {
      resError: String(error),
      message: "Unable to upload quick prompts",
    };
    return thunkAPI.rejectWithValue(errorObj);
  }
});

export const getDraftsByUserId = createAsyncThunk<
  IDraft[], // The thunk should directly return an array of IDraft
  { userId: string },
  {
    rejectValue: IResponseError;
  }
>("getDraftsByUserId", async (request, thunkAPI) => {
  try {
    const response = await axios.get(
      `${BASE_PN_REPORT_URL}/drafts-by-user-id/?user_id=${encodeURIComponent(request.userId)}`
    );
    //console.log("API Response Full:", response); // Log the full response
    //console.log("API Response Data:", response.data); // Log the data part of the response
    return response.data; 
  } catch (error) {
    const errorObj = {
      resError: String(error),
      message: "Unable to fetch generated reports",
    };
    return thunkAPI.rejectWithValue(errorObj);
  }
});


export const draftSlice = createSlice({
  name: "draft",
  initialState,
  reducers: {
    setDraftsArray: (state, action: PayloadAction<IDraft>) => {
      state.draftsArray = [...state.draftsArray, action.payload];
    },
    updateDraftsArray: (state, action: PayloadAction<IDraftOptional>) => {
      const index = state.draftsArray.findIndex(
        (draft) => draft.requirement_gathering_id === action.payload.requirement_gathering_id
      );

      if (index < 0) {
        const draftObj = {
          requirement_gathering_id: action.payload.requirement_gathering_id,
          user_id: action.payload.user_id,
          current_page: action.payload.current_page,
          other_data: {
            uploadAttachmentsSliceState:
              action.payload.other_data?.uploadAttachmentsSliceState ?? initialStateUploadAttachments,
            uploadQuickPromptsSliceState:
              action.payload.other_data?.uploadQuickPromptsSliceState ?? initialStateUploadQuickPrompt,
            useCasesSliceState: action.payload.other_data?.useCasesSliceState ?? initialStateUseCase,
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
              action.payload.other_data?.useCasesSliceState ?? state.draftsArray[index].other_data.useCasesSliceState,
          },
        };

        state.draftsArray[index] = draftObj;
      }
    },
    setCurrentPageId: (state, action: PayloadAction<TReportSectionPageIDs>) => {
      state.currentPageId = action.payload;
    },
    setDraftUploadState: (
      state,
      action: PayloadAction<{ isSuccess: boolean; isError: boolean; message: string }>
    ) => {
      state.draftUploadState = action.payload;
    },
    setGetDraftsByUserIdState: (state) => {
      state.getDraftsByUserIdState = {
        isError: false,
        isSuccess: false,
        message: "",
        isLoading: true,
      };
    },
    reset: () => initialState,
    resetGetDraftsByUserIdState: (state) => {
      state.getDraftsByUserIdState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
      };
    },
  },
  extraReducers: (builder) => {
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
        isSuccess: false,
        message: action.error.message ?? "Unable to sync with server",
      };
    });
    builder.addCase(getDraftsByUserId.pending, (state) => {
      state.getDraftsByUserIdState = {
        isError: false,
        isSuccess: false,
        message: "",
        isLoading: true,
      };
    });
    builder.addCase(getDraftsByUserId.fulfilled, (state, action) => {
      state.getDraftsByUserIdState = {
        isError: false,
        isSuccess: true,
        message: "",
        isLoading: false,
      };
      //console.log("Fulfilled action payload:", action.payload); // Log the payload
      state.draftsArray = action.payload; // Directly assign the data array to draftsArray
    });
    
    builder.addCase(getDraftsByUserId.rejected, (state, action) => {
      state.getDraftsByUserIdState = {
        isError: true,
        isSuccess: false,
        message: action.payload?.message ?? "Unable to sync with server",
        isLoading: false,
      };
    });
  },
});

export const { reset, setDraftsArray, setCurrentPageId, setDraftUploadState, resetGetDraftsByUserIdState } = draftSlice.actions;

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