import { useMemo, useState, useRef, useEffect } from "react";
import "./index.css";
//
import { Link } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
//
import Button from "src/components/reusable/button";
import TrashIcon from "src/components/icons/common/trash";
import { UploadIcon } from "src/components/icons";
import TakeoffScreen from "./takeoffScreen";
import jsCookie from "js-cookie";
import toast from "react-hot-toast";
import { LoadingIcon } from "src/components/icons";
import { useParams } from "react-router-dom";
import { Tab } from "@headlessui/react";
import { useNavigate, useLocation } from "react-router-dom";

import * as yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import SelectBox from "./selectBox";
import axios from "axios";
import { ACTIVITY_COMMENT } from "src/utils/constants";
import { addActivityComment } from "src/stores/vs-product";
import AgentHead from "src/pages/product/ai-agent/AgentHead";
import CustmizationForm from "src/pages/product/ai-agent/CustmizationForm";
import DotLoader from "src/components/reusable/dot-loader";
import { API_PROD_URL } from "src/utils/axios";
/**
 *
 */

export const Texts = [
  "",
  "single page summaries",
  "stakeholder specific reports",
  "investor centric insights",
  "single page summaries",
  "stakeholder specific reports",
  "investor centric insights",
];

const listContent = [
  "PDF (.pdf) - Portable Document Format",
  "Microsoft Excel (.xls, .xlsx)",
  "Microsoft Word (.docx)",
  "Text Files (.txt)",
  "PowerPoint (.ppt,.pptx)",
  "OpenDocument Text (.odt)",
  "Keynote (.key)",
];

const urlContent = [
  "Known Competitor Websites",
  "Relevant Industry Websites",
  "Portfolio Company Websites",
  "Company Website",
  "Other Relevant URLs",
];

interface INewReportValues {
  projectName: string;
}

interface IRequirementValues {
  reportName: string;
  usecase: string;
  questions: Array<string>;
}

interface ICustomReportValues {
  additional: string;
}

