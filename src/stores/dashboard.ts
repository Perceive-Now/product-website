import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
import type { IKeywordOption } from "../components/reusable/search";

//
const initialState: ISearchState = {
  search: undefined,
  keywords: undefined,
  startTour: false,
  finishTour: false
};

/**
 *
 */
export const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardSearch: (state, action: PayloadAction<IKeywordOption[]>) => {
      // console.log(action.payload)
      state.search = action.payload;
    },
    setDashboardKeywords: (state, action: PayloadAction<string[]>) => {
      state.keywords = action.payload;
    },
    clearDashboardSearch: (state) => {
      state.search = undefined;
    },
    setStartTour: (state, action: PayloadAction<boolean>) => {
      state.startTour = action.payload; 
    },
    setFinishTour: (state, action: PayloadAction<boolean>) => {
      state.finishTour = action.payload; 
    },
  },
});

//
export const { setDashboardSearch, clearDashboardSearch, setDashboardKeywords, setStartTour , setFinishTour} =
  DashboardSlice.actions;
export default DashboardSlice.reducer;

//
interface ISearchState {
  search: IKeywordOption[] | undefined;
  keywords: string[] | undefined;
  startTour: boolean
  finishTour: boolean
}
