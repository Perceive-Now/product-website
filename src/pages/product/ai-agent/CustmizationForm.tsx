import React, { useState } from "react";
import customizationIcon from "./_assets/customization-icon.svg";

const options = {
  // reportScopeOptions: [
  //   { label: "Detailed Analysis", value: "Detailed Analysis", showTextBox: false },
  //   { label: "High-Level Summary", value: "High-Level Summary", showTextBox: false },
  //   { label: "Custom", value: "Other", showTextBox: true },
  // ],
  reportFormatOptions: [
    {
      label: "PDF Report (default)",
      value: "PDF Report (default)",
      showTextBox: false,
      desc: "Clean and print-ready. Ideal for official sharing and archiving.",
    },
    {
      label: "Presentation Deck (PPT)",
      value: "Presentation Deck (PPT)",
      showTextBox: false,
      desc: "Visual slides for executive or team briefings",
    },
    {
      label: "Editable Word Doc",
      value: "Editable Word Doc",
      showTextBox: false,
      desc: "Useful for internal annotations and customization.",
    },
    {
      label: "Spreadsheet (Excel/CSV)",
      value: "Spreadsheet (Excel/CSV)",
      showTextBox: false,
      desc: "Tabular data for deeper internal analysis or integration.",
    },
    {
      label: "Short Topical Summaries",
      value: "Short Topical Summaries",
      showTextBox: true,
      desc: "1-page summaries for specific subtopics. You’ll be prompted to list which topics need summarizing.\nExample: “Summarize Competitive Landscape and Regulatory Risk sections separately.”",
    },
  ],
  // visualStyleOptions: [
  //   { label: "Minimal Text, More Data", value: "Minimal Text, More Data", showTextBox: false },
  //   {
  //     label: "Balanced Mix of Visuals & Text",
  //     value: "Balanced Mix of Visuals & Text",
  //     showTextBox: false,
  //   },
  //   {
  //     label: "Extensive Annotations & Explanations",
  //     value: "Extensive Annotations & Explanations",
  //     showTextBox: false,
  //   },
  //   { label: "Infographic-Heavy", value: "Infographic-Heavy", showTextBox: false },
  // ],
  citationsOptions: [
    {
      label: "Inline Hyperlinks",
      value: "Inline Hyperlinks",
      showTextBox: false,
      desc: `Sources appear directly in-line. Example: “...as reported in Gartner, 2023”`,
    },
    {
      label: "Endnotes with Hyperlinks",
      value: "Endnotes with Hyperlinks",
      showTextBox: false,
      desc: "Citations shown as numbered footnotes at the end. Keeps main content clean.",
    },
    {
      label: "Standard Reference List",
      value: "Standard Reference List",
      showTextBox: false,
      desc: `APA-style or numbered list at the end of the report.\nExamples:
APA Style: Gartner. (2024). AI Trends in Consumer Goods. Retrieved from https://www.gartner.com/report/cpg-ai-2024
Numbered Style: [1] Gartner, AI Trends in Consumer Goods, 2024. https://www.gartner.com/report/cpg-ai-2024`,
    },
    {
      label: "No Citations",
      value: "No Citations",
      showTextBox: false,
      desc: "For internal-only reports or early drafts.",
    },
  ],

  audienceFocusOneOptions: [
    { label: "C-Suite Executives", value: "C-Suite Executives", showTextBox: false },
    { label: "Finance Teams", value: "Finance Teams", showTextBox: false },
    {
      label: "Business Development Teams",
      value: "Business Development Teams",
      showTextBox: false,
    },
    {
      label: "Regulatory & Compliance Teams",
      value: "Regulatory & Compliance Teams",
      showTextBox: false,
    },
    { label: "R&D Teams", value: "R&D Teams", showTextBox: false },

    { label: "Sales & Marketing Teams", value: "Sales & Marketing Teams", showTextBox: false },

    { label: "Operations Teams", value: "Operations Teams", showTextBox: false },

    { label: "Product Management Teams", value: "Product Management Teams", showTextBox: false },
    { label: "Other", value: "Other", showTextBox: true },
  ],
  audienceFocusTwoOptions: [
    { label: "General Partners (GPs)", value: "General Partners (GPs)", showTextBox: false },
    { label: "Risk & Compliance Teams", value: "Risk & Compliance Teams", showTextBox: false },
    { label: "Fund Managers", value: "Fund Managers", showTextBox: false },
    { label: "M&A Teams", value: "M&A Teams", showTextBox: false },
    { label: "Deal Sourcing Teams", value: "Deal Sourcing Teams", showTextBox: false },
    { label: "Portfolio Managers", value: "Portfolio Managers", showTextBox: false },

    { label: "Managing Directors", value: "Managing Directors", showTextBox: false },

    { label: "Investment Analysts", value: "Investment Analysts", showTextBox: false },

    { label: "Venture Partners", value: "Venture Partners", showTextBox: false },

    { label: "Other", value: "Other", showTextBox: true },
  ],
  reportToneOptions: [
    {
      label: "Confident & Assertive",
      value: "Confident & Assertive",
      showTextBox: false,
      desc: `No fluff, no fence-sitting. Clear stances, strong language, action-ready.
Example: “Here’s the signal. Here’s the move. Now go.”`,
    },
    {
      label: "Witty & Sharp",
      value: "Witty & Sharp",
      showTextBox: false,
      desc: `Slightly edgy, clever, intelligent. For readers who appreciate personality with their data.
Example: “The only thing flatter than the growth rate in this sector is a soda left open overnight.”`,
    },
    {
      label: "Executive-Level Strategic",
      value: "Executive-Level Strategic",
      showTextBox: false,
      desc: `High-level clarity for decision-makers. Think boardroom-ready.
Example: “This space is consolidating fast — M&A is no longer optional, it’s survival.”`,
    },
    {
      label: "Analytical & Data-Driven",
      value: "Analytical & Data-Driven",
      showTextBox: false,
      desc: `Math, methods, and meaning — minus the fluff.
Example: “95% CI, p < 0.05. Here’s how we got there and why it matters.”`,
    },
    {
      label: "Clear & Jargon-Free",
      value: "Clear & Jargon-Free",
      showTextBox: false,
      desc: `Explain-it-to-a-human simplicity. No acronyms or buzzwords.
Example: “This tech is like GPS in the 2000s — early, valuable, and soon-to-be everywhere.”`,
    },
    {
      label: "Bold & Visionary",
      value: "Bold & Visionary",
      showTextBox: false,
      desc: `Moonshot tone for future-forward thinkers.
Example: “If you’re not already building in this space, you’ll be buying from someone who is.”`,
    },
  ],
  // collaborationOptions: [
  //   { label: "No collaboration needed", value: "No collaboration needed", showTextBox: false },
  //   {
  //     label: "Live Google Docs/Notion Collaboration",
  //     value: "Live Google Docs/Notion Collaboration",
  //     showTextBox: false,
  //   },
  //   {
  //     label: "Editable Spreadsheets & Databases",
  //     value: "Editable Spreadsheets & Databases",
  //     showTextBox: false,
  //   },
  // ],
  explainabilityOptions: [
    {
      label: "Logic Path Appendix",
      value: "Logic Path Appendix",
      showTextBox: false,
      desc: `Step-by-step breakdown of how each insight was derived.
Example: “Revenue potential = Market size × Adoption rate × Pricing tier.”`,
    },
    {
      label: "Breakdown by Source Type",
      value: "Breakdown by Source Type",
      showTextBox: false,
      desc: `Clarifies if the insight came from patents, market data, expert models, or AI-generated scoring.`,
    },
    {
      label: "Statistical Parameters",
      value: "Statistical Parameters",
      showTextBox: false,
      desc: `Includes confidence intervals, p-values, error margins, sample sizes, and other key indicators.
Example: “Forecasted CAGR: 18.2% (±2.3% margin, 95% CI).”`,
    },
    {
      label: "Forecasting Model Disclosure",
      value: "Forecasting Model Disclosure",
      showTextBox: false,
      desc: `List of assumptions and equations used to make forward-looking projections.
Example: Adoption rate modeled on historical S-curve + benchmark multipliers.`,
    },
    {
      label: "Input vs. Output Mapping",
      value: "Input vs. Output Mapping",
      showTextBox: false,
      desc: `“From → to” flow showing what data led to what insight.
Example: “Patent clusters → Tech trends → Commercialization score.”`,
    },
    {
      label: "Insight Type Labeling",
      value: "Insight Type Labeling",
      showTextBox: false,
      desc: `Each insight tagged as: Derived (data-driven), Interpreted (expert judgment), or Predicted (forecasted).`,
    },
    {
      label: "Explainable AI Summary",
      value: "Explainable AI Summary",
      showTextBox: false,
      desc: `Plain-language breakdown of where and how AI was used in the analysis.
Example: “Generated using a fine-tuned LLM trained on 200K+ patents and filings.”`,
    },
  ],
};

