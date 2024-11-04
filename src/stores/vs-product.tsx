import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "src/store";
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
  CompanyName:string;
  marketChatLoading: boolean;
  Step: number;
  SidescreenOptions?: string[];
  DataSources?: any;
  ReportTemplate?:any;
  pitchdeck_data:any;
}

const initialState: VSProduct = {
  CompanyName:"",
  chats: [],
  marketChatLoading: true,
  Step: 0,
  SidescreenOptions: [],
  DataSources: {},
  ReportTemplate: {},
  pitchdeck_data:{}
};

const formatJsonResponse = (inputString: string): any => {
  try {
    const data = JSON.parse(inputString);
    console.log("data 1",data);
    return data;
  } catch (err){
    console.log("errrrr",err);
    const stepMatch = inputString.match(/"Step":\s*(\d+)/);
    const statusMatch = inputString.match(/"Status":\s*"([^"]+)"/);
    const responseMatch = inputString.match(/"response":\s*"([^"]+)"/);

    const step = stepMatch ? stepMatch[1] : "N/A";
    const status = statusMatch ? statusMatch[1] : "N/A";
    const response = responseMatch ? responseMatch[1] : "N/A";
    console.log("data 2",{
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
  async ({ user_input, user_id,thread_id }: { user_input: string; user_id: string;thread_id:string }, { getState }): Promise<any> => {
    const state = getState() as RootState;
    const pitchdeckData = state.VSProduct.pitchdeck_data;
   console.log("ooooooooooooooooooooooo",pitchdeckData);
    const response: any = await fetch(
      `https://templateuserrequirements.azurewebsites.net/interact_openai/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input, user_id,thread_id,pitchdeck_data: pitchdeckData }),
      },
    );
    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    const { value } = await reader.read();
    if (value) {
      const chunk = decoder.decode(value);
      console.log("chunk", chunk);
      console.log("type of chunk", typeof chunk);
      const answer = JSON.parse(chunk);

      console.log("answer", typeof answer, answer);
      // const newanswer = JSON.parse(answer);

      const newanswer = formatJsonResponse(answer);
      console.log("newwwwwwwwwww",newanswer)
      if (newanswer.Step == 6) {
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
    console.log("extracted successfully",data.slides_data);

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
    updateButtonSelection: (state, action: PayloadAction<{ id: number; hasselected: string }>) => {
      const { id, hasselected } = action.payload;
      const chat = state.chats.find((chat) => chat.id === id);
      if (chat) {
        chat.hasselected = hasselected;
      }
    },
    resetChats: (state) => {
      console.log("resettt");
      state.chats = [];
      state.Step=0;
    },
    setCompanyName:  (state, action: PayloadAction<string>) => {
      console.log("comppppp",action.payload);
      state.CompanyName = action.payload;
    },
    setCurrentStep: (state, action: PayloadAction<number>) => {
      state.Step = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendQuery.fulfilled, (state, action: PayloadAction<any>) => {
      const { response, Step, Status, DataSources } = action.payload;
      console.log("particular ans", response);
      console.log("steps", Step);
      if (Step !== undefined) {
        // if(Step == 1){
        //   const response1 = `@?[  ["Market Opportunity", "Vast Market with High Growth Potential", "EcoTech Innovations is poised to tap into a $300 billion global smart home market, focusing on the $50 billion clean energy solutions segment, with an 8.9% CAGR in the smart home energy management sector."], ["Competitive Differentiation", "Innovative Edge Over Competitors", "EcoTech Innovations stands out with its AI-driven optimization and seamless integration with existing home systems, which positions it uniquely against competitors like Tesla Powerwall, Sunrun, and Vivint Solar."], ["Product Viability', 'Scalable and AI-Driven Energy Solutions', 'The company offers solar-powered smart home energy systems with AI-driven energy optimization, which are scalable for commercial use and have already seen 1,500 units sold in the first 12 months."] ]@?`;
        //   console.log("response1",response1);
        //   // const matches = response1.match(/@?\[(.*?)\]@?/);
        //   // let reportContent = [];
        //   // console.log("matched",matches);
        //   // if (matches && matches[1]) {
        //   //     // Convert the matched string to a valid JavaScript array
        //   //     const arrayString = matches[1].trim();
        //   //     reportContent = JSON.parse(`[${arrayString}]`);
        //   // }

          
        //   const convertResponseToReportData = (response:string) => {
        //     // Check if the response contains the delimiter "@?"
        //     if (response.includes('@?')) {
        //       const splitResponse = response.split('@?')[1]; // Get the part after "@?"
        //    console.log("s[lair ress",typeof splitResponse,splitResponse)
        //       // Ensure the split result is valid before parsing
        //       if (splitResponse) {
        //         try {
        //           const yo = `[  ['Market Opportunity', 'Vast Market with High Growth Potential', 'EcoTech Innovations is poised to tap into a $300 billion global smart home market, focusing on the $50 billion clean energy solutions segment, with an 8.9% CAGR in the smart home energy management sector.'], ['Revenue Model Analysis', 'Diverse Revenue Streams and Strong Projections', 'The company's revenue streams include direct sales and a subscription model for AI-driven energy management services, with a $1.2M in ARR from subscriptions and a projected revenue of $2.5M for 2023.'],  ]`
                 
        //           const jsonReadyString = yo
        //           .replace(/(\[|\s),\s*'|'(\s|\]|\})/g, '$1"$2') 
        //           .replace(/'(?=\s*,)/g, '"') 
        //           .replace(/(?<=,)\s*'/g, '"')
        //           // .replace(/(^|\s)'|'(\s|$)/g, '$1"$2') 
        //           .replace(/'(?![\w\s])/g, '"')
        //           .replace(/(?<=\[)'/g, '"'); 
        //           // .replace(/'(?=\s*[\w])/g, '"')
                 


        //           // const jsonReadyString = yo.replace(/(?<!\w)'(?!\w)/g, '"'); 

        //           console.log("ollall",jsonReadyString);
        //           // Parse the split response as JSON and return
        //           return JSON.parse(jsonReadyString);
        //         } catch (error) {
        //           console.error("Error parsing response:", error);
        //           return [];
        //         }
        //       }
        //     }
        //     // Return an empty array if the delimiter is missing
        //     return [];
        //   };

        //   const Template = convertResponseToReportData(response1);
        //   state.ReportTemplate = Template;
        //   console.log("ooooo", Template);

      
      
          // if (matches && matches[1]) {
          //     // Convert the matched string to a valid JavaScript array
          //     const arrayString = matches[1].trim();
          //     reportContent = JSON.parse(`[${arrayString}]`);
          // }
         
          // if (matches && matches[1]) {
          //     // Convert the matched string to a valid JavaScript array
          //     const arrayString = matches[1].trim();
          //     reportContent = JSON.parse(`[${arrayString}]`);
          // }

        // }s
        // if(Step == 1 ){
        //   state.chats[state.chats.length - 1].query = 'Great! Thanks for sharing the startup name. Could you select the current stage of your startup from the options below?';
        //   // state.chats.unshift({ query: "I am teacher", answer: ""});
        //   state.chats.push({ query: "", options: ["Pre Revenue","Post Revenue"], answer: "" ,hasbutton:true});

        // }
        // else 
        if (Step == 2) {
          console.log("step2", response);
          state.chats[state.chats.length - 1].extract = response;
        } else if (Step == 6) {
          if (DataSources) state.DataSources = DataSources;
          state.chats[state.chats.length - 1].query = response;
        } else if(Step == 7){
          const convertResponseToReportData = (response:string) => {
            if (response.includes('@?')) {
              const splitResponse = response.split('@?')[1];
              console.log("split res",splitResponse);
              if (splitResponse) {
                try {
                  // const jsonReadyString = splitResponse
                  // .replace(/(\[|\s),\s*'|'(\s|\]|\})/g, '$1"$2') 
                  // .replace(/'(?=\s*,)/g, '"') 
                  // .replace(/(?<=,)\s*'/g, '"')
                  // // .replace(/(^|\s)'|'(\s|$)/g, '$1"$2') 
                  // .replace(/'(?![\w\s])/g, '"')
                  // .replace(/(?<=\[)'/g, '"'); 
                  // // .replace(/'(?=\s*[\w])/g, '"')
                 
                  const jsonReadyString = splitResponse 
                  .replace(/\\/g, "");

                 console.log("jsonReadyString",response);
                  return JSON.parse(jsonReadyString.trim());
                } catch (error) {
                  console.error("Error parsing response:", error);
                  return [];
                }
              }
            }
            return [];
          };


          
          const Template = convertResponseToReportData(response);
          state.ReportTemplate = Template;
          console.log("ooooo", Template);
       
          state.chats[state.chats.length - 1].query = 'Here’s the final report template for EcoTech Innovations based on all the details we’ve discussed. Please review and make any adjustments';
        }else if (response.includes("//")) {
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
        } else if(Step == 8){
          state.chats[state.chats.length - 1].query = response;
          state.chats.push({ query: "", options: ["Start another report","Learn about market data"], answer: "" ,hasbutton:true});
        }else {
          // state.chats.push({ query: response, answer: "" });
          state.chats[state.chats.length - 1].query = response;
        }
        state.Step = Step;
      }
    });
    builder.addCase(extractFileData.fulfilled, (state, action) => {
      state.pitchdeck_data = {"Company/Startup Name": state.CompanyName,"pitchdeck_summary":action.payload,"search_queries":{ }};
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
  setCompanyName
} = VSProductSlice.actions;