const QuickReports = () => {
  const navigate = useNavigate();
  const location = useLocation();
  console.log("ppppppp", location.state);
  const { id } = useParams();
  const urlParams = new URLSearchParams(location.search);
  const project_name = urlParams.get("project");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const userId = jsCookie.get("user_id");
  const [projectId, setProjectId] = useState(id);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [pastedURLs, setPastedURLs] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState<string>("");
  const [dragging, setDragging] = useState<boolean>(false);
  const [step, setStep] = useState(id ? 2 : 1);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [customReport, setCustomReport] = useState({
    report_tone: "",
    no_of_charts: "",
    visual_style: "",
    citations: "",
    format: [],
    additional: "",
  });
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputFromAnimated = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const AnimatedPlaceholder = ({ className, onClick }: { className: any; onClick: () => void }) => {
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

  const changeHighlight = () => {
    setHighlight(true);
    setTimeout(() => setHighlight(false), 1500);
  };

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      const fileList = Array.from(files);
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.oasis.opendocument.text",
        "application/vnd.apple.keynote",
      ];

      const invalidFiles = fileList.filter((file: any) => {
        const isInvalidType = !allowedTypes.includes(file.type);
        const isInvalidSize = file.size > 200 * 1024 * 1024;
        if (isInvalidType || isInvalidSize) {
          return true;
        }
        return false;
      });

      if (invalidFiles.length > 0) {
        toast.error("Invalid file uploaded.");
      } else {
        setTimeout(() => {
          setUploadedFiles((prevFiles: any) => [...prevFiles, ...fileList]);
        }, 1500);
        changeHighlight();
      }
    }
    // const fileList = Array.from(files).map((file: any) => file.name);
    // setUploadedFiles((prevFiles) => [...prevFiles, ...fileList]);
  };

  const handlePasteURL = () => {
    if (urlInput) {
      setPastedURLs((prevURLs) => [...prevURLs, urlInput]);
      setUrlInput("");
    }
  };

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    if (files) {
      const fileList = Array.from(files);
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
        "application/vnd.ms-powerpoint",
        "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        "application/vnd.oasis.opendocument.text",
        "application/vnd.apple.keynote",
      ];

      const invalidFiles = fileList.filter((file: any) => {
        const isInvalidType = !allowedTypes.includes(file.type);
        const isInvalidSize = file.size > 200 * 1024 * 1024;
        if (isInvalidType || isInvalidSize) {
          return true;
        }
        return false;
      });

      if (invalidFiles.length > 0) {
        toast.error("Invalid file uploaded.");
      } else {
        setTimeout(() => {
          setUploadedFiles((prevFiles: any) => [...prevFiles, ...fileList]);
        }, 1500);
        changeHighlight();
      }
    }
  };

  const handleSubmit = async (values: IRequirementValues) => {
    setStep(3);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const formInitialValue: INewReportValues = {
    projectName: "",
  };

  const formResolver = yup.object().shape({
    projectName: yup.string().trim().required("Project name is required"),
  });

  const {
    register,
    formState,
    handleSubmit: handleSubmitForm,
  } = useForm({
    defaultValues: formInitialValue,
    resolver: yupResolver(formResolver),
    mode: "onBlur",
  });

  const { errors } = formState;

  const projectRequitementInitialValue: IRequirementValues = {
    reportName: "",
    usecase: "",
    questions: ["", "", ""],
  };

  const projectFormResolver = yup.object().shape({
    reportName: yup.string().trim().required("Report name is required"),
    usecase: yup.string().trim().required("Primary objective is required"),
    questions: yup
      .array()
      .of(
        yup
          .string()
          .trim() // Remove leading/trailing spaces
          .required("Question is required"),
      )
      .min(3, "Array must contain at least 3 non-empty strings"), // Minimum 3 valid items
  });

  const {
    setValue,
    register: requirementRegister,
    formState: requirementFormState,
    handleSubmit: handleSubmitFormRequirement,
    getValues: requirementValues,
    control: requirementControl,
    setValue: setRequirementValue,
  } = useForm({
    defaultValues: projectRequitementInitialValue,
    resolver: yupResolver(projectFormResolver),
    mode: "onBlur",
  });

  const { errors: requirementErrors } = requirementFormState;

  const customReportInitialValue: ICustomReportValues = {
    additional: "",
  };

  const customReportFormResolver = yup.object().shape({
    // additional: yup.string().trim().required("Special Request is required"),
  });

  const {
    register: customReportRegister,
    formState: customReportFormState,
    handleSubmit: handleSubmitCustomReport,
    getValues: customReportValues,
    control: customReportControl,
    setValue: setCustomReportValue,
    setFocus,
  } = useForm({
    defaultValues: customReportInitialValue,
    resolver: yupResolver(customReportFormResolver),
    mode: "onBlur",
  });

  const { errors: customReportErrors } = customReportFormState;

  const additionalSummary = useWatch({
    control: customReportControl,
    name: "additional",
  });

  const requirementQuestions = useWatch({
    control: requirementControl,
    name: "questions",
  });

  useEffect(() => {
    if (location.state) {
      setValue("reportName", location.state.report_name || "");
      setValue("usecase", location.state.usecase || "");
      setDisabled(true);
    }
  }, [location.state]);

  const handleSubmitProject = async (values: INewReportValues) => {
    setLoading(true);
    const user_id = userId ?? "";

    const formData = {
      user_id: user_id,
      project_name: values.projectName,
      size: "0KB",
    };

    try {
      const response: any = await fetch(`${API_PROD_URL}/create-project/`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // id = data.project_id;
        setProjectId(data.project_id);
        const activityReponse = await addActivityComment(
          userId as string,
          `${ACTIVITY_COMMENT.PROJECT_ADDED} "${values.projectName}"`,
          data.project_id,
        );
        setStep(2);
      } else {
        toast.error("Unable to submit report");
      }

      console.log("response", response);
    } catch (e) {
      console.log("err", e);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlChange = (e: any) => {
    setUrlInput(e.target.value);
  };

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDelete = (index: number, type: "url" | "file") => {
    if (type === "url") {
      setPastedURLs((prevURLs) => prevURLs.filter((_, i) => i !== index));
    } else if (type === "file") {
      setUploadedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    }
  };

  const handleReportChange = (field: string, value: any) => {
    setCustomReport((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleAddMoreQuestions = () => {
    setRequirementValue("questions", [...requirementQuestions, ""]);
  };

  const removeQuestion = (quesIndex: number) => {
    const updatedQuestions = requirementQuestions.filter((ques, index) => index !== quesIndex);
    setRequirementValue("questions", updatedQuestions);
  };

  const handleFinalSubmitProject = async () => {
    setLoading(true);

    const values = requirementValues();

    const dataPayload: Record<string, string[]> = {};
    dataPayload.websites = pastedURLs;
    dataPayload.question = values.questions;
    dataPayload.format = customReport.format;

    try {
      const response: any = await axios.post(
        `${API_PROD_URL}/upload-files/?user_id=${userId}&project_id=${projectId}&report_name=${values.reportName}&usecase=${values.usecase}&report_tone=${customReport.report_tone}&no_of_charts=${customReport.no_of_charts}&citations=${customReport.citations}&visual_style=${customReport.visual_style}`,
        dataPayload,
      );

      if (response.status === 200) {
        await addActivityComment(
          userId as string,
          disabled ? ACTIVITY_COMMENT.REQUIREMENT_UPDATED : ACTIVITY_COMMENT.REQUIREMENT_ADDED,
          projectId as string,
        );
        if (uploadedFiles.length === 0) {
          setStep(4);
          return;
        }
        const formData = new FormData();

        uploadedFiles.forEach((file: File) => {
          formData.append("files", file);
        });
        try {
          const fileUploadResponse: any = await fetch(
            `${API_PROD_URL}/upload-files/${userId}/${projectId}/${response.data.report_id}`,
            {
              method: "POST",
              headers: { Accept: "application/json" },
              body: formData,
            },
          );

          if (fileUploadResponse.ok) {
            setStep(4);
          } else {
            toast.error("Unable to submit report");
          }
        } catch (e) {
          console.log("err", e);
        } finally {
          setLoading(false);
        }
      } else {
        toast.error("Unable to submit report", {
          position: "bottom-right",
        });
      }

      console.log("response", response);
    } catch (e) {
      console.log("err", e);
    } finally {
      setLoading(false);
    }

    // console.log("formData------", formData);
  };

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

  const [customInput, setCustomInput] = useState<Record<string, Record<string, string>>>({});

  const [highlight, setHighlight] = useState(false);

  return (
    <div className="space-y-[20px] w-full z-10 p-1">
      <AgentHead agentName="" />
      <div>
        {id ? (
          <div className="p-1 pl-0">
            <div className="flex justify-start items-center pt-3 pl-1">
              <p
                className="mr-4 text-secondary-800 flex items-center cursor-pointer"
                onClick={() => {
                  if (step === 3) {
                    setStep(2);
                  } else {
                    // navigate(`/my-reports/${id}?project=${project_name}`, {
                    //   state: { tab: 1 },
                    // });
                    navigate(`/my-projects`);
                  }
                }}
              >
                <ArrowLeftIcon className="mr-1" />
                Back
              </p>
            </div>
          </div>
        ) : (
          <div className="p-1 pl-0">
            <h6 className="text-lg font-semibold ml-0">
              {" "}
              Report management &gt; {step === 1 ? "New Project" : "Project Requirements"}
            </h6>
            <div className="flex justify-start items-center pt-3 pl-1">
              <p
                className="mr-4 text-secondary-800 flex items-center cursor-pointer"
                onClick={() => {
                  if (step === 3) {
                    setStep(2);
                  } else {
                    navigate(`/my-projects`);
                  }
                }}
              >
                <ArrowLeftIcon className="mr-1" />
                Back
              </p>
            </div>
          </div>
        )}

        {/* {id && step !== 3 && step !== 4 && (
          <div className="mt-2">
            <Tab.Group defaultIndex={1}>
              <Tab.List className="flex w-[15%] h-[45px]">
                <Tab
                  onClick={() => {
                    navigate(`/my-reports/${id}`);
                  }}
                  className={({ selected }) =>
                    `w-full text-base px-3 rounded-tl-md rounded-bl-md focus:outline-none font-nunito border-l border-t border-b border-appGray-600 ${
                      selected ? "text-white bg-primary-900" : "text-black"
                    }`
                  }
                >
                  Reports
                </Tab>
                <Tab
                  className={({ selected }) =>
                    `w-full text-base px-2 rounded-tr-md rounded-br-md focus:outline-none font-nunito border-r border-t border-b border-appGray-600 ${
                      selected ? "text-white bg-primary-900" : "text-black"
                    }`
                  }
                >
                  Requirements
                </Tab>
              </Tab.List>
            </Tab.Group>
          </div>
        )} */}
      </div>

      <div className="overflow-y-auto pb-[11%]">
        {step === 2 ? (
          <div className="">
            <form onSubmit={handleSubmitFormRequirement(handleSubmit)}>
              <div className="flex space-x-4">
                {/* First Part: File Upload and Paste URL */}
                <div className="w-1/2 space-y-4">
                  <div className="w-full">
                    <label htmlFor="fullName" className="block text-md  text-secondary-800">
                      Name your report <span className="text-red-500 ml-0">*</span>
                    </label>
                    <input
                      type="text"
                      id="reportName"
                      {...requirementRegister("reportName")}
                      // required
                      placeholder="Report Name"
                      disabled={disabled}
                      className={classNames(
                        "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                        disabled ? "bg-gray-400 cursor-not-allowed" : "",
                        requirementErrors.reportName
                          ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                          : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                      )}
                    />
                    {requirementErrors.reportName && (
                      <div className="mt-1 text-s text-danger-500">
                        {requirementErrors.reportName?.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-1">
                    <label htmlFor="industry" className="block text-md text-secondary-800">
                      Primary Objective <span className="text-red-500 ml-0">*</span>
                    </label>
                    <textarea
                      id="usecase"
                      disabled={disabled}
                      {...requirementRegister("usecase")}
                      placeholder="Describe the overall objective of the report"
                      className={classNames(
                        "mt-1 p-[10px] w-full border border-appGray-600 focus:outline-none rounded-lg bg-transparent resize-none",
                        disabled ? "bg-gray-400 cursor-not-allowed" : "",
                        requirementErrors.usecase
                          ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                          : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                      )}
                    />
                    {/* <select
                      id="usecase"
                      {...requirementRegister("usecase")}
                      // onChange={(e) => setUsecase(e.target.value)}
                      // required
                      className={classNames(
                        "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                        requirementErrors.usecase
                          ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                          : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                      )}
                    >
                      <option value="">Select</option>
                      <option value="founder">Venture Capital</option>
                      <option value="admin">Market and IP Research Firms</option>
                      <option value="admin">Web3</option>
                      <option value="admin">M&A</option>
                      <option value="admin">IP Attorny</option>
                      <option value="admin">Technology Transfer Office</option>
                      <option value="admin">Healthcare</option>
                    </select>
                    */}
                    {requirementErrors.usecase && (
                      <div className="mt-0 text-s text-danger-500">
                        {requirementErrors.usecase?.message}
                      </div>
                    )}
                  </div>
                </div>

                {/* Second Part: Added Websites and Urls Listing */}
                <div className="w-1/2 px-1 flex flex-col">
                  <label htmlFor="requirement" className="block text-md text-secondary-800 mb-1">
                    Questions you want answered in the report{" "}
                    <span className="text-red-500 ml-0">*</span>
                  </label>
                  <div className="h-fit">
                    {requirementQuestions?.map((requirement, index) => (
                      <>
                        <div key={index} className="flex items-center space-x-2">
                          <input
                            type="text"
                            id={`questions.${index}`}
                            {...requirementRegister(`questions.${index}`)}
                            // {...(index === 0 || index === 1 || index === 2
                            //   ? requirementRegister(`questions.${index}`)
                            //   : {})}
                            // required
                            placeholder={`Enter here`}
                            className={classNames(
                              "flex-grow p-[10px] w-full placeholder-black border border-appGray-600 focus:outline-none rounded-lg bg-transparent mt-1",
                              requirementErrors.questions?.[index]
                                ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                                : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                            )}
                          />
                          {requirementQuestions.length > 3 ? (
                            <button
                              type="button"
                              disabled={index === 0 || index === 1 || index === 2}
                              onClick={() => removeQuestion(index)}
                              className="text-red-500 hover:text-red-700 transition duration-300"
                            >
                              {index === 0 || index === 1 || index === 2 ? (
                                <div className="w-3"></div>
                              ) : (
                                <TrashIcon className="w-3 h-3" />
                              )}
                            </button>
                          ) : null}
                        </div>
                        <div className="mt-1 text-s text-danger-500">
                          {requirementErrors.questions?.[index]?.message &&
                            requirementErrors.questions[index]?.message}
                        </div>
                      </>
                    ))}
                    {requirementQuestions.length < 10 ? (
                      <div
                        className={`mt-2 mb-2 text-primary-900 font-semibold text-end cursor-pointer ${
                          requirementQuestions.length > 3 ? "mr-5" : ""
                        }`}
                        onClick={handleAddMoreQuestions}
                      >
                        + Add more
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                  {/* Added Websites */}
                </div>
              </div>
              <div>
                <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 mb-2">
                  <div className="flex-1">
                    <h6 className="font-semibold text-base font-nunito mb-1">
                      Upload Resources for Your Report
                    </h6>
                    <div
                      className={`border border-appGray-600 rounded-lg h-[185px] flex justify-center items-center p-10 ${
                        dragging ? "bg-gray-200" : ""
                      }`}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragging(true);
                      }}
                      onDragLeave={() => setDragging(false)}
                      onDrop={handleDrop}
                    >
                      <div
                        className="flex flex-col items-center text-lg"
                        onClick={handleBrowseClick}
                      >
                        <UploadIcon />
                        <p className="text-center text-base font-bold font-nunito mt-3">
                          Drag and Drop files to upload
                        </p>
                        <p className="text-base py-0.5 font-bold font-nunito">or</p>
                        <p className="text-primary-900 font-bold underline cursor-pointer transition duration-300 ease-in-out text-base font-nunito">
                          Browse
                        </p>
                      </div>
                    </div>
                    {/* Hidden File Input */}
                    <input
                      type="file"
                      multiple
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="mt-2 mb-2">
                      <p className="text-lg font-semibold font-nunito">
                        Supported file types (up to 200mb)
                      </p>
                      <ul className="list-disc pl-[20px]">
                        {listContent.map((content) => (
                          <li key={content} className="text-xs">
                            {content}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="flex-1">
                    <h6 className="font-semibold mb-1 text-base font-nunito">Uploaded files</h6>
                    <div
                      className={`border border-appGray-600 rounded-lg flex flex-col px-2 pt-2 pb-[20px]`}
                    >
                      <div className="rounded-lg p-2 flex-1">
                        {uploadedFiles.length > 0 ? (
                          <div className="h-[180px] pn_scroller overflow-y-auto pr-1">
                            {uploadedFiles.map((file, index) => (
                              <div key={index}>
                                {index !== 0 && <hr className="my-1 border-1 border-appGray-300" />}
                                <div className="flex justify-between items-center">
                                  <p className="text-sm font-nunito">{file.name}</p>
                                  <TrashIcon
                                    className="cursor-pointer"
                                    width={25}
                                    onClick={() => handleDelete(index, "file")}
                                  />
                                </div>
                              </div>
                            ))}
                            {/* {highlight ? ( */}
                            {/* ) : null} */}
                          </div>
                        ) : highlight ? (
                          <div className="flex items-center justify-center p-5 h-full">
                            <DotLoader />
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500 text-center p-3 font-nunito mt-3">
                            No file uploaded yet.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {/* File Upload Box */}

                  {/* Paste URL Section */}
                  <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                    <div className="flex-1">
                      <div>
                        <h6 className="font-semibold text-base mb-1 font-nunito">
                          Enter or Paste Your URL
                        </h6>
                        <div className="flex">
                          <input
                            type="text"
                            placeholder="Paste Your URL here"
                            value={urlInput}
                            onChange={handleUrlChange}
                            className="w-full p-2 rounded-tl-xl rounded-bl-xl border border-appGray-600 focus:border-primary-900 focus:outline-none"
                          />
                          <button
                            type="button"
                            className="px-4 bg-primary-900 text-white rounded-br-xl rounded-tr-xl"
                            onClick={handlePasteURL}
                          >
                            Paste
                          </button>
                        </div>
                      </div>

                      {/* Supported Files and URLs */}
                      <div className="mt-4 flex justify-between">
                        <div>
                          <p className="text-lg font-semibold font-nunito">Recommended URL</p>
                          <ul className="list-disc pl-[20px]">
                            {urlContent.map((content) => (
                              <li key={content} className="text-xs">
                                {content}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h6 className="font-semibold mb-1 text-base font-nunito">Added Websites</h6>
                      <div className="border border-appGray-600 rounded-lg flex flex-col px-2 pt-2 pb-[20px]">
                        <div className="rounded-lg p-2 flex-1">
                          {pastedURLs.length > 0 ? (
                            <div className="h-[180px] pn_scroller overflow-y-auto p-1">
                              {pastedURLs.map((url, index) => (
                                <div key={index}>
                                  {index !== 0 && (
                                    <hr className="my-1 border-1 border-appGray-300" />
                                  )}
                                  <div className="flex justify-between items-center">
                                    <p className="text-sm font-nunito">{url}</p>
                                    <TrashIcon
                                      className="cursor-pointer"
                                      onClick={() => handleDelete(index, "url")}
                                    />
                                  </div>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-gray-500 font-nunito text-center p-3 mt-3">
                              No websites added yet.
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="max-w-[120px] mt-5">
                <button
                  type="submit"
                  // onClick={() => {
                  //   setStep(3);
                  //   window.scrollTo({
                  //     top: 0,
                  //     behavior: "smooth",
                  //   });
                  // }}
                  className="cursor-pointer flex justify-center text-center border w-full border-primary-900 bg-primary-900 text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito"
                >
                  Next
                </button>
              </div>
            </form>
          </div>
        ) : step === 1 ? (
          <div className="p-3 w-[50%]">
            <form onSubmit={handleSubmitForm(handleSubmitProject)}>
              <label htmlFor="fullName" className="block text-md font-nunito text-secondary-800">
                Name your project <span className="text-red-500 ml-0">*</span>
              </label>
              <input
                type="text"
                id="projectName"
                {...register("projectName")}
                placeholder="Project Name"
                className={classNames(
                  "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                  errors.projectName
                    ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                    : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                )}
              />
              {errors.projectName?.message && (
                <div className="mt-1 text-s text-danger-500">{errors.projectName?.message}</div>
              )}
              <div className="max-w-[125px] mt-5 justify-center items-center">
                <div
                  role="button"
                  onClick={handleSubmitForm(handleSubmitProject)}
                  className="cursor-pointer border w-full border-primary-900 bg-primary-900 text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito"
                >
                  {loading ? <LoadingIcon width={18} height={18} className="" /> : "Next"}
                </div>
              </div>
            </form>
          </div>
        ) : step === 3 ? (
          <div className="p-3 w-full">
            <form onSubmit={handleSubmitCustomReport(handleFinalSubmitProject)}>
              <h6 className="text-lg font-semibold ml-0 mb-3">Report Customization</h6>
              <CustmizationForm
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
                customInput={customInput}
                setCustomInput={setCustomInput}
              />
              {/* <div className="mb-2">
                <h6 className="font-semibold mb-1 text-base font-nunito">Report Tone</h6>
                <SelectBox
                  options={[
                    "Analytical (Data-focused, emphasizing metrics and insights)",
                    "Narrative (Storytelling, highlighting trends and key takeaways)",
                    "Strategic (Focused on recommendations and next steps)",
                    "Hybrid (Mix of data, narrative, and recommendations)",
                  ]}
                  onChangeValue={(value: any) => {
                    handleReportChange("report_tone", value);
                  }}
                />
              </div>

              <div className="mb-2">
                <h6 className="font-semibold mb-1 text-base font-nunito">Charts and Visuals</h6>
                <SelectBox
                  options={[
                    "Basic (1-2 per section)",
                    "Analytical (3-4 per section)",
                    "Intuitive (5+ per section)",
                    "Statical (7+ per section)",
                  ]}
                  onChangeValue={(value: any) => {
                    handleReportChange("no_of_charts", value);
                  }}
                />
              </div>

              <div className="mb-2">
                <h6 className="font-semibold mb-1 text-base font-nunito">Visual Style</h6>
                <SelectBox
                  options={[
                    "Simple (Clean and easy to understand)",
                    "Annotated (Explanatory visuals with supporting details)",
                    "Detailed (Explanatory visuals with deep details)",
                  ]}
                  onChangeValue={(value: any) => {
                    handleReportChange("visual_style", value);
                  }}
                />
              </div>

              <div className="mb-2">
                <h6 className="font-semibold mb-1 text-base font-nunito">Citation Style</h6>
                <SelectBox
                  options={[
                    "Inline Links (Clickable web URLs in the text)",
                    "Endnotes (References listed at the end)",
                  ]}
                  onChangeValue={(value: any) => {
                    handleReportChange("citations", value);
                  }}
                />
              </div>

              <div className="mb-2">
                <h6 className="font-semibold mb-1 text-base font-nunito">Format</h6>
                <SelectBox
                  options={[
                    "PDF Report (Static and easy to share)",
                    "Presentation Deck (Ready-to-use slides)",
                    "Word Document (Editable format for custom updates)",
                    "Spreadsheet Summary (Key data in tabular format)",
                  ]}
                  multiple={true}
                  onChangeValue={(value: any) => {
                    handleReportChange("format", value);
                  }}
                />
              </div> */}
              <div className="mt-5">
                <h6 className="font-semibold mb-1 text-base font-nunito">
                  Have any special requests? Let us know what you need, and we’ll tailor the report
                  to fit your goals!
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
                      disabled ? "bg-gray-400 cursor-not-allowed" : "",
                      customReportErrors.additional
                        ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                        : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                    )}
                    placeholder=""
                    {...customReportRegister("additional")}
                  />
                  {customReportErrors.additional && (
                    <div className="mt-1 text-s text-danger-500">
                      {customReportErrors.additional?.message}
                    </div>
                  )}
                  {additionalSummary === "" && (
                    <AnimatedPlaceholder
                      className="absolute top-1 left-2 pt-1 bg-transparent"
                      onClick={() => setFocus("additional")}
                    />
                  )}
                </div>
              </div>

              <div className="max-w-[125px] mt-5 justify-center items-center">
                <div className="max-w-[120px] mt-5">
                  <button
                    type="submit"
                    disabled={loading}
                    className="cursor-pointer flex justify-center text-center border w-full border-primary-900 bg-primary-900 text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito"
                  >
                    {loading ? <LoadingIcon width={18} height={18} className="" /> : "Submit"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        ) : (
          <TakeoffScreen />
        )}
      </div>
    </div>
  );
};

export default QuickReports;
