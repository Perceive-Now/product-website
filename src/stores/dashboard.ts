import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
import type { IKeywordOption } from "../components/reusable/search";

//
const initialState: ISearchState = {
  search: undefined,
  keywords: undefined,
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
  },
});

//
export const { setDashboardSearch, clearDashboardSearch, setDashboardKeywords } =
  DashboardSlice.actions;
export default DashboardSlice.reducer;

//
interface ISearchState {
  search: IKeywordOption[] | undefined;
  keywords: string[] | undefined;
}
