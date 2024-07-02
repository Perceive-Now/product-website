export interface ICompetitorPortfolio {
  org: string; // The organization's name
  count: number; // The number of patent assignments to this organization
}

interface PatentInfo {
  year: number;
  org: string;
  count: number;
}

export function leadingOrganizationInPatentAssignments(data: ICompetitorPortfolio[]): string {
  if (data.length === 0) {
    return "No patent data available.";
  }

  // Find the organization with the highest count of patent assignments
  const leader = data.reduce(
    (prev, current) => (current.count > prev.count ? current : prev),
    data[0],
  );

  return `${leader.org} leads with ${leader.count} patent assignments, indicating its dominant position in innovation and patent acquisition.`;
}

export function marketShareOfPatentAssignmentsAmongTopOrganizations(
  data: ICompetitorPortfolio[],
): string {
  if (data.length === 0) {
    return "No patent data available.";
  }

  // Calculate total patents
  const total = data.reduce((acc, curr) => acc + curr.count, 0);

  // Sort and take the top 5
  const topFive = data.sort((a, b) => b.count - a.count).slice(0, 5);
  const topFiveTotal = topFive.reduce((acc, curr) => acc + curr.count, 0);
  const marketShare = (topFiveTotal / total) * 100;

  // Names for the message
  const names = topFive.map((org) => org.org);
  const nameString =
    names.length > 1
      ? `${names.slice(0, -1).join(", ")}, and ${names[names.length - 1]}`
      : names[0];

  return `The top 5 organizations, including ${nameString}, hold a combined market share of ${marketShare.toFixed(
    2,
  )}% of all patent assignments, highlighting the concentration of patent ownership in major entities.`;
}

//
export function comparisonOfAssignmentConcentrationAmongOrganizations(data: PatentInfo[]) {
  if (data.length === 0) {
    return "No data available.";
  }

  // Separate data by year
  const dataByYear = data.reduce((acc, curr) => {
    if (!acc[curr.year]) {
      acc[curr.year] = [];
    }
    acc[curr.year].push(curr);
    return acc;
  }, {} as { [year: number]: PatentInfo[] });

  // Get the list of years
  const years = Object.keys(dataByYear)
    .map((year) => parseInt(year))
    .sort((a, b) => a - b);
  const firstYear = years[0];
  const lastYear = years[years.length - 1];

  // Calculate concentration for each year
  const calculateConcentration = (yearData: PatentInfo[]) => {
    const totalAssignments = yearData.reduce((sum, curr) => sum + curr.count, 0);
    return yearData.map((orgData) => ({
      org: orgData.org,
      concentration: (orgData.count / totalAssignments) * 100,
    }));
  };

  const firstYearData = calculateConcentration(dataByYear[firstYear]);
  const lastYearData = calculateConcentration(dataByYear[lastYear]);

  // Calculate total concentration for top organizations for both years
  const getTotalConcentration = (concentrationData: { org: string; concentration: number }[]) => {
    return concentrationData.reduce((sum, curr) => sum + curr.concentration, 0);
  };

  const totalFirstYearConcentration = getTotalConcentration(firstYearData);
  const totalLastYearConcentration = getTotalConcentration(lastYearData);

  // Calculate growth rate
  const growthRate =
    ((totalLastYearConcentration - totalFirstYearConcentration) / totalFirstYearConcentration) *
    100;

  // Construct the sentence
  return `The concentration of patent assignments among the top organizations has increased by ${growthRate.toFixed(
    2,
  )}% over the last ${
    lastYear - firstYear
  } years, indicating a trend towards more centralized ownership of innovations.`;
}
//
export function organizationWithLargestYearIncreaseAssignments(data: PatentInfo[]) {
  if (data.length === 0) {
    return "No data available.";
  }

  // Group data by organization
  const groupedData: { [key: string]: { year: number; count: number }[] } = data.reduce(
    (acc, curr) => {
      if (!acc[curr.org]) {
        acc[curr.org] = [];
      }
      acc[curr.org].push({ year: curr.year, count: curr.count });
      return acc;
    },
    {} as { [key: string]: { year: number; count: number }[] },
  );

  // Calculate year-over-year growth rates
  const growthRates: { org: string; growthRate: number }[] = [];
  for (const org in groupedData) {
    const orgData = groupedData[org];
    orgData.sort((a, b) => a.year - b.year);

    for (let i = 1; i < orgData.length; i++) {
      // const yearA = orgData[i - 1].year;
      // const yearB = orgData[i].year;
      const countA = orgData[i - 1].count;
      const countB = orgData[i].count;

      if (countA === 0) {
        // Avoid division by zero
        continue;
      }

      const growthRate = ((countB - countA) / countA) * 100;
      growthRates.push({ org, growthRate });
    }
  }

  if (growthRates.length === 0) {
    return "No valid growth rate calculations available.";
  }

  // Find the organization with the highest growth rate
  const maxGrowth = growthRates.reduce(
    (max, curr) => (curr.growthRate > max.growthRate ? curr : max),
    growthRates[0],
  );

  // Construct the sentence
  return `Organization ${
    maxGrowth.org
  } experienced the largest year-on-year increase in patent assignments, with a growth rate of ${maxGrowth.growthRate.toFixed(
    2,
  )}%, highlighting its rapid expansion in innovation activities.`;
}
