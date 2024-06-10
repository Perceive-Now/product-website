import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://pn-chatbot.azurewebsites.net";

export interface IUseCase {
  isUploading: boolean;
  usecases: string[];
  useCaseIds: string[];
  useCasesUploadState: {
    isUseCaseUploadSuccess: boolean;
    isUseCaseUploadError: boolean;
    message: string;
  };
  requirementGatheringId: number;
}

export const initialState: IUseCase = {
  isUploading: false,
  usecases: [],
  useCaseIds: [],
  useCasesUploadState: {
    isUseCaseUploadError: false,
    isUseCaseUploadSuccess: false,
    message: "",
  },
  requirementGatheringId: 0,
};

// -----------------------------------------------------------------------
export const uploadUseCases = createAsyncThunk<
  IUploadUseCasesResponse,
  IUploadUseCasesRequest,
  {
    rejectValue: IResponseError;
  }
>("uploadUseCases", async (request: IUploadUseCasesRequest, thunkAPI) => {
  try {
    const dataObj: IUploadUseCasesRequestAPI = {
      user_case_ids: request.userCaseIds ?? [],
      user_id: request.userId ?? "",
    };

    return await axios.post(BASE_URL + "/requirements_gathering", dataObj);
  } catch (error) {
    const errorObj = {
      resError: String(error),
      message: "Unable to upload attachments",
    };
    return thunkAPI.rejectWithValue(errorObj);
  }
});

export const UseCaseSlice = createSlice({
  name: "usecases",
  initialState,
  reducers: {
    // -----------------------------------------------------------------------
    setUseCase: (state, action: PayloadAction<{ usecases: string[] }>) => {
      state.usecases = action.payload.usecases;
    },

    // -----------------------------------------------------------------------
    setUseCaseIds: (state, action: PayloadAction<string[]>) => {
      state.useCaseIds = action.payload;
    },

    // -----------------------------------------------------------------------
    setUseCasesUploadState: (
      state,
      action: PayloadAction<{
        isUseCaseUploadSuccess: boolean;
        isUseCaseUploadError: boolean;
        message: string;
      }>,
    ) => {
      state.useCasesUploadState = action.payload;
    },

    // -----------------------------------------------------------------------
    getUseCaseSliceState: (state) => state,

    // -----------------------------------------------------------------------
    setUseCaseStateFromDraft: (state, action: PayloadAction<IUseCase>) => {
      state = action.payload;
    },

    // -----------------------------------------------------------------------
    reset: () => initialState,
  },
  extraReducers(builder) {
    // -----------------------------------------------------------------------
    builder.addCase(uploadUseCases.pending, (state) => {
      state.isUploading = true;
      state.useCasesUploadState = {
        isUseCaseUploadError: false,
        isUseCaseUploadSuccess: false,
        message: "",
      };
    });
    builder.addCase(uploadUseCases.fulfilled, (state, action) => {
      state.isUploading = false;
      state.useCasesUploadState = {
        isUseCaseUploadError: false,
        isUseCaseUploadSuccess: true,
        message: "",
      };
      state.requirementGatheringId = action.payload.data.requirement_gathering_id;
    });
    builder.addCase(uploadUseCases.rejected, (state, action) => {
      state.isUploading = false;
      state.useCasesUploadState = {
        isUseCaseUploadError: true,
        isUseCaseUploadSuccess: false,
        message: action.error.message ?? "Server error",
      };
    });
  },
});

export const {
  setUseCase,
  getUseCaseSliceState,
  reset,
  setUseCaseIds,
  setUseCaseStateFromDraft,
  setUseCasesUploadState,
} = UseCaseSlice.actions;
export default UseCaseSlice.reducer;

interface IResponseError {
  resError: string;
  message: string;
}

interface IUploadUseCasesRequest {
  userId: string;
  userCaseIds: string[];
}

interface IUploadUseCasesResponse {
  data: {
    requirement_gathering_id: number;
  };
}

interface IUploadUseCasesRequestAPI {
  user_id: string;
  user_case_ids: string[];
}
