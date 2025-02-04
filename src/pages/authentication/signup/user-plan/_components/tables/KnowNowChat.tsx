const KnowNowChat = () => {
  const customizations = [
    {
      name: "Basic Responses",
      description: "Delivers straightforward answers to direct questions.",
      plans: [true, true, true],
    },
    {
      name: "Analytical Insights",
      description: "Provides core insights through targeted analytics.",
      plans: [true, true, true],
    },
    {
      name: "Visual Data Representation",
      description: "Offers engaging visuals, graphs, trend forecasts, and more.",
      plans: [true, true, true],
    },
    {
      name: "Interactive Analysis",
      description: "Combines advanced visuals with interactive, data-driven insights.",
      plans: [true, true, true],
    },
    {
      name: "Comprehensive Analytics",
      description:
        "Supplies in-depth analysis with interactive tools for strategic decision-making.",
      plans: [true, true, true],
    },
    {
      name: "Real-time Web Search",
      description:
        "Access the latest information online, ensuring your analyses are always current.",
      plans: [true, true, true],
    },
    {
      name: "Predictive Modeling",
      description: "Forecast future market behaviors, aiding in proactive strategy development.",
      plans: [true, true, true],
    },
  ];

  return (
    <div className="overflow-x-auto mt-8 border">
      <div className="p-2">
        <h2 className="text-3xl font-semibold my-2">KnowNow Chat</h2>
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

export default KnowNowChat;
