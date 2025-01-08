import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
interface VSChat {
  id?: number;
  query: string;
  answer?: string;
  extract?: string;
  extractObject?:any;
  options?: string[];
  hasbutton?: boolean;
  hasselected?: boolean;
}

interface VSProduct {
  chats: VSChat[];
  companyName: string;
  marketChatLoading: boolean;
  Step: number;
  SidescreenOptions?: string[];
  DataSources?: any;
  ReportTemplate?: any;
  pitchdeck_data: any;
  uploadStatus: boolean;
}

const initialState: VSProduct = {
  companyName: "",
  chats: [],
  marketChatLoading: true,
  Step: 0,
  SidescreenOptions: [
    "Market Opportunity",
    "Competitive Differentiation",
    "Product Viability",
    "Founding Team Overview",
    "Go-to-Market Strategy",
    "Customer Validation",
    "Revenue Model Analysis",
    "Operational Efficiency",
    "Partnerships and Alliances",
    "Technology and IP Overview",
    "Regulatory and Compliance Review",
    "Time to Market",
    "Market Momentum",
    "Cost of Acquisition",
    "Product Scalability",
  ],
  DataSources: {},
  ReportTemplate: {},
  pitchdeck_data: {},
  uploadStatus: false,
};

const formatJsonResponse = (inputString: string): any => {
  try {
    const data = JSON.parse(inputString);
    console.log("data 1", data);
    return data;
  } catch (err) {
    console.log("errrrr", err);
    const stepMatch = inputString.match(/"Step":\s*(\d+)/);
    const statusMatch = inputString.match(/"Status":\s*"([^"]+)"/);
    const responseMatch = inputString.match(/"response":\s*"([^"]+)"/);

    const step = stepMatch ? stepMatch[1] : "N/A";
    const status = statusMatch ? statusMatch[1] : "N/A";
    const response = responseMatch ? responseMatch[1] : "N/A";
    console.log("data 2", {
      Step: step,
      Status: status,
      response: response,
    });

    return {
      Step: step,
      Status: status,
      response: response,
    };
  }
};

