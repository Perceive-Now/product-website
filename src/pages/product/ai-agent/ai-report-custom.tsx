import React, { useState } from "react";

import { Link } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";

const AIReportCustomization = () => {
  const [format, setFormat] = useState("PDF Report");
  const [tone, setTone] = useState("Analytical");
  const [visualStyle, setVisualStyle] = useState("Simple");
  const [charts, setCharts] = useState("Minimal");
  const [citations, setCitations] = useState("Inline Links");
  const [audienceFocusOne, setAudienceFocusOne] = useState("C-Suite Executives");
  const [audienceFocusTwo, setAudienceFocusTwo] = useState("General Partners (GPs)");

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
              <div className="bg-[#FFB531] rounded-t-lg text-center">Report Tone</div>
              <div className="bg-[#F5F7FF] flex gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-full max-w-[114px]">
                  {["Analytical", "Actionable", "Narrative", "Balanced"].map((item) => (
                    <label key={item} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="tone"
                        value={item}
                        checked={tone === item}
                        onChange={() => setTone(item)}
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
              </div>
            </div>

            <div className="flex flex-col w-full max-w-[328px]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Report Format</div>
              <div className="bg-[#F5F7FF] flex gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-full max-w-[114px]">
                  {[
                    "PDF Report",
                    "Presentation Deck",
                    "Word Document",
                    "Spreadsheet Summary",
                    "Other",
                  ].map((item) => (
                    <label key={item} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="format"
                        value={item}
                        checked={format === item}
                        onChange={() => setFormat(item)}
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
              </div>
            </div>

            <div className="flex flex-col w-full max-w-[306px]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Visual Style</div>
              <div className="bg-[#F5F7FF] flex gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-full max-w-[114px]">
                  {["Simple", "Annotated", "Extensive", "Other"].map((item) => (
                    <label key={item} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="visualStyle"
                        value={item}
                        checked={visualStyle === item}
                        onChange={() => setVisualStyle(item)}
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
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-3 gap-y-4 mt-2">
            <div className="flex flex-col w-full max-w-[306px]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Number of Charts/Tables</div>
              <div className="bg-[#F5F7FF] flex gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-full max-w-[114px]">
                  {["Minimal", "Moderate", "Extensive", "Other"].map((item) => (
                    <label key={item} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="charts"
                        value={item}
                        checked={charts === item}
                        onChange={() => setCharts(item)}
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
              </div>
            </div>

            <div className="flex flex-col w-full max-w-[306px]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Citations</div>
              <div className="bg-[#F5F7FF] flex gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-full max-w-[114px]">
                  {["Inline Links", "Endnotes", "No Citations", "Other"].map((item) => (
                    <label key={item} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="citations"
                        value={item}
                        checked={citations === item}
                        onChange={() => setCitations(item)}
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
              </div>
            </div>
          </div>
          <div className="flex w-full gap-x-3 gap-y-4 mt-2">
            <div className="flex flex-col w-[50%] max-w-[50%]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Audience Focus</div>
              <p className="bg-[#F5F7FF] pt-1 pl-2 text-start text-base">For Enterprises</p>
              <div className="bg-[#F5F7FF] flex w-full gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-[50%]">
                  {[
                    "C-Suite Executives",
                    "Business Development Teams",
                    "R&D Teams",
                    "Operations Teams",
                    "Finance Teams",
                    "Regulatory & Compliance Teams",
                    "Sales & Marketing Teams",
                    "Product Management Teams",
                    "Other ",
                  ].map((item) => (
                    <label key={item} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        name="audienceFocusOne"
                        value={item}
                        checked={audienceFocusOne === item}
                        onChange={() => setAudienceFocusOne(item)}
                        className="form-radio text-base font-normal"
                      />
                      <span>{item}</span>
                    </label>
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
