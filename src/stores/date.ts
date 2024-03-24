import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// import type { IKeywordOption } from "../components/reusable/search";

//
const initialState: ISearchState = {
  filter: undefined,
};

/**
 *
 */
export const DateSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<IFilterKeyword[]>) => {
      // console.log(action)
      state.filter = action.payload;
    },
    clearFilter: (state) => {
      state.filter = undefined;
    },
  },
});

//
export const { setFilter, clearFilter } = DateSlice.actions;
export default DateSlice.reducer;

//
type IFilterKeyword = string;
interface ISearchState {
  filter: IFilterKeyword[] | undefined;
}
