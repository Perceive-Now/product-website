import React, { useState } from "react";
import SignUpLayout from "../_components/layout";
import Button from "src/components/reusable/button";

import allOptions from "./_constants/options";
import { useNavigate } from "react-router-dom";

interface PlanData {
  agents: string[];
  templates: string[];
  quickViewReports: string[];
  dynamicSectionCustomization: string[];
  explainability: string[];
  knowNowChat: string[];
  reportFormats: string[];
}

// Define plan values for each plan
const planValues: { [key: string]: PlanData } = {
  Standard: {
    agents: [
      "Startup diligence agent",
      "Portfolio support agent",
      "Fundraising strategy agent",
      "Market strategy agent",
    ],
    templates: ["UI-based options for pre-built templates"],
    quickViewReports: ["Single-page summaries for general use", "Tone: Friendly (Simplified)"],
    dynamicSectionCustomization: [
      "Add/remove key metrics (e.g., market, competitors, funding strategy)",
    ],
    explainability: ["Basic explanations of stats"],
    knowNowChat: ["Basic reasoning", "Foundational analytics for questions"],
    reportFormats: ["pdf"],
  },
  Professional: {
    agents: [
      "Startup diligence agent",
      "Portfolio support agent",
      "Fundraising strategy agent",
      "Market strategy agent",
      "Technology & R&D agent",
      "Product & Engineering agent",
      "Marketing & Sales agent",
      "Finance & Strategy agent",
      "Legal & Compliance agent",
      "Report on Anything agent",
    ],
    templates: [
      "UI-based options for pre-built templates",
      "Semi-customizable templates tailored to professional goals",
    ],
    quickViewReports: [
      "Single-page summaries for general use",
      "Tone: Friendly (Simplified)",
      "Tone: Investor-Centric (Key metrics and growth areas)",
    ],
    dynamicSectionCustomization: [
      "Add/remove key metrics (e.g., market, competitors, funding strategy)",
      "Enhanced customization with UI-based smart options",
    ],
    explainability: [
      "Basic explanations of stats",
      "Source citations included",
      "Layers of logical breakdown",
      "Editable/addable data sources and metrics",
    ],
    knowNowChat: [
      "Basic reasoning",
      "Foundational analytics for questions",
      "Includes visuals, graphs, and trend-based projections",
    ],
    reportFormats: ["pdf", "docx"],
  },
  Enterprise: {
    agents: [
      "Startup diligence agent",
      "Portfolio support agent",
      "Fundraising strategy agent",
      "Market strategy agent",
      "Technology & R&D agent",
      "Product & Engineering agent",
      "Marketing & Sales agent",
      "Finance & Strategy agent",
      "Legal & Compliance agent",
      "Report on Anything agent",
      "Corporate Venture Capital Agent",
    ],
    templates: [
      "UI-based options for pre-built templates",
      "Semi-customizable templates tailored to professional goals",
      "Fully UI-customizable templates for enterprise-wide insights",
    ],
    quickViewReports: [
      "Single-page summaries for general use",
      "Tone: Friendly (Simplified)",
      "Tone: Investor-Centric (Key metrics and growth areas)",
      "Tailored multi-stakeholder summaries",
    ],
    dynamicSectionCustomization: [
      "Add/remove key metrics (e.g., market, competitors, funding strategy)",
      "Enhanced customization with UI-based smart options",
      "Fully customizable sections through advanced UI tools",
    ],
    explainability: [
      "Basic explanations of stats",
      "Source citations included",
      "Layers of logical breakdown",
      "Editable/addable data sources and metrics",
      "Advanced multi-layered explanations",
      "Transparent methodologies for forecasted data",
    ],
    knowNowChat: [
      "Basic reasoning",
      "Foundational analytics for questions",
      "Includes visuals, graphs, and trend-based projections",
      "Advanced visuals and dynamic graphs",
      "Premium analytics with interactive wizards and reasoning",
    ],
    reportFormats: ["pdf", "docx", "csv", "xlsx"],
  },
};

