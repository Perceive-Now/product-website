import React, { useState } from "react";

const ReportCustomization = () => {
  const [open, setOpen] = useState(true);
  const [tone, setTone] = useState("Balanced");
  const [charts, setCharts] = useState("Minimal");
  const [visual, setVisual] = useState("Simple");
  const [citations, setCitations] = useState("Inline Links");
  const [format, setFormat] = useState("PDF Report");

  const tones = [
    { label: "Analytical", description: "Data-focused, emphasizing metrics and insights." },
    { label: "Actionable", description: "Focused on recommended next steps." },
    { label: "Narrative", description: "Storytelling that highlights trends and key takeaways." },
    { label: "Balanced", description: "Mix of data, narrative, and recommendations." },
  ];

  const chartsOptions = [
    { label: "Minimal", description: "1-2 per section." },
    { label: "Moderate", description: "3-4 per section." },
    { label: "Extensive", description: "5+ per section." },
  ];

  const visuals = [
    { label: "Simple", description: "Clean and easy to understand." },
    { label: "Annotated", description: "Annotated visuals with supporting details." },
    { label: "Extensive", description: "5+ per section." },
  ];

  const citationsOptions = [
    { label: "Inline Links", description: "References listed as web URLs in the text." },
    { label: "Endnotes", description: "References listed at the end." },
    { label: "No Citations", description: "No citations included." },
  ];

  const formatOptions = [
    { label: "PDF Report", description: "Downloadable PDF report." },
    { label: "Presentation Deck", description: "PowerPoint or Google Slides presentation." },
    { label: "Word Document", description: "Editable Word document." },
    { label: "Spreadsheet", description: "Excel or Google Sheets document." },
  ];

  return (
    <div
      className={`border border-gray-300 rounded-lg w-full mb-[70px] scale-[90%] h-[90vh] overflow-y-scroll p-2 ${
        open ? "w-full xl:w-[600px]" : "max-w-full sm:max-w-[300px] h-fit"
      }`}
    >
      <div className="w-full">
        <h2 className="text-xl font-semibold mb-4">Report Customization</h2>

        {/* Report Tone Section */}
        <div className="mb-2">
          <h3 className="text-lg font-medium">Report Tone</h3>
          <div className="grid grid-cols-4 mt-2 bg-gray-50">
            {tones.map(({ label, description }, index) => (
              <div
                key={label}
                className={`flex flex-col items-center cursor-pointer p-2 border-[#87888C] ${
                  index === 0 || index === tones.length - 1
                    ? index === 0
                      ? "border-[0.8px] rounded-tl-lg rounded-bl-lg"
                      : "border-[0.8px] rounded-tr-lg rounded-br-lg"
                    : "border-l-[0.8px] border-t-[0.8px] border-b-[0.8px]"
                } transition ${
                  tone === label
                    ? "bg-[#442873] text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => setTone(label)}
              >
                <div>{label}</div>
                <div className="text-sm text-center">({description})</div>
              </div>
            ))}
          </div>
        </div>

        {/* Number of Charts/Tables Section */}
        <div className="mb-2">
          <h3 className="text-lg font-medium">Number of Charts/Tables</h3>
          <div className="grid grid-cols-3 mt-2">
            {chartsOptions.map(({ label, description }, index) => (
              <div
                key={label}
                className={`flex flex-col items-center cursor-pointer p-2 border-[#87888C] ${
                  index === 0 || index === chartsOptions.length - 1
                    ? index === 0
                      ? "border-[0.8px] rounded-tl-lg rounded-bl-lg"
                      : "border-[0.8px] rounded-tr-lg rounded-br-lg"
                    : "border-l-[0.8px] border-t-[0.8px] border-b-[0.8px]"
                } transition ${
                  charts === label
                    ? "bg-[#442873] text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => setCharts(label)}
              >
                <div>{label}</div>
                <div className="text-sm text-center">({description})</div>
              </div>
            ))}
          </div>
        </div>

        {/* Visual Style Section */}
        <div className="mb-2">
          <h3 className="text-lg font-medium">Visual Style</h3>
          <div className="grid grid-cols-3 mt-2">
            {visuals.map(({ label, description }, index) => (
              <div
                key={label}
                className={`flex flex-col items-center cursor-pointer p-2 border-[#87888C] ${
                  index === 0 || index === visuals.length - 1
                    ? index === 0
                      ? "border-[0.8px] rounded-tl-lg rounded-bl-lg"
                      : "border-[0.8px] rounded-tr-lg rounded-br-lg"
                    : "border-l-[0.8px] border-t-[0.8px] border-b-[0.8px]"
                } transition ${
                  visual === label
                    ? "bg-[#442873] text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => setVisual(label)}
              >
                <div>{label}</div>
                <div className="text-sm text-center">({description})</div>
              </div>
            ))}
          </div>
        </div>

        {/* Citations Section */}
        <div>
          <h3 className="text-lg font-medium">Citations</h3>
          <div className="grid grid-cols-3 mt-2">
            {citationsOptions.map(({ label, description }, index) => (
              <div
                key={label}
                className={`flex flex-col items-center cursor-pointer p-2 border-[#87888C] ${
                  index === 0 || index === citationsOptions.length - 1
                    ? index === 0
                      ? "border-[0.8px] rounded-tl-lg rounded-bl-lg"
                      : "border-[0.8px] rounded-tr-lg rounded-br-lg"
                    : "border-l-[0.8px] border-t-[0.8px] border-b-[0.8px]"
                } transition ${
                  citations === label
                    ? "bg-[#442873] text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => setCitations(label)}
              >
                <div>{label}</div>
                <div className="text-sm text-center">({description})</div>
              </div>
            ))}
          </div>
        </div>

        {/* Format Section */}
        <div className="mt-6">
          <h3 className="text-lg font-medium">Format</h3>
          <div className="grid grid-cols-4 mt-2">
            {formatOptions.map(({ label, description }, index) => (
              <div
                key={label}
                className={`flex flex-col items-center cursor-pointer p-2 border-[#87888C] ${
                  index === 0 || index === formatOptions.length - 1
                    ? index === 0
                      ? "border-[0.8px] rounded-tl-lg rounded-bl-lg"
                      : "border-[0.8px] rounded-tr-lg rounded-br-lg"
                    : "border-l-[0.8px] border-t-[0.8px] border-b-[0.8px]"
                } transition ${
                  format === label
                    ? "bg-[#442873] text-white"
                    : "bg-white text-gray-800 hover:bg-gray-100"
                }`}
                onClick={() => setFormat(label)}
              >
                <div>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCustomization;