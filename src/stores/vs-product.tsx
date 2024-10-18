import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPitchDeckSummary } from "src/utils/api/product";

interface VSChat {
  id?: number;
  query: string;
  answer?: string;
  extract?: string;
  options?: string[];
  hasbutton?: boolean;
  hasselected?: string;
}

interface VSProduct {
  chats: VSChat[];
  marketChatLoading: boolean;
  Step: number;
}

const initialState: VSProduct = {
  chats: [],
  marketChatLoading: true,
  Step: 0,
};

// Thunks for API calls
export const sendQuery = createAsyncThunk(
  "sendQuery",
  async ({ user_input, user_id }: { user_input: string; user_id: string }) => {
    const response: any = await fetch(
      `https://templateuserrequirements.azurewebsites.net/interact_openai/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input, user_id }),
      },
    );

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    const { value } = await reader.read();
    if (value) {
      const chunk = decoder.decode(value);

      const answer = JSON.parse(chunk);
      const newanswer = JSON.parse(answer);
      console.log("answerrrrr", answer);
      return newanswer;

      // const options: string[] = newanswer.match(/@@(.*?)@@/g)?.map((opt: string) => opt.replace(/@@/g, '').trim()) || [];

      // // Extract the dynamic query line by removing the options
      // const query: string = newanswer.replace(/@@.*?@@/g, '').trim() || "Please provide your input.";

      // return { options, query };
    }

    return;
  },
);

export const extractFileData = createAsyncThunk("extractFileData", async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(
    "https://templateuserrequirements.azurewebsites.net/extract-ppt-data",
    {
      method: "POST",
      headers: { Accept: "application/json" },
      body: formData,
    },
  );
  const data = await response.json();
  if (data.message === "Text extracted successfully") {
    const summary = createPitchDeckSummary(data.slides_data);
    return summary;
  }
});

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
    updateChatAnswer: (state, action: PayloadAction<{ answer: string }>) => {
      const { answer } = action.payload;
      state.chats[state.chats.length - 1].query = answer;
    },
    updateButtonResponse: (state, action: PayloadAction<{ answer: string , query:string}>) => {
      const { answer,query } = action.payload;
      state.chats[state.chats.length - 1].answer = answer;
      state.chats[state.chats.length - 1].query = query;

    },
    updateChatQuery: (state, action: PayloadAction<{ query: string }>) => {
      const { query } = action.payload;
      state.chats[state.chats.length - 1].query = query;
    },
    updateButtonSelection: (state, action: PayloadAction<{ id: number; hasselected: string }>) => {
      const { id, hasselected } = action.payload;
      const chat = state.chats.find((chat) => chat.id === id);
      if (chat) {
        chat.hasselected = hasselected;
      }
    },
    resetChats: (state) => {
      state.chats = [];
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.Step = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendQuery.fulfilled, (state, action: PayloadAction<any>) => {
      const { response, Step } = action.payload;

      if (Step !== undefined) {
        if(Step === 1){
          // console.log("state.chats.length - 1",state.chats.length - 1);
          // console.log("state.chsts",state.chats);
          // state.chats[state.chats.length - 1].query = response;
          return;

        }
        if (Step === 2) {
          state.chats[state.chats.length - 1].extract = response;
        }
          else if (response.includes("@")) {
          const options: string[] =
            response.match(/@@(.*?)@@/g)?.map((opt: string) => opt.replace(/@@/g, "").trim()) || [];

          const query: string = response.split(".")[0].trim() || "Please provide your input.";
          console.log("step 3", query, options);
          state.chats[state.chats.length - 1].query = query;
          state.chats.push({ query: "", options: options });
        }
        //  else {
        //   state.chats.push({ query: response, answer: "" });
        // }
        state.Step = Step;
      }
    });
    // .addCase(extractFileData.fulfilled, (state, action: PayloadAction<any>) => {
    //   // Handle successful file extraction
    //   const { message, slides_data } = action.payload;
    //   if (message === "Text extracted successfully") {
    //     const summary = createPitchDeckSummary(slides_data);
    //     if (summary) {
    //       state.chats[state.chats.length - 1].answer = summary;
    //     }
    //   }
    // });
  },
});

export default VSProductSlice.reducer;
export const {
  setVSChats,
  setChatLoading,
  updateChatAnswer,
  updateChatQuery,
  updateButtonSelection,
  updateButtonResponse,
  resetChats,
  setCurrentStep,
} = VSProductSlice.actions;
