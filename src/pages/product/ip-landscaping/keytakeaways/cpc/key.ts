export interface ICPCData {
  cpc_class: string;
  count: number;
}

export function dominantCPCClassification(data: ICPCData[]) {
  data.sort((a, b) => b.count - a.count);
  // Get the data forwith the highest count
  const mostFocusedArea = data[0];

  // Construct the sentence
  const sentence = `CPC Classification ${mostFocusedArea.cpc_class} dominates with ${mostFocusedArea.count} patents, indicating a strong focus on specific technological areas.`;

  return sentence;
}

export function ComparisonOfCPCClassificationsOverTime(data: ICPCData[]): string {
  data.sort((a, b) => b.count - a.count);
  const cpcClassAData = data[0];

  if (!cpcClassAData) {
    return "No data available for CPC.";
  }

  // Find the total number of patents for the last decade
  const totalPatentsLastDecade = data
    // .filter(item => item.decade === new Date().getFullYear() - 10)
    .reduce((acc, curr) => acc + curr.count, 0);

  // Calculate the percentage increase in patents for CPC Classification A over the last decade
  const increasePercentage = (cpcClassAData.count / totalPatentsLastDecade - 1) * 100;

  // Construct the sentence
  const sentence = `Over the last decade, patents in CPC Classification ${
    cpcClassAData.cpc_class
  } have increased by ${increasePercentage.toFixed(2)}%, showcasing evolving technological trends.`;

  return sentence;
}
