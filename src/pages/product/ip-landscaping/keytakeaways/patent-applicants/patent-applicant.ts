interface IPatentApplicant {
  applicant_type: string;
  count: number;
}

export function marketShareOfApplicationsByApplicantType(data: IPatentApplicant[]) {
  if (data.length === 0) {
    return "No patent data available.";
  }

  // Calculate the total number of patents
  const total = data.reduce((sum, current) => sum + current.count, 0);

  // Find the count for each applicant type
  const applicantData = data.find((d) => d.applicant_type === "applicant");
  const inventorData = data.find((d) => d.applicant_type === "applicant-inventor");

  // Calculate percentages of the total
  const applicantPercentage = applicantData ? (applicantData.count / total) * 100 : 0;
  const inventorPercentage = inventorData ? (inventorData.count / total) * 100 : 0;

  // Construct the message highlighting the contribution of each group
  return `Corporations filed for ${applicantPercentage.toFixed(
    2,
  )}% of all patents, highlighting the commercial drive behind innovation, whereas individual inventors accounted for ${inventorPercentage.toFixed(
    2,
  )}%, reflecting the substantial contribution of independent inventors to technological advancement.`;
}

// export function trendInApplicantTypeOverTime(data: IPatentApplicant[], yearsAgo: number): string {
//   if (data.length < 2) {
//     return "Insufficient data to calculate growth.";
//   }

//   // Sort the data by year to ensure correct calculations
//   data.sort((a, b) => a.year - b.year);

//   // Determine the range of years
//   const currentYear = new Date().getFullYear();
//   const startYear = currentYear - yearsAgo;

//   // Filter the entries from the start year and the last year in the dataset
//   const filteredData = data.filter(d => d.year === startYear || d.year === currentYear);

//   if (filteredData.length < 2) {
//     return "Not enough data points from the specified years to calculate growth.";
//   }

//   // Ensure we have both start and end points
//   const startData = filteredData.find(d => d.year === startYear);
//   const endData = filteredData.find(d => d.year === currentYear);

//   if (!startData || !endData) {
//     return `Data not available for the full range from ${startYear} to ${currentYear}.`;
//   }

//   // Calculate the percentage increase
//   const growth = ((endData.count - startData.count) / startData.count) * 100;

//   // Format the message
//   return `Over the last ${yearsAgo} years, applications by corporations have increased by ${growth.toFixed(2)}%, indicating a growing dominance of corporate-driven innovations in the patent landscape.`;
// }
