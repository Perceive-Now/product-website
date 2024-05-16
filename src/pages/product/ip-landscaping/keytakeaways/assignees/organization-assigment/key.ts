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
    return "No patent data available.";
  }

  // Calculate the total number of assignments
  const totalAssignments = data.reduce((acc, current) => acc + current.count, 0);

  // Sort the data by count in descending order
  const sortedData = data.sort((a, b) => b.count - a.count);

  // Calculate the concentration of the top organization
  const concentrationTopOrg = (sortedData[0].count / totalAssignments) * 100;

  // Construct the sentence
  const sentence = `The concentration of patent assignments among the top organization has increased by ${concentrationTopOrg.toFixed(
    2,
  )}% over the last year, indicating a trend towards more centralized ownership of innovations.`;

  return sentence;
}

export function organizationWithLargestYearIncreaseAssignments(data: PatentInfo[]) {
  const groupedData: { [key: string]: { year: number; count: number }[] } = data.reduce(
    (acc, curr) => {
      if (!acc[curr.org]) {
        acc[curr.org] = [];
      }
      acc[curr.org].push({ year: curr.year, count: curr.count });
      return acc;
    },
    {} as any,
  );

  // Calculate year-on-year growth rates
  const growthRates: { org: string; growthRate: number }[] = [];
  for (const org in groupedData) {
    const orgData = groupedData[org];
    orgData.sort((a, b) => a.year - b.year);
    for (let i = 1; i < orgData.length; i++) {
      const previousCount = orgData[i - 1].count;
      const currentCount = orgData[i].count;
      if (previousCount > 0) {
        const growthRate = ((currentCount - previousCount) / previousCount) * 100;
        growthRates.push({ org, growthRate });
      }
    }
  }

  // Find the organization with the largest growth rate
  const largestGrowth = growthRates.reduce(
    (max, curr) => (curr.growthRate > max.growthRate ? curr : max),
    { org: "", growthRate: -Infinity },
  );

  // Construct the sentence
  if (largestGrowth.org && largestGrowth.growthRate !== -Infinity) {
    return `Organization ${
      largestGrowth.org
    } experienced the largest year-on-year increase in patent assignments, with a growth rate of ${largestGrowth.growthRate.toFixed(
      2,
    )}%, highlighting its rapid expansion in innovation activities.`;
  } else {
    return "No sufficient data to calculate the year-on-year growth rates for organizations.";
  }
}
