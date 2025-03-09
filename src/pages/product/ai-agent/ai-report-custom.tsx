import React, { useRef, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import RightArrow from "src/components/icons/common/right-arrow";
import { useAppDispatch } from "src/hooks/redux";
import { submitCustomizeReport } from "./action";
import { LoadingIcon } from "src/components/icons";
import jsCookie from "js-cookie";

import customizationIcon from "./_assets/customization-icon.svg";
import PrimaryButton from "src/components/reusable/button/primary-button";
import classNames from "classnames";
import { Texts } from "src/pages/my-account/my-reports/quick-report";

// Define the structure for options
interface Option {
  label: string;
  value: string;
  showTextBox: boolean;
}

// Define options
const options = {
  reportScopeOptions: [
    { label: "Detailed Analysis", value: "Detailed Analysis", showTextBox: false },
    { label: "High-Level Summary", value: "High-Level Summary", showTextBox: false },
    { label: "Custom", value: "Custom", showTextBox: false },
  ],
  reportFormatOptions: [
    { label: "PDF", value: "PDF", showTextBox: false },
    { label: "Word Document", value: "Word Document", showTextBox: false },
    { label: "Presentation Deck (PPTX)", value: "Presentation Deck (PPTX)", showTextBox: false },
    {
      label: "Spreadsheet Summary (CSV/Excel)",
      value: "Spreadsheet Summary (CSV/Excel)",
      showTextBox: false,
    },
    { label: "Interactive Web Report", value: "Interactive Web Report", showTextBox: false },
    { label: "API Export", value: "API Export", showTextBox: false },
  ],
  visualStyleOptions: [
    { label: "Minimal Text, More Data", value: "Minimal Text, More Data", showTextBox: false },
    {
      label: "Balanced Mix of Visuals & Text",
      value: "Balanced Mix of Visuals & Text",
      showTextBox: false,
    },
    {
      label: "Extensive Annotations & Explanations",
      value: "Extensive Annotations & Explanations",
      showTextBox: false,
    },
    { label: "Infographic-Heavy", value: "Infographic-Heavy", showTextBox: false },
  ],
  chartsOptions: [
    {
      label: "Minimal (1-2 charts/tables)",
      value: "Minimal (1-2 charts/tables)",
      showTextBox: false,
    },
    {
      label: "Moderate (4-6 charts/tables)",
      value: "Moderate (4-6 charts/tables)",
      showTextBox: false,
    },
    {
      label: "Extensive (8+ charts/tables)",
      value: "Extensive (8+ charts/tables)",
      showTextBox: false,
    },
    { label: "Dashboard Integration", value: "Dashboard Integration", showTextBox: false },
  ],
  citationsOptions: [
    { label: "Hyperlinked Sources", value: "Hyperlinked Sources", showTextBox: false },
    {
      label: "Endnotes & References Section",
      value: "Endnotes & References Section",
      showTextBox: false,
    },
    { label: "Footnotes on Each Page", value: "Footnotes on Each Page", showTextBox: false },
    { label: "No Citations Needed", value: "No Citations Needed", showTextBox: false },
    {
      label: "Detailed Methodology Section",
      value: "Detailed Methodology Section",
      showTextBox: false,
    },
    { label: "Custom Citation Style", value: "Custom Citation Style", showTextBox: false },
  ],
  audienceFocusOneOptions: [
    { label: "C-Suite Executives", value: "C-Suite Executives", showTextBox: false },
    { label: "R&D Teams", value: "R&D Teams", showTextBox: false },
    { label: "Finance Teams", value: "Finance Teams", showTextBox: false },
    { label: "Sales & Marketing Teams", value: "Sales & Marketing Teams", showTextBox: false },
    {
      label: "Business Development Teams",
      value: "Business Development Teams",
      showTextBox: false,
    },
    { label: "Operations Teams", value: "Operations Teams", showTextBox: false },
    {
      label: "Regulatory & Compliance Teams",
      value: "Regulatory & Compliance Teams",
      showTextBox: false,
    },
    { label: "Product Management Teams", value: "Product Management Teams", showTextBox: false },
    { label: "Other", value: "Other", showTextBox: true },
  ],
  audienceFocusTwoOptions: [
    { label: "General Partners (GPs)", value: "General Partners (GPs)", showTextBox: false },
    { label: "Portfolio Managers", value: "Portfolio Managers", showTextBox: false },
    { label: "Risk & Compliance Teams", value: "Risk & Compliance Teams", showTextBox: false },
    { label: "Managing Directors", value: "Managing Directors", showTextBox: false },
    { label: "Fund Managers", value: "Fund Managers", showTextBox: false },
    { label: "Investment Analysts", value: "Investment Analysts", showTextBox: false },
    { label: "M&A Teams", value: "M&A Teams", showTextBox: false },
    { label: "Venture Partners", value: "Venture Partners", showTextBox: false },
    { label: "Deal Sourcing Teams", value: "Deal Sourcing Teams", showTextBox: false },
    { label: "Other", value: "Other", showTextBox: true },
  ],
  reportToneOptions: [
    { label: "Formal & Professional", value: "Formal & Professional", showTextBox: false },
    { label: "Concise & Executive-Level", value: "Concise & Executive-Level", showTextBox: false },
    { label: "Data-Driven & Analytical", value: "Data-Driven & Analytical", showTextBox: false },
    {
      label: "Persuasive & Investor-Focused",
      value: "Persuasive & Investor-Focused",
      showTextBox: false,
    },
    { label: "Neutral & Objective", value: "Neutral & Objective", showTextBox: false },
    { label: "Custom", value: "Custom", showTextBox: false },
  ],
  collaborationOptions: [
    { label: "No collaboration needed", value: "No collaboration needed", showTextBox: false },
    {
      label: "Live Google Docs/Notion Collaboration",
      value: "Live Google Docs/Notion Collaboration",
      showTextBox: false,
    },
    {
      label: "Editable Spreadsheets & Databases",
      value: "Editable Spreadsheets & Databases",
      showTextBox: false,
    },
  ],
  explainabilityOptions: [
    {
      label: "Source Citations for Every Claim",
      value: "Source Citations for Every Claim",
      showTextBox: false,
    },
    {
      label: "Logical Breakdown of Insights",
      value: "Logical Breakdown of Insights",
      showTextBox: false,
    },
    {
      label: "Multi-Layered Explainability",
      value: "Multi-Layered Explainability",
      showTextBox: false,
    },
    {
      label: "Confidence Levels & Uncertainty Markers",
      value: "Confidence Levels & Uncertainty Markers",
      showTextBox: false,
    },
    {
      label: "Confidence Intervals for Predictions",
      value: "Confidence Intervals for Predictions",
      showTextBox: false,
    },
    {
      label: "Standard Deviation & Variance Reporting",
      value: "Standard Deviation & Variance Reporting",
      showTextBox: false,
    },
    { label: "Comparative Analysis View", value: "Comparative Analysis View", showTextBox: false },
    {
      label: "Probability-Based Risk Scoring",
      value: "Probability-Based Risk Scoring",
      showTextBox: false,
    },
  ],
};

// Reusable component for rendering checkbox groups
interface CheckboxGroupProps {
  options: Option[];
  selectedOptions: string[];
  onChange: (value: string) => void;
  customInput: Record<string, Record<string, string>>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, field: string, key: string) => void;
  optionKey: string;
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedOptions,
  onChange,
  customInput,
  onInputChange,
  optionKey,
}) => (
  <div className="flex gap-x-4 p-2 rounded-b-lg w-full">
    <div className="grid grid-cols-2 gap-2 w-full">
      {options.map((item) => (
        <div key={item.value} className="">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={item.value}
              checked={selectedOptions.includes(item.value)}
              onChange={() => onChange(item.value)}
              className="form-radio text-base font-normal"
            />
            <span className="font-light">{item.label}</span>
          </label>
          {selectedOptions.includes(item.value) && item.showTextBox && (
            <input
              type="text"
              placeholder={`Enter custom text for ${item.label}`}
              value={customInput?.[optionKey]?.[item.value] || ""}
              onChange={(e) => onInputChange(e, item.value, optionKey)}
              className="border border-neutral-500 rounded px-1 py-0.5 bg-transparent my-1 w-full text-sm"
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

const RoundedCheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedOptions,
  onChange,
  customInput,
  onInputChange,
  optionKey,
}) => (
  <div className="flex gap-x-4 p-2 rounded-b-lg">
    <div className="flex flex-wrap gap-2 w-full">
      {options.map((item) => (
        <div key={item.value} className="my-1">
          <label
            className={`flex rounded-full border w-fit ${
              selectedOptions.includes(item.value) ? "border-[#442873]" : "border-[#9FA0A6]"
            } items-center space-x-1 pr-2 cursor-pointer hover:opacity-70`}
          >
            <input
              type="radio"
              value={item.value}
              // toggle
              checked={selectedOptions.includes(item.value)}
              onChange={() => onChange(item.value)}
              className="form-radio text-base font-normal ml-1"
            />
            <span className="font-light">{item.label}</span>
          </label>
          {selectedOptions.includes(item.value) && item.showTextBox && (
            <input
              type="text"
              placeholder={`Enter custom text for ${item.label}`}
              value={customInput?.[optionKey]?.[item.value] || ""}
              onChange={(e) => onInputChange(e, item.value, optionKey)}
              className="border border-neutral-500 rounded px-1 py-0.5 bg-transparent my-1 w-full text-sm"
            />
          )}
        </div>
      ))}
    </div>
  </div>
);

const AIReportCustomization: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [selectedOptions, setSelectedOptions] = useState<Record<string, string[]>>({
    reportScopeOptions: [],
    reportFormatOptions: [],
    visualStyleOptions: [],
    chartsOptions: [],
    citationsOptions: [],
    audienceFocusOneOptions: [],
    audienceFocusTwoOptions: [],
    reportToneOptions: [],
    collaborationOptions: [],
    explainabilityOptions: [],
  });
  const userId = jsCookie.get("user_id");

  const [reportName, setReportName] = useState("");
  const [reportNameError, setReportNameError] = useState("");
  const [customInput, setCustomInput] = useState<Record<string, Record<string, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [currentTab, setCurrentTab] = useState("reportScopeOptions");

  const handleRenameReport = async () => {
    if (reportNameError) {
      return;
    }
    if (reportName?.length > 50) {
      alert("Report name cannot be more than 50 characters");
      return;
    }

    if (reportName) {
      const res = await fetch(
        `https://templateuserrequirements.azurewebsites.net/agents/rename_thread/${userId}/${searchParams.get(
          "thread_id",
        )}?thread_name=${reportName}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        },
      );

      if (res.status === 200) {
        setReportName("");
      }
    }
  };

  const handleCheckboxChange = (category: string, value: string) => {
    setSelectedOptions((prev) => {
      const currentSelections = prev[category] || [];
      const isSelected = currentSelections.includes(value);
      return {
        ...prev,
        [category]: isSelected
          ? currentSelections.filter((item) => item !== value)
          : [...currentSelections, value],
      };
    });
  };

  const handleRadioChange = (category: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [category]: prev[category].includes(value) ? [] : [value], // Only one value at a time
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string,
    optionKey: string,
  ) => {
    setCustomInput({
      ...customInput,
      [optionKey]: {
        ...(customInput[optionKey] || {}),
        [field]: e.target.value,
      },
    });
  };

  const submitFinalReport = async () => {
    if (submitting) return;
    if (!reportName) {
      setReportNameError("Report name is mandatory*");
      return;
    }
    if (reportNameError) {
      return;
    }
    setSubmitting(true);
    handleRenameReport();
    const dataToSend = {
      user_id: searchParams.get("user_id"),
      thread_id: searchParams.get("thread_id"),
      config: {
        report_depth: {
          selected: selectedOptions.reportScopeOptions,
          other:
            customInput?.["reportScopeOptions"]?.["Other"] ||
            customInput?.["Quick Sub-Topic Summaries"]?.["Other"] ||
            "",
        },
        report_format: {
          selected: selectedOptions.reportFormatOptions,
          other: customInput?.["reportFormatOptions"]?.["Other"] || "",
        },
        visual_style: {
          selected: selectedOptions.visualStyleOptions,
          other: customInput?.["visualStyleOptions"]?.["Other"] || "",
        },
        number_of_charts: {
          selected: selectedOptions.chartsOptions,
          other: customInput?.["chartsOptions"]?.["Other"] || "",
        },
        citations: {
          selected: selectedOptions.citationsOptions,
          other: customInput?.["citationsOptions"]?.["Other"] || "",
        },
        report_tone: {
          selected: selectedOptions.reportToneOptions,
          other: customInput?.["reportToneOptions"]?.["Other"] || "",
        },
        collaboration_needs: {
          selected: selectedOptions.collaborationOptions,
          other: customInput?.["collaborationOptions"]?.["Other"] || "",
        },
        explainability: {
          selected: selectedOptions.explainabilityOptions,
          other: customInput?.["explainabilityOptions"]?.["Other"] || "",
        },
        audience_focus: {
          enterprise: {
            selected: selectedOptions.audienceFocusOneOptions,
            other: customInput?.["audienceFocusOneOptions"]?.["Other"] || "",
          },
          investors: {
            selected: selectedOptions.audienceFocusTwoOptions,
            other: customInput?.["audienceFocusTwoOptions"]?.["Other"] || "",
          },
        },
      },
    };
    console.log("dataToSend", dataToSend);
    try {
      const resp = await dispatch(submitCustomizeReport(dataToSend)).unwrap();
      if (resp) navigate("/ai-agent-final");
    } catch (error) {
      console.error("Error submitting report: ", error);
    } finally {
      setSubmitting(false);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFromAnimated = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const AnimatedPlaceholder = ({
    className,
    onClick = () => {
      undefined;
    },
  }: {
    className: any;
    onClick?: () => void;
  }) => {
    return (
      <div className={classNames(className, "wrapper")} onClick={onClick}>
        <div className="words">
          {Texts.map((text, idx) => (
            <span key={idx * 499} className="text-secondary-800">
              {text}
            </span>
          ))}
        </div>
      </div>
    );
  };

  const [additionalSummary, setadditionalSummary] = useState("");

  return (
    <div className="space-y-[20px] w-full max-w-[998px] bg-[#FFFFFF] z-10 pb-[7%]">
      <div className="p-1 pl-0">
        <div className="text-start text-black mt-2 text-[16px] leading-[19.2px] font-normal">
          <p>Customize your report to match your needs.</p>
          <p>
            <span className="text-[#FFA300] font-medium">Choose</span> the format, level of detail,
            and key insights to get the most relevant results!
          </p>
        </div>

        <div className="mb-2 mt-4">
          <h2 className="text-black text-base mb-1">
            Report name <span className="text-red-500 ml-0">*</span>
          </h2>

          <div className="max-w-md rounded-lg shadow-xl border">
            <input
              className="w-full p-2 outline-none rounded-lg text-sm"
              placeholder="Type your report name"
              value={reportName}
              onChange={(e) => {
                setReportName(e.target.value);
                if (e.target.value.length > 50) {
                  setReportNameError("Report name cannot be more than 50 characters");
                } else {
                  setReportNameError("");
                }
              }}
            />
          </div>
          {reportNameError && <div className="text-s text-danger-500">{reportNameError}</div>}
        </div>

        <div className=" bg-white shadow-lg mt-4 rounded-lg">
          <div className="flex">
            <div className="flex-[0.9] p-2 pr-10 border-r">
              <div className="flex items-center gap-x-2 mb-4">
                <img src={customizationIcon} alt="Customization Icon" />
                Customization options
              </div>
              <div
                className={`flex items-center gap-x-2 rounded-md py-1 px-2 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover ${
                  currentTab === "reportScopeOptions" && "bg-[#F5F7FF]"
                }`}
                onClick={() => setCurrentTab("reportScopeOptions")}
              >
                <input type="radio" checked={currentTab === "reportScopeOptions"} />
                Report Scope
              </div>
              <div
                className={`flex items-center gap-x-2 rounded-md py-1 px-2 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover ${
                  currentTab === "reportFormatOptions" && "bg-[#F5F7FF]"
                }`}
                onClick={() => setCurrentTab("reportFormatOptions")}
              >
                <input type="radio" checked={currentTab === "reportFormatOptions"} />
                Report Format
              </div>
              <div
                className={`flex items-center gap-x-2 rounded-md py-1 px-2 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover ${
                  currentTab === "visualStyleOptions" && "bg-[#F5F7FF]"
                }`}
                onClick={() => setCurrentTab("visualStyleOptions")}
              >
                <input type="radio" checked={currentTab === "visualStyleOptions"} />
                Visual Emphasis
              </div>
              <div
                className={`flex items-center gap-x-2 rounded-md py-1 px-2 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover ${
                  currentTab === "chartsOptions" && "bg-[#F5F7FF]"
                }`}
                onClick={() => setCurrentTab("chartsOptions")}
              >
                <input type="radio" checked={currentTab === "chartsOptions"} />
                Data Presentation
              </div>
              <div
                className={`flex items-center gap-x-2 rounded-md py-1 px-2 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover ${
                  currentTab === "citationsOptions" && "bg-[#F5F7FF]"
                }`}
                onClick={() => setCurrentTab("citationsOptions")}
              >
                <input type="radio" checked={currentTab === "citationsOptions"} />
                Citations & References
              </div>
              <div
                className={`flex items-center gap-x-2 rounded-md py-1 px-2 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover ${
                  currentTab === "audienceFocus" && "bg-[#F5F7FF]"
                }`}
                onClick={() => setCurrentTab("audienceFocus")}
              >
                <input type="radio" checked={currentTab === "audienceFocus"} />
                Target Audience
              </div>
              <div
                className={`flex items-center gap-x-2 rounded-md py-1 px-2 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover ${
                  currentTab === "reportToneOptions" && "bg-[#F5F7FF]"
                }`}
                onClick={() => setCurrentTab("reportToneOptions")}
              >
                <input type="radio" checked={currentTab === "reportToneOptions"} />
                Tone of the Report
              </div>
              <div
                className={`flex items-center gap-x-2 rounded-md py-1 px-2 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover ${
                  currentTab === "collaborationOptions" && "bg-[#F5F7FF]"
                }`}
                onClick={() => setCurrentTab("collaborationOptions")}
              >
                <input type="radio" checked={currentTab === "collaborationOptions"} />
                Collaboration Needs
              </div>
              <div
                className={`flex items-center gap-x-2 rounded-md py-1 px-2 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover ${
                  currentTab === "explainabilityOptions" && "bg-[#F5F7FF]"
                }`}
                onClick={() => setCurrentTab("explainabilityOptions")}
              >
                <input type="radio" checked={currentTab === "explainabilityOptions"} />
                Explainability & Transparency
              </div>
            </div>
            <div className="flex-[2] pl-3">
              <div className="grid grid-cols-2 gap-x-3 gap-y-4 mt-2">
                {currentTab === "reportScopeOptions" && (
                  <div className="flex flex-col w-[300px]">
                    <div className="">Report Scope</div>
                    <CheckboxGroup
                      options={options.reportScopeOptions}
                      selectedOptions={selectedOptions.reportScopeOptions}
                      onChange={(value) => handleCheckboxChange("reportScopeOptions", value)}
                      customInput={customInput}
                      onInputChange={handleInputChange}
                      optionKey="reportScopeOptions"
                    />
                  </div>
                )}
                {currentTab === "reportFormatOptions" && (
                  <div className="flex flex-col w-[500px]">
                    <div className="">Report Format</div>
                    <CheckboxGroup
                      options={options.reportFormatOptions}
                      selectedOptions={selectedOptions.reportFormatOptions}
                      onChange={(value) => handleCheckboxChange("reportFormatOptions", value)}
                      customInput={customInput}
                      onInputChange={handleInputChange}
                      optionKey="reportFormatOptions"
                    />
                  </div>
                )}
                {currentTab === "visualStyleOptions" && (
                  <div className="flex flex-col w-full">
                    <div className="">Visual Emphasis</div>
                    <CheckboxGroup
                      options={options.visualStyleOptions}
                      selectedOptions={selectedOptions.visualStyleOptions}
                      onChange={(value) => handleCheckboxChange("visualStyleOptions", value)}
                      customInput={customInput}
                      onInputChange={handleInputChange}
                      optionKey="visualStyleOptions"
                    />
                  </div>
                )}
                {currentTab === "chartsOptions" && (
                  <div className="flex flex-col w-full max-w-[306px]">
                    <div className="">Data Presentation</div>
                    <CheckboxGroup
                      options={options.chartsOptions}
                      selectedOptions={selectedOptions.chartsOptions}
                      onChange={(value) => handleCheckboxChange("chartsOptions", value)}
                      customInput={customInput}
                      onInputChange={handleInputChange}
                      optionKey="chartsOptions"
                    />
                  </div>
                )}
                {currentTab === "citationsOptions" && (
                  <div className="flex flex-col w-full max-w-[306px]">
                    <div className="">Citations & References</div>
                    <CheckboxGroup
                      options={options.citationsOptions}
                      selectedOptions={selectedOptions.citationsOptions}
                      onChange={(value) => handleCheckboxChange("citationsOptions", value)}
                      customInput={customInput}
                      onInputChange={handleInputChange}
                      optionKey="citationsOptions"
                    />
                  </div>
                )}
                {currentTab === "audienceFocus" && (
                  <div className="flex flex-col">
                    <div className="flex flex-col w-[600px]">
                      <div className="">Target Audience</div>
                      <p className="mt-2">For enterprises</p>
                      <CheckboxGroup
                        options={options.audienceFocusOneOptions}
                        selectedOptions={selectedOptions.audienceFocusOneOptions}
                        onChange={(value) => handleCheckboxChange("audienceFocusOneOptions", value)}
                        customInput={customInput}
                        onInputChange={handleInputChange}
                        optionKey="audienceFocusOneOptions"
                      />

                      <div className="flex flex-col mt-4">
                        <p className="mt-2">For Investors & Financial Insitutions</p>
                        <CheckboxGroup
                          options={options.audienceFocusTwoOptions}
                          selectedOptions={selectedOptions.audienceFocusTwoOptions}
                          onChange={(value) =>
                            handleCheckboxChange("audienceFocusTwoOptions", value)
                          }
                          customInput={customInput}
                          onInputChange={handleInputChange}
                          optionKey="audienceFocusTwoOptions"
                        />
                      </div>
                    </div>
                  </div>
                )}
                {currentTab === "reportToneOptions" && (
                  <div className="flex flex-col w-full max-w-[306px]">
                    <div className="">Tone of the Report</div>
                    <CheckboxGroup
                      options={options.reportToneOptions}
                      selectedOptions={selectedOptions.reportToneOptions}
                      onChange={(value) => handleCheckboxChange("reportToneOptions", value)}
                      customInput={customInput}
                      onInputChange={handleInputChange}
                      optionKey="reportToneOptions"
                    />
                  </div>
                )}
                {currentTab === "collaborationOptions" && (
                  <div className="flex flex-col w-full max-w-[306px]">
                    <div className="">Collaboration Needs</div>
                    <CheckboxGroup
                      options={options.collaborationOptions}
                      selectedOptions={selectedOptions.collaborationOptions}
                      onChange={(value) => handleCheckboxChange("collaborationOptions", value)}
                      customInput={customInput}
                      onInputChange={handleInputChange}
                      optionKey="collaborationOptions"
                    />
                  </div>
                )}
                {currentTab === "explainabilityOptions" && (
                  <div className="flex flex-col w-full max-w-[306px]">
                    <div className="">Explainability & Transparency</div>
                    <CheckboxGroup
                      options={options.explainabilityOptions}
                      selectedOptions={selectedOptions.explainabilityOptions}
                      onChange={(value) => handleCheckboxChange("explainabilityOptions", value)}
                      customInput={customInput}
                      onInputChange={handleInputChange}
                      optionKey="explainabilityOptions"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h6 className="font-semibold mb-1 text-base font-nunito">
            Have any special requests? Let us know what you need, and we’ll tailor the report to fit
            your goals!
          </h6>
          <div
            className="relative w-full overflow-hidden bg-white"
            aria-disabled
            onClick={handleInputFromAnimated}
          >
            <input
              // ref={inputRef}
              id="specialRequests"
              type="text"
              className={classNames(
                "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
              )}
              placeholder=""
              value={additionalSummary}
              onChange={(e) => {
                setadditionalSummary(e.target.value);
              }}
            />
            {additionalSummary === "" && (
              <AnimatedPlaceholder className="absolute top-1 left-2 pt-1 bg-transparent" />
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <div
          className="flex items-center justify-center gap-x-2 border-4 bg-secondary-500 border-[#442873] rounded-[32px] py-1 px-2 text-lg text-white font-bold"
          onClick={submitFinalReport}
        >
          {!submitting ? "Submit" : <LoadingIcon className="animate-spin text-black" />}
          <RightArrow className="ml-1" />
        </div>
      </div>
    </div>
  );
};

export default AIReportCustomization;