const UserPlan = () => {
  const naviagate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<"Standard" | "Professional" | "Enterprise">(
    "Standard",
  );

  const handleNext = () => {
    const selectedPlanData = planValues[selectedPlan];
    console.log("Selected Plan:", selectedPlan);
    console.log("Plan Data:", selectedPlanData);
    // You can now proceed with the next step using selectedPlan and selectedPlanData

    alert("Plan selected");
    naviagate("/signup/payment");
  };

  return (
    <SignUpLayout currentStep={2} completedSteps={[0, 1]}>
      <div className="max-w-[1000px] px-7 py-3">
        <h1 className="text-xl font-semibold mb-4 text-[#373D3F]">Plan Selection</h1>

        {/* Tabs for Plan Selection */}
        <div className="border-[1px] border-[#87888C] rounded-lg">
          <div className="p-2">
            <p className="text-base mb-2 font-semibold text-[#373D3F]">
              Select the plan that fits your needs.
            </p>
            <div className="flex gap-x-[2px] mb-1">
              {["Standard", "Professional", "Enterprise"].map((plan) => (
                <button
                  key={plan}
                  onClick={() =>
                    setSelectedPlan(plan as "Standard" | "Professional" | "Enterprise")
                  }
                  className={`px-4 py-[0.4rem] font-normal text-white ${
                    selectedPlan === plan ? "bg-[#442873]" : "bg-[#64748B] opacity-50"
                  } ${plan === "Standard" && "rounded-l-md"} ${
                    plan === "Enterprise" && "rounded-r-md"
                  }`}
                >
                  {plan}
                </button>
              ))}
            </div>
          </div>

          <hr className="border-[1px] border-[#533F73] mb-1" />

          {/* Grid Layout */}
          <div className="p-3 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {Object.entries(allOptions)
              .slice(0, 3)
              .map(([section, options]) => (
                <div key={section}>
                  <h2 className="text-base font-medium text-[#373D3F] mb-1 capitalize">
                    {section.replace(/([A-Z])/g, " $1").trim()}
                  </h2>
                  <ul className="space-y-1">
                    {options.map((item) => (
                      <li
                        key={item}
                        className={`py-1 px-3 text-sm rounded-full ${
                          planValues[selectedPlan][section as keyof PlanData].includes(item)
                            ? "bg-[#442873] text-white"
                            : "text-[#373D3F] border-[1px] border-[#373D3F]"
                        }`}
                      >
                        <span className="font-normal">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            <div className="col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-2">
              {Object.entries(allOptions)
                .slice(3, 7)
                .map(([section, options]) => (
                  <div key={section}>
                    <h2 className="text-base font-medium text-[#373D3F] mb-1 capitalize">
                      {section.replace(/([A-Z])/g, " $1").trim()}
                    </h2>
                    <ul className="space-y-1">
                      {options.map((item) => (
                        <li
                          key={item}
                          className={`py-1 px-3 text-sm rounded-full ${
                            planValues[selectedPlan][section as keyof PlanData].includes(item)
                              ? "bg-[#442873] text-white"
                              : "text-[#373D3F] border-[1px] border-[#373D3F]"
                          }`}
                        >
                          <span className="font-normal">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div className="flex flex-row gap-x-1 mt-3">
          <div>
            <Button
              type="secondary"
              classname="w-[120px] bg-primary-600 text-white p-2 rounded-full"
              rounded="full"
              handleClick={() => naviagate("/signup/profile")}
            >
              <span className="font-normal">Back</span>
            </Button>
          </div>

          <div>
            <Button
              classname="w-[120px] bg-primary-600 text-white p-2 rounded-full"
              rounded="full"
              handleClick={handleNext}
            >
              <span className="font-normal">Next</span>
            </Button>
          </div>
        </div>
      </div>
    </SignUpLayout>
  );
};

export default UserPlan;
