import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUseCase {
  usecases: string[];
}

const initialState: IUseCase = {
  usecases: [],
};

export const UseCaseSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUseCase: (state, action: PayloadAction<IUseCase>) => {
      state.usecases === action.payload.usecases;
    },
  },
});

export const { setUseCase } = UseCaseSlice.actions;
export default UseCaseSlice.reducer;
