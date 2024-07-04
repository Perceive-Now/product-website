export function mergeArrays(arr1: any, arr2: any) {
  arr1.forEach((item1: { label: any; id: any }) => {
    arr2.forEach((item2: { name: any; id: any }) => {
      if (item1.label === item2.name) {
        item1.id = item2.id;
      }
    });
  });
  return arr1;
}

export const UseCaseOptions = [
  {
    sn: 1,
    id: 11,
    label: "Prior art search",
    value: "prior-art-search",
    desc: "Conduct extensive searches to uncover existing inventions and disclosures that relate to your new innovation. This information is crucial for establishing the novelty of your invention and guiding the drafting of robust patent applications.",
    useCaseId: 1,
    reportType: "ip",
    commonQuestionIds: [1, 2],
    reportPlan: "pro",
  },
  {
    sn: 2,
    id: 12,
    label: "Patent validity/invalidity",
    value: "patent-validity",
    desc: "Assess the enforceability of a patent’s claims against existing prior art, essential for defending against infringement allegations or challenging a competitor’s patent. Critical insights help fortify your legal and competitive position",
    useCaseId: 2,
    reportType: "ip",
    commonQuestionIds: [1, 2],
    reportPlan: "pro",
  },
  {
    sn: 3,
    id: 18,
    label: "Patent valuation",
    value: "ip-valuation",
    desc: "Gain crucial insights into the financial worth of your patents with our Patent Valuation report. It's ideal for use in negotiations, investment evaluations, and portfolio management, ensuring you understand the full monetary potential of your patents.",
    useCaseId: 4,
    reportType: "ip",
    commonQuestionIds: [],
    reportPlan: "pro",
  },
  {
    sn: 4,
    id: 15,
    label: "Patent Licensing targets",
    value: "ip-licensing-opportunity",
    desc: "Maximize your intellectual property revenue with strategic insights into potential licensing opportunities. This report guides you through selecting and targeting the most lucrative IP licensing deals.",
    useCaseId: 3,
    reportType: "ip",
    commonQuestionIds: [],
    reportPlan: "premium",
  },

  //--------------------- Need to add--------------------
  // {
  //   label: "Freedom to Operate",
  //   value: "freedom-to-operate",
  //   desc: "Minimize legal risks associated with intellectual property infringement with our Freedom to Operate report. It’s crucial for businesses seeking to innovate freely without legal encumbrances.",
  // useCaseId: 0,
  // reportType: "ip",
  // commonQuestionIds: [],
  // reportPlan: "premium"

  // },

  // {
  //   label: "Patent infringement",
  //   value: "patent-infringement",
  //   desc: "Proactively manage and respond to potential patent infringements with our detailed analysis. This report helps you identify risks early and strategize effectively to protect your intellectual property.",
  // useCaseId: 0,
  // reportType: "ip",
  // commonQuestionIds: [],
  // reportPlan: "premium"

  // },

  {
    sn: 5,
    id: 7,
    label: "Market Analysis",
    value: "market-analysis",
    desc: "Dive deep into the dynamics of your target market with this report, which covers current trends and projections to help you anticipate future opportunities and challenges. It’s an essential tool for businesses looking to solidify their market understanding and strategic planning.",
    useCaseId: 6,
    reportType: "market-research",
    commonQuestionIds: [1, 2, 3, 4],
    reportPlan: "pro",
  },
  {
    sn: 6,
    id: 8,
    label: "Competitive Landscape",
    value: "competitive-landscape",
    desc: "Gain a competitive edge with detailed analyses of your competitors' strengths, weaknesses, and strategic positioning. This report helps you identify potential opportunities for differentiation and anticipate moves by competitors.",
    useCaseId: 8,
    reportType: "market-research",
    commonQuestionIds: [1, 2, 3, 4],
    reportPlan: "pro",
  },
  {
    sn: 7,
    id: 9,
    label: "Consumer Landscape",
    value: "consumer-landscape",
    desc: "Understand the pulse of your consumer base with insights into behaviors, preferences, and demographics. This report is crucial for tailoring your marketing strategies and product offerings to meet the evolving needs of your customers.",
    useCaseId: 10,
    reportType: "market-research",
    commonQuestionIds: [1, 2, 3, 4],
    reportPlan: "pro",
  },
  {
    sn: 8,
    id: 10,
    label: "Regulatory Pathways",
    value: "regulatory-pathways",
    desc: "Navigate the complexities of industry regulations with our comprehensive guide to compliance. This report is indispensable for ensuring that your business operations and strategies adhere to all relevant legal standards.",
    useCaseId: 9,
    reportType: "market-research",
    commonQuestionIds: [1, 2, 3, 4],
    reportPlan: "pro",
  },
  // -------Premium------
  {
    sn: 9,
    id: 13,
    label: "M&A Trends and Strategy",
    value: "m&a",
    desc: "Stay ahead in the game of mergers and acquisitions with insights into key events, valuation trends, and strategic approaches. This report is designed for businesses looking to expand through acquisitions or improve their competitive positioning through strategic mergers.",
    useCaseId: 7,
    reportType: "market-research",
    commonQuestionIds: [1, 2, 3, 4],
    reportPlan: "premium",
  },
  {
    sn: 10,
    id: 14,
    label: "Commercialization Assessment",
    value: "commercialization-assessment",
    desc: "Ensure your product's market success with our Commercialization Assessment report, which evaluates market readiness and identifies potential launch hurdles. Ideal for businesses aiming to achieve a smooth and successful product launch.",
    useCaseId: 86,
    reportType: "market-research",
    commonQuestionIds: [],
    reportPlan: "premium",
  },
];

//
