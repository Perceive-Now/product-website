import React, { useState } from "react";

import { Link } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";

const reportToneOptions = [
  { label: "In-Depth Report", value: "In-Depth Report", showTextBox: false },
  { label: "Quick Overall Summary", value: "Quick Overall Summary", showTextBox: false },
  { label: "Quick Sub-Topic Summaries", value: "Quick Sub-Topic Summaries", showTextBox: true },
  { label: "Other", value: "Other", showTextBox: true },
];

const reportFormatOptions = [
  { label: "PDF Report", value: "PDF Report", showTextBox: false },
  { label: "Presentation Deck", value: "Presentation Deck", showTextBox: false },
  { label: "Word Document", value: "Word Document", showTextBox: false },
  {
    label: "Spreadsheet Summary",
    value: "Spreadsheet Summary",
    showTextBox: false,
  },
  {
    label: "Other",
    value: "Other",
    showTextBox: true,
  },
];

const visualStyleOptions = [
  { label: "Simple", value: "Simple", showTextBox: false },
  { label: "Annotated", value: "Annotated", showTextBox: false },
  { label: "Extensive", value: "Extensive", showTextBox: false },
  { label: "Other", value: "Other", showTextBox: true },
];
const chartsOptions = [
  { label: "Minimal", value: "Minimal", showTextBox: false },
  { label: "Moderate", value: "Moderate", showTextBox: false },
  { label: "Extensive", value: "Extensive", showTextBox: false },
  { label: "Other", value: "Other", showTextBox: true },
];

const citationsOptions = [
  { label: "Inline Links", value: "Inline Links", showTextBox: false },
  { label: "Endnotes", value: "Endnotes", showTextBox: false },
  { label: "No Citations", value: "No Citations", showTextBox: false },
  { label: "Other", value: "Other", showTextBox: true },
];

const audienceFocusOneOptions = [
  { label: "C-Suite Executives", value: "C-Suite Executives", showTextBox: false },
  { label: "Business Development Teams", value: "Business Development Teams", showTextBox: false },
  { label: "R&D Teams", value: "R&D Teams", showTextBox: false },
  { label: "Operations Teams", value: "Operations Teams", showTextBox: false },
  { label: "Finance Teams", value: "Finance Teams", showTextBox: false },
  {
    label: "Regulatory & Compliance Teams",
    value: "Regulatory & Compliance Teams",
    showTextBox: false,
  },
  { label: "Sales & Marketing Teams", value: "Sales & Marketing Teams", showTextBox: false },
  { label: "Product Management Teams", value: "Product Management Teams", showTextBox: false },
  { label: "Other", value: "Other", showTextBox: true },
];

const audienceFocusTwoOptions = [
  { label: "General Partners (GPs)", value: "General Partners (GPs)", showTextBox: false },
  { label: "Investment Analysts", value: "Investment Analysts", showTextBox: false },
  { label: "Portfolio Managers", value: "Portfolio Managers", showTextBox: false },
  { label: "M&A Teams", value: "M&A Teams", showTextBox: false },
  { label: "Risk & Compliance Teams", value: "Risk & Compliance Teams", showTextBox: false },
  { label: "Venture Partners", value: "Venture Partners", showTextBox: false },
  { label: "Managing Directors", value: "Managing Directors", showTextBox: false },
  { label: "Deal Sourcing Teams", value: "Deal Sourcing Teams", showTextBox: false },
  { label: "Fund Managers", value: "Fund Managers", showTextBox: false },
  { label: "Other", value: "Other", showTextBox: true },
];

