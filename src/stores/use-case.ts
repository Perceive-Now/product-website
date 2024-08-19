import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import jsCookie from "js-cookie";

import axios from "axios";
import { AppConfig } from "src/config/app.config";

const BASE_PN_REPORT_URL = AppConfig.REPORT_API_URL;

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
  requirmentGatheringMethod: TRequirementGatheringMethod;
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
  requirmentGatheringMethod: " ",
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

    return await axios.post(BASE_PN_REPORT_URL + "/requirements_gathering", dataObj);
  } catch (error) {
    const errorObj = {
      resError: String(error),
      message: "Unable to upload attachments",
    };
    return thunkAPI.rejectWithValue(errorObj);
  }
});

export const getCurrentRequirementGatheringId = createAsyncThunk(
  "getCurrentRequirementGatheringId",
  async () => {
    const requirementGatheringId = jsCookie.get("requirement_gathering_id");
    if (requirementGatheringId) {
      return {
        success: true,
        message: "requirement Id found",
        data: requirementGatheringId,
      };
    } else {
      return {
        success: false,
        message: "requirement Id not found",
      };
    }
  },
);

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
    setSequirmentGatheringMethod: (state, action: PayloadAction<TRequirementGatheringMethod>) => {
      state.requirmentGatheringMethod = action.payload;
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
      jsCookie.set(
        "requirement_gathering_id",
        String(action.payload.data.requirement_gathering_id),
      );
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
    builder.addCase(getCurrentRequirementGatheringId.fulfilled, (state, action) => {
      const id = action.payload.data;
      state.requirementGatheringId = Number(id);
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
  setSequirmentGatheringMethod,
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

export type TRequirementGatheringMethod =
  | "Upload Attachments"
  | "Detailed Q&A"
  | "Quick Prompts"
  | " ";
