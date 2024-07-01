interface PatentInfo {
  sector: string;
  count: number;
  year: number;
}

export interface IPatentYear {
  year: number;
  count: number;
}

export function annualGrowthRateInPatentFilings(data: IPatentYear[]) {
  if (data.length < 2) {
    return "Insufficient data to calculate growth rate.";
  }

  // Sort data by year
  data.sort((a, b) => a.year - b.year);

  // Calculate the number of years between the first and the last record
  const n = data[data.length - 1].year - data[0].year;

  // Get the initial value (start year) and final value (end year)
  const initialCount = data[0].count;
  const finalCount = data[data.length - 1].count;

  // Calculate CAGR
  const cagr = (finalCount / initialCount) ** (1 / n) - 1;
  const cagrPercentage = (cagr * 100).toFixed(2);

  // Determine the trend
  const trend = cagr > 0 ? "upward" : "downward";

  // Construct the response message
  return `The annual growth rate of patent filings from year ${data[0].year} to year ${
    data[data.length - 1].year
  } was ${cagrPercentage}%, indicating an ${trend} trend in innovation activities.`;
}

export function comparisonOfPatentFilingsAcrossDecades(data: IPatentYear[]) {
  // Calculate the total filings for the 2000s and 2010s
  let filings2000s = 0;
  let filings2010s = 0;

  for (const entry of data) {
    if (entry.year >= 2000 && entry.year < 2010) {
      filings2000s += entry.count;
    } else if (entry.year >= 2010 && entry.year < 2020) {
      filings2010s += entry.count;
    }
  }

  // Calculate the percentage increase
  const percentageIncrease = ((filings2010s - filings2000s) / filings2000s) * 100;

  // Construct the sentence
  const sentence = `The comparison of patent filings across decades shows a ${percentageIncrease.toFixed(
    2,
  )}% increase in the 2010s compared to the 2000s, evidencing a significant shift in innovation intensity.`;

  return sentence;
}

export function PatentFilingLatestYear(patentData: PatentInfo[]) {
  if (patentData.length === 0) {
    return "No patent data available.";
  }

  // Assume the data is sorted by year and count as per the SQL ORDER BY clause
  const mostRecentYear = patentData[0].year;
  const recentData = patentData.filter((item) => item.year === mostRecentYear);

  // Find the sector with the maximum count in the most recent year
  const leadingSector = recentData.reduce(
    (acc, curr) => (curr.count > acc.count ? curr : acc),
    recentData[0],
  );

  // Constructing the message for the key takeaway
  return `In the most recent year (${leadingSector.year}), the ${leadingSector.sector} sector led in patent filings with ${leadingSector.count} patents, marking it as the forefront of innovation.`;
}

export function FiveYearMovingAverage(data: IPatentYear[]): string {
  if (data.length < 5) {
    return "Insufficient data to calculate a five-year moving average.";
  }

  // Sort the data by year in case it's not already sorted
  data.sort((a, b) => a.year - b.year);

  // Calculate moving averages starting from the fifth year in the dataset
  const movingAverages = [];
  for (let i = 4; i < data.length; i++) {
    const fiveYearRange = data.slice(i - 4, i + 1);
    const sum = fiveYearRange.reduce((acc, curr) => acc + curr.count, 0);
    const average = sum / 5;
    movingAverages.push({
      startYear: fiveYearRange[0].year,
      endYear: fiveYearRange[fiveYearRange.length - 1].year,
      average: average,
    });
  }

  // Find the first and the last averages to determine the overall trend
  const firstAverage = movingAverages[0].average;
  const lastAverage = movingAverages[movingAverages.length - 1].average;
  const trend =
    lastAverage > firstAverage ? "upward" : lastAverage < firstAverage ? "downward" : "stable";

  // Return formatted message for the most recent period
  const mostRecentAverage = movingAverages[movingAverages.length - 1];
  return `The five-year moving average of patent filings from year ${
    mostRecentAverage.startYear
  } to ${mostRecentAverage.endYear} was ${mostRecentAverage.average.toFixed(
    2,
  )}, demonstrating a ${trend} trend in patent filing activities.`;
}
