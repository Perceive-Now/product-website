import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IUIState {
  home: boolean;
}

const initialState: IUIState = {
  home: true,
};

export const UISlice = createSlice({
  name: "UI",
  initialState,
  reducers: {
    setUI: (state, action: PayloadAction<IUIState>) => {
      state.home = action.payload.home;
    },
  },
});

export const { setUI } = UISlice.actions;
export default UISlice.reducer;
