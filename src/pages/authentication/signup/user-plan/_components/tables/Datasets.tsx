import { DatasetIcon } from "../../_assets/table-icons";

const DataSetsTable = () => {
  const features = [
    {
      name: "Custom Dataset Integration",
      description: "Allows users to upload and integrate their own datasets for analysis.",
      plans: [false, true, true],
    },
    {
      name: "Real-Time Market Insights",
      description: "Keeps up-to-date trends and real-time industry analytics.",
      plans: [false, true, true],
    },
    {
      name: "Predictive Analytics",
      description: "AI-powered analysis to forecast trends and predict future scenarios.",
      plans: [false, false, true],
    },
    {
      name: "AI-Augmented Cross-Validation",
      description: "Cross-checks data against internal and external sources to ensure accuracy.",
      plans: [false, false, true],
    },
    {
      name: "Historical and Trend Analysis",
      description: "Analyzes historical data to identify patterns and predict future trends.",
      plans: [false, true, true],
    },
    {
      name: "Hybrid Data Layering",
      description: "Combines static, real-time, and diverse datasets for comprehensive insights.",
      plans: [false, false, true],
    },
    {
      name: "Proprietary Knowledge Graphs",
      description:
        "Visual maps connecting data for a broader understanding of market and patterns.",
      plans: [false, false, true],
    },
    {
      name: "Verified Multi-Source Insights",
      description:
        "Integrates insights from multiple trusted sources for enterprise-grade reliability.",
      plans: [false, false, true],
    },
  ];

  return (
    <div className="overflow-x-auto mt-8 border">
      <div className="p-2">
        <div className="flex gap-1 mb-1">
          <h2 className="text-3xl font-semibold my-2">Datasets</h2>
          <DatasetIcon />
        </div>
      </div>
      <table className="min-w-full border-collapse border border-gray-200">
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#F5F7FF]"}>
              <td className="border border-gray-200 px-4 py-2 text-left w-[500px]">
                <div className="font-medium text-gray-800">{feature.name}</div>
                <div className="text-sm text-gray-600">{feature.description}</div>
              </td>
              {feature.plans.map((available, planIndex) => (
                <td key={planIndex} className="border border-gray-200 px-4 py-2 text-center">
                  {available ? "✓" : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataSetsTable;
