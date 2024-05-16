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
  if (data.length === 0) {
    return "No data available.";
  }

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

    if (countryData.length > 1) {
      const startYear = countryData[0].year;
      const endYear = countryData[countryData.length - 1].year;
      const startCount = countryData[0].count;
      const endCount = countryData[countryData.length - 1].count;

      const yearSpan = endYear - startYear;
      const growthRate = ((endCount - startCount) / startCount) * 100;
      growthRates.push({ country, growthRate, yearSpan });
    }
  }

  // Find the country with the highest growth rate
  const highestGrowth = growthRates.reduce(
    (max, curr) => (curr.growthRate > max.growthRate ? curr : max),
    { country: "", growthRate: -Infinity, yearSpan: 0 },
  );

  // Construct the sentence
  if (highestGrowth.country && highestGrowth.growthRate !== -Infinity) {
    return `Region ${
      highestGrowth.country
    }'s inventor count has surged by ${highestGrowth.growthRate.toFixed(2)}% in the last ${
      highestGrowth.yearSpan
    } years, emerging as a significant innovation hub.`;
  } else {
    return "No sufficient data to calculate the growth rates for the regions.";
  }
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

export function internationalDiversityAmongInventors(data: IInventorCountryData[]) {
  // Extract unique countries
  const uniqueCountries = new Set(data.map((d) => d.country));

  // Count the number of distinct countries
  const countryCount = uniqueCountries.size;

  // Construct the sentence
  return `The diversity of patent inventors is vast, with contributions from over ${countryCount} different countries, highlighting the global collaboration in innovation.`;
}
