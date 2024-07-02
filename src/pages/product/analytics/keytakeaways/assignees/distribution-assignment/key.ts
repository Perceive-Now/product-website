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

export function regionalGrowthInPatentAssignments(data: IAssigneeData[]) {
  // Group data by country
  const groupedData: { [key: string]: { year: number; count: number }[] } = data.reduce(
    (acc, curr) => {
      if (!acc[curr.country]) {
        acc[curr.country] = [];
      }
      acc[curr.country].push({ year: curr.year, count: curr.count });
      return acc;
    },
    {} as { [key: string]: { year: number; count: number }[] },
  );

  // Calculate growth rates for each country
  const growthRates: { country: string; growthRate: number; yearSpan: number }[] = [];
  for (const country in groupedData) {
    const countryData = groupedData[country];
    countryData.sort((a, b) => a.year - b.year);

    // Calculate growth over the entire span of available data
    if (countryData.length > 1) {
      const startCount = countryData[0].count;
      const endCount = countryData[countryData.length - 1].count;
      const yearSpan = countryData[countryData.length - 1].year - countryData[0].year;
      if (startCount > 0) {
        const growthRate = ((endCount - startCount) / startCount) * 100;
        growthRates.push({ country, growthRate, yearSpan });
      }
    }
  }

  // Find the country with the largest growth rate
  const largestGrowth = growthRates.reduce(
    (max, curr) => (curr.growthRate > max.growthRate ? curr : max),
    { country: "", growthRate: -Infinity, yearSpan: 0 },
  );

  // Construct the sentence
  if (largestGrowth.country && largestGrowth.growthRate !== -Infinity) {
    return `Region ${countryNames[largestGrowth.country]} saw a ${largestGrowth.growthRate.toFixed(
      2,
    )}% increase in patent assignments over the last ${
      largestGrowth.yearSpan
    } years, indicating a surge in its technological development and innovation ecosystem.`;
  } else {
    return "No sufficient data to calculate the growth rates for the regions.";
  }
}