interface Option {
  label: string;
  value: string;
  showTextBox: boolean;
  desc?: string;
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

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  selectedOptions,
  onChange,
  customInput,
  onInputChange,
  optionKey,
}) => (
  <div className="flex px-2 py-1 mb-3 rounded-b-lg w-full">
    <div className="grid grid-cols-1 gap-2 w-full">
      {options.map((item) => (
        <div key={item.value} className="">
          <label className="flex items-start space-x-1">
            <input
              type="checkbox"
              value={item.value}
              checked={selectedOptions.includes(item.value)}
              onChange={() => onChange(item.value)}
              className="form-radio text-base font-normal mt-1"
            />
            <span className="flex flex-col">
            <span className="font-medium text-secondary-800">{item.label}</span>
            {item.desc ? (
            <span className="text-xs text-secondary-800">{item.desc}</span>
          ) : null}
            </span>
            
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

  const [currentTab, setCurrentTab] = useState("reportFormatOptions");

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
    <div className=" bg-white shadow-[0_4px_24px_0_#2222220F] mt-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:divide-x">
        <div className="p-2 space-y-1">
          <div className="flex items-center gap-x-1 mb-4 font-semibold text-xl">
            <img src={customizationIcon} alt="Customization Icon" />
            Customization options
          </div>
          {/* <div
            className={`flex items-center gap-x-2 rounded-md py-1 px-2 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover ${
              currentTab === "reportScopeOptions" && "bg-[#F5F7FF]"
            }`}
            onClick={() => setCurrentTab("reportScopeOptions")}
          >
            <input type="radio" checked={currentTab === "reportScopeOptions"} />
            Report Scope
          </div> */}
          <div
            className={` rounded-lg py-[12px] px-1 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover group ${
              currentTab === "reportFormatOptions" && "bg-[#F5F7FF]"
            }`}
            onClick={() => setCurrentTab("reportFormatOptions")}
          >
            <div className="flex items-center">
              <div className={`w-[28px] h-[28px] font-semibold text-sm text-secondary-800 rounded-sm border border-appGray-200 inline-flex justify-center items-center mr-[10px] group-hover:bg-primary-900 group-hover:text-white group-hover:border-primary-900 ${
              currentTab === "reportFormatOptions" && "bg-primary-900 text-white border-primary-900"
            }`}>1</div>
              <input type="radio" checked={currentTab === "reportFormatOptions"} className="hidden" />
              Report Format
            </div>
            {/* <p className="italic text-xs">
              Select one or more formats you'd like the report delivered in
            </p> */}
          </div>
          {/* <div
            className={`flex items-center gap-x-2 rounded-md py-1 px-2 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover ${
              currentTab === "visualStyleOptions" && "bg-[#F5F7FF]"
            }`}
            onClick={() => setCurrentTab("visualStyleOptions")}
          >
            <input type="radio" checked={currentTab === "visualStyleOptions"} />
            Visual Emphasis
          </div> */}
          {/* <div
            className={`flex items-center gap-x-2 rounded-md py-1 px-2 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover ${
              currentTab === "chartsOptions" && "bg-[#F5F7FF]"
            }`}
            onClick={() => setCurrentTab("chartsOptions")}
          >
            <input type="radio" checked={currentTab === "chartsOptions"} />
            Data Presentation
          </div> */}
          <div
            className={` rounded-lg py-[12px] px-1 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover group ${
              currentTab === "citationsOptions" && "bg-[#F5F7FF]"
            }`}
            onClick={() => setCurrentTab("citationsOptions")}
          >
            <div className="flex items-center">
              <div className={`w-[28px] h-[28px] font-semibold text-sm text-secondary-800 rounded-sm border border-appGray-200 inline-flex justify-center items-center mr-[10px] group-hover:bg-primary-900 group-hover:text-white group-hover:border-primary-900 ${
              currentTab === "citationsOptions" && "bg-primary-900 text-white border-primary-900"
            }`}>2</div>
              <input type="radio" checked={currentTab === "citationsOptions"} className="hidden" />
              Citations & References
            </div>
            {/* <p className="italic text-xs">Choose how you'd like sources to appear in the report</p> */}
          </div>
          <div
            className={` rounded-lg py-[12px] px-1 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover group ${
              currentTab === "audienceFocus" && "bg-[#F5F7FF]"
            }`}
            onClick={() => setCurrentTab("audienceFocus")}
          >
            <div className="flex items-center">
              <div className={`w-[28px] h-[28px] font-semibold text-sm text-secondary-800 rounded-sm border border-appGray-200 inline-flex justify-center items-center mr-[10px] group-hover:bg-primary-900 group-hover:text-white group-hover:border-primary-900 ${
              currentTab === "audienceFocus" && "bg-primary-900 text-white border-primary-900"
            }`}>3</div>
              <input type="radio" checked={currentTab === "audienceFocus"} className="hidden"  />
              Target Audience
            </div>
            {/* <p className="italic text-xs">
              Select all that apply — we’ll tailor tone and depth accordingly
            </p> */}
          </div>
          <div
            className={` rounded-lg py-[12px] px-1 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover group ${
              currentTab === "reportToneOptions" && "bg-[#F5F7FF]"
            }`}
            onClick={() => setCurrentTab("reportToneOptions")}
          >
            <div className="flex items-center">
              <div className={`w-[28px] h-[28px] font-semibold text-sm text-secondary-800 rounded-sm border border-appGray-200 inline-flex justify-center items-center mr-[10px] group-hover:bg-primary-900 group-hover:text-white group-hover:border-primary-900 ${
              currentTab === "reportToneOptions" && "bg-primary-900 text-white border-primary-900"
            }`}>4</div>
              <input type="radio" checked={currentTab === "reportToneOptions"} className="hidden"  />
              Tone of the Report
            </div>
            {/* <p className="italic text-xs">
              Choose the tone that best fits your audience or brand personality
            </p> */}
          </div>
          {/* <div
            className={`flex items-center gap-x-2 rounded-md py-1 px-2 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover ${
              currentTab === "collaborationOptions" && "bg-[#F5F7FF]"
            }`}
            onClick={() => setCurrentTab("collaborationOptions")}
          >
            <input type="radio" checked={currentTab === "collaborationOptions"} />
            Collaboration Needs
          </div> */}
          <div
            className={` rounded-lg py-[12px] px-1 text-base font-light cursor-pointer hover:bg-[#f5f7ff] transition-hover group ${
              currentTab === "explainabilityOptions" && "bg-[#F5F7FF]"
            }`}
            onClick={() => setCurrentTab("explainabilityOptions")}
          >
            <div className="flex items-center">
              <div className={`w-[28px] h-[28px] font-semibold text-sm text-secondary-800 rounded-sm border border-appGray-200 inline-flex justify-center items-center mr-[10px] group-hover:bg-primary-900 group-hover:text-white group-hover:border-primary-900 ${
              currentTab === "explainabilityOptions" && "bg-primary-900 text-white border-primary-900"
            }`}>5</div>
              <input type="radio" checked={currentTab === "explainabilityOptions"} className="hidden" />
              Explainability & Transparency
            </div>
            {/* <p className="italic text-xs">
              Select how much clarity you want into how insights were generated
            </p> */}
          </div>
        </div>
        <div className="pl-5 p-2">
          <div className="grid grid-cols-1 gap-x-3 gap-y-4 mt-2">
            {/* {currentTab === "reportScopeOptions" && (
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
            )} */}
            {currentTab === "reportFormatOptions" && (
              <div className="flex flex-col w-full">
                <div className="font-semibold text-secondary-800">Select one or more formats you'd like the report delivered in</div>
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
            {/* {currentTab === "visualStyleOptions" && (
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
            )} */}
            {/* {currentTab === "chartsOptions" && (
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
            )} */}
            {currentTab === "citationsOptions" && (
              <div className="flex flex-col w-full ">
                <div className="font-semibold text-secondary-800">Choose how you'd like sources to appear in the report</div>
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
                  <div className="font-semibold text-secondary-800">Select all that apply — we’ll tailor tone and depth accordingly</div>
                  <p className="mt-2">For enterprises</p>
                  <CheckboxGroup
                    options={options.audienceFocusOneOptions}
                    selectedOptions={selectedOptions.audienceFocusOneOptions}
                    onChange={(value) => handleCheckboxChange("audienceFocusOneOptions", value)}
                    customInput={customInput}
                    onInputChange={handleInputChange}
                    optionKey="audienceFocusOneOptions"
                  />

                  <div className="flex flex-col">
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
                <div className="font-semibold text-secondary-800">Choose the tone that best fits your audience or brand personality</div>
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
            {/* {currentTab === "collaborationOptions" && (
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
            )} */}
            {currentTab === "explainabilityOptions" && (
              <div className="flex flex-col w-full ">
                <div className="font-semibold text-secondary-800">Select how much clarity you want into how insights were generated</div>
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
