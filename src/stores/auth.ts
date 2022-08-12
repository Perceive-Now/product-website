import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: AuthState = {
  user: undefined,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setuser: (state, action: PayloadAction<IAuthuser>) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = undefined;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setuser, removeUser } = AuthSlice.actions;
export default AuthSlice.reducer;

// Interfaces
interface IAuthuser {
  firstName: string;
  lastName: string;
  email: string;
}

interface AuthState {
  user?: IAuthuser;
}
