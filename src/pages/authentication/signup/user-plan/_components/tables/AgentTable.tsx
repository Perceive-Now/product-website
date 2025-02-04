const AgentTable = () => {
  const features = [
    {
      name: "Startup Diligence Agent",
      description:
        "Seamlessly evaluate startups, from uncovering risks to making informed investment choices.",
      plans: [true, true, true],
    },
    {
      name: "Portfolio Support Agent",
      description:
        "Continuously enhance your portfolio by monitoring performance and exploring diversification strategies.",
      plans: [true, true, true],
    },
    {
      name: "Fundraising Strategy Agent",
      description:
        "Strategically navigate fundraising, from identifying investors to securing essential funding.",
      plans: [true, true, true],
    },
    {
      name: "Market Strategy Agent",
      description:
        "Comprehensively develop market approaches, from analyzing trends to maximizing product potential.",
      plans: [true, true, true],
    },
    {
      name: "Technology & R&D Agent",
      description:
        "Proactively stay ahead with insights into emerging technologies and support for innovation initiatives.",
      plans: [true, true, true],
    },
    {
      name: "Product & Engineering Agent",
      description:
        "Efficiently accelerate product development, from optimizing processes to aligning with market demands.",
      plans: [true, true, true],
    },
    {
      name: "Marketing & Sales Agent",
      description:
        "Effectively drive revenue growth, from crafting campaigns to closing deals with precision.",
      plans: [true, true, true],
    },
    {
      name: "Finance & Strategy Agent",
      description:
        "Confidently make financial decisions through detailed analysis and strategic insights.",
      plans: [true, true, true],
    },
    {
      name: "Legal & Compliance Agent",
      description:
        "Easily navigate legal landscapes, from understanding regulations to ensuring compliance.",
      plans: [true, true, true],
    },
    {
      name: "Report on Anything Agent",
      description:
        "Instantly access customized, data-rich reports tailored to your business needs.",
      plans: [true, true, true],
    },
    {
      name: "Corporate Venture Capital Agent",
      description:
        "Strategically invest by identifying promising startups and managing venture capital endeavors.",
      plans: [true, true, true],
    },
  ];

  return (
    <div className="overflow-x-auto mt-8 border">
      <div className="p-2">
        <h2 className="text-3xl font-semibold my-2">Agents</h2>
        <p className="text-base text-gray-800 mb-1">
          Our AI-powered agents act as your team of specialized experts, delivering in-depth
          analysis, personalized strategies, and automated reports. Make informed decisions and
          accelerate your growth.
        </p>
      </div>
      <table className="min-w-full border-collapse border border-gray-200">
        <tbody>
          {features.map((feature, index) => (
            <tr
              key={index}
              className={`${index % 2 === 0 ? "bg-[#F5F7FF]" : "bg-white"}
              
              `}
            >
              <td className="border border-gray-200 px-4 py-2 text-left w-[500px]">
                <div className="font-medium text-gray-800">{feature.name}</div>
                <div className="text-sm text-gray-600">{feature.description}</div>
              </td>
              {feature.plans.map((available, planIndex) => (
                <td key={planIndex} className="border border-gray-200 px-4 py-2 text-center">
                  {available ? "✓" : ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentTable;
