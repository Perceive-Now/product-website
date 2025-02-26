import React, { useState } from "react";

import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
import RightArrow from "src/components/icons/common/right-arrow";
import { useAppDispatch } from "src/hooks/redux";
import { submitCustomizeReport } from "./action";
import { LoadingIcon } from "src/components/icons";

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const [format, setFormat] = useState("PDF Report");
  const [tone, setTone] = useState("In-Depth Report");
  const [visualStyle, setVisualStyle] = useState("Simple");
  const [charts, setCharts] = useState("Minimal");
  const [citations, setCitations] = useState("Inline Links");
  const [audienceFocusOne, setAudienceFocusOne] = useState("C-Suite Executives");
  const [audienceFocusTwo, setAudienceFocusTwo] = useState("General Partners (GPs)");

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({
    reportToneOptions: [],
    reportFormatOptions: [],
    visualStyleOptions: [],
    chartsOptions: [],
    citationsOptions: [],
    audienceFocusOneOptions: [],
    audienceFocusTwoOptions: [],
  });

  const [customInput, setCustomInput] = useState<Record<string, Record<string, string>>>({});

  const handleCheckboxChange = (category: string, value: string) => {
    setSelectedOptions((prev) => {
      const currentSelections = prev[category] || [];
      const isSelected = currentSelections.includes(value);

      return {
        ...prev,
        [category]: isSelected
          ? currentSelections.filter((item) => item !== value) // Remove if already selected
          : [...currentSelections, value], // Add if not selected
      };
    });
  };

  const handleInputChange = (e: any, key: string, field: string) => {
    console.log("customInput.key", customInput[key]);
    setCustomInput({
      ...customInput,
      [key]: {
        ...(customInput[key] || {}),
        [field]: e.target.value,
      },
    });
  };

  const [submitting, setSubmitting] = useState(false);

  const submitFinalReport = async () => {
    if (submitting) {
      return;
    }
    setSubmitting(true);
    const dataToSend = {
      user_id: searchParams.get("user_id"),
      thread_id: searchParams.get("thread_id"),
      config: {
        report_depth: {
          selected: selectedOptions.reportToneOptions,
          other: customInput["tone"]?.["Other"],
        },
        report_format: {
          selected: selectedOptions.reportFormatOptions,
          other: customInput["reportFormat"]?.["Other"],
        },
        visual_style: {
          selected: selectedOptions.visualStyleOptions,
          other: customInput["visualStyle"]?.["Other"],
        },
        number_of_charts: {
          selected: selectedOptions.chartsOptions,
          other: customInput["charts"]?.["Other"],
        },
        citations: {
          selected: selectedOptions.citationsOptions,
          other: customInput["citations"]?.["Other"],
        },
        audience_focus: {
          enterprise: {
            selected: selectedOptions.audienceFocusOneOptions,
            other: customInput["audienceFocusOne"]?.["Other"],
          },
          investors: {
            selected: selectedOptions.audienceFocusTwoOptions,
            other: customInput["audienceFocusTwo"]?.["Other"],
          },
        },
      },
    };
    try {
      const resp = await dispatch(submitCustomizeReport(dataToSend)).unwrap();
      if (resp) {
        navigate("/");
      }
    } catch (error) {
      console.log("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-[20px] w-full max-w-[998px] z-10 pb-[7%]">
      <div className="p-1 pl-0">
        {/* <h6 className="text-lg font-semibold ml-0">Report Customization</h6> */}
        <div className="text-start text-black mt-2 text-[16px] leading-[19.2px] font-normal">
          <p>Customize your report to match your needs.</p>
          <p>
            <span className="text-[#FFA300] font-medium">Choose</span> the format, level of detail,
            and key insights to get the most relevant results!
          </p>
        </div>
        {/* <div className="flex justify-start items-center pt-3 pl-1">
          <Link to="/">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" /> Back
            </p>
          </Link>
        </div> */}
        <div className="border border-[#757575CC] border-solid p-2 mt-4 rounded-lg">
          <p>Report Customization</p>
          <div className="grid grid-cols-3 gap-x-3 gap-y-4 mt-2">
            <div className="flex flex-col w-full max-w-[306px]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Report Depth</div>
              <div className="bg-[#E8EAF2] w-full text-start rounded-[4px] pl-1">
                <p className="text-[15px] py-1 font-normal color-[#373D3F]">
                  Data-focused, emphasizing metrics and insights
                </p>
              </div>
              <div className="bg-[#F5F7FF] flex gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-full">
                  {reportToneOptions.map((item) => (
                    <>
                      <label key={item.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="tone"
                          value={item.value}
                          checked={selectedOptions["reportToneOptions"]?.includes(item.value)}
                          onChange={() => handleCheckboxChange("reportToneOptions", item.value)}
                          className="form-radio text-base font-normal"
                        />
                        <span>{item.label}</span>
                      </label>
                      {selectedOptions["reportToneOptions"].includes(item.value) &&
                      item.showTextBox ? (
                        <input
                          type="text"
                          placeholder={`Enter custom text for ${item.label}`}
                          value={customInput["tone"]?.[item.value] || ""}
                          onChange={(e) => handleInputChange(e, "tone", item.value)}
                          className="border border-neutral-500 rounded px-1 py-0.5 bg-transparent my-1 w-full text-sm"
                        />
                      ) : null}
                    </>
                  ))}
                </div>
                {/* <div className="bg-[#E8EAF2] w-full max-w-[140px] rounded-[4px] pl-1">
                  <p className="text-[15px] font-normal color-[#373D3F]">
                    Data-focused, emphasizing metrics and insights
                  </p>
                </div> */}
              </div>
            </div>

            <div className="flex flex-col w-full max-w-[328px]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Report Format</div>
              <div className="bg-[#E8EAF2] w-full text-start rounded-[4px] pl-1">
                <p className="text-[15px] py-1 font-normal color-[#373D3F]">
                  Data-focused, emphasizing metrics and insights
                </p>
              </div>
              <div className="bg-[#F5F7FF] flex gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-full">
                  {reportFormatOptions.map((reportFormat) => (
                    <>
                      <label key={reportFormat.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="format"
                          value={reportFormat.value}
                          checked={selectedOptions["reportFormatOptions"]?.includes(
                            reportFormat.value,
                          )}
                          onChange={() =>
                            handleCheckboxChange("reportFormatOptions", reportFormat.value)
                          }
                          className="form-radio text-base font-normal"
                        />
                        <span>{reportFormat.label}</span>
                      </label>
                      {selectedOptions["reportFormatOptions"].includes(reportFormat.value) &&
                      reportFormat.showTextBox ? (
                        <input
                          type="text"
                          placeholder={`Enter custom text for ${reportFormat.label}`}
                          value={customInput["reportFormat"]?.[reportFormat.value] || ""}
                          onChange={(e) => handleInputChange(e, "reportFormat", reportFormat.value)}
                          className="border border-neutral-500 rounded px-1 py-0.5 my-1 bg-transparent w-full text-sm"
                        />
                      ) : null}
                    </>
                  ))}
                </div>
                {/* <div className="bg-[#E8EAF2] w-full max-w-[140px] rounded-[4px] pl-1">
                  <p className="text-[15px] font-normal color-[#373D3F]">
                    Data-focused, emphasizing metrics and insights
                  </p>
                </div> */}
              </div>
            </div>

            <div className="flex flex-col w-full max-w-[306px]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Visual Style</div>
              <div className="bg-[#E8EAF2] w-full text-start rounded-[4px] pl-1">
                <p className="text-[15px] py-1 font-normal color-[#373D3F]">
                  Data-focused, emphasizing metrics and insights
                </p>
              </div>
              <div className="bg-[#F5F7FF] flex gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-full">
                  {visualStyleOptions.map((item) => (
                    <>
                      <label key={item.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="visualStyle"
                          value={item.value}
                          checked={selectedOptions["visualStyleOptions"]?.includes(item.value)}
                          onChange={() => handleCheckboxChange("visualStyleOptions", item.value)}
                          className="form-radio text-base font-normal"
                        />
                        <span>{item.label}</span>
                      </label>
                      {selectedOptions["visualStyleOptions"].includes(item.value) &&
                      item.showTextBox ? (
                        <input
                          type="text"
                          placeholder={`Enter custom text for ${item.label}`}
                          value={customInput["visualStyle"]?.[item.value] || ""}
                          onChange={(e) => handleInputChange(e, "visualStyle", item.value)}
                          className="border border-neutral-500 rounded px-1 py-0.5 my-1 bg-transparent w-full text-sm"
                        />
                      ) : null}
                    </>
                  ))}
                </div>
                {/* <div className="bg-[#E8EAF2] w-full max-w-[140px] rounded-[4px] pl-1">
                  <p className="text-[15px] font-normal color-[#373D3F]">
                    Data-focused, emphasizing metrics and insights
                  </p>
                </div> */}
              </div>
            </div>
          </div>
          <div className="flex w-full gap-x-3 gap-y-4 mt-2">
            <div className="flex flex-col w-[50%] max-w-[50%]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Number of Charts/Tables</div>
              <div className="bg-[#E8EAF2] w-full text-start rounded-[4px] pl-1">
                <p className="text-[15px] py-1 font-normal color-[#373D3F]">
                  Data-focused, emphasizing metrics and insights
                </p>
              </div>
              <div className="bg-[#F5F7FF] flex gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-full">
                  {chartsOptions.map((item) => (
                    <>
                      <label key={item.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="charts"
                          value={item.value}
                          checked={selectedOptions["chartsOptions"]?.includes(item.value)}
                          onChange={() => handleCheckboxChange("chartsOptions", item.value)}
                          className="form-radio text-base font-normal"
                        />
                        <span>{item.label}</span>
                      </label>
                      {selectedOptions["chartsOptions"].includes(item.value) && item.showTextBox ? (
                        <input
                          type="text"
                          placeholder={`Enter custom text for ${item.label}`}
                          value={customInput["charts"]?.[item.value] || ""}
                          onChange={(e) => handleInputChange(e, "charts", item.value)}
                          className="border border-neutral-500 rounded px-1 py-0.5 my-1 bg-transparent w-full text-sm"
                        />
                      ) : null}
                    </>
                  ))}
                </div>
                {/* <div className="bg-[#E8EAF2] w-full max-w-[140px] rounded-[4px] pl-1">
                  <p className="text-[15px] font-normal color-[#373D3F]">
                    Data-focused, emphasizing metrics and insights
                  </p>
                </div> */}
              </div>
            </div>

            <div className="flex flex-col w-[50%] max-w-[50%]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Citations</div>
              <div className="bg-[#E8EAF2] w-full text-start rounded-[4px] pl-1">
                <p className="text-[15px] py-1 font-normal color-[#373D3F]">
                  Data-focused, emphasizing metrics and insights
                </p>
              </div>
              <div className="bg-[#F5F7FF] flex gap-x-4 p-2 rounded-b-lg">
                <div className="flex flex-col w-full">
                  {citationsOptions.map((item) => (
                    <>
                      <label key={item.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          name="citations"
                          value={item.value}
                          checked={selectedOptions["citationsOptions"]?.includes(item.value)}
                          onChange={() => handleCheckboxChange("citationsOptions", item.value)}
                          className="form-radio text-base font-normal"
                        />
                        <span>{item.label}</span>
                      </label>
                      {selectedOptions["citationsOptions"].includes(item.value) &&
                      item.showTextBox ? (
                        <input
                          type="text"
                          placeholder={`Enter custom text for ${item.label}`}
                          value={customInput["citations"]?.[item.value] || ""}
                          onChange={(e) => handleInputChange(e, "citations", item.value)}
                          className="border border-neutral-500 rounded px-1 py-0.5 my-1 bg-transparent w-full text-sm"
                        />
                      ) : null}
                    </>
                  ))}
                </div>
                {/* <div className="bg-[#E8EAF2] w-full max-w-[140px] rounded-[4px] pl-1">
                  <p className="text-[15px] font-normal color-[#373D3F]">
                    Data-focused, emphasizing metrics and insights
                  </p>
                </div> */}
              </div>
            </div>
          </div>
          <div className="flex w-full gap-x-3 gap-y-4 mt-2">
            <div className="flex flex-col w-[50%] max-w-[50%]">
              <div className="bg-[#FFB531] rounded-t-lg text-center">Audience Focus</div>
              <div className="bg-[#E8EAF2] w-full text-start rounded-[4px] pl-1">
                <p className="text-[15px] py-1 font-normal color-[#373D3F]">
                  Data-focused, emphasizing metrics and insights
                </p>
              </div>
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
                          checked={selectedOptions["audienceFocusOneOptions"]?.includes(item.value)}
                          onChange={() =>
                            handleCheckboxChange("audienceFocusOneOptions", item.value)
                          }
                          className="form-radio text-base font-normal"
                        />
                        <span>{item.label}</span>
                      </label>
                      {selectedOptions["audienceFocusOneOptions"].includes(item.value) &&
                      item.showTextBox ? (
                        <input
                          type="text"
                          placeholder={`Enter custom text for ${item.label}`}
                          value={customInput["audienceFocusOne"]?.[item.value] || ""}
                          onChange={(e) => handleInputChange(e, "audienceFocusOne", item.value)}
                          className="border border-neutral-500 rounded px-1 py-0.5 my-1 bg-transparent w-full text-sm"
                        />
                      ) : null}
                    </>
                  ))}
                </div>
                {/* <div className="bg-[#E8EAF2] w-[50%] rounded-[4px] pl-1">
                  <p className="text-[15px] font-normal color-[#373D3F]">
                    Data-focused, emphasizing metrics and insights
                  </p>
                </div> */}
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
              <div className="bg-[#E8EAF2] w-full text-start rounded-[4px] pl-1">
                <p className="text-[15px] py-1 font-normal color-[#373D3F]">
                  Data-focused, emphasizing metrics and insights
                </p>
              </div>
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
                          checked={selectedOptions["audienceFocusTwoOptions"]?.includes(item.value)}
                          onChange={() =>
                            handleCheckboxChange("audienceFocusTwoOptions", item.value)
                          }
                          className="form-radio text-base font-normal"
                        />
                        <span>{item.label}</span>
                      </label>
                      {selectedOptions["audienceFocusTwoOptions"].includes(item.value) &&
                      item.showTextBox ? (
                        <input
                          type="text"
                          placeholder={`Enter custom text for ${item.label}`}
                          value={customInput["audienceFocusTwo"]?.[item.value] || ""}
                          onChange={(e) => handleInputChange(e, "audienceFocusTwo", item.value)}
                          className="border border-neutral-500 rounded px-1 py-0.5 my-1 bg-transparent w-full text-sm"
                        />
                      ) : null}
                    </>
                  ))}
                </div>
                {/* <div className="bg-[#E8EAF2] w-[50%] rounded-[4px] pl-1">
                  <p className="text-[15px] font-normal color-[#373D3F]">
                    Data-focused, emphasizing metrics and insights
                  </p>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        {/* <Link to="/"> */}
        <div
          className="flex items-center justify-center gap-x-2 border-4 bg-secondary-500  border-[#442873] rounded-[32px] py-1 px-2 text-lg text-white font-bold"
          onClick={submitFinalReport}
        >
          {!submitting ? "Submit" : <LoadingIcon className="animate-spin text-black" />}

          <RightArrow className="ml-1" />
        </div>
        {/* </Link> */}
        {/* <Link to="/vc-product">
                        <div className="flex items-center justify-center border-4 bg-secondary-500 border-[#442873]  rounded-[32px] py-1 px-2 text-lg font-nunito text-white font-bold">
                          Explore Agents
                          <RightArrow className="ml-1"/>
                        </div>
                      </Link> */}
        {/* <Link to="/start-conversation">
                        <div className="flex items-center justify-center border-4 bg-secondary-500 border-[#442873]   rounded-[32px] py-1 px-2  text-lg font-nunito text-white font-bold">
                          KnowNow Chat
                          <RightArrow className="ml-1"/>
                        </div>
                      </Link> */}
      </div>
    </div>
  );
};

export default AIReportCustomization;