// Thunks for API calls
export const sendQuery = createAsyncThunk(
  "sendQuery",
  async (
    { user_input, user_id, thread_id }: { user_input: string; user_id: string; thread_id: string },
    { getState },
  ): Promise<any> => {
    const state = getState() as RootState;
    const pitchdeckData = state.VSProduct.pitchdeck_data;
    const response: any = await fetch(
      `https://templateuserrequirements.azurewebsites.net/interact_openai/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input, user_id, thread_id, pitchdeck_data: pitchdeckData }),
      },
    );
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    const { value } = await reader.read();
    if (value) {
      const chunk = decoder.decode(value);
      console.log("chunk", chunk);
      console.log("type of chunk", typeof chunk);

      let answer = JSON.parse(chunk);
      answer = answer.replace(/```/g, "");
      answer = answer.replace(/}\s*{/g, "}{");
      console.log("answer", typeof answer, answer);
      // const newanswer = JSON.parse(answer);

      const newanswer = formatJsonResponse(answer);

      console.log("newwwwwwwwwww", newanswer);
      if (newanswer.Step == 4) {
        const jsonParts = answer.split("}{");
        const secondJsonString = jsonParts[1].startsWith("{") ? jsonParts[1] : `{${jsonParts[1]}`;
        if (secondJsonString) {
          const dataObject = JSON.parse(secondJsonString);
          newanswer.DataSources = dataObject;
          console.log("dataObject", dataObject);
        } else return;
      }

      console.log("answerrrrr", typeof newanswer, newanswer);

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
    console.log("extracted successfully", data.slides_data);

    // console.log("ppppppppppppp",JSON.parse(data.slides_))
    return data.slides_data;
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
    updateButtonSelection: (state, action: PayloadAction<{  hasselected: boolean }>) => {
      const { hasselected } = action.payload;
      if(state.chats.length > 0) state.chats[state.chats.length - 1].hasselected = hasselected;
    },
    resetChats: (state) => {
      console.log("resettt");
      state.chats = [];
      state.Step = 0;
    },
    setCompanyName: (state, action: PayloadAction<string>) => {
      console.log("comppppp", action.payload);
      state.companyName = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.Step = action.payload;
    },
    setUploadStatus: (state, action: PayloadAction<boolean>) => {
      state.uploadStatus = action.payload;
    },
    updatePitchdeckData: (
      state,
      action: PayloadAction<{
        diligenceLevelCovered?: string[];
        pitchdeckSummary?: any;
        searchQueries?: any;
        reportGenerations? :any;
      }>,
    ) => {
      const { diligenceLevelCovered, pitchdeckSummary, searchQueries ,reportGenerations} = action.payload;
      if (diligenceLevelCovered) {
        state.pitchdeck_data["diligence level_covered"] = diligenceLevelCovered;
      }
      if (pitchdeckSummary) {
        console.log(" state.chats", state.chats);
        const extractChat = state.chats.find((chat) => chat.extract && chat.extract !== "");
        if (extractChat) extractChat.extract = pitchdeckSummary;

        state.pitchdeck_data.pitchdeck_summary = `\n {${pitchdeckSummary} \n}`;
      }
      if (searchQueries) {
        state.pitchdeck_data.search_queries = searchQueries;
      }
      if(reportGenerations){
        state.pitchdeck_data.report_generations = JSON.stringify(reportGenerations);
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendQuery.fulfilled, (state, action: PayloadAction<any>) => {
      const { response, Step, Status, DataSources } = action.payload;
      console.log("particular ans", response);
      console.log("steps", Step);
      if (Step !== undefined) {
        if (Step == 2) {
          console.log("step2", response);
          state.chats[state.chats.length - 1].extract = response;
        } 
        // else if(Step == 4){
        //   const option = [];
        //   const prevanswer = state.chats[state.chats.length - 1].answer || ""
        //   if (
        //     prevanswer.trim().toLowerCase() == "continue" || 
        //     prevanswer.trim().toLowerCase() == "proceed"
        //   ) {
        //     option.push("Continue to answer questions");
        //   }          
        //   option.push("Skip and proceed to step 5");
        //   state.chats[state.chats.length - 1].query = response;
        //   state.chats.push({ query: "",  answer: "" ,options:option});
        // }
          else if (Step == 4) {
            if (DataSources) state.DataSources = DataSources;
            console.log("data sources",DataSources);
            state.chats[state.chats.length - 1].query = response;
            state.chats.push({ query: "",  answer: "" ,options:["Continue"]});
          } else if (Step == 5 && typeof response === 'object') {
            console.log("step 6 response", response);
            state.ReportTemplate = response;
            state.chats[
              state.chats.length - 1
            ].query = `Almost there! 🚀 The final stencil of your report is ready in the right pane. Fine-tune them to match your vision before submission.\n
  Ready to proceed? Confirm now to generate your report
  `;
          // state.chats.push({ query: "If everything looks good. Please confirm to generate report.",  answer: "" });
          state.chats.push({ query: "",  answer: "" ,options:["Submit"]});
        } else if (response.includes("//")) {
          const options: string[] =
            response
              .match(/\/\/(.*?)\/\//g)
              ?.map((opt: string) => opt.replace(/\/\/|\/\//g, "").trim()) || [];
          state.SidescreenOptions = options;
          console.log("options sidescreen", options);
          const query = response.includes(":")
            ? response.split(":")[0].trim()
            : response.split(".")[0].trim() || "Please provide your input.";
          state.chats[state.chats.length - 1].query = query;
        } else if (response.includes("@")) {
          console.log("button option bock");
          const options: string[] =
            response.match(/@@(.*?)@@/g)?.map((opt: string) => opt.replace(/@@/g, "").trim()) || [];

          // const query = response.includes(':')
          // ? response.split(':')[0].trim()
          // : response.split('.')[0].trim() || "Please provide your input.";

          let query;

          if (response.includes("?")) {
            query = response.split("?")[0].trim() + "?";
          } else if (response.includes(":")) {
            query = response.split(":")[0].trim() + ":";
          } else if (response.includes(".")) {
            query = response.split(".")[0].trim() + ".";
          } else {
            query = "Please provide your input.";
          }

          console.log("step 3", query, options);
          state.chats[state.chats.length - 1].query = query;
          state.chats.push({ query: "", options: options, answer: "" });
        } else if (Step == 8) {
          state.chats[state.chats.length - 1].query = response;
          state.chats.push({
            query: "",
            options: ["Start another report", "Learn about market data"],
            answer: "",
            hasbutton: true,
          });
        } else {
          // state.chats.push({ query: response, answer: "" });
          state.chats[state.chats.length - 1].query = response;
        }
        state.Step = Step;
      }
    });
    builder.addCase(extractFileData.fulfilled, (state, action) => {
      state.pitchdeck_data = {
        "Company/Startup Name": state.companyName,
        pitchdeck_summary: action.payload,
        "diligence level_covered": state.SidescreenOptions,
        search_queries: {},
      };
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
  setUploadStatus,
  setCompanyName,
  updatePitchdeckData,
} = VSProductSlice.actions;
