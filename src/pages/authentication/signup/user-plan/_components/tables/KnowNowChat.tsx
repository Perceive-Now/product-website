import { KnowNowIcon } from "../../_assets/table-icons";

import checkIconSvg from "../../_assets/check-icon.svg";

const KnowNowChat = () => {
  const customizations = [
    {
      name: "Hyper-specialized for Market and Patent Insights",
      description:
        "AI tool that specializes in delivering insights from market and patent datasets.",
      plans: [true, true, true],
    },
    {
      name: "Delivers Strategic Recommendations",
      description: "Provides actionable suggestions based on in-depth analysis.",
      plans: [true, true, true],
    },
    {
      name: "Interactive Visual-First Insights",
      description:
        "Presents insights through interactive, visual dashboards for easy understanding.",
      plans: [false, true, true],
    },
    {
      name: "Predictive Scenario Modeling",
      description: "Simulates and predicts outcomes based on data analysis.",
      plans: [false, true, true],
    },
    {
      name: "Fine-tuned for Key Industries",
      description: "Optimized insights for industries like healthcare, aerospace, and technology.",
      plans: [false, false, true],
    },
    {
      name: "Streamlined for team collaboration",
      description: "Designed for team-wide use, making collaboration seamless.",
      plans: [false, false, true],
    },
    {
      name: "Context-aware Responses",
      description: "AI adapts its answers to your specific business context and needs.",
      plans: [false, false, true],
    },
    {
      name: "Predictive Modeling",
      description: "Models forecast trends and opportunities with high accuracy.",
      plans: [false, false, true],
    },
  ];

  return (
    <div className="overflow-x-auto mt-8 border">
      <div className="p-2">
        <div className="flex gap-1 mb-1">
          <h2 className="text-3xl font-semibold my-2">KnowNow Chat</h2>
          <KnowNowIcon />
        </div>
        <p className="text-base text-gray-800 mb-1">
          Expert AI chat assistant for IP and market analysis.
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

export default KnowNowChat;
