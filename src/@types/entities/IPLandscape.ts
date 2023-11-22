export interface IReport {
  title: string;
  description: string;
  date: string;
}

export interface IStepTwo {
  objective: string;
  start_date: string;
  end_date: string;
}

export interface IStepThree {
  objectives: string[];
  // organization: string[];
}

export interface IUSState {
  state: string[];
}