const AIReportCustomization = () => {
  const [format, setFormat] = useState("PDF Report");
  const [tone, setTone] = useState("In-Depth Report");
  const [visualStyle, setVisualStyle] = useState("Simple");
  const [charts, setCharts] = useState("Minimal");
  const [citations, setCitations] = useState("Inline Links");
  const [audienceFocusOne, setAudienceFocusOne] = useState("C-Suite Executives");
  const [audienceFocusTwo, setAudienceFocusTwo] = useState("General Partners (GPs)");

  const [customInput, setCustomInput] = useState<Record<string, string>>({});

  const handleInputChange = (e: any, key: string) => {
    setCustomInput({
      ...customInput,
      [key]: e.target.value,
    });
  };

  return (
    <div className="space-y-[20px] w-full max-w-[998px] z-10 pb-[7%]">
      <div className="p-1 pl-0">
        <h6 className="text-lg font-semibold ml-0">AI Agent Reports !</h6>
        <div className="flex justify-start items-center pt-3 pl-1">
          <Link to="/">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" /> Back
            </p>
          </Link>
        </div>
        <div className="border border-[#757575CC] border-solid p-2 mt-4 rounded-lg">
          <p>Report Customization</p>
          <div className="grid grid-cols-3 gap-x-3 gap-y-4 mt-2">
            <div className="flex flex-col w-full max-w-[306px]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Report Depth</div>
              <div className="bg-[#F5F7FF] flex gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-full max-w-[114px]">
                  {reportToneOptions.map((item) => (
                    <>
                      <label key={item.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="tone"
                          value={item.value}
                          checked={tone === item.value}
                          onChange={() => setTone(item.value)}
                          className="form-radio text-base font-normal"
                        />
                        <span>{item.label}</span>
                      </label>
                      {tone === item.value && item.showTextBox ? (
                        <input
                          type="text"
                          placeholder={`Enter custom text for ${item.label}`}
                          value={customInput["tone"] || ""}
                          onChange={(e) => handleInputChange(e, "tone")}
                          className="border border-neutral-500 rounded px-1 py-0.5 bg-transparent w-full text-sm"
                        />
                      ) : null}
                    </>
                  ))}
                </div>
                <div className="bg-[#E8EAF2] w-full max-w-[140px] rounded-[4px] pl-1">
                  <p className="text-[15px] font-normal color-[#373D3F]">
                    Data-focused, emphasizing metrics and insights
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full max-w-[328px]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Report Format</div>
              <div className="bg-[#F5F7FF] flex gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-full max-w-[114px]">
                  {reportFormatOptions.map((reportFormat) => (
                    <>
                      <label key={reportFormat.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="format"
                          value={reportFormat.value}
                          checked={format === reportFormat.value}
                          onChange={() => setFormat(reportFormat.value)}
                          className="form-radio text-base font-normal"
                        />
                        <span>{reportFormat.label}</span>
                      </label>
                      {format === reportFormat.value && reportFormat.showTextBox ? (
                        <input
                          type="text"
                          placeholder={`Enter custom text for ${reportFormat.label}`}
                          value={customInput["reportFormat"] || ""}
                          onChange={(e) => handleInputChange(e, "reportFormat")}
                          className="border border-neutral-500 rounded px-1 py-0.5 bg-transparent w-full text-sm"
                        />
                      ) : null}
                    </>
                  ))}
                </div>
                <div className="bg-[#E8EAF2] w-full max-w-[140px] rounded-[4px] pl-1">
                  <p className="text-[15px] font-normal color-[#373D3F]">
                    Data-focused, emphasizing metrics and insights
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full max-w-[306px]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Visual Style</div>
              <div className="bg-[#F5F7FF] flex gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-full max-w-[114px]">
                  {visualStyleOptions.map((item) => (
                    <>
                      <label key={item.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="visualStyle"
                          value={item.value}
                          checked={visualStyle === item.value}
                          onChange={() => setVisualStyle(item.value)}
                          className="form-radio text-base font-normal"
                        />
                        <span>{item.label}</span>
                      </label>
                      {visualStyle === item.value && item.showTextBox ? (
                        <input
                          type="text"
                          placeholder={`Enter custom text for ${item.label}`}
                          value={customInput["visualStyle"] || ""}
                          onChange={(e) => handleInputChange(e, "visualStyle")}
                          className="border border-neutral-500 rounded px-1 py-0.5 bg-transparent w-full text-sm"
                        />
                      ) : null}
                    </>
                  ))}
                </div>
                <div className="bg-[#E8EAF2] w-full max-w-[140px] rounded-[4px] pl-1">
                  <p className="text-[15px] font-normal color-[#373D3F]">
                    Data-focused, emphasizing metrics and insights
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-4 mt-2">
            <div className="flex flex-col w-full max-w-[306px]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Number of Charts/Tables</div>
              <div className="bg-[#F5F7FF] flex gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-full max-w-[114px]">
                  {chartsOptions.map((item) => (
                    <>
                      <label key={item.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="charts"
                          value={item.value}
                          checked={charts === item.value}
                          onChange={() => setCharts(item.value)}
                          className="form-radio text-base font-normal"
                        />
                        <span>{item.label}</span>
                      </label>
                      {charts === item.value && item.showTextBox ? (
                        <input
                          type="text"
                          placeholder={`Enter custom text for ${item.label}`}
                          value={customInput["charts"] || ""}
                          onChange={(e) => handleInputChange(e, "charts")}
                          className="border border-neutral-500 rounded px-1 py-0.5 bg-transparent w-full text-sm"
                        />
                      ) : null}
                    </>
                  ))}
                </div>
                <div className="bg-[#E8EAF2] w-full max-w-[140px] rounded-[4px] pl-1">
                  <p className="text-[15px] font-normal color-[#373D3F]">
                    Data-focused, emphasizing metrics and insights
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full max-w-[306px]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Citations</div>
              <div className="bg-[#F5F7FF] flex gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-full max-w-[114px]">
                  {citationsOptions.map((item) => (
                    <>
                      <label key={item.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="citations"
                          value={item.value}
                          checked={citations === item.value}
                          onChange={() => setCitations(item.value)}
                          className="form-radio text-base font-normal"
                        />
                        <span>{item.label}</span>
                      </label>
                      {citations === item.value && item.showTextBox ? (
                        <input
                          type="text"
                          placeholder={`Enter custom text for ${item.label}`}
                          value={customInput["citations"] || ""}
                          onChange={(e) => handleInputChange(e, "citations")}
                          className="border border-neutral-500 rounded px-1 py-0.5 bg-transparent w-full text-sm"
                        />
                      ) : null}
                    </>
                  ))}
                </div>
                <div className="bg-[#E8EAF2] w-full max-w-[140px] rounded-[4px] pl-1">
                  <p className="text-[15px] font-normal color-[#373D3F]">
                    Data-focused, emphasizing metrics and insights
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full gap-x-3 gap-y-4 mt-2">
            <div className="flex flex-col w-[50%] max-w-[50%]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Audience Focus</div>
              <p className="bg-[#F5F7FF] pt-1 pl-2 text-start text-base">For Enterprises</p>
              <div className="bg-[#F5F7FF] flex w-full gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-[50%]">
                  {audienceFocusOneOptions.map((item) => (
                    <>
                      <label key={item.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="audienceFocusOne"
                          value={item.value}
                          checked={audienceFocusOne === item.value}
                          onChange={() => setAudienceFocusOne(item.value)}
                          className="form-radio text-base font-normal"
                        />
                        <span>{item.label}</span>
                      </label>
                      {audienceFocusOne === item.value && item.showTextBox ? (
                        <input
                          type="text"
                          placeholder={`Enter custom text for ${item.label}`}
                          value={customInput["audienceFocusOne"] || ""}
                          onChange={(e) => handleInputChange(e, "audienceFocusOne")}
                          className="border border-neutral-500 rounded px-1 py-0.5 bg-transparent w-full text-sm"
                        />
                      ) : null}
                    </>
                  ))}
                </div>
                <div className="bg-[#E8EAF2] w-[50%] rounded-[4px] pl-1">
                  <p className="text-[15px] font-normal color-[#373D3F]">
                    Data-focused, emphasizing metrics and insights
                  </p>
                </div>
              </div>
              {/* <p className="bg-[#F5F7FF] pt-1 pl-2 text-start text-base">For Investors & Financial Institutions</p>
              <div className="bg-[#F5F7FF] flex gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-full max-w-[114px]">
                  {[
                    "General Partners (GPs)",
                    "Investment Analysts",
                    "Portfolio Managers",
                    "M&A Teams",
                    "Risk & Compliance Teams",
                    "Venture Partners",
                    "Managing Directors",
                    "Deal Sourcing Teams",
                    "Fund Managers",
                    "Other ",
                  ].map((item) => (
                    <label key={item} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="audienceFocusTwo"
                        value={item}
                        checked={audienceFocusTwo === item}
                        onChange={() => setAudienceFocusTwo(item)}
                        className="form-radio text-base font-normal"
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
                <div className="bg-[#E8EAF2] w-full max-w-[140px] rounded-[4px] pl-1">
                  <p className="text-[15px] font-normal color-[#373D3F]">
                    Data-focused, emphasizing metrics and insights
                  </p>
                </div>
              </div> */}
            </div>

            <div className="flex flex-col w-[50%] max-w-[50%]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Audience Focus</div>
              <p className="bg-[#F5F7FF] pt-1 pl-2 text-start text-base">
                For Investors & Financial Institutions
              </p>
              <div className="bg-[#F5F7FF] flex w-full gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-[50%]">
                  {audienceFocusTwoOptions.map((item) => (
                    <>
                      <label key={item.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="audienceFocusTwo"
                          value={item.value}
                          checked={audienceFocusTwo === item.value}
                          onChange={() => setAudienceFocusTwo(item.value)}
                          className="form-radio text-base font-normal"
                        />
                        <span>{item.label}</span>
                      </label>
                      {audienceFocusTwo === item.value && item.showTextBox ? (
                        <input
                          type="text"
                          placeholder={`Enter custom text for ${item.label}`}
                          value={customInput["audienceFocusTwo"] || ""}
                          onChange={(e) => handleInputChange(e, "audienceFocusTwo")}
                          className="border border-neutral-500 rounded px-1 py-0.5 bg-transparent w-full text-sm"
                        />
                      ) : null}
                    </>
                  ))}
                </div>
                <div className="bg-[#E8EAF2] w-[50%] rounded-[4px] pl-1">
                  <p className="text-[15px] font-normal color-[#373D3F]">
                    Data-focused, emphasizing metrics and insights
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIReportCustomization;
