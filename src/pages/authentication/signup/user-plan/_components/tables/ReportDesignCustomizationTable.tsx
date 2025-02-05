const ReportCustomizationTable = () => {
  const customizations = [
    {
      name: "Font & Color Customization",
      description: "Standard and expanded font selections; Preset and customizable color schemes.",
      plans: [true, true, true],
    },
    {
      name: "Logo & Branding Integration",
      description: "Single and multiple logo placements; Integration of various brand assets.",
      plans: [false, true, true],
    },
    {
      name: "Layout & Design Flexibility",
      description: "Layout adjustments; Complete template restructuring; Advanced design elements.",
      plans: [false, false, true],
    },
  ];

  return (
    <div className="overflow-x-auto mt-8 border">
      <div className="p-2">
        <h2 className="text-3xl font-semibold my-2">Report Design Customization</h2>
        <p className="text-base text-gray-800 mb-1">
          Personalize your reports with flexible design options
        </p>
      </div>
      <table className="min-w-full border-collapse border border-gray-200">
        <tbody>
          {customizations.map((customization, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-[#F5F7FF]" : "bg-white"}>
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

export default ReportCustomizationTable;
