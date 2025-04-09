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
import CustmizationForm from "./CustmizationForm";
import { API_PROD_URL } from "src/utils/axios";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";

// Define the structure for options
// Define options

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
        `${API_PROD_URL}/agents/rename_thread/${userId}/${searchParams.get(
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
        // report_depth: {
        //   selected: selectedOptions.reportScopeOptions,
        //   other:
        //     customInput?.["reportScopeOptions"]?.["Other"] ||
        //     customInput?.["Quick Sub-Topic Summaries"]?.["Other"] ||
        //     "",
        // },
        report_format: {
          selected: selectedOptions.reportFormatOptions,
          other: customInput?.["reportFormatOptions"]?.["Other"] || "",
        },
        // visual_style: {
        //   selected: selectedOptions.visualStyleOptions,
        //   other: customInput?.["visualStyleOptions"]?.["Other"] || "",
        // },
        // number_of_charts: {
        //   selected: selectedOptions.chartsOptions,
        //   other: customInput?.["chartsOptions"]?.["Other"] || "",
        // },
        citations: {
          selected: selectedOptions.citationsOptions,
          other: customInput?.["citationsOptions"]?.["Other"] || "",
        },
        report_tone: {
          selected: selectedOptions.reportToneOptions,
          other: customInput?.["reportToneOptions"]?.["Other"] || "",
        },
        // collaboration_needs: {
        //   selected: selectedOptions.collaborationOptions,
        //   other: customInput?.["collaborationOptions"]?.["Other"] || "",
        // },
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
        other: additionalSummary
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
    <div className="space-y-2 w-full bg-[#FFFFFF] z-10 pb-[7%]">      
            
      <div className="p-1 pl-0">
        <div className="flex justify-start items-center py-3">
          <Link to="/my-agent-reports">
            <p className="mr-4 text-secondary-800 flex items-center">
              <ArrowLeftIcon className="mr-1" />
              Back
            </p>
          </Link>
        </div>
        <h2 className="text-lg font-semibold mt-3 mb-0">Report Customization</h2>
      </div>

      <div className="p-1 pl-0 pt-0">
        {/* <div className="text-start text-black mt-2 text-[16px] leading-[19.2px] font-normal">
          <p>Customize your report to match your needs.</p>
          <p>
            <span className="text-[#FFA300] font-medium">Choose</span> the format, level of detail,
            and key insights to get the most relevant results!
          </p>
        </div> */}

        <div className="mb-2">
          <h2 className="text-secondary-800 text-base mb-1 font-medium">
            Report name <span className="text-red-500 ml-0">*</span>
          </h2>

          <div className="rounded-lg border border-gray-300">
            <input
              className="w-full p-2 max-h-6 outline-none rounded-lg text-sm"
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

        <CustmizationForm
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
          customInput={customInput}
          setCustomInput={setCustomInput}
        />

        <div className="mt-5">
          <h6 className="font-medium text-secondary-800 mb-1 text-base font-nunito">
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
                "mt-1 p-[10px] max-h-6 w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                "border-gray-300 focus:border-primary-500 focus:ring-primary-500",
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
          className="bg-[#442873] rounded-[32px] py-[10px] px-4 text-base text-white cursor-pointer"
          onClick={submitFinalReport}
        >
          {!submitting ? "Submit" : <LoadingIcon className="animate-spin text-black" />}
          
        </div>
      </div>
    </div>
  );
};

export default AIReportCustomization;
