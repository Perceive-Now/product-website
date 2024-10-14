import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface VSChat {
  id: number; 
  query: string;
  answer: string;
  hasbutton?:boolean;
  hasselected?:string;
}

interface VSProduct {
  chats: VSChat[];
  marketChatLoading: boolean;
}

const initialState: VSProduct = {
  chats: [],
  marketChatLoading: true,
};

export const VSProductSlice = createSlice({
  name: "vs-product",
  initialState,
  reducers: {
    setVSChats: (state, action: PayloadAction<VSChat>) => {
      state.chats.push(action.payload);
    },
    setChatLoading: (state, action: PayloadAction<boolean>) => {
      state.marketChatLoading = action.payload;
    },
    updateChatAnswer: (state, action: PayloadAction<{ id: number; answer: string }>) => {
      const { id, answer } = action.payload;
      const chat = state.chats.find((chat) => chat.id === id);
      if (chat) {
        chat.answer = answer;
      }
    },
    updateButtonSelection :  (state, action: PayloadAction<{ id: number; hasselected: string }>) => {
      const { id, hasselected } = action.payload;
      const chat = state.chats.find((chat) => chat.id === id);
      if (chat) {
        chat.hasselected = hasselected;
      }
    },
    resetChats: (state) => {
      state.chats = []; 
    },
  },
});

export default VSProductSlice.reducer;
export const {
  setVSChats,
  setChatLoading,
  updateChatAnswer,
  updateButtonSelection,
  resetChats
} = VSProductSlice.actions;
