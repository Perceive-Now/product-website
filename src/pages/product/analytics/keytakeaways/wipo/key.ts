interface IData {
  title: string;
  count: number;
}

export function dominantWIPOSector(data: IData[]) {
  // Assuming data contains the fetched result with sector title and patent count
  data.sort((a, b) => b.count - a.count);

  const sectorTitle = data[0].title;
  const patentCount = data[0].count;

  // Assuming the total number of patents is known or fetched from elsewhere
  const totalPatents = data.reduce((acc, curr) => acc + curr.count, 0); // Example total patents count

  // Calculate the percentage
  const sectorAPercentage = (patentCount / totalPatents) * 100;

  // Construct the sentence
  const sentence = `WIPO Sector ${sectorTitle} accounts for ${sectorAPercentage.toFixed(
    2,
  )}% of all patents, underscoring its importance in global innovation efforts.`;

  return sentence;
}

export function mostRapidlyGrowingWIPOSectore(data: IData[]) {
  // Sort the data based on growth rate in descending order
  data.sort((a, b) => b.count - a.count);

  const mostRapidlyGrowingSector = data[0];
  const sectorTitle = mostRapidlyGrowingSector.title;
  const growthRate = mostRapidlyGrowingSector.count;
  const years = 5; // Example number of years

  // Construct the sentence with placeholders for A, B, and C
  const sentence = `WIPO Sector ${sectorTitle} experienced the most rapid growth, with an increase of ${growthRate} in patent filings over the last ${years} years, marking it as an emerging area of innovation.`;

  return sentence;
}
