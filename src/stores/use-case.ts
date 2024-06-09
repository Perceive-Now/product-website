import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUseCase {
  usecases: string[];
}

const initialState: IUseCase = {
  usecases: [],
};

export const UseCaseSlice = createSlice({
  name: "usecases",
  initialState,
  reducers: {
    // -----------------------------------------------------------------------
    setUseCase: (state, action: PayloadAction<IUseCase>) => {
      state.usecases = action.payload.usecases;
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
});

export const { setUseCase, getUseCaseSliceState, reset, setUseCaseStateFromDraft } =
  UseCaseSlice.actions;
export default UseCaseSlice.reducer;
