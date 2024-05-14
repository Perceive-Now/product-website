import countryNames from "../../../../../../utils/extra/country-2-names";

export interface IInventorCountryData {
  country: string;
  count: number;
  year: number;
}

export function topCountryForInventorActivity(data: IInventorCountryData[]): string {
  // Assuming total inventor count is known
  data.sort((a, b) => b.count - a.count);
  const totalInventorCount = data.reduce((acc, curr) => acc + curr.count, 0);

  // Get the data for the top country
  const topCountryData = data[0];

  // Calculate the percentage of patent filings contributed by the top country
  const percentage = (topCountryData.count / totalInventorCount) * 100;

  // Construct the sentence
  const sentence = `${
    countryNames[topCountryData.country]
  } leads in inventor activity, contributing to ${percentage.toFixed(
    2,
  )}% of all patent filings, showcasing its pivotal role in global innovation.`;

  return sentence;
}

export function rapidIncreaseInInventorNumbersByRegion(data: IInventorCountryData[]): string {
  data.sort((a, b) => b.count - a.count);

  // Find the region with the highest growth rate
  const topRegionData = data[0];
  const lastYearData = data[data.length - 1];

  // Calculate the growth rate
  const growthRate = ((topRegionData.count - lastYearData.count) / lastYearData.count) * 100;

  // Construct the sentence
  const sentence = `${
    countryNames[topRegionData.country]
  }'s inventor count has surged by ${growthRate.toFixed(2)}% in the last ${
    topRegionData.year - lastYearData.year
  } years, emerging as a significant innovation hub.`;

  return sentence;
}

export function shiftInInventorGeographicalDistribution(data: IInventorCountryData[]): string {
  const currentYear = new Date().getFullYear();

  // Find the data for Region A (the region with the highest inventor count)
  const regionAData = data[0];

  // Find the inventor count for the previous decade
  const previousDecadeInventorCount = data
    .filter((entry) => entry.country === regionAData.country && currentYear - entry.year >= 10)
    .reduce((acc, curr) => acc + curr.count, 0);

  // Find the inventor count for the current decade
  const currentDecadeInventorCount = data
    .filter((entry) => entry.country === regionAData.country && currentYear - entry.year < 10)
    .reduce((acc, curr) => acc + curr.count, 0);

  // Calculate the growth rate
  const growthRate =
    ((currentDecadeInventorCount - previousDecadeInventorCount) / previousDecadeInventorCount) *
    100;

  // Construct the sentence
  const sentence = `Over the past decade, there has been a notable shift towards ${
    countryNames[regionAData.country]
  } for inventor activity, with a growth rate of ${growthRate.toFixed(
    2,
  )}%, indicating evolving innovation ecosystems.`;

  return sentence;
}
