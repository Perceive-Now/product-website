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
  SidescreenOptions?:string[];
}

const initialState: VSProduct = {
  chats: [],
  marketChatLoading: true,
  Step: 0,
  SidescreenOptions:[]
};

const formatJsonResponse = (inputString: string): any => {
  try {
    const data = JSON.parse(inputString);
    return data;
  } catch {

    const stepMatch = inputString.match(/"Step":\s*(\d+)/);
    const statusMatch = inputString.match(/"Status":\s*"([^"]+)"/);
    const responseMatch = inputString.match(/"response":\s*"([^"]+)"/);

    const step = stepMatch ? stepMatch[1] : "N/A";
    const status = statusMatch ? statusMatch[1] : "N/A";
    const response = responseMatch ? responseMatch[1] : "N/A";
    return {
      Step: step,
      Status: status,
      response: response
    };
  }
};

// Thunks for API calls
export const sendQuery = createAsyncThunk(
  "sendQuery",
  async ({
    user_input,
    user_id,
  }: {
    user_input: string;
    user_id: string;
  }) : Promise<any> => {

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
      console.log("chunk", chunk);
      console.log("type of chunk",typeof chunk);
      const answer = JSON.parse(chunk);
      console.log("answer",typeof answer,answer)
      // const newanswer = JSON.parse(answer);


      const newanswer = formatJsonResponse(answer);
      // console.log("answerrrrr", typeof newanswer,newanswer);
     
      return newanswer;

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
    updateButtonResponse: (state, action: PayloadAction<{ answer: string; query: string }>) => {
      const { answer, query } = action.payload;
      // state.chats[state.chats.length - 1].answer = answer;
      state.chats[state.chats.length - 1].query = query;
    },
    updateChatQuery: (state, action: PayloadAction<{ query: string }>) => {
      const { query } = action.payload;
      state.chats[state.chats.length - 1].query = query;
    },
    setprevres: (state, action: PayloadAction<{ answer: string }>) => {
      const { answer } = action.payload;
      state.chats[state.chats.length - 1].answer = answer;
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
      const { response, Step, Status } = action.payload;
   console.log("particular ans",response);
   console.log("steps",Step)
      if (Step !== undefined) {
        if (Step == 2) {
          console.log("step2", response);
          state.chats[state.chats.length - 1].extract = response;
        } 
        else if (response.includes("//")) {
          const options: string[] =
            response
              .match(/\/\/(.*?)\/\//g)
              ?.map((opt: string) => opt.replace(/\/\/|\/\//g, "").trim()) || [];
          state.SidescreenOptions = options;
          console.log("options sidescreen",options);
          const query = response.includes(':') 
          ? response.split(':')[0].trim() 
          : response.split('.')[0].trim() || "Please provide your input.";
          state.chats[state.chats.length - 1].query = query;
        } 
        else if (response.includes("@")) {
          console.log("button option bock");
          const options: string[] =
            response.match(/@@(.*?)@@/g)?.map((opt: string) => opt.replace(/@@/g, "").trim()) || [];

          // const query: string = response.split(".")[0].trim() || "Please provide your input.";
          const query = response.includes(':') 
          ? response.split(':')[0].trim() 
          : response.split('.')[0].trim() || "Please provide your input.";

          console.log("step 3", query, options);
          state.chats[state.chats.length - 1].query = query;
          state.chats.push({ query: "", options: options, answer: "" });
        }
         else {
          // state.chats.push({ query: response, answer: "" });
          state.chats[state.chats.length - 1].query = response;
        }
        state.Step = Step;
      }
    });
 
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
  setprevres,
  setCurrentStep,
} = VSProductSlice.actions;
