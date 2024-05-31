import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IEdit {
  editIndex: number | null;
  query?: string;
}

const initialState: IEdit = {
  editIndex: null,
  query: undefined,
};

export const KnownowSlice = createSlice({
  name: "know-now",
  initialState,
  reducers: {
    setUpdateQuery: (state, action: PayloadAction<IEdit>) => {
      const { editIndex, query } = action.payload;
      return {
        ...state,
        editIndex,
        query,
      };
    },
  },
});

export default KnownowSlice.reducer;
export const { setUpdateQuery } = KnownowSlice.actions;
