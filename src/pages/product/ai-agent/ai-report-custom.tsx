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
  reportToneOptions: [
    { label: "In-Depth Report", value: "In-Depth Report", showTextBox: false },
    { label: "Quick Overall Summary", value: "Quick Overall Summary", showTextBox: false },
    { label: "Quick Sub-Topic Summaries", value: "Quick Sub-Topic Summaries", showTextBox: true },
    { label: "Other", value: "Other", showTextBox: true },
  ],
  reportFormatOptions: [
    { label: "PDF Report", value: "PDF Report", showTextBox: false },
    { label: "Presentation Deck", value: "Presentation Deck", showTextBox: false },
    { label: "Word Document", value: "Word Document", showTextBox: false },
    { label: "Spreadsheet Summary", value: "Spreadsheet Summary", showTextBox: false },
    { label: "Other", value: "Other", showTextBox: true },
  ],
  visualStyleOptions: [
    { label: "Simple", value: "Simple", showTextBox: false },
    { label: "Annotated", value: "Annotated", showTextBox: false },
    { label: "Extensive", value: "Extensive", showTextBox: false },
    { label: "Other", value: "Other", showTextBox: true },
  ],
  chartsOptions: [
    { label: "Minimal", value: "Minimal", showTextBox: false },
    { label: "Moderate", value: "Moderate", showTextBox: false },
    { label: "Extensive", value: "Extensive", showTextBox: false },
    { label: "Other", value: "Other", showTextBox: true },
  ],
  citationsOptions: [
    { label: "Inline Links", value: "Inline Links", showTextBox: false },
    { label: "Endnotes", value: "Endnotes", showTextBox: false },
    { label: "No Citations", value: "No Citations", showTextBox: false },
    { label: "Other", value: "Other", showTextBox: true },
  ],
  audienceFocusOneOptions: [
    { label: "C-Suite Executives", value: "C-Suite Executives", showTextBox: false },
    {
      label: "Business Development Teams",
      value: "Business Development Teams",
      showTextBox: false,
    },
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
  ],
  audienceFocusTwoOptions: [
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
    reportToneOptions: [],
    reportFormatOptions: [],
    visualStyleOptions: [],
    chartsOptions: [],
    citationsOptions: [],
    audienceFocusOneOptions: [],
    audienceFocusTwoOptions: [],
  });
  const userId = jsCookie.get("user_id");

  const [reportName, setReportName] = useState("");
  const [reportNameError, setReportNameError] = useState("");
  const [customInput, setCustomInput] = useState<Record<string, Record<string, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [currentTab, setCurrentTab] = useState("reportToneOptions");

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
          selected: selectedOptions.reportToneOptions,
          other:
            customInput?.["reportToneOptions"]?.["Other"] ||
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
                  currentTab === "reportToneOptions" && "bg-[#F5F7FF]"
                }`}
                onClick={() => setCurrentTab("reportToneOptions")}
              >
                <input type="radio" checked={currentTab === "reportToneOptions"} />
                Report Depth
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
                Visual Style
              </div>
              <div
                className={`flex items-center gap-x-2 rounded-md py-1 px-2 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover ${
                  currentTab === "chartsOptions" && "bg-[#F5F7FF]"
                }`}
                onClick={() => setCurrentTab("chartsOptions")}
              >
                <input type="radio" checked={currentTab === "chartsOptions"} />
                Number of charts/tables
              </div>
              <div
                className={`flex items-center gap-x-2 rounded-md py-1 px-2 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover ${
                  currentTab === "citationsOptions" && "bg-[#F5F7FF]"
                }`}
                onClick={() => setCurrentTab("citationsOptions")}
              >
                <input type="radio" checked={currentTab === "citationsOptions"} />
                Citations
              </div>
              <div
                className={`flex items-center gap-x-2 rounded-md py-1 px-2 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover ${
                  currentTab === "audienceFocus" && "bg-[#F5F7FF]"
                }`}
                onClick={() => setCurrentTab("audienceFocus")}
              >
                <input type="radio" checked={currentTab === "audienceFocus"} />
                Audience Focus
              </div>
            </div>
            <div className="flex-[2] pl-3">
              <div className="grid grid-cols-2 gap-x-3 gap-y-4 mt-2">
                {currentTab === "reportToneOptions" && (
                  <div className="flex flex-col w-[300px]">
                    <div className="">Report Depth</div>
                    <RoundedCheckboxGroup
                      options={options.reportToneOptions}
                      selectedOptions={selectedOptions.reportToneOptions}
                      onChange={(value) => handleRadioChange("reportToneOptions", value)}
                      customInput={customInput}
                      onInputChange={handleInputChange}
                      optionKey="reportToneOptions"
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
                    <div className="">Visual Style</div>
                    <RoundedCheckboxGroup
                      options={options.visualStyleOptions}
                      selectedOptions={selectedOptions.visualStyleOptions}
                      onChange={(value) => handleRadioChange("visualStyleOptions", value)}
                      customInput={customInput}
                      onInputChange={handleInputChange}
                      optionKey="visualStyleOptions"
                    />
                  </div>
                )}
                {currentTab === "chartsOptions" && (
                  <div className="flex flex-col w-full max-w-[306px]">
                    <div className="">Number of Charts</div>
                    <RoundedCheckboxGroup
                      options={options.chartsOptions}
                      selectedOptions={selectedOptions.chartsOptions}
                      onChange={(value) => handleRadioChange("chartsOptions", value)}
                      customInput={customInput}
                      onInputChange={handleInputChange}
                      optionKey="chartsOptions"
                    />
                  </div>
                )}
                {currentTab === "citationsOptions" && (
                  <div className="flex flex-col w-full max-w-[306px]">
                    <div className="">Citations</div>
                    <RoundedCheckboxGroup
                      options={options.citationsOptions}
                      selectedOptions={selectedOptions.citationsOptions}
                      onChange={(value) => handleRadioChange("citationsOptions", value)}
                      customInput={customInput}
                      onInputChange={handleInputChange}
                      optionKey="citationsOptions"
                    />
                  </div>
                )}
                {currentTab === "audienceFocus" && (
                  <div className="flex flex-col">
                    <div className="flex flex-col w-[600px]">
                      <div className="">Audience Focus</div>
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
