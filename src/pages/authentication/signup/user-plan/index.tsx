import React, { useState } from "react";
import SignUpLayout from "../_components/layout";
import Button from "src/components/reusable/button";

import allOptions, { subAgentsDescription } from "./_constants/options";
import { useNavigate } from "react-router-dom";

import checkIcon from "./_assets/check-icon.svg";
import { Switch } from "@headlessui/react";
import { getCompanies, getUserProfile, updateUserProfile } from "src/utils/api/userProfile";
import toast from "react-hot-toast";

import infoSvg from "./_assets/info-icon.svg";

import { descriptions } from "./_constants/options";
import Modal from "src/components/reusable/modal";
import {
  description,
  ReportContentCustomizationModal,
  ReportDesignCustomizationModal,
} from "./_constants/tier-modal";

interface PlanData {
  monthlyPrice: number;
  agents: string[];
  datasets: string[];
  reportDesignCustomization: string[];
  reportContentCustomization: string[];
  templates: string[];
  quickViewReports: string[];
  dynamicSectionCustomization: string[];
  explainability: string[];
  knowNowChat: string[];
  reportFormats: string[];
}

// Define plan values for each plan
const planValues: { [key: string]: PlanData } = {
  Launch: {
    monthlyPrice: 450,
    agents: ["Startup diligence", "Portfolio support", "Fundraising strategy", "Market strategy"],
    datasets: [],
    reportDesignCustomization: ["Font & Color Customization"],
    reportContentCustomization: [],
    templates: ["UI-based options for pre-built templates"],
    quickViewReports: ["Single-Page Summaries", "Simplified Tone"],
    dynamicSectionCustomization: [
      "Add/remove key metrics (e.g., market, competitors, funding strategy)",
    ],
    explainability: ["Basic Stat Explanations", "Source Citations"],
    knowNowChat: ["Hyper-specialized for market and patent", "Delivers strategic recommendations"],
    reportFormats: ["pdf"],
  },
  Accelerate: {
    monthlyPrice: 2500,
    agents: [
      "Startup diligence",
      "Portfolio support",
      "Fundraising strategy",
      "Market strategy",
      "Technology & R&D",
      "Product & Engineering",
      "Marketing & Sales",
      "Finance & Strategy",
      "Legal & Compliance",
      "Report on Anything",
    ],
    datasets: [
      "Custom Dataset Integration",
      "Real-Time Market Insights",
      "Historical and Trend Analysis",
    ],
    reportDesignCustomization: ["Font & Color Customization", "Logo & Branding Integration"],
    reportContentCustomization: ["Report Tone", "Charts and Visuals", "Visual Style"],
    templates: [
      "UI-based options for pre-built templates",
      "Semi-customizable templates tailored to professional goals",
    ],
    quickViewReports: ["Single-Page Summaries", "Simplified Tone", "Investor-Centric Insights"],
    dynamicSectionCustomization: [
      "Add/remove key metrics (e.g., market, competitors, funding strategy)",
      "Enhanced customization with UI-based smart options",
    ],
    explainability: [
      "Basic Stat Explanations",
      "Source Citations",
      "Logical Breakdown Layers",
      "Editable Data & Metrics",
    ],
    knowNowChat: [
      "Hyper-specialized for market and patent",
      "Delivers strategic recommendations",
      "Interactive visual-first insights",
      "Predictive scenario modeling",
      "Fine-tuned for key industries",
    ],
    reportFormats: ["pdf", "docx"],
  },
  Ascend: {
    monthlyPrice: 9500,
    agents: [
      "Startup diligence",
      "Portfolio support",
      "Fundraising strategy",
      "Market strategy",
      "Technology & R&D",
      "Product & Engineering",
      "Marketing & Sales",
      "Finance & Strategy",
      "Legal & Compliance",
      "Report on Anything",
      "Corporate Development",
    ],
    datasets: [
      "Custom Dataset Integration",
      "Real-Time Market Insights",
      "Predictive Analytics",
      "AI-Augmented Cross-Validation",
      "Historical and Trend Analysis",
      "Hybrid Data Layering",
      "Proprietary Knowledge Graphs",
      "Verified Multi-Source Insights",
    ],
    reportDesignCustomization: [
      "Font & Color Customization",
      "Logo & Branding Integration",
      "Layout & Design Flexibility",
    ],
    reportContentCustomization: [
      "Report Tone",
      "Charts and Visuals",
      "Visual Style",
      "Citation Style",
    ],
    templates: [
      "UI-based options for pre-built templates",
      "Semi-customizable templates tailored to professional goals",
      "Fully UI-customizable templates for enterprise-wide insights",
    ],
    quickViewReports: [
      "Single-Page Summaries",
      "Simplified Tone",
      "Investor-Centric Insights",
      "Stakeholder-Specific Reports",
    ],
    dynamicSectionCustomization: [
      "Add/remove key metrics (e.g., market, competitors, funding strategy)",
      "Enhanced customization with UI-based smart options",
      "Fully customizable sections through advanced UI tools",
    ],
    explainability: [
      "Basic Stat Explanations",
      "Source Citations",
      "Logical Breakdown Layers",
      "Editable Data & Metrics",
      "Advanced Multi-Layered Insights",
      "Forecasting Transparency",
    ],
    knowNowChat: [
      "Hyper-specialized for market and patent",
      "Delivers strategic recommendations",
      "Interactive visual-first insights",
      "Predictive scenario modeling",
      "Fine-tuned for key industries",
      "Streamlined for team collaboration",
      "Context-aware responses",
      "Predictive Modeling",
    ],
    reportFormats: ["pdf", "docx", "csv", "xlsx", "pptx"],
  },
};

