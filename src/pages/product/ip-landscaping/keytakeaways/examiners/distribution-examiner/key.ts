interface PatentExaminerData {
  examiner: string;
  count: number;
  year: number;
}

export function examinerWithFastestGrowingWorkload(
  data: PatentExaminerData[],
  examinerName: string,
): string {
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

export function workloadDisparityAmongExaminers(
  data: PatentExaminerData[],
  topPercentage: number,
): string {
  // Aggregate total counts by examiner
  const totalWorkload = data.reduce((acc, curr) => acc + curr.count, 0);
  const examinerWorkloads = data.reduce((acc, curr) => {
    acc[curr.examiner] = (acc[curr.examiner] || 0) + curr.count;
    return acc;
  }, {} as { [key: string]: number });

  // Sort examiners by workload and calculate top A%
  const sortedExaminers = Object.entries(examinerWorkloads).sort((a, b) => b[1] - a[1]);
  const cutoffIndex = Math.ceil(sortedExaminers.length * (topPercentage / 100)) - 1;
  const topExaminersWorkload = sortedExaminers
    .slice(0, cutoffIndex + 1)
    .reduce((acc, [_, count]) => acc + count, 0);
  const percentageWorkload = (topExaminersWorkload / totalWorkload) * 100;

  return `The top ${topPercentage}% of examiners, including ${
    sortedExaminers[0][0]
  }, handle ${percentageWorkload.toFixed(
    2,
  )}% of the total patent examination workload, demonstrating significant workload disparities.`;
}

interface ExaminerEfficiency {
  examiner_id: string;
  examiner_name: string;
  average_processing_days: number;
}

export function efficiencyIndicatorByExaminer(data: ExaminerEfficiency[]): string {
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
