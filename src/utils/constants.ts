export const WEBSITE_URL = process.env.REACT_APP_WEBSITE_URL;
export const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY ?? "";

export const COLORS = [
  "#B6A2D8",
  "#7F4BD8",
  "#442873",
  "#d6d6d6",
  "#e0d4f2",
  "#b5a2d8"
];

export const YEAR_DIFFERENCE = 4;
export const DEFAULT_TIME_PERIOD_END_YEAR = new Date().getFullYear();
export const DEFAULT_TIME_PERIOD_START_YEAR = DEFAULT_TIME_PERIOD_END_YEAR - 5;

export const TIME_PERIODS = [
  {
    label: "Past 10 years",
    value: "10yrs"
  },
  {
    label: "Past 5 years",
    value: "5yrs"
  },
  {
    label: "Past 3 years",
    value: "3yrs"
  },
  {
    label: "Past 12 months",
    value: "12mth"
  }
];

export const US_STATES: IState = {
  AZ: "Arizona",
  AL: "Alabama",
  AK: "Alaska",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DC: "District of Columbia",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming"
};
interface IState {
  [key: string]: string;
}
