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
export function examinerWorkloadDistribution(data: PatentExaminerData[]) {
  if (data.length === 0) {
    return "No data available.";
  }

  // Calculate the total number of patents
  const totalPatents = data.reduce((sum, curr) => sum + curr.count, 0);

  if (totalPatents === 0) {
    return "No patents found.";
  }

  // Calculate the percentage of patents handled by each examiner
  const examinerWorkloads = data.map((examinerData) => ({
    examiner: examinerData.examiner,
    count: examinerData.count,
    percentage: (examinerData.count / totalPatents) * 100,
  }));

  // Find the examiner with the highest workload
  const maxWorkloadExaminer = examinerWorkloads.reduce(
    (max, curr) => (curr.count > max.count ? curr : max),
    examinerWorkloads[0],
  );

  // Construct the sentence
  return `Examiner ${maxWorkloadExaminer.examiner} handled ${
    maxWorkloadExaminer.count
  } patents last year, making up ${maxWorkloadExaminer.percentage.toFixed(
    2,
  )}% of the total examinations, indicating a high concentration of workload among a few examiners.`;
}

//
export function examinerWithFastestGrowingWorkload(data: PatentExaminerData[]) {
  if (data.length < 2) {
    return "No sufficient data to calculate growth rates for examiners.";
  }

  // Group data by examiner
  const groupedData: { [key: string]: { year: number; count: number }[] } = data.reduce(
    (acc, curr) => {
      if (!acc[curr.examiner]) {
        acc[curr.examiner] = [];
      }
      acc[curr.examiner].push({ year: curr.year, count: curr.count });
      return acc;
    },
    {} as { [key: string]: { year: number; count: number }[] },
  );

  // Calculate year-over-year growth rates
  const growthRates: { examiner: string; yearA: number; yearB: number; growthRate: number }[] = [];
  for (const examiner in groupedData) {
    const examinerData = groupedData[examiner];
    examinerData.sort((a, b) => a.year - b.year);

    for (let i = 1; i < examinerData.length; i++) {
      const yearA = examinerData[i - 1].year;
      const yearB = examinerData[i].year;
      const countA = examinerData[i - 1].count;
      const countB = examinerData[i].count;

      if (countA === 0) {
        // Avoid division by zero
        continue;
      }

      const growthRate = ((countB - countA) / countA) * 100;
      growthRates.push({ examiner, yearA, yearB, growthRate });
    }
  }

  if (growthRates.length === 0) {
    return "No valid growth rate calculations available.";
  }

  // Find the examiner with the highest growth rate
  const maxGrowth = growthRates.reduce(
    (max, curr) => (curr.growthRate > max.growthRate ? curr : max),
    growthRates[0],
  );

  // Construct the sentence
  return `Examiner ${maxGrowth.examiner}'s workload increased by ${maxGrowth.growthRate.toFixed(
    2,
  )}% from year ${maxGrowth.yearA} to ${
    maxGrowth.yearB
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

export function annualWorkloadTrendsAmongExaminers(data: PatentExaminerData[]) {
  if (data.length === 0) {
    return "No data available.";
  }

  // Sort the data by year and patent count in descending order
  data.sort((a, b) => {
    if (a.year === b.year) {
      return b.count - a.count; // Sort by count within the same year
    }
    return a.year - b.year; // Sort by year
  });

  // Group data by year and find the top examiner for each year
  const topExaminers: { year: number; examiner: string; count: number }[] = [];
  let currentYear = data[0].year;
  let maxCount = 0;
  let topExaminer = "";

  for (const entry of data) {
    if (entry.year !== currentYear) {
      topExaminers.push({ year: currentYear, examiner: topExaminer, count: maxCount });
      currentYear = entry.year;
      maxCount = entry.count;
      topExaminer = entry.examiner;
    } else if (entry.count > maxCount) {
      maxCount = entry.count;
      topExaminer = entry.examiner;
    }
  }
  // Push the last year's top examiner
  topExaminers.push({ year: currentYear, examiner: topExaminer, count: maxCount });

  // Construct the sentence based on the latest year
  const latestTopExaminer = topExaminers[topExaminers.length - 1];
  return `In year ${latestTopExaminer.year}, the examination workload trends shifted significantly, with Examiner ${latestTopExaminer.examiner} handling the most patents, indicating changing priorities or capacity enhancements.`;
}
