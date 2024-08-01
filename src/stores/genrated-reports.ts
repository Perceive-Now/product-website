import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppConfig } from "../config/app.config";

const BASE_PN_REPORT_URL = AppConfig.REPORT_API_URL;

interface IReportSliceState {
  report: IReport;
  reports: IReport[];
  currentReport: IReport | null;
  getReportsByUserIdState: {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    message: string;
  };
  filters: {
    searchTerm: string;
    dateRange: { from: Date | null; to: Date | null };
    useCases: number[];
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
    data: {},
    report_id: "",
    date: null,
    summary: "",
  },
  reports: [],
  currentReport: null,
  getReportsByUserIdState: {
    isLoading: false,
    isError: false,
    isSuccess: false,
    message: "",
  },
  filters: {
    searchTerm: "",
    dateRange: { from: null, to: null },
    useCases: [], 
  },
};

export const getReportsByUserId = createAsyncThunk<
  { data: IReport[] },
  { userId: string },
  {
    rejectValue: IResponseError;
  }
>("getReportsByUserId", async (request, thunkAPI) => {
  try {
    const response = await axios.get(
      `${BASE_PN_REPORT_URL}/reports-by-user-id?user_id=${encodeURIComponent(request.userId)}`
    );

    const parsedData = response.data.map((report: any) => {
      let reportData;
      try {
        reportData = JSON.parse(report.data);
      } catch (error) {
        console.error("Error parsing report data:", error);
        reportData = report.data;
      }
      return {
        ...report,
        data: reportData,
        date: report.date || null,
        summary: report.summary || "",
      };
    });

    return { data: parsedData };
  } catch (error) {
    const errorObj = {
      resError: String(error),
      message: "Unable to fetch generated reports",
    };
    return thunkAPI.rejectWithValue(errorObj);
  }
});

export const deleteReportById = createAsyncThunk<
  { reportId: string },
  { reportId: string },
  {
    rejectValue: IResponseError;
  }
>("deleteReportById", async (request, thunkAPI) => {
  try {
    await axios.delete(`${BASE_PN_REPORT_URL}/report-delete-by-report-id/`, {
      data: [request.reportId],
    });
    return { reportId: request.reportId };
  } catch (error) {
    const errorObj = {
      resError: String(error),
      message: "Unable to delete the report",
    };
    return thunkAPI.rejectWithValue(errorObj);
  }
});

export const GeneratedReportsSlice = createSlice({
  name: "generatedReports",
  initialState,
  reducers: {
    setReport: (state, action: PayloadAction<IReport>) => {
      state.report = action.payload;
    },
    setCurrentReport: (state, action: PayloadAction<IReport>) => {
      state.currentReport = action.payload;
    },
    resetGetReportsByUserIdState: (state) => {
      state.getReportsByUserIdState = {
        isLoading: false,
        isError: false,
        isSuccess: false,
        message: "",
      };
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.filters.searchTerm = action.payload;
    },
    setDateRange: (state, action: PayloadAction<{ from: Date | null; to: Date | null }>) => {
      state.filters.dateRange = action.payload;
    },
    setUseCaseFilter: (state, action: PayloadAction<number[]>) => {
      state.filters.useCases = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getReportsByUserId.fulfilled, (state, action) => {
      state.reports = action.payload.data.map((report) => {
        return {
          ...report,
          title: "Report title " + report.user_case_id + " - " + report.requirement_gathering_id,
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
    builder.addCase(deleteReportById.fulfilled, (state, action) => {
      state.reports = state.reports.filter(
        (report) => report.report_id !== action.payload.reportId
      );
      state.getReportsByUserIdState = {
        isLoading: false,
        isError: false,
        isSuccess: true,
        message: "",
      };
    });
    builder.addCase(deleteReportById.pending, (state) => {
      state.getReportsByUserIdState = {
        isLoading: true,
        isError: false,
        isSuccess: false,
        message: "",
      };
    });
    builder.addCase(deleteReportById.rejected, (state, action) => {
      state.getReportsByUserIdState = {
        isLoading: false,
        isError: true,
        isSuccess: false,
        message: action.payload?.message || "Error deleting the report",
      };
    });
  },
});

export const { setReport, setCurrentReport, resetGetReportsByUserIdState, setSearchTerm, setDateRange, setUseCaseFilter } = GeneratedReportsSlice.actions;
export default GeneratedReportsSlice.reducer;

export interface IReport {
  title: string;
  requirement_gathering_id: number;
  user_id: string;
  user_case_id: number;
  report?: string;
  date_created: Date;
  data: Record<string, any> | string;
  report_id: string;
  date: string | null;
  summary: string;
}

interface IResponseError {
  resError: string;
  message: string;
}
