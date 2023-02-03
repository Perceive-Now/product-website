import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
import type { IKeywordOption } from "../components/reusable/search";

//
const initialState: ISearchState = {
  search: undefined,
};

/**
 *
 */
export const DashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setDashboardSearch: (state, action: PayloadAction<IKeywordOption[]>) => {
      state.search = action.payload;
    },
    clearDashboardSearch: (state) => {
      state.search = undefined;
    },
  },
});

//
export const { setDashboardSearch, clearDashboardSearch } = DashboardSlice.actions;
export default DashboardSlice.reducer;

//
interface ISearchState {
  search: IKeywordOption[] | undefined;
}
