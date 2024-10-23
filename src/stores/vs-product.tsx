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
  SidescreenOptions?: string[];
  DataSources?: any;
  ReportTemplate?:any
}

const initialState: VSProduct = {
  chats: [],
  marketChatLoading: true,
  Step: 0,
  SidescreenOptions: [],
  DataSources: {},
  ReportTemplate: {}
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
      response: response,
    };
  }
};

// Thunks for API calls
export const sendQuery = createAsyncThunk(
  "sendQuery",
  async ({ user_input, user_id }: { user_input: string; user_id: string }): Promise<any> => {
    const response: any = await fetch(
      `https://templateuserrequirements.azurewebsites.net/interact_openai/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_input: user_input === "Confirm" ? "ok" : user_input, user_id,thread_id:"" }),
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
      const { response, Step, Status, DataSources } = action.payload;
      console.log("particular ans", response);
      console.log("steps", Step);
      if (Step !== undefined) {
        // if(Step == 1){
        //   const response1 = `Here’s the final report template for EcoTech Innovations based on all the details we’ve discussed. Please review and make any adjustments @?[ 
        //     ["Market Opportunity", "Global Smart Home Energy Market", "EcoTech Innovations aims to tap into the $300 billion smart home market with a focus on clean energy, offering a solution to a growing customer base concerned with energy costs and sustainability. Projected growth of 8.9% CAGR presents a significant opportunity for the company."],  
        //     ["Competitive Differentiation", "Unique AI-Driven Energy Optimization", "With competitors like Tesla Powerwall, Sunrun, and Vivint Solar, EcoTech sets itself apart through proprietary AI optimization and seamless integration with existing home systems, reducing energy bills by up to 30%."],  
        //     ["Product Viability", "Innovative Smart Home Energy Systems", "EcoTech Innovations has developed solar-powered smart home energy systems with AI-driven energy optimization, demonstrating high potential in a market seeking sustainable and efficient energy solutions."],  
        //     ["Founding Team Overview", "Experienced Leadership", "Led by Jane Doe with over 10 years in clean tech and John Smith's expertise in AI, the team combines industry knowledge with technical prowess to drive EcoTech towards its vision."],  
        //     ["Go-to-Market Strategy", "Multi-Channel Market Penetration", "EcoTech employs a diversified go-to-market strategy, leveraging direct-to-consumer digital marketing, partnerships with home builders, and B2B channels for commercial installations, optimizing customer acquisition costs."],  
        //     ["Customer Validation", "Positive Market Reception", "Having sold 1,500 units in the first year and secured partnerships with 3 utility providers, EcoTech demonstrates strong market validation and customer savings of 25% on energy bills."],  
        //     ["Revenue Model Analysis", "Diverse Revenue Streams", "EcoTech's revenue streams include direct sales of solar-powered systems and a monthly subscription for AI-driven energy management services, indicating a scalable revenue model."],  
        //     ["Operational Efficiency", "Strategic Resource Allocation", "With a burn rate of $50k per month and a forthcoming raise of $5M, EcoTech plans to allocate funds primarily towards manufacturing and marketing to optimize operational efficiency."],  
        //     ["Partnerships and Alliances", "Strategic Utility Partnerships", "EcoTech's collaboration with utility companies not only broadens its market reach but also contributes to a more resilient energy grid."],  
        //     ["Technology and IP Overview", "Proprietary AI Technology", "EcoTech's filed patents for AI optimization algorithms and energy storage technology solidify its competitive edge and commitment to innovation."],  
        //     ["Regulatory and Compliance Review", "Compliance with Energy Regulations", "EcoTech is positioned to meet growing environmental regulations with its sustainable energy solutions, aligning with global carbon reduction goals."],  
        //     ["Time to Market", "Rapid Market Entry", "The startup's ability to quickly penetrate the market with its smart home energy systems underscores its agile go-to-market execution."],  
        //     ["Market Momentum", "Rising Demand for Clean Energy", "EcoTech is capitalizing on the increasing momentum in the clean energy sector, indicating a promising trajectory for growth and market adoption."],  
        //     ["Cost of Acquisition", "Efficient Customer Acquisition", "With a CAC of $120 and an LTV of $900, EcoTech maintains a healthy balance between acquisition costs and customer value, supporting sustainable growth."],  
        //     ["Product Scalability", "Scalable Solutions for Homes and Businesses", "The company's solar-powered systems are designed for seamless scalability, catering to both the residential and commercial market segments."] 
        //   ]@?`;
        //   console.log("response1",response1);
        //   const matches = response1.match(/@?\[(.*?)\]@?/);
        //   let reportContent = [];
        //   console.log("matched",matches);
        //   if (matches && matches[1]) {
        //       // Convert the matched string to a valid JavaScript array
        //       const arrayString = matches[1].trim();
        //       reportContent = JSON.parse(`[${arrayString}]`);
        //   }
      
        //   console.log("ooooo",reportContent);

        // }
        if (Step == 2) {
          console.log("step2", response);
          state.chats[state.chats.length - 1].extract = response;
        } else if (Step == 6) {
          if (DataSources) state.DataSources = DataSources;
          state.chats[state.chats.length - 1].query = response;
        } else if(Step == 7){
          let query = "";
          const options: string[][] = []; // Declare an array of arrays to hold options
          const parts = response.split(/(?<=\}),/); // Split by commas after closing braces
    
          parts.forEach((part: string) => {
            if (!part.startsWith('[')) {
              query += part; // Add to query
            } else {
              const parsedOptions = JSON.parse(part);
              if (Array.isArray(parsedOptions)) {
                options.push(parsedOptions); // Store the parsed options as an array
              }
            }
          });
           console.log("ooooooooooooo",options,query);
          // Update the last chat entry with the constructed query
          state.chats[state.chats.length - 1].query = query.trim();
          state.ReportTemplate = options; 
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
        } else {
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
