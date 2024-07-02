import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface IReportSliceState {
  report: IReport;
  reports: IReport[];
}

const initialState: IReportSliceState = {
  report: {
    title: "",
    requirement_gathering_id: -1,
    user_id: "",
    user_case_id: -1,
    report: "",
  },
  reports: [],
};

export const GeneratedReportSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setReport: (state, action: PayloadAction<IReport>) => {
      state.report = action.payload;
    },
  },
});

export const { setReport } = GeneratedReportSlice.actions;
export default GeneratedReportSlice.reducer;

interface IReport {
  title: string;
  requirement_gathering_id: number;
  user_id: string;
  user_case_id: number;
  report: string;
}
