const description = {
  launch: [
    "Your essential AI toolkit. Build momentum. You are a founder or an early-stage investor.",
  ],
  accelerate: [
    "Scale efficiently and optimize your strategies for rapid growth. You are a consultant, an SMB, or an agency",
  ],
  ascend: [
    "Drive consistent ROI and achieve ambitious goals. Make high-impact decisions with advanced insights. You are a P&L owner or an enterprise",
  ],
};

const ReportDesignCustomizationModal = () => {
  const features = [
    { name: "Font & Color Customization", launch: true, accelerate: true, ascend: true },
    { name: "Logo & Branding Integration", launch: true, accelerate: true, ascend: false },
    { name: "Layout & Design Flexibility", launch: true, accelerate: false, ascend: false },
  ];

  return (
    <div className="container mx-auto my-6">
      <p className="text-lg font-semibold mb-4">
        Personalize your reports with flexible design options
      </p>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Feature</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Launch</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Accelerate</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Ascend</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border border-gray-300 px-4 py-2">{feature.name}</td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {feature.launch ? "✔" : ""}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {feature.accelerate ? "✔" : ""}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {feature.ascend ? "✔" : ""}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ReportContentCustomizationModal = () => {
  const features = [
    {
      name: "Report Tone",
      launch: "Analytical",
      accelerate: "Analytical + Narrative",
      ascend: "Balanced + Actionable",
    },
    {
      name: "Charts and Visuals",
      launch: "1-2 per section",
      accelerate: "3-4 per section",
      ascend: "5+ per section",
    },
    { name: "Visual Style", launch: "Simple", accelerate: "Annotated", ascend: "Detailed" },
    {
      name: "Citation Style",
      launch: "Inline Links",
      accelerate: "Inline + Endnotes",
      ascend: "Inline + Endnotes",
    },
    {
      name: "Export Formats",
      launch: "PDF Only",
      accelerate: "PDF + Word",
      ascend: "PDF, Word, Deck, Spreadsheet",
    },
  ];

  return (
    <div className="container mx-auto my-6">
      <p className="text-lg font-semibold mb-4">
        Tailor your reports with customizable tones, visuals, and formats to match your specific
        needs.
      </p>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Features</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Launch</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Accelerate</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Ascend</th>
          </tr>
        </thead>
        <tbody>
          {features.map((feature, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
              <td className="border border-gray-300 px-4 py-2">{feature.name}</td>
              <td className="border border-gray-300 px-4 py-2">{feature.launch}</td>
              <td className="border border-gray-300 px-4 py-2">{feature.accelerate}</td>
              <td className="border border-gray-300 px-4 py-2">{feature.ascend}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { ReportDesignCustomizationModal, ReportContentCustomizationModal };

export { description };
