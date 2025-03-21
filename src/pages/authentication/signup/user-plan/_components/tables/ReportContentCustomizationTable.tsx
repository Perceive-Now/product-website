import { ReportContentIcon } from "../../_assets/table-icons";

const ReportContentCustomizationTable = () => {
  const customizations = [
    {
      name: "Report Tone",
      description: "Analytical",
      plans: ["Analytical", "Analytical + Narrative", "Balanced + Actionable"],
    },
    {
      name: "Visual Style",
      description: "Simple",
      plans: ["Simple", "Annotated", "Detailed"],
    },
    {
      name: "Charts and Visuals",
      description: "1–2 per section",
      plans: ["1-2 per section", "3-4 per section", "5+ per section"],
    },
    {
      name: "Citation Style",
      description: "Inline Links",
      plans: ["Inline links", "Inline + Endnotes", "Inline + Endnotes"],
    },
    {
      name: "Export Formats",
      description: "PDF Only",
      plans: ["PDF Only", "PDF + Word", "PDF, Word, Deck, Spreadsheet"],
    },
  ];

  return (
    <div className="overflow-x-auto mt-8 border">
      <div className="p-2">
        <div className="flex gap-1 mb-1">
          <h2 className="text-3xl font-semibold my-2">Report Content Customization</h2>
          <ReportContentIcon />
        </div>
        <p className="text-base text-gray-800 mb-1">
          Tailor your reports with customizable tones, visuals, and formats to match your specific
          needs.
        </p>
      </div>
      <table className="min-w-full border-collapse border border-gray-200">
        <tbody>
          {customizations.map((customization, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-[#F5F7FF] "}>
              <td className="border border-gray-200 px-4 py-2 text-left w-[500px]">
                <div className="font-medium text-gray-800">{customization.name}</div>
                <div className="text-sm text-gray-600">{customization.description}</div>
              </td>
              {customization.plans.map((available, planIndex) => (
                <td key={planIndex} className="border border-gray-200 px-4 py-2 text-center">
                  {available ? available : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportContentCustomizationTable;
