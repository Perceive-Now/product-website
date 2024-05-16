/* eslint-disable @typescript-eslint/no-unused-vars */
interface PatentExaminerData {
  examiner: string;
  count: number;
  year: number;
}

interface ExaminerEfficiency {
  examiner_id: string;
  examiner_name: string;
  average_processing_days: number;
}

interface ExaminerEfficiency {
  examiner_id: string;
  examiner_name: string;
  average_processing_days: number;
}

//
export function examinerWorkloadDistribution(data: PatentExaminerData[], examinerName: string) {
  if (data.length === 0) {
    return "No data available.";
  }

  // Calculate the total number of examinations
  const totalExaminations = data.reduce((acc, curr) => acc + curr.count, 0);

  // Find the data for the specified examiner
  const examinerData = data.find((ex) => ex.examiner === examinerName);
  if (!examinerData) {
    return `No data available for examiner ${examinerName}.`;
  }

  // Calculate the percentage of total examinations handled by the examiner
  const percentageOfTotal = (examinerData.count / totalExaminations) * 100;

  // Format the message
  return `${examinerData.examiner} handled ${
    examinerData.count
  } patents last year, making up ${percentageOfTotal.toFixed(
    2,
  )}% of the total examinations, indicating a high concentration of workload among a few examiners.`;
}

//
export function examinerWithFastestGrowingWorkload(data: PatentExaminerData[]) {
  if (data.length === 0) {
    return "No patent data available.";
  }

  // Group data by examiner, aggregate counts by year
  const examinerData = data.reduce((acc, item) => {
    if (!acc[item.examiner]) {
      acc[item.examiner] = {};
    }
    if (!acc[item.examiner][item.year]) {
      acc[item.examiner][item.year] = item.count;
    } else {
      acc[item.examiner][item.year] += item.count;
    }
    return acc;
  }, {} as { [examiner: string]: { [year: number]: number } });

  // Determine growth rates
  const growthRates = Object.entries(examinerData).map(([examiner, counts]) => {
    const years = Object.keys(counts)
      .map(Number)
      .sort((a, b) => a - b);
    const firstYear = years[0];
    const lastYear = years[years.length - 1];
    const firstYearCount = counts[firstYear];
    const lastYearCount = counts[lastYear];
    const growthRate = ((lastYearCount - firstYearCount) / firstYearCount) * 100;
    return { examiner, growthRate, firstYear, lastYear };
  });

  // Find the examiner with the fastest growth
  const fastestGrowth = growthRates.reduce(
    (max, current) => (current.growthRate > max.growthRate ? current : max),
    growthRates[0],
  );

  return `Over the past decade, Examiner ${
    fastestGrowth.examiner
  }'s workload increased by ${fastestGrowth.growthRate.toFixed(2)}% from year ${
    fastestGrowth.firstYear
  } to ${
    fastestGrowth.lastYear
  }, the fastest growth among all examiners, highlighting the dynamic shifts in examination responsibilities.`;
}

//
export function workloadDisparityAmongExaminers(data: PatentExaminerData[]) {
  // Aggregate total counts by examiner
  // Calculate the total number of patents
  const totalPatents = data.reduce((acc, current) => acc + current.count, 0);

  // Sort the examiners by patent count in descending order
  const sortedExaminers = data.sort((a, b) => b.count - a.count);

  // Find the threshold for top examiners (e.g., top 10%)
  let topExaminersCount = 0;
  let topExaminersWorkload = 0;
  let threshold = 0;
  for (const examiner of sortedExaminers) {
    topExaminersCount++;
    topExaminersWorkload += examiner.count;
    threshold = topExaminersWorkload / totalPatents;
    if (threshold >= 0.1) {
      // Change this threshold value as needed
      break;
    }
  }

  // Calculate the percentage of total workload handled by the top examiners
  const percentageOfTotalWorkload = threshold * 100;

  // Construct the sentence
  const sentence = `The top ${percentageOfTotalWorkload.toFixed(2)}% of examiners, including ${
    topExaminersCount > 1 ? "Examiners" : "Examiner"
  } ${sortedExaminers
    .slice(0, topExaminersCount)
    .map((examiner) => examiner.examiner)
    .join(", ")}, handle ${percentageOfTotalWorkload.toFixed(
    2,
  )}% of the total patent examination workload, demonstrating significant workload disparities.`;

  return sentence;
}

//
export function efficiencyIndicatorByExaminer(data: ExaminerEfficiency[]) {
  if (data.length === 0) {
    return "No data available.";
  }

  // The data is assumed to be sorted by average_processing_days, smallest first
  const mostEfficient = data[0];

  return `${
    mostEfficient.examiner_name
  } processes patents in an average of ${mostEfficient.average_processing_days.toFixed(
    2,
  )} days, marking them as the most efficient, with a significant impact on reducing examination backlog.`;
}

export function annualWorkloadTrendsAmongExaminers(
  data: PatentExaminerData[],
  year: number,
): string {
  const yearlyData = data.filter((d) => d.year === year);

  if (yearlyData.length === 0) {
    return `No data available for year ${year}.`;
  }

  const sortedByWorkload = yearlyData.sort((a, b) => b.count - a.count);
  const topExaminer = sortedByWorkload[0];

  return `In year ${year}, the examination workload trends shifted significantly, with ${topExaminer.examiner} handling the most patents, indicating changing priorities or capacity enhancements.`;
}
