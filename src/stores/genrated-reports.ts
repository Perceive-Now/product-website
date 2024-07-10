import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppConfig } from "../config/app.config";

const BASE_PN_REPORT_URL = AppConfig.REPORT_API_URL;

interface IReportSliceState {
  report: IReport;
  reports: IReport[];
  getReportsByUserIdState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string;
  };
}

const initialState: IReportSliceState = {
  report: {
    title: "",
    requirement_gathering_id: -1,
    user_id: "",
    user_case_id: -1,
    report: "",
    date_created: new Date(),
  },
  reports: [],
  getReportsByUserIdState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
};

// -----------------------------------------------------------------------
export const getReportsByUserId = createAsyncThunk<
  { data: IReport[] },
  { userId: string },
  {
    rejectValue: IResponseError;
  }
>("getReportsByUserId", async (request, thunkAPI) => {
  try {
    return await axios.get(
      `${BASE_PN_REPORT_URL}/reports-by-user-id?user_id=${encodeURIComponent(request.userId)}`,
    );
  } catch (error) {
    const errorObj = {
      resError: String(error),
      message: "Unable to fetch generated reports",
    };
    return thunkAPI.rejectWithValue(errorObj);
  }
});

export const GeneratedReportsSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setReport: (state, action: PayloadAction<IReport>) => {
      state.report = action.payload;
    },

    resetGetReportsByUserIdState: (state) => {
      state.getReportsByUserIdState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
      };
    },
  },
  extraReducers: (builder) => {
    // -----------------------------------------------------------------------
    builder.addCase(getReportsByUserId.fulfilled, (state, action) => {
      console.log(action.payload.data);
      state.reports = action.payload.data.map((report) => {
        return {
          ...report,
          title:
            "Some report title " + report.user_case_id + " - " + report.requirement_gathering_id,
          created_data: new Date(),
        };
      });
      state.getReportsByUserIdState = {
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: "",
      };
    });
    builder.addCase(getReportsByUserId.pending, (state) => {
      state.getReportsByUserIdState = {
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: "",
      };
    });
    builder.addCase(getReportsByUserId.rejected, (state, action) => {
      state.getReportsByUserIdState = {
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.payload?.message || "Error fetching generated reports",
      };
    });
  },
});

export const { setReport, resetGetReportsByUserIdState } = GeneratedReportsSlice.actions;
export default GeneratedReportsSlice.reducer;

export interface IReport {
  title: string;
  requirement_gathering_id: number;
  user_id: string;
  user_case_id: number;
  report: string;
  date_created: Date;
}

interface IResponseError {
  resError: string;
  message: string;
}
