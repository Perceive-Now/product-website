import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

//
// import type { IKeywordOption } from "../components/reusable/search";

//
const initialState: IDetail = {
  report_details: {
    title: undefined,
    description: undefined,
    date: undefined,
  },
  objective_detail: {
    objective: undefined,
    start_date: undefined,
    end_date: undefined,
  },
  organization_competitor: {
    organization: [],
    competitor: [],
  },
  use_case: {
    label: undefined,
  },
  purpose_identification: {
    answer: undefined,
  },
  novelty_aspect: {
    answer: undefined,
  },
  prior_art_research: {
    answer: undefined,
  },
  technical_field_invention: {
    answer: undefined,
  },
  inventor_identification: {
    answer: undefined,
  },
  potential_application: {
    answer: undefined,
  },
  estimated_market_potential: {
    answer: undefined,
  },
  inventive_step: {
    answer: undefined,
  },
};

/**
 *
 */
export const IPStepSlice = createSlice({
  name: "ip_detail",
  initialState,
  reducers: {
    setIPUseCase: (state, action: PayloadAction<IUseCase>) => {
      state.use_case.label = action.payload.label;
    },
    setPurposeIdentification: (state, action: PayloadAction<IAnswer>) => {
      state.purpose_identification.answer = action.payload.answer;
    },
    setNoveltyAspect: (state, action: PayloadAction<IAnswer>) => {
      state.novelty_aspect.answer = action.payload.answer;
    },
    setPriorArtResearchfinding: (state, action: PayloadAction<IAnswer>) => {
      state.prior_art_research.answer = action.payload.answer;
    },
    setTechnicalFieldInvention: (state, action: PayloadAction<IAnswer>) => {
      state.technical_field_invention.answer = action.payload.answer;
    },
    setInventorIdentification: (state, action: PayloadAction<IAnswer>) => {
      state.inventor_identification.answer = action.payload.answer;
    },
    setPotentialApplication: (state, action: PayloadAction<IAnswer>) => {
      state.potential_application.answer = action.payload.answer;
    },
    setEstimatedMarketPotential: (state, action: PayloadAction<IAnswer>) => {
      state.estimated_market_potential.answer = action.payload.answer;
    },
    setInventiveStep: (state, action: PayloadAction<IAnswer>) => {
      state.inventive_step.answer = action.payload.answer;
    },
    //
    setIPDetail: (state, action: PayloadAction<IStep>) => {
      state.report_details.title = action.payload.title;
      (state.report_details.description = action.payload.description),
        (state.report_details.date = action.payload.date);
    },
    setIPObjectives: (state, action: PayloadAction<IObjective>) => {
      state.objective_detail.objective = action.payload.objective;
      state.objective_detail.start_date = action.payload.start_date;
      state.objective_detail.end_date = action.payload.end_date;
    },
    setIPOrganization: (state, action: PayloadAction<IOrganization>) => {
      (state.organization_competitor.competitor = action.payload.competitor),
        (state.organization_competitor.organization = action.payload.organization);
    },
    clearDetail: (state) => {
      state.report_details.title = undefined;
    },
  },
});

//
export const {
  setIPDetail,
  clearDetail,
  setIPObjectives,
  setIPOrganization,
  setIPUseCase,
  setPurposeIdentification,
  setNoveltyAspect,
  setPriorArtResearchfinding,
  setTechnicalFieldInvention,
  setInventorIdentification,
  setPotentialApplication,
  setEstimatedMarketPotential,
  setInventiveStep,
} = IPStepSlice.actions;
export default IPStepSlice.reducer;

//
interface IDetail {
  report_details: IStep;
  objective_detail: IObjective;
  organization_competitor: IOrganization;
  use_case: IUseCase;
  purpose_identification: IAnswer;
  novelty_aspect: IAnswer;
  prior_art_research: IAnswer;
  technical_field_invention: IAnswer;
  inventor_identification: IAnswer;
  potential_application: IAnswer;
  estimated_market_potential: IAnswer;
  inventive_step: IAnswer;
}

interface IStep {
  title: string | undefined;
  description: string | undefined;
  date: string | undefined;
  // filter: IFilterKeyword[] | undefined;
}

interface IObjective {
  objective: string | undefined;
  start_date: string | undefined;
  end_date: string | undefined;
}

interface IOrganization {
  organization: string[];
  competitor: string[];
}

interface IUseCase {
  label: string | undefined;
}

interface IAnswer {
  answer: string | undefined;
}
