import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IEdit {
  editIndex: number | null;
  query?: string;
}
interface IChat {
  message_id: number;
  query: string;
  answer: string;
  response_time?: string;
  error?: string;
  liked?: boolean;
}
interface IInitialState {
  chats: IChat[];
  edit: IEdit;
  knownow_id?: number;
}

const initialState: IInitialState = {
  // editIndex: null,
  // query: undefined,
  edit: {
    editIndex: null,
    query: undefined,
  },
  knownow_id: undefined,
  chats: [],
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
    generateNewId: (state, action: PayloadAction<{ id: number }>) => {
      state.knownow_id = action.payload.id;
    },
    // -------------------------------------------------------------------------------------------------------

    udateChatResponse: (state, action: PayloadAction<{ message_id: number; liked: boolean }>) => {
      const { message_id, liked } = action.payload;
      state.chats = state.chats.map((c) => (c.message_id === message_id ? { ...c, liked } : c));
    },
  },
});

export default KnownowSlice.reducer;
export const { setUpdateQuery, generateNewId, udateChatResponse } = KnownowSlice.actions;
