import { QuickViewIcon } from "../../_assets/table-icons";

import checkIconSvg from "../../_assets/check-icon.svg";

const QuickViewReports = () => {
  const customizations = [
    {
      name: "Single-Page Summaries",
      description: "Concise overviews designed for quick and effective decision-making.",
      plans: [true, true, true],
    },
    {
      name: "Simplified Tone",
      description:
        "Friendly, jargon-free narratives that make complex data accessible to everyone.",
      plans: [true, true, true],
    },
    {
      name: "Investor-Centric Insights",
      description:
        "Tailored content focusing on key metrics, growth areas, and actionable recommendations for investment success.",
      plans: [false, true, true],
    },
    {
      name: "Stakeholder-Specific Reports",
      description:
        "Provide tailored summaries for different stakeholders, ensuring relevance and clarity for diverse audiences.",
      plans: [false, false, true],
    },
  ];

  return (
    <div className="overflow-x-auto mt-8 border">
      <div className="p-2">
        <div className="flex gap-1 mb-1">
          <h2 className="text-3xl font-semibold my-2">Quick-View Reports</h2>
          <QuickViewIcon />
        </div>
        {/* <p className="text-base text-gray-800 mb-1">
          Tailor your reports with customizable tones, visuals, and formats to match your specific
          needs.
        </p> */}
      </div>
      <table className="min-w-full border-collapse border border-gray-200">
        <tbody>
          {customizations.map((customization, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#F5F7FF]"}>
              <td className="border border-gray-200 px-4 py-2 text-left w-[500px]">
                <div className="font-medium text-gray-800">{customization.name}</div>
                <div className="text-sm text-gray-600">{customization.description}</div>
              </td>
              {customization.plans.map((available, planIndex) => (
                <td key={planIndex} className="border border-gray-200 px-4 py-2 text-center">
                  {available ? <img src={checkIconSvg} alt="check" className="mx-auto" /> : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuickViewReports;
