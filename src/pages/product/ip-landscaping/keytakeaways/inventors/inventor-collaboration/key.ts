export interface ICollaborationData {
  year: number;
  count: number;
}

export function analyzeCollaborationTrends(data: ICollaborationData[]): string {
  if (data.length === 0) {
    return "No collaboration data available.";
  }

  data.sort((a, b) => a.year - b.year);

  // Calculate the total number of years
  const totalYears = data.slice(0, 10).length;

  // Calculate the collaboration count for the first and last years
  const firstYearCollaborationCount = data[0].count;
  const lastYearCollaborationCount = data[totalYears - 1].count;

  // Calculate the percentage increase in collaboration counts over the years
  const increasePercentage =
    ((lastYearCollaborationCount - firstYearCollaborationCount) / firstYearCollaborationCount) *
    100;

  const trend = increasePercentage >= 0 ? "increases" : "decreased";

  // Construct the sentence
  const sentence = `Collaborations among inventors have ${trend} by ${increasePercentage.toFixed(
    2,
  )}% over the last ${totalYears} years, reflecting a trend towards more cooperative innovation efforts.`;

  return sentence;
}

export function analyzeHighestCollaborationYear(data: ICollaborationData[]): string {
  // Check if there's any data
  if (data.length === 0) {
    return "No collaboration data available.";
  }

  data.sort((a, b) => b.count - a.count);

  // Get the year with the highest collaboration count
  const highestCollaborationYearData = data[0];

  // Construct the sentence
  const sentence = `Year ${highestCollaborationYearData.year} saw the highest number of inventor collaborations, with ${highestCollaborationYearData.count} collaborative projects, indicating a peak in joint innovation activities.`;

  return sentence;
}

function getDecade(year: number): number {
  return Math.floor(year / 10) * 10;
}

export function decadalIncreaseInCollaborations(data: ICollaborationData[]): string {
  // Find the collaboration counts for the 2000s and 2010s
  if (data.length === 0) {
    return "No data available.";
  }

  // Aggregate data by decade
  const decadeData: { [decade: number]: { sum: number; count: number } } = data.reduce(
    (acc, curr) => {
      const decade = getDecade(curr.year);

      if (!acc[decade]) {
        acc[decade] = { sum: 0, count: 0 };
      }
      acc[decade].sum += curr.count;
      acc[decade].count++;
      return acc;
    },
    {} as { [decade: number]: { sum: number; count: number } },
  );

  // Ensure we have data for at least two decades
  const decades = Object.keys(decadeData).map((decade) => parseInt(decade));
  if (decades.length < 2) {
    return "Not enough data to calculate growth rates.";
  }

  // Calculate average collaborations for each decade
  const firstDecade = decades[0];
  const lastDecade = decades[decades.length - 1];
  const firstDecadeAverage = decadeData[firstDecade].sum / decadeData[firstDecade].count;
  const lastDecadeAverage = decadeData[lastDecade].sum / decadeData[lastDecade].count;

  // Calculate growth rate
  const growthRate = ((lastDecadeAverage - firstDecadeAverage) / firstDecadeAverage) * 100;

  const growth = growthRate > 0 ? "higher" : "lower";
  // Format the message
  return `Comparing the last two decades, inventor collaborations in the ${lastDecade}s were ${growthRate.toFixed(
    2,
  )}% ${growth} than in the ${firstDecade}s, showing a growing preference for teamwork in innovation.`;
}

export function regionalVariationsInCollaborationPatterns(data: ICollaborationData[]): string {
  data.sort((a, b) => b.count - a.count);
  // Find the region with the highest rate of increase in inventor collaborations
  let highestIncreaseRegion: string | undefined;
  let highestIncreasePercentage = 0;
  let previousYearCollaborationCount = 0;
  let previousYear = 0;

  for (const entry of data) {
    if (entry.year !== previousYear + 1) {
      // Skip years with no data to avoid potential division by zero
      previousYear = entry.year;
      previousYearCollaborationCount = entry.count;
      continue;
    }

    const increasePercentage =
      ((entry.count - previousYearCollaborationCount) / previousYearCollaborationCount) * 100;
    if (increasePercentage > highestIncreasePercentage) {
      highestIncreasePercentage = increasePercentage;
    }

    previousYear = entry.year;
    previousYearCollaborationCount = entry.count;
  }

  if (!highestIncreaseRegion) {
    return "No data available to analyze collaboration trends.";
  }

  // Calculate the total number of years
  const totalYears = data[data.length - 1].year - data[0].year + 1;

  // Construct the sentence
  const sentence = `Region ${highestIncreaseRegion} exhibits the highest rate of increase in inventor collaborations, with a surge of ${highestIncreasePercentage.toFixed(
    2,
  )}% over the past ${totalYears} years, pointing to evolving regional innovation strategies.`;

  return sentence;
}
