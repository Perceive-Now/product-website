import countryNames from "../../../../../../utils/extra/country-2-names";

export interface IAssigneeData {
  country: string;
  count: number;
  year: number;
}

export function countryLeadingInPatentAssignments(data: IAssigneeData[]): string {
  data.sort((a, b) => b.count - a.count);

  // Assuming the global total of assignments is known
  const globalTotalAssignments = data.reduce((acc, curr) => acc + curr.count, 0); // Example value

  // Get the data for the top country with the highest assignment count
  const topCountryData = data[0];

  // Calculate the percentage of the global total accounted for by the top country
  const percentage = (topCountryData.count / globalTotalAssignments) * 100;

  // Construct the sentence
  const sentence = `${
    countryNames[topCountryData.country]
  } holds the highest number of patent assignments, accounting for ${percentage.toFixed(
    2,
  )}% of the global total, marking it as a key player in technology transfer and innovation commercialization.`;

  return sentence;
}

export function shiftsInGeographicalPatternsOfAssignments(data: IAssigneeData[]) {
  data.sort((a, b) => b.count - a.count);

  // Get the data for the first and last year in the dataset
  const firstYearData = data[0];
  const lastYearData = data[data.length - 1];

  // Calculate the increase in assignment count over the years
  const increase = firstYearData.count - lastYearData.count;

  // Calculate the percentage increase
  const percentageIncrease = (increase / firstYearData.count) * 100;

  // Construct the sentence
  const sentence = `Over the recent decade, the geographical pattern of patent assignments has shifted towards ${
    countryNames[lastYearData.country]
  }, with an increase of ${percentageIncrease.toFixed(
    2,
  )}%, reflecting changes in global innovation dynamics.`;

  return sentence;
}
