import StatesCodes from "../../../../../utils/extra/us-states-codes";

export interface IFamilyYear {
  family_size: number;
  year: number;
}

export interface IPatentLocation {
  state: string;
  count: number;
  country: string;
}

export function AverageFamilySizeEachYear(data: IFamilyYear[]) {
  if (data.length === 0) {
    return "No data available.";
  }

  // Sort the data by year
  data.sort((a, b) => a.year - b.year);

  // Group data by year to calculate average family sizes
  const yearGrouped = data.reduce((acc, curr) => {
    if (!acc[curr.year]) {
      acc[curr.year] = [];
    }
    acc[curr.year].push(curr.family_size);
    return acc;
  }, {} as { [year: number]: number[] });

  // Calculate average family size per year
  const yearAverages = Object.keys(yearGrouped).map((year) => {
    const sizes = yearGrouped[parseInt(year)];
    const averageSize = sizes.reduce((sum, curr) => sum + curr, 0) / sizes.length;
    return { year: parseInt(year), averageSize };
  });

  // Get the first and last year averages
  const first = yearAverages[0];
  const last = yearAverages[yearAverages.length - 1];

  // Determine the trend word based on the comparison of the first and last averages
  const trendWord = last.averageSize > first.averageSize ? "increased" : "decreased";

  return `The average size of patent families has ${trendWord} from ${first.averageSize.toFixed(
    2,
  )} in year ${first.year} to ${last.averageSize.toFixed(2)} in year ${
    last.year
  }, indicating broader protection strategies and more extensive innovation coverage.`;
}

//
export function largePatentFamilyTrends(data: IFamilyYear[]) {
  if (data.length === 0) {
    return "No data available.";
  }

  // Sort the data by year
  data.sort((a, b) => a.year - b.year);

  // Group data by year and calculate proportions of large families
  const proportions = data.reduce((acc, curr) => {
    if (!acc[curr.year]) {
      acc[curr.year] = { total: 0, large: 0 };
    }
    acc[curr.year].total++;
    if (curr.family_size > 10) {
      acc[curr.year].large++;
    }
    return acc;
  }, {} as { [year: number]: { total: number; large: number } });

  // Convert to an array and calculate percentage increase
  const yearStats = Object.keys(proportions).map((year) => {
    const { total, large } = proportions[parseInt(year)];
    const proportion = (large / total) * 100;
    return { year: parseInt(year), proportion };
  });

  // Sort by year to ensure correct sequential comparison
  yearStats.sort((a, b) => a.year - b.year);

  const messages: string[] = [];
  for (let i = 1; i < yearStats.length; i++) {
    const prev = yearStats[i - 1];
    const current = yearStats[i];
    const increase = ((current.proportion - prev.proportion) / prev.proportion) * 100;

    if (increase > 0) {
      messages.push(
        `Year ${current.year} saw a ${increase.toFixed(
          2,
        )}% increase in the proportion of large patent families (more than 10 documents), highlighting a shift towards more comprehensive innovation protection efforts.`,
      );
    }
  }

  // Join messages or return a default message if no increase found
  return messages.length > 0
    ? messages.join(" ")
    : "No significant increase in large patent families over the years.";
}

export function findYearWithLargestAverage(data: IFamilyYear[]) {
  if (data.length === 0) {
    return "No data available.";
  }

  // Group data by year and calculate average family sizes
  const averages = data.reduce((acc, curr) => {
    if (!acc[curr.year]) {
      acc[curr.year] = { sum: 0, count: 0 };
    }
    acc[curr.year].sum += curr.family_size;
    acc[curr.year].count++;
    return acc;
  }, {} as { [year: number]: { sum: number; count: number } });

  // Determine the average for each year
  let maxAverage = 0;
  let yearWithMaxAverage = 0;
  for (const year in averages) {
    const average = averages[year].sum / averages[year].count;
    if (average > maxAverage) {
      maxAverage = average;
      yearWithMaxAverage = parseInt(year);
    }
  }

  // Format the message describing the findings
  return `Year ${yearWithMaxAverage} recorded the largest average patent family size at ${maxAverage.toFixed(
    2,
  )} documents per family, suggesting an emphasis on extensive protection and strategic innovation filing.`;
}

export function PatentFamilyGrowthRate(data: IFamilyYear[]) {
  if (data.length < 2) {
    return "No sufficient data to calculate the growth rates for patent families.";
  }

  // Sort the data by year
  data.sort((a, b) => a.year - b.year);

  // Calculate the year-over-year growth rates
  const growthRates: { yearA: number; yearB: number; growthRate: number }[] = [];
  for (let i = 1; i < data.length; i++) {
    const yearA = data[i - 1].year;
    const yearB = data[i].year;
    const sizeA = data[i - 1].family_size;
    const sizeB = data[i].family_size;

    if (sizeA === 0) {
      // Avoid division by zero
      return "No valid growth rate calculations available.";
      // continue;
    }

    const growthRate = ((sizeB - sizeA) / sizeA) * 100;
    growthRates.push({ yearA, yearB, growthRate });
  }

  // Use the last year's growth rate for the sentence
  const lastGrowth = growthRates[growthRates.length - 1];

  if (growthRates.length === 0) {
    return "No valid growth rate calculations available.";
  }

  return `The growth rate in the size of patent families from year ${lastGrowth.yearA} to ${
    lastGrowth.yearB
  } was ${lastGrowth.growthRate.toFixed(
    2,
  )}%, indicating an evolving approach to patent filings and protection strategies.`;
}

// geographical patent families
export function regionalMarketShareOfPatentFamily(data: IPatentLocation[]) {
  if (data.length === 0) {
    return "No data available.";
  }

  // Filter out entries with invalid or missing state codes
  const validData = data.filter((d) => d.state && StatesCodes[d.state]);

  if (validData.length === 0) {
    return "No valid state data available.";
  }

  // Calculate the total count of patent families globally (only valid entries)
  const total = validData.reduce((sum, current) => sum + current.count, 0);

  // Find the state with the largest number of patents
  const largest = validData.reduce((prev, current) =>
    prev.count > current.count ? prev : current,
  );

  // Retrieve the full state name from the state code
  const stateName = StatesCodes[largest.state];

  // Calculate the percentage contribution of the state with the largest count
  const percentage = (largest.count / total) * 100;

  // Format the message
  return `Region ${stateName} (Code: ${largest.state}) accounts for ${percentage.toFixed(
    2,
  )}% of global patent families, underscoring its role as a major hub for innovation and patent filing activities.`;
}
