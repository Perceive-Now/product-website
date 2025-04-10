import { ExplainableIcon } from "../../_assets/table-icons";

import checkIconSvg from "../../_assets/check-icon.svg";

const ExplainableAI = () => {
  const customizations = [
    {
      name: "Basic Stat Explanations",
      description: "Simplified descriptions of key statistics, making data accessible to everyone.",
      plans: [true, true, true],
    },
    {
      name: "Source Citations",
      description: "Transparent linking to data origins for credibility and accountability.",
      plans: [true, true, true],
    },
    {
      name: "Logical Breakdown Layers",
      description: "Multi-step insights that describe the reasoning behind conclusions.",
      plans: [false, true, true],
    },
    {
      name: "Editable Data & Metrics",
      description:
        "Flexibility to add, modify, or adjust data points and metrics to align with specific needs.",
      plans: [false, true, true],
    },
    {
      name: "Advanced Multi-Layered Insights",
      description:
        "Comprehensive explanations that provide depth and context for complex data interactions.",
      plans: [false, false, true],
    },
    {
      name: "Forecasting Transparency",
      description:
        "Clear methodologies behind predictions, ensuring reliability in forward-looking analytics.",
      plans: [false, false, true],
    },
  ];

  return (
    <div className="overflow-x-auto mt-8 border">
      <div className="p-2">
        <div className="flex gap-1 mb-1">
          <h2 className="text-3xl font-semibold my-2">Explainable AI</h2>
          <ExplainableIcon />
        </div>
        <p className="text-base text-gray-800 mb-1">
          Understandable explanations of AI-driven outcomes, for transparency and trust.
        </p>
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

export default ExplainableAI;
