import { useMemo, useState, useRef } from "react";

//
import EditIcon from "../../../components/icons/miscs/Edit";
import { Link } from "react-router-dom";
import ArrowLeftIcon from "src/components/icons/common/arrow-left";
//
import Button from "src/components/reusable/button";
import TrashIcon from "src/components/icons/common/trash";
import { UploadIcon } from "src/components/icons";
import TakeoffScreen from "./takeoffScreen";
import jsCookie from "js-cookie";
import { generateKnowIdstring } from "src/utils/helpers";
import toast from "react-hot-toast";
import { LoadingIcon } from "src/components/icons";
import { useParams } from "react-router-dom";

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

const QuickReports = () => {
  const { id } = useParams();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const userId = jsCookie.get("user_id");

  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [pastedURLs, setPastedURLs] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState<string>("");
  const [dragging, setDragging] = useState<boolean>(false);
  const [step, setStep] = useState(id?2:1);
  const [reportName, setReportName] = useState<string>("");
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

  const handleSubmit = async () => {
    setLoading(true);
    if (uploadedFiles.length === 0) {
      toast.error("Upload a file to submit");
      setLoading(false);
      return;
    }

    const formData = new FormData();

    uploadedFiles.forEach((file: File) => {
      formData.append("files", file);
    });

    pastedURLs.forEach((url: string) => {
      formData.append("websites", url);
    });

    const threadId = generateKnowIdstring();

    try {
      const response: any = await fetch(
        `https://templateuserrequirements.azurewebsites.net/upload-files/?user_id=${userId}&thread_id=${threadId}&report_name=${reportName}&report_completed_url=test&report_complete_status=false`,
        {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        },
      );

      if (response.ok) {
        setStep(3);
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

  return (
    <div className="space-y-[20px] h-[calc(100vh-120px)] w-full z-10 p-1">
      <div>
        <h6 className="text-lg font-semibold ml-0">
        Project management &gt; {step === 1 ? 'New Project' : 'Project Requirement'}
        </h6>
        {step === 1 && (
          <div className="flex justify-start items-center pt-3">
            <Link to="/my-projects">
              <p className="mr-4 text-secondary-800 flex items-center">
                <ArrowLeftIcon className="mr-1" />
                Back
              </p>
            </Link>
          </div>
        )}
      </div>

      <div className="overflow-y-auto">
        {step === 2 ? (
          <div className="">
            <div className="flex space-x-4">
              {/* First Part: File Upload and Paste URL */}
              <div className="w-1/2 space-y-4">
                {/* File Upload Box */}
                <div
                  className={`border border-appGray-600 rounded-lg h-48 flex justify-center items-center p-10 ${
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
                  <h6 className="font-semibold text-base mb-2">Type or Paste Your URL</h6>
                  <div className="flex">
                    <input
                      type="text"
                      placeholder="Paste URL here"
                      value={urlInput}
                      onChange={handleUrlChange}
                      className="w-full p-2 rounded-tl-xl rounded-bl-xl border border-appGray-600 focus:border-primary-900 focus:outline-none"
                    />
                    <button
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
              <div className="w-1/2 px-15">
                {/* Added Websites */}
                <div className="border border-appGray-600 rounded-lg h-full flex flex-col p-2">
                  <div className="rounded-lg p-2 flex-1">
                    <h6 className="font-semibold mb-1 text-base font-nunito">Added Websites</h6>

                    {pastedURLs.length > 0 ? (
                      <div className="h-[250px] pn_scroller overflow-y-auto p-1">
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
                      <div className="h-[250px] pn_scroller overflow-y-auto pr-1">
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
            <div className="max-w-[120px] mt-5">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="cursor-pointer flex justify-center text-center border w-full border-[#442873] bg-[#442873] text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito"
              >
                {loading ? <LoadingIcon width={18} height={18} className="" /> : "Submit"}
              </button>
            </div>
          </div>
        ) : step === 1 ? (
          <div className="p-3 w-[50%]">
            <label htmlFor="fullName" className="block text-md font-nunito text-secondary-800">
              Name your project
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={reportName}
              onChange={(e: any) => {
                setReportName(e.target.value);
              }}
              required
              placeholder="Project Name"
              className="mt-1 p-[10px] w-full border border-appGray-600  focus:outline-none rounded-lg bg-transparent"
            />
            <div className="max-w-[125px] mt-5 justify-center items-center">
              <div
                onClick={() => {
                  if (reportName === "") {
                    toast.error("Project name cannot be empty!");
                    return;
                  } else {
                    setStep(2);
                  }
                }}
                className="cursor-pointer border w-full border-[#442873] bg-[#442873] text-white rounded-[32px] px-[40px] py-[12px] transition-all ease-in-out duration-150 font-normal text-[16px] font-nunito"
              >
                Next
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
