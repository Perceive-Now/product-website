import { useMemo, useState, useRef } from "react";

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
import { useNavigate } from "react-router-dom";

import * as yup from "yup";
import { useForm, useWatch } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import SelectBox from "./selectBox";
/**
 *
 */

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

const QuickReports = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const userId = jsCookie.get("user_id");
  const [projectId, setProjectId] = useState(id);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [pastedURLs, setPastedURLs] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState<string>("");
  const [dragging, setDragging] = useState<boolean>(false);
  const [step, setStep] = useState(id ? 2 : 1);
  const [customReport, setCustomReport] = useState({
    report_tone: "",
    no_of_charts: "",
    visual_style: "",
    citations: "",
    format: "",
  });
  const [loading, setLoading] = useState(false);

  const handleDrop = (e: any) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    const fileList = Array.from(files).map((file: any) => file.name);
    setUploadedFiles((prevFiles) => [...prevFiles, ...fileList]);
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
        setUploadedFiles((prevFiles: any) => [...prevFiles, ...fileList]);
      }
    }
  };

  const handleSubmit = async (values: IRequirementValues) => {
    console.log("cutsome ", customReport);
    if (uploadedFiles.length === 0) {
      toast.error("Upload a file to submit");
      setLoading(false);
      setStep(2);
      return;
    }
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
    usecase: yup.string().trim().required("Usecase is required"),
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

  const requirementQuestions = useWatch({
    control: requirementControl,
    name: "questions",
  });

  const handleSubmitProject = async (values: INewReportValues) => {
    setLoading(true);
    const user_id = userId ?? "";

    const formData = {
      user_id: user_id,
      project_name: values.projectName,
      size: "0KB",
    };

    try {
      const response: any = await fetch(
        `https://templateuserrequirements.azurewebsites.net/create-project/`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        },
      );

      if (response.ok) {
        const data = await response.json();
        // id = data.project_id;
        setProjectId(data.project_id);
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

  const handleReportChange = (field: string, value: string) => {
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

    const formData = new FormData();

    uploadedFiles.forEach((file: File) => {
      formData.append("files", file);
    });

    pastedURLs.forEach((url: string) => {
      formData.append("websites", url);
    });

    formData.append("questions", JSON.stringify(values.questions));

    try {
      const response: any = await fetch(
        `https://templateuserrequirements.azurewebsites.net/upload-files/?user_id=${userId}&project_id=${projectId}&report_name=${values.reportName}&report_complete_status=false&usecase=${values.usecase}&report_tone=${customReport.report_tone}&no_of_charts=${customReport.no_of_charts}&citations=${customReport.citations}&visual_style=${customReport.visual_style}`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        },
      );

      if (response.ok) {
        setStep(4);
      } else {
        toast.error("Unable to submit report");
      }

      console.log("response", response);
    } catch (e) {
      console.log("err", e);
    } finally {
      setLoading(false);
    }

    console.log("formData------", formData);
  };

  return (
    <div className="space-y-[20px] w-full z-10 p-1">
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
                    navigate(`/my-reports/${id}`);
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
              <Link to="/my-projects">
                <p className="mr-4 text-secondary-800 flex items-center">
                  <ArrowLeftIcon className="mr-1" />
                  Back
                </p>
              </Link>
            </div>
          </div>
        )}

        {id && step !== 3 && step !== 4 && (
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
        )}
      </div>

      <div className="overflow-y-auto">
        {step === 2 ? (
          <div className="">
            <form onSubmit={handleSubmitFormRequirement(handleSubmit)}>
              <div className="flex space-x-4">
                {/* First Part: File Upload and Paste URL */}
                <div className="w-1/2 space-y-4">
                  <div className="w-full">
                    <label htmlFor="fullName" className="block text-md  text-secondary-800">
                      Name your report
                    </label>
                    <input
                      type="text"
                      id="reportName"
                      {...requirementRegister("reportName")}
                      // required
                      placeholder="Report Name"
                      className={classNames(
                        "mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent",
                        requirementErrors.reportName
                          ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                          : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                      )}
                    />
                    {requirementErrors.reportName && (
                      <div className="mt-1 text-xs text-danger-500">
                        {requirementErrors.reportName?.message}
                      </div>
                    )}
                  </div>

                  <div className="mb-1">
                    <label htmlFor="industry" className="block text-md text-secondary-800">
                      Primary Objective
                    </label>
                    <select
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
                    {requirementErrors.usecase && (
                      <div className="mt-1 text-xs text-danger-500">
                        {requirementErrors.usecase?.message}
                      </div>
                    )}
                  </div>

                  {/* File Upload Box */}
                  <h6 className="font-semibold text-base font-nunito">
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
                    <div className="flex flex-col items-center text-lg" onClick={handleBrowseClick}>
                      <UploadIcon />
                      <p className="text-center text-base font-bold font-nunito mt-3">
                        Drag and Drop files to upload
                      </p>
                      <p className="text-base py-0.5 font-bold font-nunito">or</p>
                      <p className="text-primary-900 font-bold underline cursor-pointer hover:text-primary-800 transition duration-300 ease-in-out text-base font-nunito">
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

                  {/* Paste URL Section */}
                  <div>
                    <h6 className="font-semibold text-base mb-2 font-nunito">
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

                {/* Second Part: Added Websites and Urls Listing */}
                <div className="w-1/2 px-3 flex flex-col">
                  <div className="h-fit py-2">
                    {requirementQuestions?.map((requirement, index) => (
                      <>
                        <div key={index} className="flex items-center space-x-2 mt-2">
                          <input
                            type="text"
                            id={`questions.${index}`}
                            {...requirementRegister(`questions.${index}`)}
                            // required
                            placeholder={`Enter here`}
                            className={classNames(
                              "flex-grow p-[10px] w-full placeholder-black border border-appGray-600 focus:outline-none rounded-lg bg-transparent",
                              requirementErrors.questions?.[index]
                                ? "border-danger-500 ring-danger-500 ring-1 focus:border-danger-500 focus:ring-danger-500"
                                : "border-gray-400 focus:border-primary-500 focus:ring-primary-500",
                            )}
                          />
                          {requirementQuestions.length > 3 ? (
                            <button
                              type="button"
                              onClick={() => removeQuestion(index)}
                              className="text-red-500 hover:text-red-700 transition duration-300"
                            >
                              <TrashIcon className="w-3 h-3" />
                            </button>
                          ) : null}
                        </div>
                        {requirementErrors.questions?.[index] && (
                          <div className="mt-1 text-xs text-danger-500">
                            {requirementErrors.questions[index]?.message}
                          </div>
                        )}
                      </>
                    ))}
                    {requirementQuestions.length < 10 ? (
                      <Button
                        type="primary"
                        classname="mt-2"
                        handleClick={handleAddMoreQuestions}
                        htmlType="button"
                      >
                        + Add
                      </Button>
                    ) : (
                      <></>
                    )}
                  </div>
                  {/* Added Websites */}
                  <div className="h-[70%] pr-[25%]">
                    <div className="border border-appGray-600 rounded-lg h-full flex flex-col px-2 pt-2 pb-[20px]">
                      <div className="rounded-lg p-2 flex-1">
                        <h6 className="font-semibold mb-1 text-base font-nunito">Added Websites</h6>

                        {pastedURLs.length > 0 ? (
                          <div className="h-[180px] pn_scroller overflow-y-auto p-1">
                            {pastedURLs.map((url, index) => (
                              <div key={index}>
                                {index !== 0 && <hr className="my-1 border-1 border-appGray-300" />}
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

                      {/* Added Reports Listing */}
                      <div className="rounded-lg p-2 flex-1">
                        <h6 className="font-semibold mb-1 text-base font-nunito">Uploaded files</h6>
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
                  className="cursor-pointer flex justify-center text-center border w-full border-[#442873] bg-[#442873] text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito"
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
                Name your project
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
                <div className="mt-1 text-xs text-danger-500">{errors.projectName?.message}</div>
              )}
              <div className="max-w-[125px] mt-5 justify-center items-center">
                <div
                  role="button"
                  onClick={handleSubmitForm(handleSubmitProject)}
                  className="cursor-pointer border w-full border-[#442873] bg-[#442873] text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito"
                >
                  {loading ? <LoadingIcon width={18} height={18} className="" /> : "Next"}
                </div>
              </div>
            </form>
          </div>
        ) : step === 3 ? (
          <div className="p-3 w-full">
            <h6 className="text-lg font-semibold ml-0 mb-3">Report Customization</h6>

            <div className="mb-2">
              <h6 className="font-semibold mb-1 text-base font-nunito">Report Tone</h6>
              <SelectBox
                options={[
                  "Analytical (Data-focused, emphasizing metrics and insights)",
                  "Narrative (Storytelling, highlighting trends and key takeaways)",
                  "Actionable (Focused on recommendations and next steps)",
                  "Balanced (Mix of data, narrative, and recommendations)",
                ]}
                onChangeValue={(value) => {
                  handleReportChange("report_tone", value);
                }}
              />
            </div>

            <div className="mb-2">
              <h6 className="font-semibold mb-1 text-base font-nunito"> Number of Charts/Tables</h6>
              <SelectBox
                options={[
                  "Minimal (1-2 per section)",
                  "Moderate (3-4 per section)",
                  "Extensive (5+ per section)",
                ]}
                onChangeValue={(value) => {
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
                ]}
                onChangeValue={(value) => {
                  handleReportChange("visual_style", value);
                }}
              />
            </div>

            <div className="mb-2">
              <h6 className="font-semibold mb-1 text-base font-nunito">Citations</h6>
              <SelectBox
                options={[
                  "Inline Links (Clickable web URLs in the text)",
                  "Endnotes (References listed at the end)",
                  "No Citations (Focused on insights)",
                ]}
                onChangeValue={(value) => {
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
                onChangeValue={(value) => {
                  handleReportChange("format", value);
                }}
              />
            </div>

            <div className="max-w-[125px] mt-5 justify-center items-center">
              <div className="max-w-[120px] mt-5">
                <button
                  onClick={handleFinalSubmitProject}
                  disabled={loading}
                  className="cursor-pointer flex justify-center text-center border w-full border-[#442873] bg-[#442873] text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito"
                >
                  {loading ? <LoadingIcon width={18} height={18} className="" /> : "Submit"}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <TakeoffScreen />
        )}
      </div>
    </div>
  );
};

export default QuickReports;
