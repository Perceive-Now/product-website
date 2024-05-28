interface PatentInfo {
  year: number;
  org: string;
  count: number;
}

// export function comparisonOfAssignmentConcentrationAmongOrganizations(data: PatentInfo[]) {
//   if (data.length === 0) {
//     return "No patent data available.";
//   }

//   // Determine the range of years
//   const years = data.map(item => item.year);
//   const minYear = Math.min(...years);
//   const maxYear = Math.max(...years);

//   // Ensure there's enough history to analyze
//   if (maxYear - minYear < numberOfYears) {
//     return `Not enough data: Data covers less than ${numberOfYears} years.`;
//   }

//   // Filter data for the first and last years in the specified range
//   const startYear = maxYear - numberOfYears;
//   const startYearData = data.filter(item => item.year === startYear);
//   const endYearData = data.filter(item => item.year === maxYear);

//   // Calculate total patents per year to determine market share
//   const totalStartYearPatents = startYearData.reduce((acc, curr) => acc + curr.count, 0);
//   const totalEndYearPatents = endYearData.reduce((acc, curr) => acc + curr.count, 0);

//   // Find the top organizations by patent count in the start and end years
//   const topOrgsStart = startYearData.sort((a, b) => b.count - a.count).slice(0, 5);
//   const topOrgsEnd = endYearData.sort((a, b) => b.count - a.count).slice(0, 5);

//   // Calculate the concentration of patents among the top organizations
//   const topStartYearConcentration = topOrgsStart.reduce((acc, curr) => acc + curr.count, 0) / totalStartYearPatents;
//   const topEndYearConcentration = topOrgsEnd.reduce((acc, curr) => acc + curr.count, 0) / totalEndYearPatents;

//   // Calculate the percentage change in concentration
//   const concentrationChange = ((topEndYearConcentration - topStartYearConcentration) / topStartYearConcentration) * 100;

//   return `The concentration of patent assignments among the top organizations has increased by ${concentrationChange.toFixed(2)}% over the last ${numberOfYears} years, indicating a trend towards more centralized ownership of innovations.`;
// }

interface PatentInfo {
  org: string; // The organization's name
  count: number; // The number of patent assignments to this organization
}

export function leadingOrganizationInPatentAssignments(data: PatentInfo[]): string {
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

export function marketShareOfPatentAssignmentsAmongTopOrganizations(data: PatentInfo[]): string {
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
