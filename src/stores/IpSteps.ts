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
export const { setIPDetail, clearDetail, setIPObjectives, setIPOrganization, setIPUseCase } =
  IPStepSlice.actions;
export default IPStepSlice.reducer;

//
interface IDetail {
  report_details: IStep;
  objective_detail: IObjective;
  organization_competitor: IOrganization;
  use_case: IUseCase;
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
