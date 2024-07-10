interface IPatentInfo {
  location_id: number;
  country: string;
  city: string;
  longitude: string | null;
  latitude: string | null;
  count: number;
  year: number;
}

export function topCountriesByNumberOfPatentApplicants(data: IPatentInfo[]): string {
  if (data.length === 0) {
    return "No patent data available.";
  }

  // Aggregate counts by country, defaulting empty country to 'US'
  const countryCounts = data.reduce((acc, item) => {
    const country = item.country || "US"; // Default to 'USA' if country is empty
    if (acc[country]) {
      acc[country] += item.count;
    } else {
      acc[country] = item.count;
    }
    return acc;
  }, {} as { [country: string]: number });

  // Sort countries by count in descending order and take the top three
  const sortedCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1])
    .map((item) => item[0]);
  const topCountries = sortedCountries.slice(0, 3);

  // Format the message
  if (topCountries.length === 0) {
    return "No significant patent data available for any country.";
  }

  return `The top countries for patent applicants are ${topCountries.join(
    ", ",
  )}, demonstrating their leading roles in global innovation and patent filing activities.`;
}

export function rapidGrowthInApplicantNumbersByRegion(data: IPatentInfo[]): string {
  if (data.length === 0) {
    return "No patent data available.";
  }

  // Group data by location and year
  const groupedData = data.reduce((acc, curr) => {
    const key = `${curr.country}-${curr.city}-${curr.year}`;
    acc[key] = curr.count;
    return acc;
  }, {} as { [key: string]: number });

  // Calculate growth rates
  const growthRates: { location: string; growthRate: number }[] = [];
  data.forEach((item) => {
    const currentYearCount = groupedData[`${item.country}-${item.city}-${item.year}`];
    const previousYearCount = groupedData[`${item.country}-${item.city}-${item.year - 1}`];
    if (currentYearCount && previousYearCount) {
      const growthRate = ((currentYearCount - previousYearCount) / previousYearCount) * 100;
      growthRates.push({ location: `${item.country}, ${item.city}`, growthRate });
    }
  });

  // Sort by growth rate and pick top two
  growthRates.sort((a, b) => b.growthRate - a.growthRate);
  const topTwo = growthRates.slice(0, 2);

  if (topTwo.length < 2) {
    return "Not enough data to identify two regions with the most growth.";
  }

  // Format the message
  return `Regions ${topTwo[0].location} and ${
    topTwo[1].location
  } have experienced the most rapid growth in patent applicant numbers over the last year, with increases of ${topTwo[0].growthRate.toFixed(
    2,
  )}% and ${topTwo[1].growthRate.toFixed(2)}%, highlighting emerging innovation hubs.`;
}

export function cityWithHighestConcentrationOfApplicants(data: IPatentInfo[]): string {
  if (data.length === 0) {
    return "No patent data available.";
  }

  // Aggregate patent counts by city
  const cityCounts = data.reduce((acc, item) => {
    const cityKey = `${item.country}-${item.city}`;
    if (acc[cityKey]) {
      acc[cityKey] += item.count;
    } else {
      acc[cityKey] = item.count;
    }
    return acc;
  }, {} as { [cityKey: string]: number });

  // Calculate the total number of patents
  const totalPatents = Object.values(cityCounts).reduce((sum, count) => sum + count, 0);

  // Identify the city with the highest number of patents
  const topCity = Object.entries(cityCounts).reduce((prev, current) => {
    return prev[1] > current[1] ? prev : current;
  });

  // Calculate the city's share of the total patents
  const topCityPercentage = (topCity[1] / totalPatents) * 100;

  // Format the message
  const [countryCity] = topCity[0].split("-");
  return `City ${countryCity} is home to the highest concentration of patent applicants, accounting for ${topCityPercentage.toFixed(
    2,
  )}% of the total, underlining its status as a central innovation locale.`;
}

export function shiftInGeographicalFocusOfApplicants(
  data: IPatentInfo[],
  region: string,
  startYear: number,
  endYear: number,
): string {
  // Filter data for the specified region and year range
  const regionalData = data.filter(
    (d) => d.city === region && (d.year === startYear || d.year === endYear),
  );

  // Ensure data for both years is present
  if (regionalData.length !== 2) {
    return `Insufficient data for ${region} to analyze trends from ${startYear} to ${endYear}.`;
  }

  // Extract counts for start and end years
  const startData = regionalData.find((d) => d.year === startYear);
  const endData = regionalData.find((d) => d.year === endYear);

  if (!startData || !endData) {
    return `Data for ${region} is incomplete for the years selected.`;
  }

  // Calculate the percentage growth rate
  const growthRate = ((endData.count - startData.count) / startData.count) * 100;

  // Format the message
  return `Over the past decade, there has been a notable shift towards ${region} for patent applicants, with a growth rate of ${growthRate.toFixed(
    2,
  )}%, indicating changing innovation landscapes and the emergence of new technology hubs.`;
}

export function internationalDiversityOfPatentApplicants(data: IPatentInfo[]): string {
  if (data.length === 0) {
    return "No patent data available.";
  }

  // Create a Set to track unique countries
  const countries = new Set<string>();
  data.forEach((item) => countries.add(item.country));

  // Count the unique countries
  const numCountries = countries.size;

  // Format the message
  return `Patent applications exhibit a high degree of international diversity, with applicants from over ${numCountries} different countries, emphasizing the global nature of technological innovation.`;
}
