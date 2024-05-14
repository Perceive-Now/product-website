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

  // Construct the sentence
  const sentence = `Collaborations among inventors have increased by ${increasePercentage.toFixed(
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

export function decadalIncreaseInCollaborations(data: ICollaborationData[]): string {
  // Find the collaboration counts for the 2000s and 2010s
  const collaborations2000s = data.find((entry) => entry.year === 2000)?.count || 0;
  const collaborations2010s = data.find((entry) => entry.year === 2010)?.count || 0;

  // Calculate the percentage increase in collaboration counts from the 2000s to the 2010s
  const increasePercentage =
    ((collaborations2010s - collaborations2000s) / collaborations2000s) * 100;

  // Construct the sentence
  const sentence = `Comparing the last two decades, inventor collaborations in the 2010s were ${increasePercentage.toFixed(
    2,
  )}% higher than in the 2000s, showing a growing preference for teamwork in innovation.`;

  return sentence;
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
