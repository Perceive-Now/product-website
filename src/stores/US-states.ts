import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ICheckBoxValue } from "../@types/utils/IExtras";

//
// import type { IKeywordOption } from "../components/reusable/search";

//
//
interface ISearchState {
  states: ICheckBoxValue[] | undefined;
}

//
const initialState: ISearchState = {
  states: undefined,
};

/**
 *
 */
export const StatesSlice = createSlice({
  name: "states",
  initialState,
  reducers: {
    setUSStates: (state, action: PayloadAction<ICheckBoxValue[]>) => {
      // console.log(action)
      state.states = action.payload;
    },
    clearStates: (state) => {
      state.states = undefined;
    },
    removeState: (state, action: PayloadAction<number | string>) => {
      // Remove the state with the specified id from the array
      state.states = state.states?.filter((state) => state.value !== action.payload);
    },
  },
});

//
export const { setUSStates, clearStates, removeState } = StatesSlice.actions;
export default StatesSlice.reducer;