const UserPlan = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<"Launch" | "Accelerate" | "Ascend">("Launch");
  const [planType, setPlanType] = useState<"monthly" | "annually">("monthly");
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // for description modal
  const [isPriceModal, setIsPriceModal] = useState(false); // for price modal
  const [subAgentModal, setSubAgentModal] = useState(false); // for sub agent modal

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [currentReportModal, setCurrentReportModal] = useState<React.ReactNode | null>(null);

  const [subAgentDescription, setSubAgentDescription] = useState<string | null>(
    description.launch[1],
  );
  const [priceDescription, setPriceDescription] = useState<string | null>(description.launch[0]);
  const [currentDescription, setCurrentDescription] = useState<string | null>(null);

  const openDescriptionModal = (field: keyof typeof descriptions) => {
    setCurrentDescription(descriptions[field].join("\n")); // Join the array of descriptions for display
    setIsModalOpen(true);
  };

  const togglePriceModal = () => {
    setIsPriceModal(!isPriceModal);
  };

  const handleNext = async () => {
    const selectedPlanData = planValues[selectedPlan];
    console.log("Selected Plan:", selectedPlan);
    console.log("Plan Data:", selectedPlanData);
    // You can now proceed with the next step using selectedPlan and selectedPlanData
    setIsLoading(true);
    try {

      const UserDetails = await getUserProfile();
      const totalCompanies = await getCompanies();
      const company_name = totalCompanies.find((c) => c.id === UserDetails.company_id)?.name;

      const values = {
        subscription_type: selectedPlan,
        registration_completed: true,
        company_name,
      };

      const result = await updateUserProfile(values);
      if (result.status === 200) {
        toast.success("Plan selected successfully" , {
          position: "top-right"
        });
        navigate("/signup/team");
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
                  <div className="font-semibold">
                    {plan}

                    <img
                      src={infoSvg}
                      className="w-[13px] h-[13px] cursor-pointer inline-block ml-1"
                      onClick={() => {
                        switch (plan.toLowerCase()) {
                          case "launch":
                            setPriceDescription(description.launch[0]);
                            break;
                          case "accelerate":
                            setPriceDescription(description.accelerate[0]);
                            break;
                          case "ascend":
                            setPriceDescription(description.ascend[0]);
                            break;
                        }
                        setIsPriceModal(true);
                      }}
                    />
                  </div>
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
              <h2 className="text-lg text-[#373D3F] font-semibold mb-2">
                Reports
                <span
                  onClick={() => openDescriptionModal("agents")}
                  className="text-sm text-[#373D3F] cursor-pointer"
                >
                  <img src={infoSvg} className="w-2 h-2 inline-block ml-1" />
                </span>
              </h2>
              <div className="flex flex-col gap-2">
                {allOptions.agents.map((option) => (
                  <div key={option}>
                    <div className="grid grid-cols-5">
                      <div className="col-span-2">
                        <span className="text-sm text-[#373D3F]">{option}</span>
                        <img
                          src={infoSvg}
                          className="w-[13px] h-[13px] cursor-pointer inline-block ml-1"
                          onClick={() => {
                            switch (option) {
                              case "Startup diligence":
                                setSubAgentDescription(
                                  subAgentsDescription.agents["Startup diligence"][0],
                                );
                                break;
                              case "Portfolio support":
                                setSubAgentDescription(
                                  subAgentsDescription.agents["Portfolio support"][0],
                                );
                                break;
                              case "Fundraising strategy":
                                setSubAgentDescription(
                                  subAgentsDescription.agents["Fundraising strategy"][0],
                                );
                                break;
                              case "Market strategy":
                                setSubAgentDescription(
                                  subAgentsDescription.agents["Market strategy"][0],
                                );
                                break;
                              case "Technology & R&D":
                                setSubAgentDescription(
                                  subAgentsDescription.agents["Technology & R&D"][0],
                                );
                                break;
                              case "Product & Engineering":
                                setSubAgentDescription(
                                  subAgentsDescription.agents["Product & Engineering"][0],
                                );
                                break;
                              case "Marketing & Sales":
                                setSubAgentDescription(
                                  subAgentsDescription.agents["Marketing & Sales"][0],
                                );
                                break;
                              case "Finance & Strategy":
                                setSubAgentDescription(
                                  subAgentsDescription.agents["Finance & Strategy"][0],
                                );
                                break;
                              case "Legal & Compliance":
                                setSubAgentDescription(
                                  subAgentsDescription.agents["Legal & Compliance"][0],
                                );
                                break;
                              case "Report on Anything":
                                setSubAgentDescription(
                                  subAgentsDescription.agents["Report on Anything"][0],
                                );
                                break;
                              case "Corporate Development":
                                setSubAgentDescription(
                                  subAgentsDescription.agents["Corporate Development"][0],
                                );
                                break;
                            }
                            setSubAgentModal(true);
                          }}
                        />
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Launch */}
                        {planValues["Launch"].agents.includes(option) && <img src={checkIcon} />}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Accelerate */}
                        {planValues["Accelerate"].agents.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Ascend */}
                        {planValues["Ascend"].agents.includes(option) && <img src={checkIcon} />}
                      </div>
                    </div>
                    <hr className="mt-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* // datasets */}
            <div className="mt-5">
              <h2 className="text-lg text-[#373D3F] font-semibold mb-2">
                Datasets
                <span
                  onClick={() => openDescriptionModal("datasets")}
                  className="text-sm text-[#373D3F] cursor-pointer"
                >
                  <img src={infoSvg} className="w-2 h-2 inline-block ml-1" />
                </span>
              </h2>
              <div className="flex flex-col gap-2">
                {allOptions.datasets.map((option) => (
                  <div key={option}>
                    <div className="grid grid-cols-5">
                      <div className="col-span-2">
                        <span className="text-sm text-[#373D3F]">{option}</span>
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Launch */}
                        {planValues["Launch"].datasets.includes(option) && <img src={checkIcon} />}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Accelerate */}
                        {planValues["Accelerate"].datasets.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Ascend */}
                        {planValues["Ascend"].datasets.includes(option) && <img src={checkIcon} />}
                      </div>
                    </div>
                    <hr className="mt-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* // reportDesignCustomization */}
            <div className="mt-5">
              <h2 className="text-lg text-[#373D3F] font-semibold mb-2">
                Report Design Customization
                <span
                  className="text-sm text-[#373D3F] cursor-pointer"
                >
                  <img
                    src={infoSvg}
                    className="w-2 h-2 inline-block ml-1"
                    onClick={() => {
                      setIsReportModalOpen(true);
                      setCurrentReportModal(ReportDesignCustomizationModal);
                    }}
                  />
                </span>
              </h2>
              <div className="flex flex-col gap-2">
                {allOptions.reportDesignCustomization.map((option) => (
                  <div key={option}>
                    <div className="grid grid-cols-5">
                      <div className="col-span-2">
                        <span className="text-sm text-[#373D3F]">{option}</span>

                        <img
                          src={infoSvg}
                          className="w-[13px] h-[13px] cursor-pointer inline-block ml-1"
                          onClick={() => {
                            switch (option) {
                              case "Font & Color Customization":
                                setSubAgentDescription(
                                  subAgentsDescription.reportDesignCustomization[
                                    "Font & Color Customization"
                                  ].join("\n"),
                                );
                                break;
                              case "Logo & Branding Integration":
                                setSubAgentDescription(
                                  subAgentsDescription.reportDesignCustomization[
                                    "Logo & Branding Integration"
                                  ].join("\n"),
                                );
                                break;
                              case "Layout & Design Flexibility":
                                setSubAgentDescription(
                                  subAgentsDescription.reportDesignCustomization[
                                    "Layout & Design Flexibility"
                                  ].join("\n"),
                                );
                                break;
                            }
                            setSubAgentModal(true);
                          }}
                        />
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Launch */}
                        {planValues["Launch"].reportDesignCustomization.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Accelerate */}
                        {planValues["Accelerate"].reportDesignCustomization.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Ascend */}
                        {planValues["Ascend"].reportDesignCustomization.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                    </div>
                    <hr className="mt-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* // reportContentCustomization */}
            <div className="mt-5">
              <h2 className="text-lg text-[#373D3F] font-semibold mb-2">
                Report Content Customization
                <span className="text-sm text-[#373D3F] cursor-pointer">
                  <img
                    src={infoSvg}
                    className="w-2 h-2 inline-block ml-1"
                    onClick={() => {
                      setIsReportModalOpen(true);
                      setCurrentReportModal(ReportContentCustomizationModal);
                    }}
                  />
                </span>
              </h2>
              <div className="flex flex-col gap-2">
                {allOptions.reportContentCustomization.map((option) => (
                  <div key={option}>
                    <div className="grid grid-cols-5">
                      <div className="col-span-2">
                        <span className="text-sm text-[#373D3F]">{option}</span>
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Launch */}
                        {planValues["Launch"].reportContentCustomization.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Accelerate */}
                        {planValues["Accelerate"].reportContentCustomization.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Ascend */}
                        {planValues["Ascend"].reportContentCustomization.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                    </div>
                    <hr className="mt-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* // knowNowChat */}
            <div className="mt-5">
              <h2 className="text-lg text-[#373D3F] font-semibold mb-2">
                Know Now Chat
                <span
                  onClick={() => openDescriptionModal("knowNowChat")}
                  className="text-sm text-[#373D3F] cursor-pointer"
                >
                  <img src={infoSvg} className="w-2 h-2 inline-block ml-1" />
                </span>
              </h2>
              <div className="flex flex-col gap-2">
                {allOptions.knowNowChat.map((option) => (
                  <div key={option}>
                    <div className="grid grid-cols-5">
                      <div className="col-span-2">
                        <span className="text-sm text-[#373D3F]">{option}</span>

                        <img
                          src={infoSvg}
                          className="w-[13px] h-[13px] cursor-pointer inline-block ml-1"
                          onClick={() => {
                            switch (option) {
                              case "Basic Responses":
                                setSubAgentDescription(
                                  subAgentsDescription.knowNowChat["Basic Responses"][0],
                                );
                                break;
                              case "Analytical Insights":
                                setSubAgentDescription(
                                  subAgentsDescription.knowNowChat["Analytical Insights"][0],
                                );
                                break;
                              case "Visual Data Representation":
                                setSubAgentDescription(
                                  subAgentsDescription.knowNowChat["Visual Data Representation"][0],
                                );
                                break;
                              case "Interactive Analysis":
                                setSubAgentDescription(
                                  subAgentsDescription.knowNowChat["Interactive Analysis"][0],
                                );
                                break;
                              case "Comprehensive Analytics":
                                setSubAgentDescription(
                                  subAgentsDescription.knowNowChat["Comprehensive Analytics"][0],
                                );
                                break;
                              case "Real-time Web Search":
                                setSubAgentDescription(
                                  subAgentsDescription.knowNowChat["Real-time Web Search"][0],
                                );
                                break;
                              case "Predictive Modeling":
                                setSubAgentDescription(
                                  subAgentsDescription.knowNowChat["Predictive Modeling"][0],
                                );
                                break;
                            }
                            setSubAgentModal(true);
                          }}
                        />
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Launch */}
                        {planValues["Launch"].knowNowChat.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Accelerate */}
                        {planValues["Accelerate"].knowNowChat.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Ascend */}
                        {planValues["Ascend"].knowNowChat.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                    </div>
                    <hr className="mt-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* // quickViewReports */}
            <div className="mt-5">
              <h2 className="text-lg text-[#373D3F] font-semibold mb-2">
                Quick View Reports
                <span
                  onClick={() => openDescriptionModal("quickViewReports")}
                  className="text-sm text-[#373D3F] cursor-pointer"
                >
                  <img src={infoSvg} className="w-2 h-2 inline-block ml-1" />
                </span>
              </h2>
              <div className="flex flex-col gap-2">
                {allOptions.quickViewReports.map((option) => (
                  <div key={option}>
                    <div className="grid grid-cols-5">
                      <div className="col-span-2">
                        <span className="text-sm text-[#373D3F]">{option}</span>

                        <img
                          src={infoSvg}
                          className="w-[13px] h-[13px] cursor-pointer inline-block ml-1"
                          onClick={() => {
                            switch (option) {
                              case "Single-Page Summaries":
                                setSubAgentDescription(
                                  subAgentsDescription.quickViewReports["Single-Page Summaries"][0],
                                );
                                break;
                              case "Simplified Tone":
                                setSubAgentDescription(
                                  subAgentsDescription.quickViewReports["Simplified Tone"][0],
                                );
                                break;
                              case "Investor-Centric Insights":
                                setSubAgentDescription(
                                  subAgentsDescription.quickViewReports[
                                    "Investor-Centric Insights"
                                  ][0],
                                );
                                break;
                              case "Stakeholder-Specific Reports":
                                setSubAgentDescription(
                                  subAgentsDescription.quickViewReports[
                                    "Stakeholder-Specific Reports"
                                  ][0],
                                );
                                break;
                            }
                            setSubAgentModal(true);
                          }}
                        />
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Launch */}
                        {planValues["Launch"].quickViewReports.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Accelerate */}
                        {planValues["Accelerate"].quickViewReports.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Ascend */}
                        {planValues["Ascend"].quickViewReports.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                    </div>
                    <hr className="mt-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* // explainability */}
            <div className="mt-5">
              <h2 className="text-lg text-[#373D3F] font-semibold mb-2">
                Explainable AI
                <span
                  onClick={() => openDescriptionModal("explainability")}
                  className="text-sm text-[#373D3F] cursor-pointer"
                >
                  <img src={infoSvg} className="w-2 h-2 inline-block ml-1" />
                </span>
              </h2>
              <div className="flex flex-col gap-2">
                {allOptions.explainability.map((option) => (
                  <div key={option}>
                    <div className="grid grid-cols-5">
                      <div className="col-span-2">
                        <span className="text-sm text-[#373D3F]">{option}</span>

                        <img
                          src={infoSvg}
                          className="w-[13px] h-[13px] cursor-pointer inline-block ml-1"
                          onClick={() => {
                            switch (option) {
                              case "Basic Stat Explanations":
                                setSubAgentDescription(
                                  subAgentsDescription.explainability["Basic Stat Explanations"][0],
                                );
                                break;
                              case "Source Citations":
                                setSubAgentDescription(
                                  subAgentsDescription.explainability["Source Citations"][0],
                                );
                                break;
                              case "Logical Breakdown Layers":
                                setSubAgentDescription(
                                  subAgentsDescription.explainability[
                                    "Logical Breakdown Layers"
                                  ][0],
                                );
                                break;
                              case "Editable Data & Metrics":
                                setSubAgentDescription(
                                  subAgentsDescription.explainability["Editable Data & Metrics"][0],
                                );
                                break;
                              case "Advanced Multi-Layered Insights":
                                setSubAgentDescription(
                                  subAgentsDescription.explainability[
                                    "Advanced Multi-Layered Insights"
                                  ][0],
                                );
                                break;
                              case "Forecasting Transparency":
                                setSubAgentDescription(
                                  subAgentsDescription.explainability[
                                    "Forecasting Transparency"
                                  ][0],
                                );
                                break;
                            }
                            setSubAgentModal(true);
                          }}
                        />
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Launch */}
                        {planValues["Launch"].explainability.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Accelerate */}
                        {planValues["Accelerate"].explainability.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Ascend */}
                        {planValues["Ascend"].explainability.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                    </div>
                    <hr className="mt-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* // templates */}
            <div className="mt-5 hidden">
              <h2 className="text-lg text-[#373D3F] font-semibold mb-2">
                Templates
                <span
                  onClick={() => openDescriptionModal("templates")}
                  className="text-sm text-[#373D3F] cursor-pointer"
                >
                  <img src={infoSvg} className="w-2 h-2 inline-block ml-1" />
                </span>
              </h2>
              <div className="flex flex-col gap-2">
                {allOptions.templates.map((option) => (
                  <div key={option}>
                    <div className="grid grid-cols-5">
                      <div className="col-span-2">
                        <span className="text-sm text-[#373D3F]">{option}</span>
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Launch */}
                        {planValues["Launch"].templates.includes(option) && <img src={checkIcon} />}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Accelerate */}
                        {planValues["Accelerate"].templates.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Ascend */}
                        {planValues["Ascend"].templates.includes(option) && <img src={checkIcon} />}
                      </div>
                    </div>
                    <hr className="mt-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* // dynamicSectionCustomization */}
            <div className="mt-5 hidden">
              <h2 className="text-lg text-[#373D3F] font-semibold mb-2">
                Dynamic Section Customization
                <span
                  onClick={() => openDescriptionModal("dynamicSectionCustomization")}
                  className="text-sm text-[#373D3F] cursor-pointer"
                >
                  <img src={infoSvg} className="w-2 h-2 inline-block ml-1" />
                </span>
              </h2>
              <div className="flex flex-col gap-2">
                {allOptions.dynamicSectionCustomization.map((option) => (
                  <div key={option}>
                    <div className="grid grid-cols-5">
                      <div className="col-span-2">
                        <span className="text-sm text-[#373D3F]">{option}</span>
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Launch */}
                        {planValues["Launch"].dynamicSectionCustomization.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Accelerate */}
                        {planValues["Accelerate"].dynamicSectionCustomization.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Ascend */}
                        {planValues["Ascend"].dynamicSectionCustomization.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                    </div>
                    <hr className="mt-1" />
                  </div>
                ))}
              </div>
            </div>

            {/* // reportFormats */}
            <div className="mt-5">
              <h2 className="text-lg text-[#373D3F] font-semibold mb-2">
                Report Formats
                <span
                  onClick={() => openDescriptionModal("reportFormats")}
                  className="text-sm text-[#373D3F] cursor-pointer"
                >
                  <img src={infoSvg} className="w-2 h-2 inline-block ml-1" />
                </span>
              </h2>
              <div className="flex flex-col gap-2">
                {allOptions.reportFormats.map((option) => (
                  <div key={option}>
                    <div className="grid grid-cols-5">
                      <div className="col-span-2">
                        <span className="text-sm text-[#373D3F]">{option}</span>
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Launch */}
                        {planValues["Launch"].reportFormats.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Accelerate */}
                        {planValues["Accelerate"].reportFormats.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                      <div className="col-span-1 place-items-center">
                        {/* render check icon for Ascend */}
                        {planValues["Ascend"].reportFormats.includes(option) && (
                          <img src={checkIcon} />
                        )}
                      </div>
                    </div>
                    <hr className="mt-1" />
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
              handleClick={() => navigate("/signup/profile")}
            >
              <span className="font-normal">Back</span>
            </Button>
          </div>

          <div>
            <Button
              classname="w-[120px] bg-primary-600 text-white p-2 rounded-full"
              rounded="full"
              handleClick={handleNext}
              loading={isLoading}
            >
              <span className="font-normal">Next</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Modal for Descriptions */}
      {isModalOpen && (
        <Modal open={isModalOpen} handleOnClose={() => setIsModalOpen(false)}>
          <div className="p-4 text-left bg-white rounded-lg max-w-2xl">
            <h2 className="text-lg font-semibold mb-2">Description</h2>
            <p className="text-base text-gray-600 whitespace-pre-line leading-7">
              {currentDescription}
            </p>
          </div>
        </Modal>
      )}

      {/* Modal for Price */}
      {isPriceModal && (
        <Modal open={isPriceModal} handleOnClose={togglePriceModal}>
          <div className="p-4 text-left bg-white rounded-lg max-w-2xl">
            <p className="text-lg whitespace-pre-line leading-7">{priceDescription}</p>
          </div>
        </Modal>
      )}

      {/* Modal for Sub Agent Description */}
      {subAgentModal && (
        <Modal open={subAgentModal} handleOnClose={() => setSubAgentModal(false)}>
          <div className="p-4 text-left bg-white rounded-lg max-w-2xl">
            <p className="text-lg whitespace-pre-line leading-7">{subAgentDescription}</p>
          </div>
        </Modal>
      )}

      {/* Modal for Report Design Customization */}
      {isReportModalOpen && (
        <Modal open={isReportModalOpen} handleOnClose={() => setIsReportModalOpen(false)}>
          <div className="p-4 text-left bg-white rounded-lg max-w-2xl">{currentReportModal}</div>
        </Modal>
      )}
    </SignUpLayout>
  );
};

export default UserPlan;
