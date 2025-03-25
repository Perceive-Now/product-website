import React, { useState } from "react";
import customizationIcon from "./_assets/customization-icon.svg";

const options = {
  reportScopeOptions: [
    { label: "Detailed Analysis", value: "Detailed Analysis", showTextBox: false },
    { label: "High-Level Summary", value: "High-Level Summary", showTextBox: false },
    { label: "Custom", value: "Other", showTextBox: true },
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
    { label: "Custom Citation Style", value: "Other", showTextBox: true },
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
    { label: "Custom", value: "Other", showTextBox: true },
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

interface Option {
  label: string;
  value: string;
  showTextBox: boolean;
}

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

interface Props {
  selectedOptions: Record<string, string[]>;
  setSelectedOptions: (value: Record<string, string[]>) => void;
  customInput: Record<string, Record<string, string>>;
  setCustomInput: (value: Record<string, Record<string, string>>) => void;
}

const CustmizationForm = (props: Props) => {
  const { selectedOptions, setSelectedOptions, customInput, setCustomInput } = props;

  const [currentTab, setCurrentTab] = useState("reportScopeOptions");

  const handleCheckboxChange = (category: string, value: string) => {
    const currentSelections = selectedOptions[category] || [];
    const isSelected = currentSelections.includes(value);
    setSelectedOptions({
      ...selectedOptions,
      [category]: isSelected
        ? currentSelections.filter((item) => item !== value)
        : [...currentSelections, value],
    });
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

  return (
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
          <div className="grid grid-cols-1 gap-x-3 gap-y-4 mt-2">
            {currentTab === "reportScopeOptions" && (
              <div className="flex flex-col w-full">
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
              <div className="flex flex-col w-full">
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
              <div className="flex flex-col w-full ">
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
              <div className="flex flex-col w-full ">
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
                <div className="flex flex-col w-full">
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
                      onChange={(value) => handleCheckboxChange("audienceFocusTwoOptions", value)}
                      customInput={customInput}
                      onInputChange={handleInputChange}
                      optionKey="audienceFocusTwoOptions"
                    />
                  </div>
                </div>
              </div>
            )}
            {currentTab === "reportToneOptions" && (
              <div className="flex flex-col w-full ">
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
              <div className="flex flex-col w-full ">
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
              <div className="flex flex-col w-full ">
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
  );
};

export default CustmizationForm;
