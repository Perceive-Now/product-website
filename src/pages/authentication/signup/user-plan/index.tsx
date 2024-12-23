import React, { useState } from "react";
import SignUpLayout from "../_components/layout";
import Button from "src/components/reusable/button";

import allOptions from "./_constants/options";
import { useNavigate } from "react-router-dom";

import checkIcon from "./_assets/check-icon.svg";
import { Switch } from "@headlessui/react";

interface PlanData {
  monthlyPrice: number;
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
    monthlyPrice: 450,
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
    monthlyPrice: 2500,
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
    monthlyPrice: 9500,
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
  const [planType, setPlanType] = useState<"monthly" | "annually">("monthly");

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
            <div className="grid grid-cols-5 gap-2">
              <div className="col-span-2 flex justify-start items-end">
                {/* switch to monthly annullly toggle */}
                <div className="flex items-center gap-x-1">
                  <span className="text-sm">Monthly</span>
                  <Switch
                    checked={planType === "annually"}
                    onChange={() => setPlanType(planType === "monthly" ? "annually" : "monthly")}
                    className={`border border-appGray-500 relative p-[2px] flex items-center h-2 transition-all rounded-full w-4 mr-1 ${
                      planType === "monthly" ? "bg-transparent" : "bg-primary-600 justify-end"
                    }`}
                  >
                    <span
                      className={`translate-x-0 inline-block w-[12px] h-[12px] transform ${
                        planType === "annually" ? "bg-white" : "bg-primary-600"
                      } rounded-full`}
                    />
                  </Switch>
                </div>
                <span className="text-sm">Annually</span>
              </div>
              {/* // render the name and price of each plan */}
              {Object.keys(planValues).map((plan) => (
                <div
                  key={plan}
                  className={`col-span-1 flex flex-col items-center justify-center gap-y-3`}
                >
                  <div className="font-semibold">{plan}</div>
                  <div>
                    $
                    {planType === "monthly"
                      ? planValues[plan].monthlyPrice
                      : planValues[plan].monthlyPrice * 12}
                    /{planType === "monthly" ? "month" : "year"}
                  </div>
                  {/* // selection button  */}
                  <button
                    className={`w-full p-1 text-white rounded-full ${
                      selectedPlan === plan ? "bg-[#442873]" : "bg-[#9FA0A680]"
                    }`}
                    onClick={() => setSelectedPlan(plan as any)}
                  >
                    {selectedPlan === plan ? "Selected" : "Select"}
                  </button>
                </div>
              ))}
            </div>

            {/* // agents */}
            <div className="mt-5">
              <h2 className="text-lg text-[#373D3F] font-semibold mb-2">Agents</h2>
              <div className="flex flex-col gap-2">
                {allOptions.agents.map((option) => (
                  <div key={option} className="grid grid-cols-5">
                    <div className="col-span-2">
                      <span className="text-sm text-[#373D3F]">{option}</span>
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for standard */}
                      {planValues["Standard"].agents.includes(option) && <img src={checkIcon} />}
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for professional */}
                      {planValues["Professional"].agents.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for enterprise */}
                      {planValues["Enterprise"].agents.includes(option) && <img src={checkIcon} />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* // templates */}
            <div className="mt-5">
              <h2 className="text-lg text-[#373D3F] font-semibold mb-2">Templates</h2>
              <div className="flex flex-col gap-2">
                {allOptions.templates.map((option) => (
                  <div key={option} className="grid grid-cols-5">
                    <div className="col-span-2">
                      <span className="text-sm text-[#373D3F]">{option}</span>
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for standard */}
                      {planValues["Standard"].templates.includes(option) && <img src={checkIcon} />}
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for professional */}
                      {planValues["Professional"].templates.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for enterprise */}
                      {planValues["Enterprise"].templates.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* // dynamicSectionCustomization */}
            <div className="mt-5">
              <h2 className="text-lg text-[#373D3F] font-semibold mb-2">
                Dynamic Section Customization
              </h2>
              <div className="flex flex-col gap-2">
                {allOptions.dynamicSectionCustomization.map((option) => (
                  <div key={option} className="grid grid-cols-5">
                    <div className="col-span-2">
                      <span className="text-sm text-[#373D3F]">{option}</span>
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for standard */}
                      {planValues["Standard"].dynamicSectionCustomization.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for professional */}
                      {planValues["Professional"].dynamicSectionCustomization.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for enterprise */}
                      {planValues["Enterprise"].dynamicSectionCustomization.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* // knowNowChat */}
            <div className="mt-5">
              <h2 className="text-lg text-[#373D3F] font-semibold mb-2">Know Now Chat</h2>
              <div className="flex flex-col gap-2">
                {allOptions.knowNowChat.map((option) => (
                  <div key={option} className="grid grid-cols-5">
                    <div className="col-span-2">
                      <span className="text-sm text-[#373D3F]">{option}</span>
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for standard */}
                      {planValues["Standard"].knowNowChat.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for professional */}
                      {planValues["Professional"].knowNowChat.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for enterprise */}
                      {planValues["Enterprise"].knowNowChat.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* // quickViewReports */}
            <div className="mt-5">
              <h2 className="text-lg text-[#373D3F] font-semibold mb-2">Quick View Reports</h2>
              <div className="flex flex-col gap-2">
                {allOptions.quickViewReports.map((option) => (
                  <div key={option} className="grid grid-cols-5">
                    <div className="col-span-2">
                      <span className="text-sm text-[#373D3F]">{option}</span>
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for standard */}
                      {planValues["Standard"].quickViewReports.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for professional */}
                      {planValues["Professional"].quickViewReports.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for enterprise */}
                      {planValues["Enterprise"].quickViewReports.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* // explainability */}
            <div className="mt-5">
              <h2 className="text-lg text-[#373D3F] font-semibold mb-2">Explainability</h2>
              <div className="flex flex-col gap-2">
                {allOptions.explainability.map((option) => (
                  <div key={option} className="grid grid-cols-5">
                    <div className="col-span-2">
                      <span className="text-sm text-[#373D3F]">{option}</span>
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for standard */}
                      {planValues["Standard"].explainability.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for professional */}
                      {planValues["Professional"].explainability.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for enterprise */}
                      {planValues["Enterprise"].explainability.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* // reportFormats */}
            <div className="mt-5">
              <h2 className="text-lg text-[#373D3F] font-semibold mb-2">Report Formats</h2>
              <div className="flex flex-col gap-2">
                {allOptions.reportFormats.map((option) => (
                  <div key={option} className="grid grid-cols-5">
                    <div className="col-span-2">
                      <span className="text-sm text-[#373D3F]">{option}</span>
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for standard */}
                      {planValues["Standard"].reportFormats.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for professional */}
                      {planValues["Professional"].reportFormats.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                    <div className="col-span-1 place-items-center">
                      {/* render check icon for enterprise */}
                      {planValues["Enterprise"].reportFormats.includes(option) && (
                        <img src={checkIcon} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
